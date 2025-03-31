// Rutas de administración
import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardPage, BookingsPage, RoomsManagementPage, UsersPage } from "../pages";
import { useAuth } from "../hooks/useAuth";

export const AdminRoutes = () => {
  const { user, isAuthenticated } = useAuth();
  
  // Verificar si el usuario está autenticado y tiene rol de administrador
  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/bookings" element={<BookingsPage />} />
      <Route path="/rooms" element={<RoomsManagementPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="*" element={<Navigate to="/admin" />} />
    </Routes>
  );
};