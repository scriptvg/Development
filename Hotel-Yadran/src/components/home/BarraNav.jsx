import React, { useState } from 'react';
import { Navbar, Nav, Image, Button, Offcanvas } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../config/context/auth/useAuth';
import logo from '../../assets/img/logo.jpg';
import "./styles/nav.css";
import { User, Settings, Users, Hotel, MessageSquare, Home, Menu, X } from "lucide-react";
import { FaGoogle } from "react-icons/fa";

function BarraNav() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [showAdminSidebar, setShowAdminSidebar] = useState(false);

    const cerrarSesion = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const isAdminUser = user?.email === 'velezalan34@gmail.com' && user?.rol === 'admin';

    const adminMenuItems = [
        { icon: <Home size={20} />, label: 'Dashboard', path: '/dashboard' },
        { icon: <Hotel size={20} />, label: 'Gestionar Habitaciones', path: '/admin/rooms' },
        { icon: <Settings size={20} />, label: 'Gestionar Servicios', path: '/admin/services' },
        { icon: <Users size={20} />, label: 'Gestionar Usuarios', path: '/admin/users' },
        { icon: <MessageSquare size={20} />, label: 'Gestionar Testimonios', path: '/admin/testimonials' },
    ];

    return (
        <>
            <div className="nav-container">
                <Navbar className="navbar py-3 px-4" expand="lg" fixed="top" bg="white">
                    <Navbar.Brand onClick={() => navigate('/')} className="brand-hover">
                        <Image src={logo} className="brand-logo" width="40" height="40" alt="Logo de Hotel Yadran" />
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto nav-links">
                            {['Inicio', 'Habitaciones', 'Servicios', 'Testimonios', 'Contacto'].map((item, index) => (
                                <Nav.Link 
                                    key={index}
                                    onClick={() => navigate(item === 'Inicio' ? '/' : `/${item.toLowerCase()}`)}
                                    className="nav-link px-4 py-2"
                                >
                                    {item}
                                </Nav.Link>
                            ))}
                        </Nav>

                        <div className="nav-divider mx-4"></div>

                        <Nav className="auth-section">
                            {!user ? (
                                <div className="d-flex gap-3">
                                    <Button className="auth-btn register-btn" variant="outline-primary" onClick={() => navigate('/register')} 
                                        style={{ padding: '0.5rem 1.25rem', transition: 'all 0.2s' }}>
                                        Registrarse
                                    </Button>
                                    <Button className="auth-btn login-btn" variant="primary" onClick={() => navigate('/login')} 
                                        style={{ padding: '0.5rem 1.25rem', transition: 'all 0.2s' }}>
                                        Iniciar Sesión
                                    </Button>
                                </div>
                            ) : (
                                <div className="d-flex align-items-center gap-3">
                                    <div className="welcome-container">
                                        <span className="welcome-name" style={{ fontSize: '1.1rem', fontWeight: 600 }}>¡Hola, {user.nombre}!</span>
                                        <div className="user-type" style={{ fontSize: '0.9rem' }}>
                                            {user.authProvider === 'google' ? (
                                                <FaGoogle className="provider-icon google" />
                                            ) : (
                                                <User className="provider-icon local" />
                                            )}
                                            <span className="user-type-text">
                                                {user.authProvider === 'google' ? 'Google Admin' : 'Usuario Local'}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {isAdminUser && (
                                        <Button 
                                            className="admin-menu-btn"
                                            variant="outline-primary"
                                            onClick={() => setShowAdminSidebar(true)}
                                            style={{ padding: '0.5rem 1rem', transition: 'all 0.2s' }}
                                        >
                                            <Menu size={20} />
                                        </Button>
                                    )}
                                    <Button 
                                        className="logout-btn" 
                                        variant="outline-danger" 
                                        onClick={cerrarSesion}
                                    >
                                        Salir
                                    </Button>
                                </div>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>

            {/* Admin Sidebar */}
            {isAdminUser && (
                <Offcanvas 
                    show={showAdminSidebar} 
                    onHide={() => setShowAdminSidebar(false)} 
                    placement="end"
                    className="admin-sidebar"
                >
                    <Offcanvas.Header className="border-bottom">
                        <Offcanvas.Title className="d-flex align-items-center gap-2">
                            <Settings size={24} />
                            Panel de Administración
                        </Offcanvas.Title>
                        <Button 
                            variant="link" 
                            className="close-btn"
                            onClick={() => setShowAdminSidebar(false)}
                            style={{ padding: '0.25rem', marginLeft: 'auto' }}
                        >
                            <X size={24} />
                        </Button>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="flex-column">
                            {adminMenuItems.map((item, index) => (
                                <Nav.Link
                                    key={index}
                                    onClick={() => {
                                        navigate(item.path);
                                        setShowAdminSidebar(false);
                                    }}
                                    className="admin-menu-item"
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Nav.Link>
                            ))}
                        </Nav>
                    </Offcanvas.Body>
                </Offcanvas>
            )}
        </>
    );
}

export default BarraNav;