from django.shortcuts import render
from django.http import JsonResponse ,HttpResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Todo
from .serializers import tososeralizer
from rest_framework import status
# from django.contrib.auth.forms import UserCreationForm
# from rest_framework.permissions import IsAuthenticated
# Create your views here.



class TaskManagement(APIView):
    
    def get(self, request, pk=None):
        # Single todo
        if pk is not None:
            try:
                todo = Todo.objects.get(pk=pk)
            except Todo.DoesNotExist:
                return Response({"error": "Todo not found"},status=status.HTTP_404_NOT_FOUND)

            serializer = tososeralizer(todo)
            return Response(serializer.data, status=status.HTTP_200_OK)

        #  All todos
        todos = Todo.objects.all()
        serializer = tososeralizer(todos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

    def post(self,request):
        serializer=tososeralizer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    

    def put(self,request,pk=None):
        if pk is None:
            return Response({"error": "Todo ID is required"},status=status.HTTP_400_BAD_REQUEST)
        try:
            todo=Todo.objects.get(pk=pk)
        except Todo.DoesNotExist:
            return Response(  {"error": "Todo not found"},
                status=status.HTTP_404_NOT_FOUND)

        serializer=tososeralizer(todo,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    

    def delete(self,request,pk=None):
        if pk is None:
            return Response({"error": "Todo ID is required"},status=status.HTTP_400_BAD_REQUEST)
        try:
            todo=Todo.objects.get(pk=pk)
        except Todo.DoesNotExist:
            return Response( {"error": "Todo not found"},
                status=status.HTTP_404_NOT_FOUND)
        todo.delete()
        return Response(
            {"message": "Todo deleted successfully"},
            status=status.HTTP_204_NO_CONTENT
        )
        