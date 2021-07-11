# Generated by Django 3.2.5 on 2021-07-11 13:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0008_alter_event_time_of_event'),
    ]

    operations = [
        migrations.RenameField(
            model_name='event',
            old_name='time_of_event',
            new_name='end_of_event',
        ),
        migrations.RemoveField(
            model_name='event',
            name='duration',
        ),
        migrations.AddField(
            model_name='event',
            name='start_of_event',
            field=models.TimeField(blank=True, null=True),
        ),
    ]
