import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import Pagina from "../components/Pagina";
import ControlesPaginas from "../components/ControlesPaginas";
import "../styles/CrearDocumento.css";

const CrearDocumento = () => {
  const [titulo, setTitulo] = useState("");
  const [paginas, setPaginas] = useState([{ id: 1 }]);
  const [paginaActual, setPaginaActual] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const paginaActualElement = document.getElementById(`pagina-${paginaActual}`);
    if (paginaActualElement) {
      paginaActualElement.focus();
    }
  }, [paginaActual]);

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
      return navigate("/");
    }

    const contenido = paginas
      .map((_, index) => {
        const paginaElement = document.getElementById(`pagina-${index}`);
        return paginaElement?.innerHTML || "";
      })
      .join("----PAGINA_SEPARADOR----");

    const documento = { titulo, contenido };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/documentos/documentos/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(documento),
      });

      if (response.ok) {
        Swal.fire("Éxito", "Documento creado correctamente", "success");
        navigate("/menu");
      } else {
        const data = await response.json();
        Swal.fire("Error", data.detail || "No se pudo crear el documento", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Hubo un problema con el servidor", "error");
    }
  };

  return (
    <div className="container mt-4">
      {/* Pasar las funciones de formato al Navbar */}
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
          Guardar Documento
        </button>
      </form>
    </div>
  );
};

export default CrearDocumento;