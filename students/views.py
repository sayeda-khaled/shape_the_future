from rest_framework import generics

from .models import Student, Parent

from .serializers import StudentSerializer, ParentSerializer

# from .permissions import IsAuthOrReadOnly

from rest_framework.permissions import IsAdminUser


class StudentListAPIView(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user.is_staff)


class StudentDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = (IsAdminUser,)


    def perform_create(self, serializer):
        serializer.save(user=self.request.user.is_staff)

    def Perform_update(self, serializer):
        instance = serializer.save(user=self.request.user.is_staff)

class ParentListAPIView(generics.ListCreateAPIView):
    queryset = Parent.objects.all()
    serializer_class = ParentSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ParentDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Parent.objects.all()
    serializer_class = ParentSerializer
    permission_classes = (IsAdminUser,)


    def perform_create(self, serializer):
        serializer.save(user=self.request.user.is_staff)

    def Perform_update(self, serializer):
        instance = serializer.save(user=self.request.user.is_staff)
