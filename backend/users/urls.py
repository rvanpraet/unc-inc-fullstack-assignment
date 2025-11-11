from django.urls import path
from .views import CurrentUserView, RegisterView

# User registration endpoint
urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path("me/", CurrentUserView.as_view(), name="user-me"), 
]
