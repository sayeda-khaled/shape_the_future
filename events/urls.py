from django.urls import path

from .views import EventListAPIView, EventDetailAPIView, StaffEventListAPIView, StaffEventDetailAPIView

App_name = 'events'

urlpatterns = [
    path('', EventListAPIView.as_view(), name="event_list"),
    path('<int:pk>/', EventDetailAPIView.as_view(), name='event_list_detail'),
    path('staff/', StaffEventListAPIView.as_view(), name="staff_event_list"),
    path('staff/<int:pk>/', StaffEventDetailAPIView.as_view(), name="staff_event_list_detail"),

]
