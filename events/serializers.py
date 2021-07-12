
from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Event

User = get_user_model()

class EventSerializer(serializers.ModelSerializer):
    # volunteer_name = serializers.ReadOnlyField(source="volunteer.username")
    volunteer = serializers.SlugRelatedField(
        many=False,
        queryset=User.objects.all(),
        read_only=False,
        slug_field='username',
        allow_null=True
     )

    class Meta:
        model = Event
        fields = '__all__'
        # depth = 1

class StaffEventSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = '__all__'
