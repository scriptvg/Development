import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
    LayoutDashboard, 
    Bed, 
    Calendar, 
    Users, 
    Settings, 
    LogOut,
    Map,
    Coffee
} from 'lucide-react';
import { useAuth } from '../../../config/context/auth/useAuth';
import './adminNav.css';

function AdminNav() {
    const location = useLocation();
    const { logout } = useAuth();
    
    const isActive = (path) => {
        return location.pathname.startsWith(`/admin${path}`) ? 'active' : '';
    };

    return (
        <div className="admin-sidebar">
            <div className="sidebar-header">
                <h3 className="mb-0">Hotel Yadran</h3>
                <p className="text-muted small mb-0">Panel de Administración</p>
            </div>
            
            <ul className="sidebar-menu">
                <li className={isActive('')}>
                    <Link to="/admin" className="sidebar-link">
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </Link>
                </li>
                
                {/* Dropdown for Room Management */}
                <li className={`has-submenu ${isActive('/habitaciones') || isActive('/esquema-habitaciones') ? 'active' : ''}`}>
                    <a href="#roomSubMenu" data-bs-toggle="collapse" className="sidebar-link">
                        <Bed size={20} />
                        <span>Habitaciones</span>
                        <i className="dropdown-icon"></i>
                    </a>
                    <ul className="submenu collapse" id="roomSubMenu">
                        <li className={isActive('/habitaciones')}>
                            <Link to="/admin/habitaciones">
                                <Bed size={16} />
                                <span>Gestión de Habitaciones</span>
                            </Link>
                        </li>
                        <li className={isActive('/esquema-habitaciones')}>
                            <Link to="/admin/esquema-habitaciones">
                                <Map size={16} />
                                <span>Esquema de Habitaciones</span>
                            </Link>
                        </li>
                    </ul>
                </li>
                
                <li className={isActive('/servicios')}>
                    <Link to="/admin/servicios" className="sidebar-link">
                        <Coffee size={20} />
                        <span>Servicios</span>
                    </Link>
                </li>
                
                <li className={isActive('/reservas')}>
                    <Link to="/admin/reservas" className="sidebar-link">
                        <Calendar size={20} />
                        <span>Reservas</span>
                    </Link>
                </li>
                
                <li className={isActive('/usuarios')}>
                    <Link to="/admin/usuarios" className="sidebar-link">
                        <Users size={20} />
                        <span>Usuarios</span>
                    </Link>
                </li>
                
                <li className={isActive('/configuracion')}>
                    <Link to="/admin/configuracion" className="sidebar-link">
                        <Settings size={20} />
                        <span>Configuración</span>
                    </Link>
                </li>
                
                <li>
                    <a onClick={logout} className="sidebar-link logout">
                        <LogOut size={20} />
                        <span>Cerrar Sesión</span>
                    </a>
                </li>
            </ul>
            
            <div className="sidebar-footer">
                <p className="text-muted small mb-0">© 2023 Hotel Yadran</p>
            </div>
        </div>
    );
}

export default AdminNav;