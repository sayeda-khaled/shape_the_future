from django.urls import path

from .views import StudentListAPIView, StudentDetailAPIView

App_name = 'students'

urlpatterns = [
    path('<int:pk>/', StudentDetailAPIView.as_view(), name='student_list_detail'),
    path('', StudentListAPIView.as_view(), name="student_list"),
    # path('parents/', ParentListAPIView.as_view(), name="parent_list"),
    # path('parents/<int:pk>/', ParentDetailAPIView.as_view(), name="parent_list_detail"),
]
