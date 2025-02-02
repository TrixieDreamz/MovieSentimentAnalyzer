from django.urls import path
from .views import RegisterView, LoginView, LogoutView, get_user, activate_account

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("user/", get_user, name="get_user"),
    path("activate/<str:token>/", activate_account, name="activate-account"),  # ✅ Ensure this exists!
]
