from rest_framework import generics

from .models import Event
from .serializers import EventSerializer, StaffEventSerializer

class EventListAPIView(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class EventDetailAPIView(generics.RetrieveUpdateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class VolunteerEventListAPIView(generics.ListCreateAPIView):
    serializer_class = EventSerializer
    # permission_classes = (IsAuthOrReadOnly,)

    def get_queryset(self):
        volunteer = self.request.user
        return Event.objects.filter(volunteer=volunteer)

class VolunteerEventDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = EventSerializer
    # permission_classes = (IsAuthOrReadOnly,)

    def get_queryset(self):
        volunteer = self.request.user
        return Article.objects.filter(volunteer=volunteer)


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
