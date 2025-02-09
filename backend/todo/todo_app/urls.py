from django.urls import path
from .views import TaskDetail, TaskList

urlpatterns = [
    path('task/' , TaskList.as_view(), name="task-list"),
    path('task/<int:pk>/' , TaskDetail.as_view(), name="task-detail")
]