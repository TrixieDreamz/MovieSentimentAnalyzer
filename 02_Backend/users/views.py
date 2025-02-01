from django.contrib.auth import authenticate, login, logout, get_user_model
from django.http import JsonResponse
from django.views import View
import json
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

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
    
class RegisterView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)  # Parse JSON from frontend
            username = data.get("username")
            email = data.get("email")
            password = data.get("password")

            if User.objects.filter(username=username).exists():
                return JsonResponse({"error": "Username already exists"}, status=400)

            if User.objects.filter(email=email).exists():
                return JsonResponse({"error": "Email already in use"}, status=400)

            user = User.objects.create_user(username=username, email=email, password=password)
            return JsonResponse({"message": "User registered successfully", "username": user.username})
        
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)

def get_user(request):
    print("get_user() called")  # Debugging
    if request.user.is_authenticated:
        return JsonResponse({"username": request.user.username})
    return JsonResponse({"error": "Not authenticated"}, status=401)
