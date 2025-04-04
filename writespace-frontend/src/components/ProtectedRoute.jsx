import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("access");

  if (!token) {
    // Si no hay token, redirige al login
    return <Navigate to="/" />;
  }

  // Si hay token, muestra la página protegida
  return element;
};

export default ProtectedRoute;
