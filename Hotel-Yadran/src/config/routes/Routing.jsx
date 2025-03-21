import React from 'react'

/* Dependencia de las rutas */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

/* Rutas de la aplicación */
import Home from '../../pages/public/home/Home';



function Routing() {
  return (
    <>
       <Router>
            <Routes>
                {/* Ruta del Home */}
                <Route path='/' element={<Home/>}/>
            </Routes>
        </Router> 
    </>
  )
}

export default Routing