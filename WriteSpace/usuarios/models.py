from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class Usuario(AbstractUser):
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    # Definir los grupos y permisos con un related_name único para evitar conflictos
    groups = models.ManyToManyField(
        Group,
        related_name="usuario_set",  # Cambiar el nombre de la relación inversa para evitar conflicto
        blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="usuario_permissions_set",  # Cambiar el nombre de la relación inversa para evitar conflicto
        blank=True
    )

    def __str__(self):
        return self.email
