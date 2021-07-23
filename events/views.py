from datetime import datetime, timedelta, time, date
from django.db.models import Q



from rest_framework import generics
from rest_framework.permissions import IsAdminUser

from .models import Event
from .serializers import EventSerializer, StaffEventSerializer
from .permissions import UserPermissions

from .tasks import send_notifications

today = date.today()

send_notifications()


class EventListAPIView(generics.ListCreateAPIView):
    # queryset = Event.objects.all()
    serializer_class = EventSerializer

    def get_queryset(self):
        volunteer = self.request.user
        # import pdb; pdb.set_trace()
        # Complex lookups with Q objects
        # https://docs.djangoproject.com/en/3.2/topics/db/queries/#complex-lookups-with-q-objects
        return Event.objects.exclude(Q(volunteer=volunteer) | Q(date_of_event__lt=datetime.today())).order_by('date_of_event')

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
        return Event.objects.filter(volunteer=volunteer).order_by('date_of_event')


class VolunteerEventDetailAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = EventSerializer
    # permission_classes = (UserPermissions,)

    def get_queryset(self):
        volunteer = self.request.user
        return Event.objects.filter(volunteer=volunteer).order_by('date_of_event')


class StaffEventListAPIView(generics.ListCreateAPIView):
    # queryset = Event.objects.all().order_by('date_of_event')
    # Event.objects.filter(date_of_event=datetime.today())
    serializer_class = StaffEventSerializer
    permission_classes = (IsAdminUser,)


    def get_queryset(self):
        user = self.request.user.is_staff
        return Event.objects.exclude(date_of_event__lt=datetime.today()).order_by('date_of_event')


class StaffEventDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = StaffEventSerializer
    permission_classes = (IsAdminUser,)




class ParentListAPIView(generics.ListAPIView):
    serializer_class = EventSerializer

    def get_queryset(self):
        return Event.objects.filter(student__primary_contact=self.request.user).order_by('date_of_event')
