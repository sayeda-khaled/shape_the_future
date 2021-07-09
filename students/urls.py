from django.urls import path

from .views import StudentListAPIView, StudentDetailAPIView

App_name = 'students'

urlpatterns = [
    path('<int:pk>/', StudentDetailAPIView.as_view(), name='student_list_detail'),
    path('', StudentListAPIView.as_view(), name="student_list"),
]
