# Generated by Django 3.2.5 on 2021-07-19 14:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_alter_user_phone_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_volunteer',
            field=models.BooleanField(default=False),
        ),
    ]