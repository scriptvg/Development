import React, { useState } from 'react';
import { Navbar, Nav, Image, Button, Offcanvas, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../config/context/auth/useAuth';
import logo from '../../assets/img/logo.jpg';
import './styles/nav.css';
import { User, Settings, Users, Hotel, MessageSquare, Home, Menu, X, LogOut, UserCircle } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';
import { SideBar } from '../home/ui/SideBar';

function BarraNav() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [showAdminSidebar, setShowAdminSidebar] = useState(false);
    const [showCrudSidebar, setShowCrudSidebar] = useState(false);

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
        { icon: <Home size={20} />, label: 'Dashboard', path: '/admin' },
        { icon: <Hotel size={20} />, label: 'Gestionar Habitaciones', path: '/admin/habitaciones' },
        { icon: <Settings size={20} />, label: 'Gestionar Servicios', path: '/admin/services' },
        { icon: <Users size={20} />, label: 'Gestionar Usuarios', path: '/admin/usuarios' },
        { icon: <MessageSquare size={20} />, label: 'Gestionar Testimonios', path: '/admin/testimonials' },
    ];

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
                        </Nav>
                        <div className="nav-divider mx-4"></div>
                        <Nav className="auth-section">
                            {!user ? (
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
                                                {user.ImgPerfil ? (
                                                    <Image 
                                                        src={user.ImgPerfil} 
                                                        roundedCircle 
                                                        width={30} 
                                                        height={30} 
                                                        className="me-1 object-fit-cover"
                                                        alt="Profile" 
                                                    />
                                                ) : user.authProvider === 'google' ? (
                                                    <FaGoogle className="avatar-icon" />
                                                ) : (
                                                    <UserCircle size={24} className="avatar-icon" />
                                                )}
                                            </div>
                                            <span className="d-none d-md-inline">{user.nombre}</span>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className="user-dropdown-menu">
                                            <div className="px-3 py-2 border-bottom d-flex align-items-center gap-2">
                                                {user.ImgPerfil ? (
                                                    <Image 
                                                        src={user.ImgPerfil} 
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
                                                    <p className="mb-0 fw-bold">{user.nombre}</p>
                                                    <small className="text-muted">{user.email}</small>
                                                </div>
                                            </div>
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
                                            <Dropdown.Divider />
                                            <Dropdown.Item onClick={cerrarSesion} className="text-danger d-flex align-items-center gap-2">
                                                <LogOut size={16} />
                                                <span>Cerrar Sesión</span>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>

                                    {isAdminUser && (
                                        <Button 
                                            className="admin-menu-btn"
                                            variant="outline-primary"
                                            onClick={() => setShowAdminSidebar(true)}
                                        >
                                            <Menu size={20} />
                                        </Button>
                                    )}
                                    <Button
                                        className="crud-menu-btn ms-2"
                                        variant="outline-primary"
                                        onClick={() => setShowCrudSidebar(true)}
                                    >
                                        <Menu size={20} />
                                    </Button>
                                </div>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>

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
                                        handleNavigation(item.path);
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
            <SideBar 
                show={showCrudSidebar} 
                handleClose={() => setShowCrudSidebar(false)}
            />
        </>
    );
}

export default BarraNav;