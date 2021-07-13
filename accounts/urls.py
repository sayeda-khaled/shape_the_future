from django.urls import include, path

from .views import  ProfileListAPIView, ProfileDetailAPIView


urlpatterns = [
    path('profiles/user/<int:user>/', ProfileListAPIView.as_view()),
    path('profiles/user/', ProfileDetailAPIView.as_view()),

]
