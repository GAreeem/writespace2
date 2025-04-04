import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import Pagina from "../components/Pagina";
import ControlesPaginas from "../components/ControlesPaginas";
import "../styles/CrearDocumento.css";

const EditarDocumento = () => {
  const [titulo, setTitulo] = useState("");
  const [paginas, setPaginas] = useState([{ id: 1 }]);
  const [paginaActual, setPaginaActual] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();  // Usamos useParams para obtener el ID del documento

  useEffect(() => {
    const fetchDocumento = async () => {
      const token = localStorage.getItem("access");
      if (!token) {
        Swal.fire("Error", "No estás autenticado", "error");
        return navigate("/"); // Redirigir al login si no hay token
      }

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/documentos/documentos/${id}/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.ok) {
          setTitulo(data.titulo); // Asignamos el título del documento
          const contenidoPaginas = data.contenido.split("----PAGINA_SEPARADOR----"); // Dividimos el contenido en páginas
          setPaginas(contenidoPaginas.map((_, index) => ({ id: index + 1 })));
          contenidoPaginas.forEach((contenido, index) => {
            const paginaElement = document.getElementById(`pagina-${index}`);
            if (paginaElement) {
              paginaElement.innerHTML = contenido; // Cargar el contenido en la página correspondiente
            }
          });
        } else {
          Swal.fire("Error", data.detail || "No se pudo obtener el documento", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Hubo un problema con el servidor", "error");
      }
    };

    fetchDocumento();
  }, [id, navigate]);

  const irPaginaAnterior = () => {
    if (paginaActual > 0) setPaginaActual(paginaActual - 1);
  };

  const irPaginaSiguiente = () => {
    if (paginaActual < paginas.length - 1) setPaginaActual(paginaActual + 1);
  };

  const agregarPagina = () => {
    const nuevaPagina = { id: paginas.length + 1 };
    setPaginas([...paginas, nuevaPagina]);
    setPaginaActual(paginas.length);
  };

  const eliminarPagina = () => {
    if (paginas.length > 1) {
      const nuevasPaginas = paginas.filter((_, index) => index !== paginaActual);
      setPaginas(nuevasPaginas);
      setPaginaActual(Math.max(0, paginaActual - 1));
    }
  };

  // Funciones para el EditorToolbar
  const handleFontChange = (e) => {
    document.execCommand("fontName", false, e.target.value);
  };

  const handleSizeChange = (e) => {
    document.execCommand("fontSize", false, e.target.value);
  };

  const handleTextColorChange = (e) => {
    document.execCommand("foreColor", false, e.target.value);
  };

  const handleBgColorChange = (e) => {
    document.execCommand("hiliteColor", false, e.target.value);
  };

  const handleLineHeightChange = (e) => {
    const lineHeight = e.target.value;
    document.execCommand("lineHeight", false, lineHeight);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access");
    if (!token) {
      Swal.fire("Error", "No estás autenticado", "error");
      return navigate("/"); // Redirigir al login si no hay token
    }

    const contenido = paginas
      .map((_, index) => {
        const paginaElement = document.getElementById(`pagina-${index}`);
        return paginaElement?.innerHTML || "";
      })
      .join("----PAGINA_SEPARADOR----");

    const documento = { titulo, contenido };

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/documentos/documentos/${id}/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(documento),
      });

      if (response.ok) {
        Swal.fire("Éxito", "Documento actualizado correctamente", "success");
        navigate("/menu");
      } else {
        const data = await response.json();
        Swal.fire("Error", data.detail || "No se pudo actualizar el documento", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Hubo un problema con el servidor", "error");
    }
  };

  return (
    <div className="container mt-4">
      <Navbar
        titulo={titulo}
        setTitulo={setTitulo}
        handleFontChange={handleFontChange}
        handleSizeChange={handleSizeChange}
        handleTextColorChange={handleTextColorChange}
        handleBgColorChange={handleBgColorChange}
        handleLineHeightChange={handleLineHeightChange}
      />

      <form onSubmit={handleSubmit} className="form">
        <div className="document-container">
          {paginas.map((pagina, index) => (
            <Pagina key={pagina.id} id={index} isActive={index === paginaActual} />
          ))}
        </div>

        <ControlesPaginas
          paginaActual={paginaActual}
          paginas={paginas}
          irPaginaAnterior={irPaginaAnterior}
          irPaginaSiguiente={irPaginaSiguiente}
          agregarPagina={agregarPagina}
          eliminarPagina={eliminarPagina}
        />

        <button type="submit" className="btn btn-primary submit-button">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditarDocumento;