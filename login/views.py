# from django.http import JsonResponse
# from django.views.decorators.http import require_http_methods
# from django.contrib.auth import get_user_model ,authenticate, login
# from django.contrib.auth.forms import UserCreationForm
# import json

# User = get_user_model()

# @require_http_methods(["POST"])
# def register(request):
#     data = json.loads(request.body)
#     form = UserCreationForm(data)
#     if form.is_valid():
#         user = form.save()
#         login(request, user)  # Log the user in right after registration
#         return JsonResponse({
#             'success': True,
#             'response': 'User registered and logged in successfully',
#             'error': None
#         }, status=201)
#     else:
#         errors = {field: error[0] for field, error in form.errors.items()}
#         return JsonResponse({
#             'success': False,
#             'response': None,
#             'error': {
#                 'status': '400',
#                 'code': '1001',
#                 'message': errors
#             }
#         }, status=400)
        
# @require_http_methods(["POST"])
# def user_login(request):
#     data = json.loads(request.body)
#     username = data.get('username')
#     password = data.get('password')
#     user = authenticate(username=username, password=password)
#     if user is not None:
#         login(request, user)
#         return JsonResponse({
#             'success': True,
#             'response': 'User logged in successfully',
#             'error': None
#         }, status=200)
#     else:
#         return JsonResponse({
#             'success': False,
#             'response': None,
#             'error': {
#                 'status': '401',
#                 'code': '1002',
#                 'message': 'Invalid credentials'
#             }
#         }, status=401)

from django.shortcuts import render, redirect
from django.contrib.auth import login as auth_login
from .forms import UserRegistrationForm
from django.contrib.auth import authenticate, login as auth_login
from django.conf import settings
import random
import json
import logging
from django.http import JsonResponse
from django.core.mail import send_mail
from django.views.decorators.http import require_http_methods, require_POST, require_GET
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
from .models import User
from cryptography.fernet import Fernet
from django.conf import settings


logger = logging.getLogger(__name__)

def signup(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            auth_login(request, user)  # Optionally log the user in immediately after registration
            return redirect('index')  # Redirect to a main or profile page
        else:
            logger.debug(form.errors)  # Log form errors for debugging
            return render(request, 'signup.html', {'form': form})
    else:
        form = UserRegistrationForm()
        return render(request, 'signup.html', {'form': form})

@require_GET
def check_username(request):
    username = request.GET.get('username', None)
    if username is None:
        return JsonResponse({'error': 'Username parameter is missing'}, status=400)
    
    is_taken = User.objects.filter(username=username).exists()
    return JsonResponse({'is_taken': is_taken})


def login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        try:
            user = User.objects.get(email=email)
            logger.debug(f"User found with email: {email}. Username: {user.username}")
            user = authenticate(request, email=email, password=password)
            if user is not None:
                auth_login(request, user)
                logger.debug(f"User {user.email} authenticated successfully.")
                return redirect('/')  # Redirect to home or another appropriate page
            else:
                logger.debug(f"Authentication failed for email {email}. Invalid email or password.")
                return render(request, 'login.html', {'error': 'Invalid email or password'})
        except User.DoesNotExist:
            logger.debug(f"Authentication failed. No user found with email: {email}.")
            return render(request, 'login.html', {'error': 'Invalid email or password'})
    return render(request, 'login.html')

@csrf_exempt
@require_http_methods(["POST"])
def send_verification_email(request):
    try:
        data = json.loads(request.body)
        email = data['email']

        # Check if the email is already registered
        if User.objects.filter(email=email).exists():
            return JsonResponse({'message': 'This email is already in use.'}, status=400)

        verification_code = random.randint(1000, 9999)  # Generate a random 4-digit number
        send_mail(
            'Your Verification Code',
            f'Your verification code is {verification_code}',
            settings.DEFAULT_FROM_EMAIL,
            [email],
            fail_silently=False,
        )
        request.session['verification_code'] = str(verification_code)  # Store code in session
        return JsonResponse({'message': 'Verification code sent!'})
    except Exception as e:
        logger.error(f"Error sending verification email: {e}")
        return JsonResponse({'message': 'An error occurred while sending the verification code.'}, status=500)
