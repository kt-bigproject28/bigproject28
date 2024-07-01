from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views
from . import views

app_name = 'selfchatbot'  # 네임스페이스를 설정합니다.

urlpatterns = [
    path('chatbot', views.chatbot, name='chatbot'), #
    path('clear_logs', views.chat_clear_logs, name='clear_logs'), #채팅기록 삭제
]