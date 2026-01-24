from django.urls import path
from .views import TaskManagement


urlpatterns = [
    path("todos/", TaskManagement.as_view()),          # GET, POST
    path("todos/<int:pk>/", TaskManagement.as_view()), # GET, PUT, DELETE
      
]
