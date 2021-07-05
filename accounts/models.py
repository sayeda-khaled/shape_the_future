from django.conf import settings
from django.contrib.auth.models import AbstractUser #a models that is preexisting in django and we are going to inherit from that model
from django.db import models

class User(AbstractUser):
    pass

class Profile(models.Model):
    pass
