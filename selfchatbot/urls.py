from django.urls import path
from . import views

app_name = 'selfchatbot'

urlpatterns = [
    path('chat/', views.chat_page, name='chat_page'),
    path('chatbot/', views.chatbot, name='chatbot'),
    path('clear_logs/', views.chat_clear_logs, name='clear_logs'),
    path('error/', views.error_page, name='error_page'),  # Add this line
]
