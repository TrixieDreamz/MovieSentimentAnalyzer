from django.urls import path
from .views import RegisterView, LoginView, LogoutView, get_user

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),  # ✅ Fix for class-based view
    path("login/", LoginView.as_view(), name="login"),# ✅ Fix for class-based view
    path("logout/", LogoutView.as_view(), name="logout"),  # ✅ Fix for class-based view
    path("user/", get_user, name="get_user"),  # ✅ Function-based view doesn't need .as_view()
]
