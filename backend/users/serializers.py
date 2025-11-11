# backend/users/serializers.py
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.core.validators import EmailValidator

# Serializer for user registration
class RegisterSerializer(serializers.ModelSerializer):
    # username field validator using DRF
    username = serializers.CharField(
        required=True,
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message="Username is already taken."
            )
        ]
    )

    # email field validator using DRF
    email = serializers.EmailField(
        required=True,
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message="Email is already registered."
            ),
            EmailValidator(message="Enter a valid email address.")
        ]
    )

    password = serializers.CharField(write_only=True, required=True)

    
    # Setup DRF Meta class
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password')


    def validate_password(self, value):
        ''' Validate the password using Django's password validation. '''
        validate_password(value, user=User(**self.initial_data))
        return value


    def validate_first_name(self, value):
        ''' Validate that the first name is not empty. '''
        value = value.strip() # Remove leading/trailing whitespace

        if not value:
            raise serializers.ValidationError("First name is required.")
        return value
    

    def validate_last_name(self, value):
        ''' Strip whitespace from last name. '''
        value = value.strip()
        return value


    def create(self, validated_data):
        ''' Create a new user with the validated data. '''

        # Password should be hashed when using create_user method
        user = User.objects.create_user(**validated_data)
        return user


# Serializer for user details
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "first_name", "last_name")