from django.db import models

from django.conf import settings


class Student(models.Model):
    first_name=  models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    student_id =  models.IntegerField()
    primanry_contact = models.CharField(max_length=255)
    grade = models.IntegerField()



    def __str__(self):
        return self.first_name
