from django.db import models

from django.conf import settings

class Parent(models.Model):
    parent_id= models.AutoField(primary_key=True)
    first_name=  models.CharField(max_length=255)
    last_name=  models.CharField(max_length=255)


    def __str__(self):
        return "%s %s" % (self.first_name, self.last_name)



class Student(models.Model):
    first_name=  models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    student_id =  models.IntegerField()
    primary_contact = models.ForeignKey(Parent,on_delete=models.CASCADE, blank=True, null=True)
    grade = models.IntegerField()
    active = models.BooleanField(default=True)



    def __str__(self):
        return "%s %s" % (self.first_name, self.last_name)
