from django.urls import path

from .views import EventListAPIView, EventDetailAPIView, VolunteerEventListAPIView, VolunteerEventDetailAPIView, StaffEventListAPIView, StaffEventDetailAPIView, ParentListAPIView

App_name = 'events'

urlpatterns = [

    path('volunteer/<int:pk>/', VolunteerEventDetailAPIView.as_view(), name="volunteer_event_list_detail"),
    path('volunteer/', VolunteerEventListAPIView.as_view(), name="volunteer_event_list"),
    path('staff/<int:pk>/', StaffEventDetailAPIView.as_view(), name="staff_event_list_detail"),
    path('staff/', StaffEventListAPIView.as_view(), name="staff_event_list"),
    path('<int:pk>/', EventDetailAPIView.as_view(), name='event_list_detail'),
    path('parent/', ParentListAPIView.as_view(), name="parent_event_list"),
    path('', EventListAPIView.as_view(), name="event_list"),

]
