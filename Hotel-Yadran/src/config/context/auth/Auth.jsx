/* Dependencias necesarias de React */
import React, { useState, useEffect, useContext, createContext } from "react";

/* Creamos contexto de autenticación */
const AuthContext = createContext(null);

/* Componente de proveedor de autenticación */
export const AuthProvider = ({ children }) => {

    /* Estado para almacenar la información del usuario */
    const [usuario, setUsuario] = useState(null);

    /* Verificar si hay un usuario en localStorage */
    useEffect(() => {
        const saveUser = localStorage.getItem("usuario");
        if (saveUser) {
           setUsuario(JSON,parse(saveUser)); 
        }
    }, []);

    /* Función para iniciar sesión */
    const login = (userData) => {
        set(userData);
        localStorage.setItem("usuario", JSON.stringify(userData));
    };

    /* Función para cerrar sesión */
    const logout = () => {
        setUsuario(null);
        localStorage.removeItem("usuario");
    };

    /* Valor del contexto */
    return (
        <AuthProvider.Provider value={{ usuario, login, logout }}>
            children
        </AuthProvider.Provider>
    );

};


/* Hook personalizado para acceder a la autenticación */
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth debe ser utilizado dentro de un AuthProvider");
    };
};
