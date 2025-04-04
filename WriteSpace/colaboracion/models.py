from django.db import models
from django.conf import settings
from documentos.models import Documento

class CompartirDocumento(models.Model):
    documento = models.ForeignKey(Documento, on_delete=models.CASCADE)
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="colaboradores")
    puede_editar = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.usuario.email} - {self.documento.titulo}"
