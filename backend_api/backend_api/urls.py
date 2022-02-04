from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    # check endpoints here https://dj-rest-auth.readthedocs.io/en/latest/api_endpoints.html
    path('auth/', include('dj_rest_auth.urls')), #Authentication
    path('auth/registration/', include('dj_rest_auth.registration.urls')), #Registration
]
