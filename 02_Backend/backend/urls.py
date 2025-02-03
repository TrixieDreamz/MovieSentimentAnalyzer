"""
URL configuration for the backend project.

The `urlpatterns` list routes URLs to views. In Django, every request made to the server 
is checked against this list to determine which view should handle it.

For more information on URL routing in Django, visit:
https://docs.djangoproject.com/en/5.1/topics/http/urls/
"""

from django.contrib import admin  # Import Django's built-in admin module
from django.urls import path, include  # Import path (for defining routes) and include (for modular URL configurations)


urlpatterns = [
    # 1️⃣ Admin Panel Route
    # This allows access to Django's built-in admin panel at "/admin/"
    path('admin/', admin.site.urls),  

    # 2️⃣ Sentiment Analysis API Routes
    # This includes all routes from the "sentiment_analysis" app's urls.py file.
    # Example: If "sentiment_analysis.urls" contains a path "analyze/", then
    # visiting "http://127.0.0.1:8000/api/analyze/" will call that view.
    path('api/', include('sentiment_analysis.urls')),  

    # 3️⃣ User Management API Routes
    # This includes all routes from the "users" app's urls.py file.
    # Example: If "users.urls" contains a path "register/", then
    # visiting "http://127.0.0.1:8000/api/users/register/" will call that view.
    path("api/users/", include("users.urls")),
]
