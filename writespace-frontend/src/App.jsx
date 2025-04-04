import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Menu from "./pages/Menu";  
import CrearDocumento from "./pages/CrearDocumento"; // Importa la nueva página
import EditarDocumento from "./pages/EditarDocumento";
import ProtectedRoute from "./components/ProtectedRoute"; // Importa el componente ProtectedRoute
import NotFound from "./pages/404";
{/* Forma de navegar con animaciones */}
//import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path='*' element={<NotFound />} />
      
      {/* Rutas protegidas */}
      <Route path="/edit-doc/:id" element={<ProtectedRoute element={<EditarDocumento/>}/>}/>
      <Route path="/menu" element={<ProtectedRoute element={<Menu />} />} />
      <Route path="/crear-documento" element={<ProtectedRoute element={<CrearDocumento />} />} />
    </Routes>
  );
}

export default App;
