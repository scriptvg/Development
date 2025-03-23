import React from 'react'
import { Button } from 'react-bootstrap'
import { useAuth } from '../../../config/context/auth/useAuth'
import { supabase } from '../../../config/store/supabase.config'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function BtnLoginGoogle() {
    const { login } = useAuth()
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {
            await Swal.fire({
                title: 'Iniciando sesión',
                text: 'Conectando con Google...',
                icon: 'info',
                timer: 1500,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            await supabase.auth.signOut();

            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}`,
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'select_account'
                    }
                }
            });

            if (error) throw error;

            await new Promise(resolve => setTimeout(resolve, 2000));
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                console.log('Google user data:', user);
                const isAdmin = user.email === 'velezalan34@gmail.com';
                console.log('Admin status:', isAdmin, 'Email:', user.email);
                const userData = {
                    id: user.id,
                    email: user.email,
                    nombre: user.user_metadata?.full_name || user.email.split('@')[0],
                    rol: isAdmin ? 'admin' : 'client',
                    roles: [isAdmin ? 'admin' : 'client'],
                    authProvider: 'google',
                    loginType: 'google',
                    photoUrl: user.user_metadata?.avatar_url,
                    welcomeMessage: `¡Bienvenido desde Google, ${user.user_metadata?.full_name || user.email.split('@')[0]}!`
                };

                await login(userData);
                
                // Add user to db.json
                try {
                    const response = await fetch('http://localhost:3001/Usuarios', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            ...userData,
                            authProvider: 'google',
                            loginType: 'google',
                            photoUrl: user.user_metadata?.avatar_url || ''
                        })
                    });
                    
                    if (!response.ok) {
                        throw new Error('Error saving user data');
                    }
                } catch (error) {
                    console.error('Error saving user:', error);
                }
                console.log('Post-login navigation - Admin:', isAdmin);

                if (isAdmin) {
                    await Swal.fire({
                        title: '¡Bienvenido Administrador!',
                        text: userData.welcomeMessage,
                        icon: 'success',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    });
                    navigate('/admin');  // Changed from '/dashboard' to '/admin'
                } else {
                    await Swal.fire({
                        title: '¡Bienvenido Cliente!',
                        text: userData.welcomeMessage,
                        icon: 'success',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    });
                    navigate('/', { replace: true });
                }
            }
        } catch (error) {
            await Swal.fire({
                title: 'Error de Autenticación',
                text: 'Error al iniciar sesión con Google: ' + error.message,
                icon: 'error',
                confirmButtonText: 'Entendido'
            });
        }
    };

    const handleMicrosoftLogin = async () => {
        try {
            await Swal.fire({
                title: 'Microsoft Login',
                text: 'Redirigiendo a Microsoft...',
                icon: 'info',
                timer: 1500,
                showConfirmButton: false
            });
            const microsoftAuthUrl = 'URL_DE_AUTENTICACION_DE_MICROSOFT'
            window.location.href = microsoftAuthUrl
        } catch (error) {
            await Swal.fire({
                title: 'Error',
                text: 'Error al iniciar sesión con Microsoft: ' + error.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    }

    return (
        <>
            <Button onClick={handleGoogleLogin} className='BtnLoginGoogle'>
                <svg 
                    style={{ enableBackground: 'new 0 0 512 512' }} 
                    viewBox="0 0 512 512" 
                    y="0px" 
                    x="0px" 
                    xmlns="http://www.w3.org/2000/svg" 
                    id="Layer_1" 
                    width="20" 
                    version="1.1"
                >
                    <path d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
                        c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
                        C103.821,274.792,107.225,292.797,113.47,309.408z" style={{ fill: '#FBBB00' }}></path>
                    <path d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451
                        c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535
                        c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z" style={{ fill: '#518EF8' }}></path>
                    <path d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512
                        c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771
                        c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z" style={{ fill: '#28B446' }}></path>
                    <path d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012
                        c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0
                        C318.115,0,375.068,22.126,419.404,58.936z" style={{ fill: '#F14336' }}></path>
                </svg>
                
            </Button>

            <Button onClick={handleMicrosoftLogin} className='BtnLoginMicrosoft'>
                <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 23 23"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path fill="#f35325" d="M1 1h10v10H1z"/>
                    <path fill="#81bc06" d="M12 1h10v10H12z"/>
                    <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                    <path fill="#ffba08" d="M12 12h10v10H12z"/>
                </svg>
                Iniciar con Microsoft
            </Button>
        </>
    )
}

export default BtnLoginGoogle