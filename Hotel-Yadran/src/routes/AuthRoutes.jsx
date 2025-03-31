// Rutas de autenticación
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage, RegisterPage, ForgotPasswordPage } from "../pages";
import { useAuth } from "../hooks/useAuth";

export const AuthRoutes = () => {
  const { isAuthenticated } = useAuth();
  
  // Si el usuario ya está autenticado, redirigir a la página principal
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};