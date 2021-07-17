
from rest_framework import serializers

from .models import Student, Parent

class ParentSerializer(serializers.ModelSerializer):
    pass


    class Meta:
        model = Parent
        # fields = ['first_name', 'last_name']

        fields = '__all__'


class StudentSerializer(serializers.ModelSerializer):
    pass
    # first_name = serializers.StringRelatedField()


    class Meta:
        model = Student
        # fields = ['first_name', 'last_name']

        fields = '__all__'
