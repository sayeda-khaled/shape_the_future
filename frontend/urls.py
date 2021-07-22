# from django.urls import path
#
# from .views import IndexView
#
# # app_name='frontend'
#
#
# urlpatterns = [
#     path('', IndexView.as_view()),
# ]

from django.urls import path
from . import views
app_name = 'frontend'
urlpatterns = [
    path('<path:resource>/', views.IndexView.as_view()),
    path('', views.IndexView.as_view(), name='index'),
]
