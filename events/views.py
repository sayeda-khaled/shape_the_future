from rest_framework import generics

from .models import Event
from .serializers import EventSerializer, StaffEventSerializer

class EventListAPIView(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class EventDetailAPIView(generics.RetrieveAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class StaffEventListAPIView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = StaffEventSerializer

class StaffEventDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = StaffEventSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def Perform_update(self, serializer):
        instance = serializer.save(is_staff=self.request.user)
