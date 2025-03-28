import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Image, Button, Dropdown, Offcanvas } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../config/context/auth/useAuth';
import logo from '../../assets/img/logo.jpg';
import './styles/nav.css';
import { User, Settings, Users, Hotel, MessageSquare, Home, Menu, LogOut, UserCircle, X } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';
import AdminNav from '../admin/ui/AdminNav';

function BarraNav() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();
    const [showCrudSidebar, setShowCrudSidebar] = useState(false);
    const [currentUser, setCurrentUser] = useState(user);

    // Update currentUser when user state changes
    useEffect(() => {
        setCurrentUser(user);
    }, [user]);

    const isAdminUser = currentUser?.email === 'velezalan34@gmail.com' && currentUser?.rol === 'admin';

    const cerrarSesion = async () => {
        try {
            await logout();
            setCurrentUser(null);
            navigate('/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const handleNavigation = (path) => navigate(path);

    return (
        <>
            <div className="nav-container">
                <Navbar className="navbar py-3 px-4" expand="lg" fixed="top" bg="white">
                    <Navbar.Brand onClick={() => handleNavigation('/')} className="brand-hover">
                        <Image src={logo} className="brand-logo" width="40" height="40" alt="Logo de Hotel Yadran" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto nav-links">
                            {['Inicio', 'Habitaciones', 'Servicios', 'Testimonios', 'Contacto'].map((item, index) => (
                                <Nav.Link
                                    key={index}
                                    onClick={() => handleNavigation(item === 'Inicio' ? '/' : `/${item.toLowerCase()}`)}
                                    className="nav-link px-4 py-2"
                                >
                                    {item}
                                </Nav.Link>
                            ))}

                            {/* Botón de CRUD solo para administradores */}
                            {isAdminUser && (
                                <Nav.Link
                                    className="nav-link px-4 py-2 d-flex align-items-center"
                                    onClick={() => setShowCrudSidebar(!showCrudSidebar)}
                                >
                                    <Menu size={18} className="me-1" />
                                    <span>Admin Panel</span>
                                </Nav.Link>
                            )}
                        </Nav>
                        <div className="nav-divider mx-4"></div>
                        <Nav className="auth-section">
                            {!currentUser ? (
                                <div className="d-flex gap-3">
                                    <Button
                                        className="auth-btn register-btn"
                                        variant="outline-primary"
                                        onClick={() => handleNavigation('/register')}
                                    >
                                        Registrarse
                                    </Button>
                                    <Button
                                        className="auth-btn login-btn"
                                        variant="primary"
                                        onClick={() => handleNavigation('/login')}
                                    >
                                        Iniciar Sesión
                                    </Button>
                                </div>
                            ) : (
                                <div className="d-flex align-items-center gap-3">
                                    <Dropdown align="end">
                                        <Dropdown.Toggle variant="light" id="dropdown-user" className="user-dropdown-toggle d-flex align-items-center gap-2">
                                            <div className="avatar-container">
                                                {currentUser.ImgPerfil ? (
                                                    <Image
                                                        src={currentUser.ImgPerfil}
                                                        roundedCircle
                                                        width={30}
                                                        height={30}
                                                        className="me-1 object-fit-cover"
                                                        alt="Profile"
                                                    />
                                                ) : currentUser.authProvider === 'google' ? (
                                                    <FaGoogle className="avatar-icon" />
                                                ) : (
                                                    <UserCircle size={24} className="avatar-icon" />
                                                )}
                                            </div>
                                            <span className="d-none d-md-inline">{currentUser.nombre}</span>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className="user-dropdown-menu">
                                            <div className="px-3 py-2 border-bottom d-flex align-items-center gap-2">
                                                {currentUser.ImgPerfil ? (
                                                    <Image
                                                        src={currentUser.ImgPerfil}
                                                        roundedCircle
                                                        width={40}
                                                        height={40}
                                                        className="object-fit-cover"
                                                        alt="Profile"
                                                    />
                                                ) : (
                                                    <UserCircle size={40} />
                                                )}
                                                <div>
                                                    <p className="mb-0 fw-bold">{currentUser.nombre}</p>
                                                    <small className="text-muted">{currentUser.email}</small>
                                                </div>
                                            </div>

                                            {/* Opciones comunes para usuarios */}
                                            <Dropdown.Item onClick={() => handleNavigation('/perfil')} className="d-flex align-items-center gap-2">
                                                <User size={16} />
                                                <span>Mi Perfil</span>
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleNavigation('/reservas')} className="d-flex align-items-center gap-2">
                                                <Hotel size={16} />
                                                <span>Mis Reservas</span>
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleNavigation('/configuracion')} className="d-flex align-items-center gap-2">
                                                <Settings size={16} />
                                                <span>Configuración</span>
                                            </Dropdown.Item>

                                            {/* Admin panel button if admin user */}
                                            {isAdminUser && (
                                                <>
                                                    <Dropdown.Divider />
                                                    <Dropdown.Item onClick={() => setShowCrudSidebar(true)} className="d-flex align-items-center gap-2">
                                                        <Menu size={16} />
                                                        <span>Panel de Administración</span>
                                                    </Dropdown.Item>
                                                </>
                                            )}

                                            <Dropdown.Divider />
                                            <Dropdown.Item onClick={cerrarSesion} className="text-danger d-flex align-items-center gap-2">
                                                <LogOut size={16} />
                                                <span>Cerrar Sesión</span>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>

            {/* Admin Panel Sidebar */}
            <Offcanvas
                show={showCrudSidebar}
                onHide={() => setShowCrudSidebar(false)}
                placement="end"
                className="admin-offcanvas"
                backdrop={false}
            >
                <Offcanvas.Header className="border-bottom">
                    <Offcanvas.Title>Panel de Administración</Offcanvas.Title>
                    <Button
                        variant="light"
                        className="btn-close"
                        onClick={() => setShowCrudSidebar(false)}
                    />
                </Offcanvas.Header>
                <Offcanvas.Body className="p-0">
                    <AdminNav />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default BarraNav;