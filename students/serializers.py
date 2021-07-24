
from rest_framework import serializers

from .models import Student




class StudentSerializer(serializers.ModelSerializer):

    parent_last_name = serializers.ReadOnlyField(source="primary_contact.last_name")
    parent_first_name = serializers.ReadOnlyField(source="primary_contact.first_name")


    class Meta:
        model = Student
        # fields = ['first_name', 'last_name']

        fields = '__all__'
        # depth= 2
