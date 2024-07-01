# urls.py (community app)

from django.urls import path
from . import views

app_name = 'community'

urlpatterns = [
    path('post/<int:post_id>/', views.post_detail, name='post_detail'),
    path('create/', views.post_create, name='post_create'),
    path('post/<int:post_id>/edit/', views.post_edit, name='post_edit'),
    path('post/<int:post_id>/delete/', views.post_delete, name='post_delete'),
    path('', views.post_list, name='post_list'),
]
