import React, { useState, useEffect } from 'react'
import AdminNav from '../../components/admin/ui/AdminNav'
import AdminRooms from '../../components/admin/components/habitaciones/AdminRooms'
import AdminRoomsEsq from '../../components/admin/components/habitaciones/AdminRoomsEsq';
import ServicesManager from '../../components/admin/components/servicios/ServicesManager';
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

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="d-flex">
            <AdminNav />
            <div className="content-wrapper flex-grow-1">
                <Routes>
                    <Route index element={<AdminDashboard />} />
                    <Route path="habitaciones" element={<AdminRooms />} />
                    <Route path="esquema-habitaciones" element={<AdminRoomsEsq />} />
                    <Route path="servicios" element={<ServicesManager />} />
                    <Route path="reservas" element={<AdminReservas />} />
                    <Route path="usuarios" element={<AdminUsuarios />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    );
}

// Placeholder components
const AdminDashboard = () => <Container className="p-4"><h2>Dashboard</h2></Container>;
const AdminReservas = () => <Container className="p-4"><h2>Administración de Reservas</h2></Container>;
const AdminUsuarios = () => <Container className="p-4"><h2>Administración de Usuarios</h2></Container>;
const NotFound = () => <Container className="p-4"><h2>Página no encontrada</h2></Container>;

export default Admin;
