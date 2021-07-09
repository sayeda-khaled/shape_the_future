
from rest_framework import serializers

from .models import Student

class StudentSerializer(serializers.ModelSerializer):
    first_name = serializers.StringRelatedField()

    class Meta:
        model = Student
        fields = ['first_name', 'last_name']

        # fields = '__all__'
