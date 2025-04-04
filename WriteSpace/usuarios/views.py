from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework import status
from .models import Usuario
from .serializers import UsuarioSerializer

class RegistroView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            usuario = serializer.save()  # Guarda el usuario en la DB
            refresh = RefreshToken.for_user(usuario)  # Crea los tokens
            # Retorna el ID del usuario junto con los tokens
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user_id": usuario.id  # ID del usuario
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response({"detail": "Correo y contraseña son requeridos"}, status=status.HTTP_400_BAD_REQUEST)

        # Intentar autenticar utilizando el email como nombre de usuario
        user = authenticate(request, username=email, password=password)

        if user is not None:
            # Si la autenticación es exitosa, generar los tokens
            refresh = RefreshToken.for_user(user)
            # Retorna el ID del usuario junto con los tokens
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user_id": user.id  # ID del usuario
            }, status=status.HTTP_200_OK)
        else:
            # Si las credenciales son incorrectas, devolver error 401
            return Response({"detail": "Credenciales incorrectas"}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()  # Blacklist el token para invalidarlo
            return Response({"message": "Sesión cerrada correctamente"}, status=status.HTTP_200_OK)
        except Exception:
            return Response({"error": "Token inválido"}, status=status.HTTP_400_BAD_REQUEST)
