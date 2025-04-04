import { Card, CardContent, CardMedia, Typography, CardActions, Button } from "@mui/material";
import { motion } from "framer-motion";

const CardMenu = ({ doc, onDelete, onEdit }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        sx={{
          backgroundColor: "#95a8c1",
          cursor: "pointer",
          borderRadius: "10px",
          transition: "transform 0.1s ease, border 0.3s ease",
          "&:hover": { transform: "scale(1.05)", border: "3px solid #fff" },
        }}
      >
        <CardMedia
          component="img"
          height="100"
          image="https://www.gstatic.com/classroom/themes/img_backtoschool.jpg"
          onClick={() => onEdit(doc.id)}
          sx={{ width: 190, height: 150 }}
        />
        <CardContent sx={{ height: 60 }}>
          <Typography variant="h6">{doc.titulo}</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Creado el {new Date(doc.creado_en).toLocaleDateString("es-ES")}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="error" onClick={() => onDelete(doc.id)}>
            Eliminar
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default CardMenu;