import React from 'react'

/* Constantes de rutas */
const RUTA_RAIZ = '/';
const RUTA_LOGIN = '/login';
const RUTA_REGISTRO = '/register';
const RUTA_DASHBOARD = '/dashboard';
const RUTA_ADMIN = '/admin/*';
const RUTA_HABITACIONES = '/habitaciones';
const RUTA_HABITACION_DETALLE = '/habitaciones/:roomId';
const RUTA_SERVICIOS = '/servicios';
const RUTA_TEST = '/test';

/* Dependencia de las rutas */
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { AuthProvider } from '../context/auth/useAuth';
import RutaProtegida from '../../components/security/RutaProtegida';

/* Rutas de la aplicación */
import Home from '../../pages/home/Home';
import Admin from '../../pages/admin/Admin';
import Login from '../../pages/auth/Login';
import Register from '../../pages/auth/Register';
import TestPage from '../../pages/test/TestPage';
import PublicRooms from '../../components/public/rooms/PublicRooms';
import RoomDetail from '../../components/public/rooms/RoomDetail';
import PublicServices from '../../components/public/services/PublicServices';
import BarraNav from '../../components/home/BarraNav';
import Footer from '../../components/common/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* Componente principal de enrutamiento */
function Routing() {
    return (
        <AuthProvider>
            <Router>
                <div className="d-flex flex-column min-vh-100">
                    {/* <BarraNav /> */}
                    <div className="flex-grow-1">
                        <ToastContainer />
                        <Routes>
                            {/* Ruta principal del sitio */}
                            <Route path={RUTA_RAIZ} element={<Home />} />

                            {/* Rutas de autenticación */}
                            <Route path={RUTA_LOGIN} element={<Login />} />
                            <Route path={RUTA_REGISTRO} element={<Register />} />

                            {/* Rutas de administración */}
                            <Route path={RUTA_ADMIN} element={<Admin />} />
                            <Route path={RUTA_DASHBOARD} element={<Navigate to="/admin" replace />} />

                            {/* Rutas públicas */}
                            <Route path={RUTA_HABITACIONES} element={<PublicRooms />} />
                            <Route path={RUTA_HABITACION_DETALLE} element={<RoomDetail />} />
                            <Route path={RUTA_SERVICIOS} element={<PublicServices />} />

                            {/* Ruta de pruebas */}
                            <Route path={RUTA_TEST} element={<TestPage />} />
                        </Routes>
                    </div>
                    {/* <Footer /> */}
                </div>
            </Router>
        </AuthProvider>
    )
}

export default Routing