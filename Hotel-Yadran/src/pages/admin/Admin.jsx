import React, { useState, useEffect } from 'react'
import AdminNav from '../../components/common/ui/AdminNav'
import BarraNav from '../../components/home/BarraNav'
import AdminRooms from '../../components/admin/components/AdminRooms'
import AdminRoomsEsq from '../../components/admin/components/AdminRoomsEsq';
import { useAuth } from '../../config/context/auth/useAuth'
import { useNavigate, Route, Routes } from 'react-router-dom'
import Swal from 'sweetalert2'

import { Container } from 'react-bootstrap'
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "bootstrap/dist/css/bootstrap.min.css"

function Admin() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            Swal.fire({
                title: 'Acceso Denegado',
                text: 'Por favor, inicia sesión para continuar',
                icon: 'warning',
                confirmButtonText: 'Ir a Login'
            }).then(() => {
                navigate('/login', { replace: true });
            });
            return;
        }

        console.log('Admin validation - User data:', user);
        if (user.rol !== 'admin') {
            Swal.fire({
                title: 'Acceso Restringido',
                text: 'No tienes permisos de administrador',
                icon: 'error',
                confirmButtonText: 'Volver al Inicio'
            }).then(() => {
                navigate('/', { replace: true });
            });
        } else {
            console.log('Admin validation succeeded');
            setTimeout(() => {
                setIsLoading(false);
            }, 3000);
        }
    }, [user, navigate]);

    if (!user || user.rol !== 'admin') {
        return null;
    }

    return (
        <>
            <BarraNav />
            <Routes>
  <Route path="/" element={isLoading ? <AdminRoomsEsq /> : <AdminRooms />} />
  <Route path="/habitaciones" element={isLoading ? <AdminRoomsEsq /> : <AdminRooms />} />
</Routes>
        </>
    );
}

export default Admin
