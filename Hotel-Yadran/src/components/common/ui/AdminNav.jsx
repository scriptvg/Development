// Importación de dependencias necesarias de React y React Bootstrap
import React from 'react';
import { Navbar, Nav, Container, Image, Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Importación del hook personalizado para autenticación
import { useAuth } from '../../../config/context/auth/useAuth';

// Importación de iconos de React Icons
import { FaUserCog, FaHotel, FaUsers, FaCalendarCheck, FaSignOutAlt, FaGoogle, FaUser } from 'react-icons/fa';

// Importación de componentes de enrutamiento
import { Link, useNavigate } from 'react-router-dom';

// Importación de estilos y recursos
import '../../home/styles/adminnav.css';
import logo from '../../../assets/img/logo.jpg';

export default function AdminNav() {
    // Obtención de funciones y estado de autenticación
    const { user, logout } = useAuth();

    // Registro del rol del usuario en consola
    console.log("rol del usuario:", user ? user.rol : "No hay usuario");
    
    // Hook para navegación
    const navigate = useNavigate();

    // Función para manejar el cierre de sesión
    const cerrarSesion = () => {
        logout();
        navigate('');
    };

    return (
        // Barra de navegación principal
        <Navbar className="admin-navbar" expand="lg" fixed="top">
            <Navbar.Brand onClick={() => navigate('/')} >
                <Image src={logo} className="d-inline-block align-top" width="30" height="30" alt="Logo de Hotel Yadran" />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                {/* Línea horizontal estilizada */}
                <hr className="navbar-divider"/>
                {/* Enlaces de navegación principales */}
                <Nav className="me-auto">
                    <Nav.Link onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Inicio</Nav.Link>
                    <Nav.Link onClick={() => navigate('/habitaciones')} style={{ cursor: 'pointer' }}>Habitaciones</Nav.Link>
                    <Nav.Link onClick={() => navigate('/servicios')} style={{ cursor: 'pointer' }}>Servicios</Nav.Link>
                    <Nav.Link onClick={() => navigate('/testimonios')} style={{ cursor: 'pointer' }}>Testimonios</Nav.Link>
                    <Nav.Link onClick={() => navigate('/contacto')} style={{ cursor: 'pointer' }}>Contacto</Nav.Link>
                </Nav>

                <hr className="line-vertical" />

                {/* Sección de autenticación */}
                <Nav className="ms-auto d-flex gap-2 align-content-xxl-end">
                    {!user ? (
                        // Botones para usuarios no autenticados
                        <>
                            <Button className="auth-button register" variant="secondary-outline" onClick={() => navigate('/register')}>Registrarse</Button>
                            <Button className="auth-button" variant="primary" onClick={() => navigate('/login')}>Iniciar Sesión</Button>
                        </>
                    ) : (
                        // Opciones para usuarios autenticados
                        <>
                            {user.role === 'admin' && (
                                <Button className="auth-button" variant="primary-outline" onClick={() => navigate('/dashboard/habitaciones')}>Dashboard</Button>
                            )}
                            <div className="d-flex align-items-center gap-2">
                                <span className="text-muted small">
                                    {user.authProvider === 'google' ? (
                                        <><FaGoogle className="text-danger me-1" />Google</>
                                    ) : (
                                        <><FaUser className="text-primary me-1" />Local</>
                                    )}
                                </span>
                                <Button className="auth-button" variant="danger" onClick={cerrarSesion}>Cerrar Sesión</Button>
                            </div>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}