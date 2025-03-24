import React from 'react'

/* Dependencia de las rutas */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from '../context/auth/useAuth';
import RutaProtegida from '../../components/security/RutaProtegida';


/* Rutas de la aplicación */
import Home from '../../pages/public/home/Home';
import Admin from '../../pages/admin/Admin';
import AdminRooms from '../../components/admin/components/AdminRooms';
import Login from '../../pages/auth/Login';




function Routing() {
  return (
    <>
       <AuthProvider>
       <Router>
            <Routes>

                {/* Ruta de raíz */}
                <Route path='/' element={<Home/>}/>

                {/* Ruta de inicio de sesión */}
                <Route path='/login' element={<Login/>}/>

                {/* Rutas protegidas */}
                <Route 
                    path='/dashboard/*'
                    element={
                        <RutaProtegida roles={['admin']}>
                            <Admin/>
                        </RutaProtegida>
                    }
                >
                    <Route path='habitaciones' element={<AdminRooms />} />
                </Route>


            </Routes>
        </Router>
        </AuthProvider> 
    </>
  )
}

export default Routing