
from rest_framework import serializers

from .models import Event

class EventSerializer(serializers.ModelSerializer):

    volunteer = serializers.StringRelatedField()

    class Meta:
        model = Event
        fields = '__all__'

class StaffEventSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = '__all__'
