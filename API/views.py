from django.shortcuts import render
from rest_framework import generics
from API.serializers import *
from back.models import Volonteer, Shelter, Task
from back.serializers import TaskSerializer, VolonteerSerializer, PostSerializer
from API.permissions import IsOwnerOrReadOnly
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.http import HttpResponse
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
# Create your views here.

class VolonteerCreateView(generics.CreateAPIView):
    serializer_class = VolonteerDetailSerializer
    permission_classes = (IsOwnerOrReadOnly, )

class VolonteerView(generics.ListAPIView):
    serializer_class = VolonteerDetailSerializer
    queryset = Volonteer.objects.all()
    permission_classes = (IsOwnerOrReadOnly, )

class VolonteerDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = VolonteerDetailSerializer
    queryset = Volonteer.objects.all()


#Мероприятия
class ShelterCreateView(generics.CreateAPIView):
    serializer_class = ShelterDetailSerializer

class ShelterListView(generics.ListAPIView):
    serializer_class = ShelterDetailSerializer
    queryset = Shelter.objects.all()

class ShelterDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = ShelterDetailSerializer
    queryset = Shelter.objects.all()

#Таски
class TaskCreateView(generics.CreateAPIView):
    serializer_class = TaskDetailSerializer

class TaskListView(generics.ListAPIView):
    serializer_class = TaskDetailSerializer
    queryset = Task.objects.all()

class TaskDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = TaskDetailSerializer
    queryset = Task.objects.all()

@api_view(['GET', 'PUT', 'DELETE'])
def task_detail(request, pk):
    """
    Retrieve, update or delete task
    """
    try:
        snippet = Task.objects.get(pk=pk)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TaskSerializer(snippet)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = TaskSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PUT', 'DELETE'])
def vlt_detail(request, pk):
    """
    Retrieve, update or delete task
    """
    try:
        snippet = Volonteer.objects.get(pk=pk)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = VolonteerSerializer(snippet)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = VolonteerSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['PUT'])
def post_detail(request):

    if request.method == 'PUT':
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)