import os
from datetime import datetime, timedelta, time, date
from celery import Celery
from celery.schedules import crontab
from twilio.rest import Client
# user.phone_number= True,
 # to='+18645185262'
from .models import Event

app = Celery()

@app.task
def send_notifications():
    account_sid = os.environ['TWILIO_ACCOUNT_SID']
    auth_token = os.environ['TWILIO_AUTH_TOKEN']
    client = Client(account_sid, auth_token)

    tomorrow = datetime.today() + timedelta(days=1)
    events = Event.objects.filter(
                                date_of_event__year=tomorrow.year,
                                date_of_event__month=tomorrow.month,
                                date_of_event__day=tomorrow.day,)


    # print(events)

    for event in events:
        if event.volunteer:
            phone = str(event.volunteer.phone_number.country_code) + str(event.volunteer.phone_number.national_number)
            message = client.messages \
                            .create(
                                 from_='+16615284031',
                                 body=f"Thank you for volunteering. Your session is scheduled tomorrow at {event.start_of_event}",
                                 to='+' + str(phone),
                             )

            print(message.sid)



# @app.on_after_configure.connect
# def setup_periodic_tasks(sender, **kwargs):
#     # Calls test('hello') every 10 seconds.
#     # sender.add_periodic_task(10.0, test.s('hello'), name='add every 10')
#
#     # Calls test('world') every 30 seconds
#     sender.add_periodic_task(30.0, test.s('world'), expires=10)
#
#     # # Executes every Monday morning at 7:30 a.m.
#     # sender.add_periodic_task(
#     #     crontab(hour=7, minute=30, day_of_week=1),
#     #     test.s('Happy Mondays!'),
#     )

@app.task
def test(arg):
    print(arg)

@app.task
def add():
    print(message.sid)
