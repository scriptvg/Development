import React from 'react'
import './App.css'

/* Importamos las rutas a la aplicacición */
import Routing from './config/routes/Routing'
import { AuthProvider } from './config/context/auth/useAuth';

function App() {
  return (
    <AuthProvider>
      <Routing/>
    </AuthProvider>
  )
}

export default App
