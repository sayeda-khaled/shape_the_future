# Generated by Django 3.2.5 on 2021-07-16 21:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0006_student'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='student',
            name='primary_contact',
        ),
    ]