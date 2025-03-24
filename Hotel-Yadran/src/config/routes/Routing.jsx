import React from 'react'

/* Constantes de rutas */
const RUTA_RAIZ = '/';
const RUTA_LOGIN = '/login';
const RUTA_DASHBOARD = '/dashboard/*';
const RUTA_HABITACIONES = '/habitaciones/*';

/* Dependencia de las rutas */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from '../context/auth/useAuth';
import RutaProtegida from '../../components/security/RutaProtegida';

/* Rutas de la aplicación */
import Home from '../../pages/public/home/Home';
import Admin from '../../pages/admin/Admin';
import Login from '../../pages/auth/Login';

/* Componente principal de enrutamiento */
function Routing() {
  return (
    <>
       <AuthProvider>
       <Router>
            <Routes>
                {/* Ruta principal del sitio */}
                <Route path={RUTA_RAIZ} element={<Home/>}/>

                {/* Ruta de autenticación */}
                <Route path={RUTA_LOGIN} element={<Login/>}/>

                {/* Rutas protegidas para administración */}
                <Route 
                    path={RUTA_DASHBOARD}
                    element={
                        <RutaProtegida roles={['admin']}>
                            <Admin/>
                        </RutaProtegida>}/>

                <Route 
                    path={RUTA_HABITACIONES}
                    element={
                        <RutaProtegida roles={['admin']}>
                            <Admin/>
                        </RutaProtegida>}/>
            </Routes>
        </Router>
        </AuthProvider> 
    </>
  )
}

export default Routing