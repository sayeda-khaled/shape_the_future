from django.urls import path, include

from . import views

urlpatterns = [
# path('events/', include('events.urls')),
path('users/', include('accounts.urls')),
path('students/', include('students.urls')),
]
