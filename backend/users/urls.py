from django.urls import path
from .views import RegisterView

# User registration endpoint
urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
]
