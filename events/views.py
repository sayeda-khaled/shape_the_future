from datetime import datetime
from django.db.models import Q

from rest_framework import generics

from .models import Event
from .serializers import EventSerializer, StaffEventSerializer
from .permissions import AdminPermissions, IsAuthOrReadOnly


class EventListAPIView(generics.ListCreateAPIView):
    # queryset = Event.objects.all()
    serializer_class = EventSerializer

    def get_queryset(self):
        volunteer = self.request.user
        # import pdb; pdb.set_trace()
        # Complex lookups with Q objects
        # https://docs.djangoproject.com/en/3.2/topics/db/queries/#complex-lookups-with-q-objects
        return Event.objects.exclude(Q(volunteer=volunteer) | Q(date_of_event__lt=datetime.today())) # reverse this login


class EventDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    # permission_classes = (IsAuthOrReadOnly,)

    def perform_update(self, serializer):
        serializer.save(volunteer=self.request.user)


class VolunteerEventListAPIView(generics.ListCreateAPIView):
    serializer_class = EventSerializer
    # permission_classes = (IsAuthOrReadOnly,)

    def get_queryset(self):
        volunteer = self.request.user
        return Event.objects.filter(volunteer=volunteer)


class VolunteerEventDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = EventSerializer
    permission_classes = (IsAuthOrReadOnly,)

    def get_queryset(self):
        volunteer = self.request.user
        return Article.objects.filter(volunteer=volunteer)


class StaffEventListAPIView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = StaffEventSerializer

class StaffEventDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = StaffEventSerializer
    permission_classes = (AdminPermissions,)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def Perform_update(self, serializer):
        instance = serializer.save(is_staff=self.request.user)
