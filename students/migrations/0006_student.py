# Generated by Django 3.2.5 on 2021-07-11 13:17

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('students', '0005_delete_student'),
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=255)),
                ('last_name', models.CharField(max_length=255)),
                ('student_id', models.IntegerField()),
                ('primary_contact', models.CharField(max_length=255)),
                ('grade', models.IntegerField()),
                ('active', models.BooleanField(default=True)),
            ],
        ),
    ]