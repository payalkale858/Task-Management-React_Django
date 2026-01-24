from rest_framework import serializers 
from .models import Todo

class tososeralizer(serializers.ModelSerializer):
  
    class Meta:
        model=Todo
        fields = ['id', 'title', 'description','created_at']