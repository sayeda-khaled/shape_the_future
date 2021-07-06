from rest_framework import generics

from .models import Profile
from .serializers import ProfileSerializer
from .permissions import IsAuthOrReadOnly
from django.shortcuts import render, get_object_or_404

class ProfileListAPIView(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)


class ProfileDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = (IsAuthOrReadOnly,)

    def perform_update(self, serializer):
        instance = serializer.save(user=self.request.user)

    def get_object(self):
        return get_object_or_404(Profile, user=self.request.user)
