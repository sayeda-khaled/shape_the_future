# Generated by Django 3.2.5 on 2021-07-19 15:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0010_auto_20210716_2232'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='student',
            name='primary_contact',
        ),
        migrations.DeleteModel(
            name='Parent',
        ),
    ]
