import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/* Componentes de Bootstrap */
import { Container, Card, Form, InputGroup, Button, Alert, Spinner } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Swal from 'sweetalert2';

import logo from '../../assets/img/logo.jpg'

import { Eye, EyeOff, Bed } from "lucide-react"
import { FaUser, FaGoogle } from "react-icons/fa"

/* Servicios */
import usersCalls from '../../config/services/usersCalls';
import { useAuth } from "../../config/context/auth/useAuth"

/* CustomComponetes */
import BtnLoginGoogle from './components/BtnLoginGoogle';
import { FormInput } from '../common/forms/FormInput';
import { AlertComponent } from '../common/alerts/AlertComponent';

// Custom button component with loading state
const LoginButton = ({ loading, onClick, text, loadingText }) => {
  return (
    <Button 
      className="w-100 mt-3" 
      variant="primary" 
      type="button" 
      disabled={loading} 
      onClick={onClick}
    >
      {loading ? (
        <>
          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
          <span className="ms-2">{loadingText}</span>
        </>
      ) : (
        text
      )}
    </Button>
  );
};

function LoginForm() {

    const navigate = useNavigate();
    const { login, loading: authLoading } = useAuth();

    /* Datos */
    const [formData, setFormData] = useState({
        correo: "",
        contraseña: ""
    });
    const [mensaje, setMensaje] = useState("");
    const [errors, setErrors] = useState({});
    const [Cargando, setCargando] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        loadDataUser();
    }, []);

    /* Alerta */
    const mostrarAlerta = async (icon, title, text) => {
        return Swal.fire({
            icon,
            title,
            text
        });
    };

    /* Cargar datos */
    const loadDataUser = async () => {
        try {
            setCargando(true);
            const data = await usersCalls.GetUsers();
            setUsuarios(data);
        } catch (error) {
            await AlertComponent("error", "Error", "Ocurrió un error al cargar los datos");
        } finally {
            setCargando(false);
        };
    };
    
    /* Manejar inicio de sesión */
    const manejarLogin = async () => {
        if (!validarForm()) return;
        
        try {
            setCargando(true);
            
            // Buscar usuario por correo y contraseña
            const usuarioEncontrado = usuarios.find(
                (user) => user.email === formData.correo && (user.contraseña === formData.contraseña || user.password === formData.contraseña)
            );

            // Validate role existence
            
            if (usuarioEncontrado) {
                // Add role assignment for demo admin
                // Add role based on backend 'rol' property
                usuarioEncontrado.roles = [usuarioEncontrado.rol || usuarioEncontrado.role || 'user'];
                
                // Special case for admin demo user
                if (usuarioEncontrado.email === 'admin@hotelyadran.com') {
                    usuarioEncontrado.roles = ['admin'];
                }
                login(usuarioEncontrado);
                await mostrarAlerta("success", "¡Bienvenido!", "Inicio de sesión exitoso");
                
                // Redireccionar según el rol del usuario
                if (usuarioEncontrado.roles?.includes('admin')) {
                    navigate("/dashboard");
                } else {
                    navigate("/");
                }
            } else {
                await mostrarAlerta("error", "Error", "Credenciales incorrectas");
            }
        } catch (error) {
            await mostrarAlerta("error", "Error", "Ocurrió un error al iniciar sesión");
            console.error("Error al iniciar sesión:", error);
        } finally {
            setCargando(false);
        }
    };

    /* Validar */
    const validarForm = () => {
        const errores = {};
    let esValido = true;
        if (!formData.correo) {
            errores.correo = "El correo es obligatorio";
            esValido = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
            errores.correo = "El correo electrónico no es válido";
            esValido = false;    
        }

        if (!formData.contraseña) {
            errores.contraseña = "La contraseña es obligatoria";
            esValido = false; 
        }

        setErrors(errores);
        return esValido;
    };

    /* Manejar eventos */
    const manejarInput = (campo, valor) => {
        setFormData(prev => ({
            ...prev, [campo]: valor
        }));
        if (errors[campo]) {
            setErrors(prev => ({
                ...prev, [campo]: null
            }));
        }
    };

    const altShowPass = () => {
        setShowPass(!showPass);
    };

    


  if (authLoading) {
    return <div className="text-center mt-5"><Spinner animation="border" variant="primary" /></div>;
}

return (
    <Container className='login-container'>
        <Card className='formLogin shadow' >
            <Card.Header>
                <Card.Img className="img" src={logo} />
                <Card.Title className='text-center'>Iniciar Sesión</Card.Title>
            </Card.Header>

            {mensaje && <Alert variant="success">{mensaje}</Alert>}

            <Card.Body>
               <Form>

               {/* Replace email input section with: */}
               <FormInput
                 label="Correo Electrónico"
                 name="correo"
                 value={formData.correo}
                 onChange={(e) => manejarInput("correo", e.target.value)}
                 error={errors.correo}
                 placeholder='Ingrese su correo electrónico'
                 icon={FaUser}
               />

               {/* Replace password input section with: */}
               <FormInput
                 label="Contraseña"
                 name="contraseña"
                 type={showPass ? "text" : "password"}
                 value={formData.contraseña}
                 onChange={(e) => manejarInput("contraseña", e.target.value)}
                 error={errors.contraseña}
                 placeholder='Ingrese su contraseña'
                 icon={showPass ? EyeOff : Eye}
               />

                <Form.Group className='mt-3'>
                    <Form.Label>Contraseña</Form.Label>
                    <InputGroup>
                        <Form.Control
                            id='contrasena'
                            disabled={Cargando}
                            type={showPass ? "text" : "password"}
                            value={formData.contraseña}
                            onChange={(e) => manejarInput("contraseña", e.target.value)}
                            isInvalid={!!errors.contraseña}
                            placeholder='Ingrese su contraseña'/>
                        <Button variant='outline-secondary'
                            onClick={altShowPass}
                            disabled={Cargando}>
                            {showPass ? <EyeOff /> : <Eye />}
                        </Button>
                        <Form.Control.Feedback type='invalid'>{errors.contraseña}</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                

                
                <LoginButton 
                    loading={Cargando}
                    onClick={manejarLogin}
                    text="Iniciar Sesión"
                    loadingText="Cargando..."
                />
                <Container className="text-muted small mt-1 mb-1"><FaUser className="me-1" />Autenticación Local</Container>
                
                
                <div className="mt-3">
                    <BtnLoginGoogle />
                    <div className="text-muted small mt-1"><FaGoogle className="me-1" />Autenticación Google</div>
                </div>

               </Form>

            </Card.Body>

            <Card.Footer>
            <Card.Title className='mt-3 display-1'>Usuarios de la Demo:</Card.Title>
            <Card.Text>
                Admin Local: <br />
                Email: admin@hotelyadran.com <br />
                Password: admin123
            </Card.Text>
        </Card.Footer>

        </Card>

        
    </Container>
  )
}

export default LoginForm
