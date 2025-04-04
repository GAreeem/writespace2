# documentos/urls.py
from django.urls import path
from .views import DocumentoListCreateView, DocumentoRetrieveUpdateDeleteView

urlpatterns = [
    path('documentos/', DocumentoListCreateView.as_view(), name='documento-list-create'),
    path('documentos/<int:pk>/', DocumentoRetrieveUpdateDeleteView.as_view(), name='documento-retrieve-update-delete'),
]
