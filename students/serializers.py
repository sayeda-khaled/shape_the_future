
from rest_framework import serializers

from .models import Student




class StudentSerializer(serializers.ModelSerializer):

    contact_name = serializers.ReadOnlyField(source="primary_contact.last_name")
    contact_name_firstname = serializers.ReadOnlyField(source="primary_contact.first_name")


    class Meta:
        model = Student
        # fields = ['first_name', 'last_name']

        fields = '__all__'
        # depth= 2
