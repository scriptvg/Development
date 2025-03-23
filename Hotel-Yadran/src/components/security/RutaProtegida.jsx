import React from 'react';
import { Navigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { useAuth } from "../../config/context/auth/useAuth"

const RutaProtegida = ({ children, roles = [] }) => {
  const { user, loading } = useAuth();

  const estaAutorizado = (usuario) => {
    const rolesUsuario = usuario?.roles || [];
    return roles.length === 0 || roles.some(r => rolesUsuario.includes(r));
  };

  if (loading) {
    return <div className="text-center mt-5"><Spinner animation="border" variant="primary" />;</div>
  }
  
  if (!user || !estaAutorizado(user)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RutaProtegida;
