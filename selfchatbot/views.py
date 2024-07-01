from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.utils import timezone
from .models import Chatbot
import logging
from langchain_openai import ChatOpenAI
from langchain.chains import ConversationalRetrievalChain
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.memory import ConversationBufferMemory
import os
from django.urls import reverse
from django.http import HttpResponse




logger = logging.getLogger(__name__)

# OpenAI API 키 설정
openai_api_key = os.getenv("OPENAI_API_KEY")

# Embeddings와 데이터베이스 초기화
embeddings = OpenAIEmbeddings(model="text-embedding-ada-002")
database = Chroma(persist_directory="./database", embedding_function=embeddings)
memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
qa_chain = ConversationalRetrievalChain.from_llm(
    llm=ChatOpenAI(api_key=openai_api_key, model="gpt-3.5-turbo"),
    retriever=database.as_retriever(search_kwargs={"k": 3}),
    memory=memory
)

def chatbot(request):
    if request.method == "POST":
        query = request.POST.get('question')
        if query:
            try:
                # 질문 답변 생성
                result = qa_chain(query)
                answer = result["result"]

                # 현재 시간 추가
                timestamp = timezone.now()

                # 채팅 기록 저장
                Chatbot.objects.create(
                    user_id=request.user.id,
                    session_id=request.session.session_key,
                    question_content=query,
                    answer_content=answer,
                    created_at=timestamp
                )

                # 세션에서 기존 로그를 가져옴
                logs = request.session.get('logs', [])
                logs.append({
                    'question': query,
                    'answer': answer,
                    'timestamp': timestamp.strftime('%Y-%m-%d %H:%M:%S')
                })

                # 세션에 로그를 저장
                request.session['logs'] = logs

                context = {
                    'logs': logs
                }
                return render(request, 'selfgpt/result.html', context)#채팅기록을 반환(context안에 채팅 기록이 있음)session별로

            except Exception as e:
                logger.error(f"Error during chat processing: {e}")
                return redirect('error_page')  # 에러 페이지로 리디렉션 또는 적절한 에러 처리

        else:
            logger.warning("No question provided.")
            return redirect('chat_page')  # 질문이 없을 경우 다시 질문 페이지로 리디렉션

    # GET 요청일 경우 채팅 페이지로 리디렉션
    return redirect('chat_page')


def chat_clear_logs(request): #채팅기록 로그 삭제
    if request.method == 'POST':
        request.session['logs'] = []
        return redirect('selfchatgpt:index')
    else:
        return HttpResponse(status=405)