from django.db import models

from django.conf import settings

from events.models import Event


class Student(models.Model):
    first_name=  models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    student_id =  models.IntegerField()
    primary_contact = models.CharField(max_length=255)
    grade = models.IntegerField()
    active = models.BooleanField(default=True)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="student", blank=True, null=True)

    # event = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE, blank=True, null=True)
    # event = models.ForeignKey(Event, on_delete=models.CASCADE)
    # event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="memo")



    def __str__(self):
        return self.first_name
