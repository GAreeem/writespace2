import { Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PaperMenu = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Paper
        elevation={24}
        onClick={() => navigate("/crear-documento")}
        sx={{
          m: 1,
          width: 140,
          height: 180,
          transition: "transform 0.3s ease, border 0.3s ease",
          border: "2px solid transparent",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          borderRadius: "10px",
          "&:hover": { transform: "scale(1.05)", border: "3px solid rgb(0, 255, 238)" },
        }}
      >
        <img
          src="https://media.istockphoto.com/id/1410274260/es/vector/adem%C3%A1s-del-icono-de-interfaz-de-usuario-lineal-de-degradado-perfecto-de-p%C3%ADxeles.jpg?s=612x612&w=0&k=20&c=ZGaAG7n8MuOhhHNyMQ3JeeYHsLsg0w9YyzKiu42fFPk="
          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }}
        />
      </Paper>
    </Box>
  );
};

export default PaperMenu;
