import os

from celery import Celery
# from celery.schedules import crontab

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'conf.settings')

app = Celery('conf')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django apps.
app.autodiscover_tasks()


@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')


# app.conf.beat_schedule = {
#     'add-every-10-seconds': {
#         'task': 'events.tasks.send_notifications',
#         'schedule': 10.0,
#     },
# }
#
# app.conf.timezone = 'UTC'


app.conf.beat_schedule = {
    'add-every-day_of_week-at 9:00 a.m': {
        'task': 'events.tasks.send_notifications',
        'schedule': crontab(hour=9, minute=0, day_of_week='Mon-fri'),
    },
}
app.conf.timezone = 'UTC'
