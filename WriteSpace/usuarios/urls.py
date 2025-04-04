from django.urls import path
from .views import RegistroView, LoginView, LogoutView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("registro/", RegistroView.as_view(), name="registro"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
