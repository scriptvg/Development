import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../../config/store/supabase.config'
import { useAuth } from '../../context/auth/useAuth'

function AuthCallback() {
    const navigate = useNavigate()
    const { login } = useAuth()

    useEffect(() => {
        const handleAuthCallback = async () => {
            try {
                const { data: { user }, error } = await supabase.auth.getUser()
                console.log('Supabase user data:', user)
                
                if (error) throw error
                
                if (user) {
                    console.log('AuthCallback user before login:', user)
                    const userData = {
  id: user.id,
  email: user.email,
  nombre: user.user_metadata?.full_name || user.email.split('@')[0],
  rol: user.user_metadata?.custom_claims?.roles?.[0] || 'user',
  roles: [user.user_metadata?.custom_claims?.roles?.[0] || 'user'],
  authProvider: 'google',
  loginType: 'oauth',
  photoUrl: user.user_metadata?.avatar_url
};
await login(userData)
                  
                  if (userData.rol === 'admin') {
                    navigate('/dashboard');
                  } else {
                    navigate('/', { replace: true });
                  }
                    console.log('Post-login user role:', user.rol)
                    
                }
            } catch (error) {
                console.error('Error in auth callback:', error.message)
                navigate('/login')
            }
        }

        handleAuthCallback()
    }, [navigate, login])

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default AuthCallback