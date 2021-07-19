from rest_framework import serializers
from .models import Profile
from .models import User

from rest_auth.registration.serializers import RegisterSerializer
from phonenumber_field.serializerfields import PhoneNumberField

from django.contrib.auth import get_user_model

from rest_auth.models import TokenModel

from . import models

user = get_user_model()


# https://stackoverflow.com/questions/36910373/django-rest-auth-allauth-registration-with-email-first-and-last-name-and-witho
# https://stackoverflow.com/questions/57496154/how-to-add-extra-fields-to-registration-end-point-of-rest-auth
class RegistrationSerializer(RegisterSerializer):
    phone_number = PhoneNumberField()

    # This method is called at save
    def custom_signup(self, request, user):
        user.phone_number = self.validated_data.get('phone_number', '')
        user.save(update_fields=['phone_number',])


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'phone_number','is_staff','is_volunteer')

class TokenSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = TokenModel
        fields = ('key', 'user',)
