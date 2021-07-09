from rest_framework import generics

from .models import Student

from .serializers import StudentSerializer

from .permissions import IsAuthOrReadOnly


class StudentListAPIView(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class StudentDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = (IsAuthOrReadOnly,)


    def perform_create(self, serializer):
        serializer.save(is_staff=self.request.user)

    def Perform_update(self, serializer):
        instance = serializer.save(is_staff=self.request.user)
