// Configuración principal de rutas
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PublicRoutes } from "./PublicRoutes";
import { AuthRoutes } from "./AuthRoutes";
import { AdminRoutes } from "./AdminRoutes";
import { MainLayout } from "../components/layout/MainLayout";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas de autenticación */}
        <Route path="/auth/*" element={<AuthRoutes />} />
        
        {/* Rutas de administración */}
        <Route path="/admin/*" element={<AdminRoutes />} />
        
        {/* Rutas públicas con layout principal */}
        <Route path="/*" element={
          <MainLayout>
            <PublicRoutes />
          </MainLayout>
        } />
      </Routes>
    </BrowserRouter>
  );
};