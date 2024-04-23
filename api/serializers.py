from rest_framework import serializers
from .models import Task

#  TaskSerializer is a serializer class that automatically generates serializer fields for all fields of the Task model, making it easy to convert Task instances to and from JSON representations.

class TaskSerializer(serializers.ModelSerializer):
	class Meta:
		model = Task
		fields ='__all__'