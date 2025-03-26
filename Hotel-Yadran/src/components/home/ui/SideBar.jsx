import React from 'react';
import { Offcanvas, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Home, Hotel, Users, Settings, Coffee } from 'lucide-react';

export const SideBar = ({ show, handleClose }) => {
    const navigate = useNavigate();
    
    const menuItems = [
        { icon: <Home size={20} />, label: 'Inicio', path: '/' },
        { icon: <Hotel size={20} />, label: 'Habitaciones', path: '/habitaciones' },
        { icon: <Coffee size={20} />, label: 'Servicios', path: '/servicios' },
        { icon: <Users size={20} />, label: 'Testimonios', path: '/testimonios' },
        { icon: <Settings size={20} />, label: 'Contacto', path: '/contacto' },
    ];
    
    const handleNavigation = (path) => {
        navigate(path);
        handleClose();
    };

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Menú de Navegación</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Nav className="flex-column">
                    {menuItems.map((item, index) => (
                        <Nav.Link 
                            key={index} 
                            className="sidebar-item mb-2"
                            onClick={() => handleNavigation(item.path)}
                        >
                            {item.icon}
                            <span className="ms-3">{item.label}</span>
                        </Nav.Link>
                    ))}
                </Nav>
            </Offcanvas.Body>
        </Offcanvas>
    );
};