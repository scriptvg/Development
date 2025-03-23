import React, { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '../../store/supabase.config';

const AuthContext = createContext();

/* Proveedor para autentificar */
export const AuthProvider = ({ children }) => {

    /* Estado para almacenar la info del usuario */
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    /* Verificar si hay un usuario en localStorage */
    useEffect(() => {
        const syncAuthState = () => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            } else {
                setUser(null);
            }
            setLoading(false);
        };

        // Sincronizar al montar
        syncAuthState();

        // Sincronizar entre pestañas
        window.addEventListener('storage', syncAuthState);
        return () => window.removeEventListener('storage', syncAuthState);
    }, []);

    /* Iniciar sesión */
    console.log('Login context - Received user:', user);
        const login = (authUser) => {
            console.log('Setting user in context:', authUser);
            const userData = {
                id: authUser.id,
                nombre: authUser.nombre || authUser.user_metadata?.name,
                email: authUser.email,
                rol: authUser.rol || 'user',
                roles: [authUser.rol === 'admin' ? 'admin' : 'user'],
                authProvider: authUser.authProvider,
                photoUrl: authUser.photoUrl
            };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            console.log('User stored in localStorage:', userData);
        };

    /* Cerrar la sesión */
    const logout = async () => {
        try {
            // Check if user was logged in with Google
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                await supabase.auth.signOut();
            }
            
            // Clear local auth state
            setUser(null);
            localStorage.removeItem('user');
        } catch (error) {
            console.error('Error during logout:', error);
            throw error;
        }
    };

    /* Renderiza el provider  */
    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

/* Hook para acceder a Auth */
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
}