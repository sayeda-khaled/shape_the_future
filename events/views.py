from datetime import datetime, timedelta
from django.db.models import Q

from rest_framework import generics
from rest_framework.permissions import IsAdminUser

from .models import Event
from .serializers import EventSerializer, StaffEventSerializer
from .permissions import IsAuthOrReadOnly


class EventListAPIView(generics.ListCreateAPIView):
    # queryset = Event.objects.all()
    serializer_class = EventSerializer

    def get_queryset(self):
        volunteer = self.request.user
        # import pdb; pdb.set_trace()
        # Complex lookups with Q objects
        # https://docs.djangoproject.com/en/3.2/topics/db/queries/#complex-lookups-with-q-objects
        return Event.objects.exclude(Q(volunteer=volunteer) | Q(date_of_event__lt=datetime.today()))

class EventDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    # permission_classes = (IsAuthOrReadOnly,)

    def perform_update(self, serializer):
        serializer.save(volunteer=self.request.user)


class VolunteerEventListAPIView(generics.ListAPIView):
    serializer_class = EventSerializer
    # permission_classes = (IsAuthOrReadOnly,)

    def get_queryset(self):
        volunteer = self.request.user
        return Event.objects.filter(volunteer=volunteer)


class VolunteerEventDetailAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = EventSerializer
    # permission_classes = (IsAuthOrReadOnly,)

    def get_queryset(self):
        volunteer = self.request.user
        return Event.objects.filter(volunteer=volunteer)



class StaffEventListAPIView(generics.ListCreateAPIView):
    # queryset = Event.objects.all()
    # Event.objects.filter(date_of_event=datetime.today())
    serializer_class = StaffEventSerializer
    permission_classes = (IsAdminUser,)

    def get_queryset(self):
        # datetime.date.today() + datetime.timedelta(days=1)
        # presentday= datetime.today()
        # tomorrow = datetime.timedelta(days=1)
        # return Event.objects.filter(date_of_event__lt=datetime.today())
        user = self.request.user.is_staff
        # return Event.objects.filter(date_of_event__gte=datetime.today() + timedelta(days=1))

        tomorrow = (datetime.today() + timedelta(days=1))
        return Event.objects.filter(date_of_event__lt=tomorrow)

class StaffEventDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = StaffEventSerializer
    permission_classes = (IsAdminUser,)

    def perform_create(self, serializer):
        serializer.save(is_staff=self.request.user)

    def Perform_update(self, serializer):
        instance = serializer.save(is_staff=self.request.user)
