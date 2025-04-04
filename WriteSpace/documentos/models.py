# documentos/models.py
from django.db import models
from django.conf import settings

class Documento(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    titulo = models.CharField(max_length=255)
    contenido = models.TextField()
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.titulo} - {self.usuario.email}"
        