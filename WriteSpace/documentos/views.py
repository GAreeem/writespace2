# documentos/views.py
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from .models import Documento
from .serializers import DocumentoSerializer

# Paginador para evitar respuestas muy grandes
class DocumentoPagination(PageNumberPagination):
    page_size = 12  # Cantidad de documentos por página
    page_size_query_param = 'page_size'
    max_page_size = 50  # Límite máximo por página

class DocumentoListCreateView(generics.ListCreateAPIView):
    serializer_class = DocumentoSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = DocumentoPagination  # Habilitar paginación

    def get_queryset(self):
        # Filtra los documentos por el usuario autenticado
        user = self.request.user
        return Documento.objects.filter(usuario=user)

    def perform_create(self, serializer):
        # Asigna el usuario autenticado al crear el documento
        serializer.save(usuario=self.request.user)

class DocumentoRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = DocumentoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filtra los documentos por el usuario autenticado
        return Documento.objects.filter(usuario=self.request.user)
