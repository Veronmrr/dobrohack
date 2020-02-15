from django.contrib import admin 
from django.urls import path, include
from API.views import *


app_name = 'API'
urlpatterns = [
    path('vlt/create/', VolonteerCreateView.as_view()),
    path('vlt/getlist/', VolonteerView.as_view()),
    path('shelter/create/', ShelterCreateView.as_view()),
    path('shelter/getlist/', ShelterListView.as_view()),
    path('task/create/', TaskCreateView.as_view()),
    path('task/getlist/', TaskListView.as_view()),
    path('task/detail/<int:pk>', task_detail),
    path('vlt/detail/<int:pk>', vlt_detail),
    path('post/send/', post_detail)
]
