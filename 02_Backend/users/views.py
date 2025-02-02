from django.contrib.auth import authenticate, login, logout, get_user_model
from django.http import JsonResponse
from django.views import View
import json
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.utils.crypto import get_random_string
from django.urls import reverse

User = get_user_model()

@method_decorator(csrf_exempt, name='dispatch')
class LoginView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            email = data.get("email").strip().lower()  # Convert to lowercase
            password = data.get("password")

            print(f"🔍 Received login request for email: {email}")  # Debugging

            # Find the user (case-insensitive)
            user = User.objects.filter(email__iexact=email).first()
            if user:
                print(f"✅ Found user: {user.username}")  # Debugging
                print(f"🔑 Checking password for user {user.username}")  # Debugging

                if user.check_password(password):
                    print("✅ Password is correct!")  # Debugging
                else:
                    print("❌ Password is incorrect!")  # Debugging

                user = authenticate(request, username=user.username, password=password)

                if user:
                    print(f"✅ Authentication successful for {user.username}")  # Debugging
                    login(request, user)
                    return JsonResponse({"username": user.username})

                print("❌ Authentication failed!")  # Debugging

            return JsonResponse({"error": "Invalid credentials"}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)


class LogoutView(View):
    def post(self, request):
        logout(request)
        return JsonResponse({"message": "Logged out successfully"})
    
# Temporary dictionary to store activation tokens
pending_activations = {}

@method_decorator(csrf_exempt, name='dispatch')
class RegisterView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            username = data.get("username")
            email = data.get("email").strip().lower()  # Normalize email
            password = data.get("password")

            # Check if email is already in use (case-insensitive)
            if User.objects.filter(email__iexact=email).exists():
                return JsonResponse({"error": "Email already in use"}, status=400)

            # Check if username is already taken
            if User.objects.filter(username=username).exists():
                return JsonResponse({"error": "Username already exists"}, status=400)

            # Create user with `is_active=False` (requires email confirmation)
            user = User.objects.create_user(username=username, email=email, password=password, is_active=False)

            # Generate activation token
            activation_token = get_random_string(32)
            pending_activations[activation_token] = user.email  # Store token temporarily

            # Create the activation link
            activation_link = f"http://127.0.0.1:8000/api/users/activate/{activation_token}/"

            # Send activation email
            send_mail(
                "Confirm Your Email - Movie Sentiment App",
                f"Hello {username},\n\nClick the link below to activate your account:\n{activation_link}\n\nThank you!",
                "no-reply@moviesentimentapp.com",  # Change this to your email sender
                [email],
                fail_silently=False,
            )

            return JsonResponse({"message": "Signup successful! Check your email to confirm your account."})

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
        
@csrf_exempt
def activate_account(request, token):
    print(f"🔍 Activation attempted with token: {token}")  # Debugging

    if request.method == "GET":
        email = pending_activations.get(token)
        print(f"🔎 Retrieved email from token: {email}")  # Debugging

        if not email:
            print("❌ Invalid token!")
            return JsonResponse({"error": "Invalid activation token"}, status=400)

        user = User.objects.filter(email=email).first()
        if user:
            print(f"✅ Activating user: {user.username}")
            user.is_active = True
            user.save()
            del pending_activations[token]
            return JsonResponse({"message": "Account activated successfully! You can now log in."})

        print("❌ User not found!")
        return JsonResponse({"error": "User not found"}, status=404)




@csrf_exempt
def get_user(request):
    print("get_user() called")  # Debugging
    if request.user.is_authenticated:
        return JsonResponse({"username": request.user.username})
    return JsonResponse({"error": "Not authenticated"}, status=401)
