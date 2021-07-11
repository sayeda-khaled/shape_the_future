from rest_framework import permissions

class IsAuthOrReadOnly(permissions.BasePermission): # the IsAuthOrReadOnly is the name you create, doesn't mattar what oyu choose..

    def has_object_permission(self, request, view, obj): #has_object_permission has to be stated this way..
        if request.method in permissions.SAFE_METHODS: # safe method is the get
            return True

        if request.method == 'DELETE':
            return obj.volunteer == request.user or request.user.is_staff # return True if user is the author or user is staff
        if request.method == 'PUT':
            return obj.volunteer == request.user or request.user.is_staff # return True if user is the author or user is staff

class AdminPermissions(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        if request.method == 'DELETE':
            return obj.user.is_staff == request.user.is_staff
        # if request.method == 'PUT':
        return obj.user.is_staff == request.user.is_staff
