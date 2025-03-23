import React from 'react';
import { Navbar, Nav, Container, Image, Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useAuth } from '../../../config/context/auth/useAuth';
import { FaUserCog, FaHotel, FaUsers, FaCalendarCheck, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import '../ui/styles/adminnav.css';
import logo from '../../../assets/img/logo.jpg';

export default function AdminNav() {
    const { user, logout } = useAuth();

    console.log("rol del usuario:", user ? user.rol : "No hay usuario");
    

    const navigate = useNavigate();

    const cerrarSesion = () => {
        logout();
        navigate('');
    };

    

    return (
        <Navbar className="admin-navbar" expand="lg" fixed="top">
            <Navbar.Brand onClick={() => navigate('/')} >
                <Image src={logo} className="d-inline-block align-top" width="30" height="30" alt="Logo de Hotel Yadran" />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                {/* Línea horizontal estilizada */}
                <hr className="navbar-divider"/>
                <Nav className="me-auto">
                    <Nav.Link onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Inicio</Nav.Link>
                    <Nav.Link onClick={() => navigate('/habitaciones')} style={{ cursor: 'pointer' }}>Habitaciones</Nav.Link>
                    <Nav.Link onClick={() => navigate('/servicios')} style={{ cursor: 'pointer' }}>Servicios</Nav.Link>
                    <Nav.Link onClick={() => navigate('/testimonios')} style={{ cursor: 'pointer' }}>Testimonios</Nav.Link>
                    <Nav.Link onClick={() => navigate('/contacto')} style={{ cursor: 'pointer' }}>Contacto</Nav.Link>
                </Nav>

                <hr className="line-vertical" />

                <Nav className="ms-auto d-flex gap-2 align-content-xxl-end">
                    {!user ? (
                        <>
                            <Button className="auth-button register" variant="secondary-outline" onClick={() => navigate('/register')}>Registrarse</Button>
                            <Button className="auth-button" variant="primary" onClick={() => navigate('/login')}>Iniciar Sesión</Button>
                        </>
                    ) : (
                        <>
                            {user.role === 'admin' && (
                                <Button className="auth-button" variant="primary-outline" onClick={() => navigate('/dashboard')}>Dashboard</Button>
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