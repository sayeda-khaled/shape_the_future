from rest_framework import permissions

# class IsAuthOrReadOnly(permissions.BasePermission):
#
#     def has_object_permission(self, request, view, obj):
#         # if request.method in permissions.SAFE_METHODS:
#         #     return True
#         #
#         # if request.method == 'DELETE':
#         #     return obj.user == request.user
#
#         # if request.method == 'PUT':
#         return obj.user == request.user

class UserPermissions(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user
