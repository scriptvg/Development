// Rutas públicas
import { Route, Routes } from "react-router-dom";
import { HomePage, RoomsPage, RoomDetailPage, ContactPage } from "../pages";

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/rooms" element={<RoomsPage />} />
      <Route path="/rooms/:id" element={<RoomDetailPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
};