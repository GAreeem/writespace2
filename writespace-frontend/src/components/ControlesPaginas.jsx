const ControlesPaginas = ({
    paginaActual,
    paginas,
    irPaginaAnterior,
    irPaginaSiguiente,
    agregarPagina,
    eliminarPagina,
  }) => {
    return (
      <div className="d-flex justify-content-center align-items-center mt-3">
        <button
          className="btn btn-secondary me-2"
          onClick={irPaginaAnterior}
          disabled={paginaActual === 0}
        >
          <i className="fas fa-arrow-left"></i>
        </button>
  
        <span className="mx-3">
          Página {paginaActual + 1} de {paginas.length}
        </span>
  
        <button
          className="btn btn-secondary me-2"
          onClick={irPaginaSiguiente}
          disabled={paginaActual === paginas.length - 1}
        >
          <i className="fas fa-arrow-right"></i>
        </button>
  
        <button
          type="button"
          className="btn btn-primary me-2"
          onClick={agregarPagina}
        >
          <i className="fas fa-plus-circle"></i>
        </button>
  
        <button
          type="button"
          className="btn btn-danger"
          onClick={eliminarPagina}
          disabled={paginas.length === 1}
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>
    );
  };
  
  export default ControlesPaginas;