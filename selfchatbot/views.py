from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.utils import timezone
from .models import Chatbot
import logging
from langchain.chat_models import ChatOpenAI
from langchain.chains import ConversationalRetrievalChain
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.memory import ConversationBufferMemory
import os
from django.urls import reverse
from django.http import HttpResponse
import environ

env = environ.Env()
environ.Env.read_env()

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

def chat_page(request):
    return render(request, 'chat_page.html')

def chatbot(request):
    if request.method == "POST":
        query = request.POST.get('question')
        if query:
            try:
                result = qa_chain(query)
                answer = result["result"]

                timestamp = timezone.now()

                Chatbot.objects.create(
                    user_id=request.user.id if request.user.is_authenticated else None,
                    session_id=request.session.session_key,
                    question_content=query,
                    answer_content=answer,
                    created_at=timestamp
                )

                logs = request.session.get('logs', [])
                logs.append({
                    'question': query,
                    'answer': answer,
                    'timestamp': timestamp.strftime('%Y-%m-%d %H:%M:%S')
                })

                request.session['logs'] = logs

                context = {
                    'logs': logs
                }
                return render(request, 'result.html', context)

            except Exception as e:
                logger.error(f"Error during chat processing: {e}")
                return redirect('selfchatbot:error_page')

        else:
            logger.warning("No question provided.")
            return redirect('selfchatbot:chat_page')

    return redirect('selfchatbot:chat_page')

def error_page(request):
    return render(request, 'error_page.html')

def chat_clear_logs(request):
    if request.method == 'POST':
        request.session['logs'] = []
        return redirect('selfchatbot:chat_page')
    else:
        return HttpResponse(status=405)
