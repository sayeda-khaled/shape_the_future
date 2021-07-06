
from rest_framework import serializers

from .models import Event

class EventSerializer(serializers.ModelSerializer):
    pass

    class Meta:
        model = Event
        fields = '__all__'

class StaffEventSerializer(serializers.ModelSerializer):
    pass

    class Meta:
        model = Event
        fields = '__all__'
