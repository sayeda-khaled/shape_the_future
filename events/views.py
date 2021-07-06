from rest_framework import generics

from .models import Event
from .serializers import EventSerializer
from .serializers import StaffEventSerializer


class EventListAPIView(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class EventDetailAPIView(generics.RetrieveAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class StaffEventListAPIView(generics.ListAPIView):
    queryset = Event.objects.all()
    Serializer_class = StaffEventSerializer

class StaffEventDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = StaffEventSerializer

    def Perform_update(self, serializer):
        instance = serializer.save(is_staff=self.request.user)
