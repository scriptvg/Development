import React, { useState, useEffect } from 'react';
import { NavDropdown, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';

// Este componente muestra el menú desplegable del usuario en la barra de navegación
// con la imagen de perfil del usuario o un icono predeterminado
function UserNavDropdown({ onLogout }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar los datos del usuario desde localStorage al iniciar el componente
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
  }, []);

  const handleLogout = () => {
    // Eliminar los datos del usuario del almacenamiento local
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    
    // Llamar a la función de cierre de sesión proporcionada por las props (si existe)
    if (onLogout) onLogout();
    
    // Redirigir al usuario a la página de inicio o inicio de sesión
    navigate('/login');
  };

  // Si no hay un usuario autenticado, no mostrar el menú
  if (!user) {
    return (
      <NavDropdown 
        title={
          <span className="d-inline-flex align-items-center">
            <User size={24} className="me-1" />
            <span>Iniciar Sesión</span>
          </span>
        } 
        id="basic-nav-dropdown"
      >
        <NavDropdown.Item onClick={() => navigate('/login')}>Iniciar Sesión</NavDropdown.Item>
        <NavDropdown.Item onClick={() => navigate('/register')}>Registrarse</NavDropdown.Item>
      </NavDropdown>
    );
  }

  return (
    <NavDropdown 
      title={
        <span className="d-inline-flex align-items-center">
          {user.ImgPerfil ? (
            <Image 
              src={user.ImgPerfil} 
              roundedCircle 
              width={30} 
              height={30} 
              className="me-2 object-fit-cover border"
              alt="Profile"
            />
          ) : (
            <User size={24} className="me-1" />
          )}
          <span>{user.nombre}</span>
        </span>
      } 
      id="user-nav-dropdown"
    >
      <NavDropdown.Item onClick={() => navigate('/profile')}>Mi Perfil</NavDropdown.Item>
      <NavDropdown.Item onClick={() => navigate('/reservations')}>Mis Reservas</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={handleLogout}>Cerrar Sesión</NavDropdown.Item>
    </NavDropdown>
  );
}

export default UserNavDropdown;
