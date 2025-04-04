import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Card from "@mui/material/Card";
import Input from '@mui/material/Input';
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";

const Registro = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/usuarios/registro/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        Swal.fire("Éxito", "Registro exitoso, ahora inicia sesión", "success");
        navigate("/"); // Redirigir al login después del registro
      } else {
        Swal.fire("Error", data.detail || "Hubo un problema con el registro", "error");
      }
    } catch (error) {
      Swal.fire("Error", "No se pudo conectar con el servidor", "error");
    }
  };

  return ( 
    <div style={{ minHeight: "100vh", justifyContent: 'center', alignItems: 'center', display: 'flex', backgroundColor: "#0d1117" }}>
      <Card
        sx={{
          maxWidth: '448px',
          width: "100%",
          backgroundColor: "#151b23",
          color: "white",
          padding: "16px",
          borderRadius: "8px",
          alignContent: "center",
          justifyContent: "center",
          border: "1px solid #3d444d",
        }}
      >
        <CardHeader
          title={
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: "bold",
                background: "linear-gradient(to right,rgb(145, 147, 255), #4493f8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Write Space
            </Typography>
          }
        />
        <CardContent>
          <Typography variant="h4" sx={{ color: 'while', fontWeight: 'bold' }}>
            Crear cuenta
          </Typography>
          <Typography variant="body2" sx={{ color: "#B0B0B0", marginBottom: "16px" }}>
            Ingrese sus credenciales para crear una cuenta
          </Typography>
          <form style={{ display: "flex", flexDirection: "column", gap: "16px" }} onSubmit={handleRegistro}>
          <div>
              <label style={{ color: "#e5e7eb" }}>
                Nombre de usuario
              </label>
              <Input
                type="text"
                placeholder="Ingresa tu usuario"
                sx={{
                  width: "100%",
                  color: "white",
                  padding: "8px",
                  borderRadius: "4px",
                  marginTop: "4px",
                  paddingRight: "40px",
                  backgroundColor: "#151b23",
                  "&:before": {
                    borderBottom: "2px solid white",
                  },
                  "&:hover:not(.Mui-disabled):before": {
                    borderBottom: "2px solid #4493f8",
                  },
                  "&.Mui-focused:after": {
                    borderBottom: "2px solid rgb(68, 60, 243)",
                  },
                }}
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" style={{ color: "#e5e7eb" }}>
                Correo electrónico
              </label>
              <Input
                type="email"
                placeholder="Ingresa tu correo electrónico"
                sx={{
                  width: "100%",
                  color: "white",
                  padding: "8px",
                  borderRadius: "4px",
                  marginTop: "4px",
                  paddingRight: "40px",
                  backgroundColor: "#151b23",
                  "&:before": { 
                    borderBottom: "2px solid white",
                  },
                  "&:hover:not(.Mui-disabled):before": {
                    borderBottom: "2px solid #4493f8",
                  },
                  "&.Mui-focused:after": {
                    borderBottom: "2px solid rgb(68, 60, 243)",
                  },
                }}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" style={{ color: "#e5e7eb" }}>
                Contraseña
              </label>
              <div style={{ position: "relative" }}>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  sx={{
                    width: "100%",
                    color: "white",
                    padding: "8px",
                    borderRadius: "4px",
                    marginTop: "4px",
                    paddingRight: "40px",
                    backgroundColor: "#151b23",
                    "&:before": {
                      borderBottom: "2px solid white",
                    },
                    "&:hover:not(.Mui-disabled):before": {
                      borderBottom: "2px solid #4493f8",
                    },
                    "&.Mui-focused:after": {
                      borderBottom: "2px solid rgb(68, 60, 243)",
                    },
                  }}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  onClick={() => setShowPassword(!showPassword)}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    right: "8px",
                    transform: "translateY(-50%)",
                    minWidth: "auto",
                    padding: "4px",
                    color: "#B0B0B0",
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </Button>
              </div>
            </div>
            <Button
              type="submit"
              sx={{
                width: "100%",
                background: "linear-gradient(to right, rgb(145, 147, 255), #4493f8)",
                color: "#1C1C1C",
                fontWeight: "bold",
                padding: "10px",
                "&:hover": {
                  background: "linear-gradient(to right, rgb(145, 137, 245),rgb(68, 137, 238))",
                },
              }}
            >
              Registrarse
            </Button>
          </form>
          <div className="text-center mt-3">
          <button
            className="btn btn-link" style={{color:'white'}}
            onClick={() => navigate("/")}
          >
            ¿Ya tienes cuenta? Inicia sesión
          </button>
        </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Registro;
