import React from 'react';
import { Offcanvas, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './styles/crud-sidebar.css';

function SideBar({ show, handleClose }) {
  const navigate = useNavigate();

  const crudMenuItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Reservas', path: '/dashboard/reservas' },
    { label: 'Habitaciones', path: '/dashboard/habitaciones' },
    { label: 'Eliminar Servicio', path: '/services/delete' },
  ];

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end" className="crud-sidebar">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Gestión de Servicios</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
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
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export { SideBar };
// Remove default export line here