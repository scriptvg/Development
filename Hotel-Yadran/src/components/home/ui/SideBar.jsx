import React, { useState } from 'react';
import { Button, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './styles/crud-sidebar.css';

function SideBar({ show, handleClose }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(show);

  const crudMenuItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Reservas', path: '/dashboard/reservas' },
    { label: 'Habitaciones', path: '/dashboard/habitaciones' },
    { label: 'Huéspedes', path: '/dashboard/huespedes' },
    { label: 'Encuestas', path: '/dashboard/encuestas' },
    { label: 'Tarifas', path: '/dashboard/tarifas' },
    { label: 'Reportes', path: '/dashboard/reportes' },
    { label: 'Inventario', path: '/dashboard/inventario' },
    { label: 'Configuración', path: '/dashboard/config' },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    if (isOpen) handleClose();
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h5>Gestión de Servicios</h5>
        <Button 
          variant="link" 
          className="close-button"
          onClick={toggleSidebar}
        >
          ✕
        </Button>
      </div>
      <Nav className="flex-column">
        {crudMenuItems.map((item, index) => (
          <Nav.Link
            key={index}
            onClick={() => {
              navigate(item.path);
              handleClose();
            }}
            className="crud-menu-item"
          >
            {item.label}
          </Nav.Link>
        ))}
      </Nav>
    </div>
  );
}

export { SideBar };
