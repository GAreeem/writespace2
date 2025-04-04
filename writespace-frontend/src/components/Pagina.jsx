const Pagina = ({ id, isActive }) => {
    return (
      <div
        id={`pagina-${id}`}
        className="page"
        contentEditable="true"
        style={{ ...pageStyle, display: isActive ? "block" : "none" }}
      ></div>
    );
  };
  
  // Estilos (se pueden mover a un archivo CSS)
  const pageStyle = {
    width: "794px",
    height: "1123px",
    padding: "40px",
    border: "1px solid #ccc",
    marginBottom: "20px",
    backgroundColor: "#fff",
    overflow: "hidden",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  };
  
  export default Pagina; 