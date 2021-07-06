from django.db import models

from django.conf import settings


# class Student(models.Model):
#     name = models.CharField(max_length=128)
#
#     def __str__(self):
#         return self.name


class Event(models.Model):
    grade = models.IntegerField()
    date_of_event =  models.DateTimeField(auto_now=False)
    date_created = models.DateTimeField(auto_now=True)
    volunteer = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,)

    def __str__(self):
        return self.volunteer
