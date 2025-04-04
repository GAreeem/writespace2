# documentos/serializers.py
from rest_framework import serializers
from .models import Documento

class DocumentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Documento
        fields = ['id', 'titulo', 'contenido', 'creado_en']  # No incluyas el campo 'usuario' aquí
