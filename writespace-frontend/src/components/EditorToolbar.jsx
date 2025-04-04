import React, { useState } from "react";

const EditorToolbar = ({
  handleFontChange,
  handleSizeChange,
  handleTextColorChange,
  handleBgColorChange,
  handleLineHeightChange,
}) => {
  const [imageUrl, setImageUrl] = useState("");

  const toolbarStyle = {
    marginBottom: "10px",
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "center",
  };

  const buttonStyle = {
    padding: "8px 12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  };

  const selectStyle = {
    padding: "6px 10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#fff",
    cursor: "pointer",
  };

  const colorPickerStyle = {
    width: "30px",
    height: "30px",
    border: "none",
    cursor: "pointer",
  };

  const imageInputStyle = {
    padding: "6px 10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "150px",
  };

  const handleInsertImage = () => {
    if (imageUrl) {
      document.execCommand("insertImage", false, imageUrl);
      setImageUrl(""); // Limpiar el campo después de insertar
    } else {
      alert("Por favor, ingresa una URL válida.");
    }
  };

  return (
    <div style={toolbarStyle}>
      {/* Selector de fuente */}
      <select style={selectStyle} onChange={handleFontChange}>
        <option value="Arial">Arial</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Courier New">Courier New</option>
        <option value="Georgia">Georgia</option>
        <option value="Verdana">Verdana</option>
      </select>

      {/* Selector de tamaño de texto */}
      <select style={selectStyle} onChange={handleSizeChange}>
        <option value="1">Pequeño</option>
        <option value="2">Normal</option>
        <option value="3">Grande</option>
        <option value="4">Muy grande</option>
      </select>

      {/* Selector de interlineado */}
      <select style={selectStyle} onChange={handleLineHeightChange}>
        <option value="1">Interlineado: 1</option>
        <option value="1.5">Interlineado: 1.5</option>
        <option value="2">Interlineado: 2</option>
        <option value="2.5">Interlineado: 2.5</option>
      </select>

      {/* Selector de alineación de texto */}
      <select
        style={selectStyle}
        onChange={(e) => document.execCommand(e.target.value)}
      >
        <option value="justifyLeft">Alinear a la izquierda</option>
        <option value="justifyCenter">Alinear al centro</option>
        <option value="justifyRight">Alinear a la derecha</option>
        <option value="justifyFull">Justificar</option>
      </select>

      {/* Selector de color de texto */}
      <input
        type="color"
        style={colorPickerStyle}
        onChange={handleTextColorChange}
        title="Cambiar color de texto"
      />

      {/* Selector de color de fondo */}
      <input
        type="color"
        style={colorPickerStyle}
        onChange={handleBgColorChange}
        title="Cambiar color de fondo"
      />

      {/* Botones de formato de texto */}
      <button
        type="button"
        style={buttonStyle}
        onClick={() => document.execCommand("bold")}
        title="Negrita"
      >
        <i className="fa fa-bold"></i>
      </button>
      <button
        type="button"
        style={buttonStyle}
        onClick={() => document.execCommand("italic")}
        title="Cursiva"
      >
        <i className="fa fa-italic"></i>
      </button>
      <button
        type="button"
        style={buttonStyle}
        onClick={() => document.execCommand("underline")}
        title="Subrayado"
      >
        <i className="fa fa-underline"></i>
      </button>
      <button
        type="button"
        style={buttonStyle}
        onClick={() => document.execCommand("strikeThrough")}
        title="Tachado"
      >
        <i className="fa fa-strikethrough"></i>
      </button>

      {/* Inserción de imágenes */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <input
          type="text"
          placeholder="URL de la imagen"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          style={imageInputStyle}
        />
        <button
          type="button"
          style={buttonStyle}
          onClick={handleInsertImage}
          title="Insertar imagen"
        >
          <i className="fa fa-image"></i>
        </button>
      </div>
    </div>
  );
};

export default EditorToolbar;