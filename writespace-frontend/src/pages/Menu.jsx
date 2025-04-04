import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DescriptionIcon from "@mui/icons-material/Description";
import Box from "@mui/material/Box";
import { motion } from "framer-motion";
import PaperMenu from "../components/PaperMenu";
import CardMenu from "../components/CardMenu";

const Menu = () => {
  const [documents, setDocuments] = useState([]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDocuments(page);
  }, [page]); // Se ejecuta cuando cambia la página

  const fetchDocuments = async (pageNumber) => {
    const token = localStorage.getItem("access");

    if (!token) {
      Swal.fire("Error", "No estás autenticado", "error");
      navigate("/");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `http://127.0.0.1:8000/api/documentos/documentos/?page=${pageNumber}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (Array.isArray(data.results)) {
          setDocuments((prevDocs) => [...prevDocs, ...data.results]); // Concatenar nuevos documentos
        } else {
          Swal.fire("Error", "No se encontraron documentos", "error");
        }
      }
    } catch (error) {
      Swal.fire("Error", "Hubo un problema con el servidor", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1); // Cargar siguiente página
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("access");

    if (!token) {
      Swal.fire("Error", "No estás autenticado", "error");
      navigate("/");
      return;
    }

    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás recuperar este documento después de eliminarlo.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `http://127.0.0.1:8000/api/documentos/documentos/${id}/`,
            {
              method: "DELETE",
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (response.ok) {
            Swal.fire(
              "Eliminado",
              "El documento ha sido eliminado.",
              "success"
            );
            setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== id));
          } else {
            Swal.fire("Error", "No se pudo eliminar el documento", "error");
          }
        } catch (error) {
          Swal.fire("Error", "Hubo un problema con el servidor", "error");
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]); // Se actualiza cuando cambia `loading`

  const handleLogout = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Tu sesión se cerrará y tendrás que volver a iniciar sesión.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate("/");
        Swal.fire(
          "Sesión cerrada",
          "Has cerrado sesión exitosamente.",
          "success"
        );
      }
    });
  };

  return (
    <div style={{ backgroundColor: "#0d1117", minHeight: "100vh" }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
        exit={{ opacity: 0, y: -50, transition: { duration: 0.8 } }}
        className="page"
      >
        {/* Navbar */}
        <nav
          className="navbar navbar-expand-lg navbar-light"
          style={{ backgroundColor: "#0d1117", margin: "0" }}
        >
          <div className="container">
            <a className="navbar-brand" style={{ color: "white" }}>
              <DescriptionIcon
                color="primary"
                fontSize="large"
                style={{ marginRight: "10px" }}
              />
              Write Space
            </a>
            <button className="btn btn-outline-light" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        </nav>

        {/* Crear nuevo documento */}
        <div style={{ backgroundColor: "#10131b" }}>
          <div className="container" style={{ textAlign: "center" }}>
            <h5 style={{ color: "white" }}>Crear Documento</h5>
            <PaperMenu />
          </div>
        </div>

        {/* Documentos */}
        <div className="container">
          <h3 style={{ color: "white" }}>Tus Documentos</h3>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "left",
              gap: 2,
              mt: 2,
            }}
          >
            {documents.length > 0 ? (
              documents.map((doc, index) => (
                <CardMenu
                  key={doc.id}
                  doc={doc}
                  onDelete={handleDelete}
                  onEdit={(id) => navigate(`/edit-doc/${id}`)}
                />
              ))
            ) : (
              <p style={{ color: "white" }}>
                No tienes documentos disponibles.
              </p>
            )}
          </Box>
        </div>
      </motion.div>
    </div>
  );
};

export default Menu;
