from rest_framework import serializers
from .models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Usuario
        fields = ["id", "username", "email", "password"]

    def create(self, validated_data):
        usuario = Usuario(
            username=validated_data["username"],
            email=validated_data["email"],
        )
        usuario.set_password(validated_data["password"])  # Encripta la contraseña
        usuario.save()
        return usuario
