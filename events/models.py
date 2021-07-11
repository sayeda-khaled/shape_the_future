# from django.db import models
#
# from django.conf import settings
#
# from students.models import Student
#
#
#
#
# class Event(models.Model):
#     grade = models.IntegerField()
#     date_of_event =  models.DateField(auto_now=False)
#     start_of_event = models.TimeField(auto_now=False, auto_now_add=False, null=True)
#     end_of_event = models.TimeField(auto_now=False, auto_now_add=False, null=True)
#     date_created = models.DateTimeField(auto_now=True)
#     volunteer = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE, blank=True, null=True)
#     student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="event", blank=True, null=True)
#     memo = models.TextField(blank = True)
    # def __str__(self):
    #     return self.volunteer


# class Memo(models.Model):
#     text = models.TextField()
#     event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="memo")
#     # text =
    # event = event
