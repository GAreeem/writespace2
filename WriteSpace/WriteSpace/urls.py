from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/usuarios/', include('usuarios.urls')),
    path('api/documentos/', include('documentos.urls')),
    #path('api/colaboracion/', include('colaboracion.urls')),  
]
