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
    # primary_contact = models.CharField(max_length=255)
    primary_contact = models.ForeignKey(Parent,on_delete=models.CASCADE, blank=True, null=True)
    grade = models.IntegerField()
    active = models.BooleanField(default=True)

    # event = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE, blank=True, null=True)
    # event = models.ForeignKey(Event, on_delete=models.CASCADE)
    # event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="memo")


    def __str__(self):
        return "%s %s" % (self.first_name, self.last_name, self.primary_contact)
