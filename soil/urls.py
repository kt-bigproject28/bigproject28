# soil/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('soil_exam/', views.soil_exam_result, name='soil_exam_result'),
    path('get-soil-fertilizer-info/', views.get_soil_fertilizer_info, name='get_soil_fertilizer_info'),
]
