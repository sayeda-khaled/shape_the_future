from django.conf import settings
from django.contrib.auth.models import AbstractUser #a models that is preexisting in django and we are going to inherit from that model
from django.db import models

class User(AbstractUser):
    pass

class Profile(models.Model):
    user= models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    avatar = models.ImageField(upload_to='profiles/', blank=True)
    display_name = models.CharField(max_length=255, null=True)



    def __str__(self):
        return self.display_name
