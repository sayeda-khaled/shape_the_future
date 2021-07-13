from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User, Profile

# UserAdmin.list_display += ('phone_number',) # https://docs.djangoproject.com/en/3.2/ref/contrib/admin/#django.contrib.admin.ModelAdmin.list_display
# UserAdmin.list_filter += ('phone_number',) # https://docs.djangoproject.com/en/3.2/ref/contrib/admin/#django.contrib.admin.ModelAdmin.list_filter
UserAdmin.fieldsets += ( # https://docs.djangoproject.com/en/3.2/ref/contrib/admin/#django.contrib.admin.ModelAdmin.fieldsets
    (None, {'fields': ('phone_number',)}),
)

admin.site.register(User, UserAdmin)
admin.site.register(Profile)
