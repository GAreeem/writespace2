import EditorToolbar from "./EditorToolbar";

const Navbar = ({ titulo, setTitulo, handleFontChange, handleSizeChange, handleTextColorChange, handleBgColorChange, handleLineHeightChange }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar sticky-top" style={navbarStyle}>
      <div className="container-fluid">
        <div className="row w-100">
          <div className="col-md-6">
            <h5 style={headerStyle}>Write-Space</h5>
            <input
              type="text"
              className="form-control title-input"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Nombre del documento..."
              required
              style={titleInputStyle}
            />
          </div>
          <div className="col-md-6">
            {/* Integrar el EditorToolbar aquí */}
            <EditorToolbar
              handleFontChange={handleFontChange}
              handleSizeChange={handleSizeChange}
              handleTextColorChange={handleTextColorChange}
              handleBgColorChange={handleBgColorChange}
              handleLineHeightChange={handleLineHeightChange}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

// Estilos (se pueden mover a un archivo CSS)
const navbarStyle = { marginBottom: "20px" };
const headerStyle = { fontSize: "20px", fontWeight: "bold" };
const titleInputStyle = { marginTop: "10px", fontSize: "1.1rem", padding: "10px" };

export default Navbar;