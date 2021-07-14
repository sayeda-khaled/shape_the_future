from django.urls import include, path

from .views import  ProfileListAPIView, ProfileDetailAPIView


urlpatterns = [
    path('profiles/', ProfileListAPIView.as_view()),
    path('profiles/current_user/', ProfileDetailAPIView.as_view()),
    # path('', UserDetailAPIView.as_view()),
    # path('<int:user>/', UserDetailAPIView.as_view()),
]
