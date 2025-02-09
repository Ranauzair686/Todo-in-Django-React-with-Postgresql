from .models import Task
from rest_framework import generics
from .serializers import TaskSerializer

class TaskList(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    
class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    
    




# from django.shortcuts import render
# from rest_framework .response import  Response
# from rest_framework.views import APIView
# from django.forms import model_to_dict
# from rest_framework import status
# from django.shortcuts import get_object_or_404
        
# class TaskList(generics.ListCreateAPIView):
    # def get(self, request):
    #     task_list = list(Task.objects.values())
    #     return Response({'tasks' : task_list}, status=status.HTTP_200_OK )
    
    # def post(self, request):
    #     name = request.data.get("name")
    #     details = request.data.get("details")
    #     deadline_date = request.data.get("deadline_date")
    #     task = Task.objects.create(name=name, details=details, deadline_date=deadline_date)
    #     task.save()
    #     return Response({'message' : "Task added successfully"}, status=status.HTTP_201_CREATED)     

# class TaskDetail(APIView):
    # def get(self, request, t_id):
    #     task = get_object_or_404(Task, pk=t_id)
    #     task_data = model_to_dict(task)
    #     return Response(task_data, status=status.HTTP_200_OK)
    
    # def delete(self, request, t_id):
    #     task = get_object_or_404(Task, pk=t_id)
    #     task.delete()
    #     return Response("Successfully deleted", status=status.HTTP_204_NO_CONTENT)
    
    # def put(self, request, t_id):
    #     task = get_object_or_404(Task, pk=t_id)
    #     task.name = request.data.get("name", task.name)
    #     task.details = request.data.get("details", task.details)
    #     task.deadline_date = request.data.get("deadline_date", task.deadline_date)
    #     task.save()
    #     return Response(model_to_dict(task), status=status.HTTP_200_OK)