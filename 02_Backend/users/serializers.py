from rest_framework import serializers
from .models import User  # Use the custom User model
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User  # Reference the custom User model
        fields = ("id", "username", "email", "password", "first_name", "last_name")  # Include all necessary fields

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            first_name=validated_data.get("first_name", ""),  # Include extra fields
            last_name=validated_data.get("last_name", ""),
        )
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(username=data["username"], password=data["password"])
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid credentials")
    
class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    def validate(self, data):
        self.refresh_token = data["refresh"]
        return data

    def save(self, **kwargs):
        try:
            token = RefreshToken(self.refresh_token)
            token.blacklist()
        except Exception as e:
            raise serializers.ValidationError("Invalid refresh token")