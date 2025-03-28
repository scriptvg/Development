import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/* Componentes de Bootstrap */
import { Container, Card, Form, InputGroup, Button, Alert, Spinner } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Swal from 'sweetalert2';

import logo from '../../assets/img/logo.jpg'

import { Eye, EyeOff } from "lucide-react"
import { FaUser, FaGoogle } from "react-icons/fa"

/* Servicios */
import usersCalls from '../../config/services/usersCalls';
import { useAuth } from "../../config/context/auth/useAuth"

/* CustomComponetes */
import BtnLoginGoogle from './components/BtnLoginGoogle';




function LoginForm() {

    const navigate = useNavigate();
    const { login, loading: authLoading } = useAuth();

    /* Datos */
    const [datosFormulario, setDatosFormulario] = useState({
        correo: "",
        contraseña: ""
    });
    const [mensaje, setMensaje] = useState("");
    const [errores, setErrores] = useState({});
    const [cargando, setCargando] = useState(false);
    const [mostrarContraseña, setMostrarContraseña] = useState(false);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        cargarDatosUsuario();
    }, []);

    /* Alerta */
    const mostrarAlerta = (icono, titulo, texto) => {
        return Swal.mixin({
            icon: icono,
            title: titulo,
            text: texto,
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
        }).fire();
    };

    /* Cargar datos */
    const cargarDatosUsuario = async () => {
        try {
            setCargando(true);
            const datos = await usersCalls.GetUsers();
            setUsuarios(datos);
        } catch (error) {
            await mostrarAlerta("error", "Error", "Ocurrió un error al cargar los datos");
        } finally {
            setCargando(false);
        };
    };

    /* Manejar inicio de sesión */
    const iniciarSesion = async () => {
        if (!validarFormulario()) return;

        try {
            setCargando(true);

            // Buscar usuario por correo y contraseña usando la nueva estructura
            const usuarioEncontrado = usuarios.find(
                (usuario) => usuario.email === datosFormulario.correo &&
                    (usuario.password === datosFormulario.contraseña)
            );

            if (usuarioEncontrado) {
                // Adaptar la estructura de roles según la nueva estructura
                const rolUsuario = usuarioEncontrado.rol || 'usuario';

                // Crear objeto de usuario con la nueva estructura
                const datosUsuarioCompletos = {
                    ...usuarioEncontrado,
                    roles: [rolUsuario], // Mantener compatibilidad con el sistema de roles existente
                    // Asegurar que los datos estén disponibles en el formato esperado por la aplicación
                    nombre: usuarioEncontrado.datos?.nombre || '',
                    telefono: usuarioEncontrado.datos?.telefono || '',
                    direccion: usuarioEncontrado.datos?.direccion || '',
                    ImgPerfil: usuarioEncontrado.img?.imgPerfil || null
                };

                login(datosUsuarioCompletos);
                await mostrarAlerta("success", "¡Bienvenido!", "Inicio de sesión exitoso");

                // Redireccionar según el rol del usuario
                if (rolUsuario === 'admin') {
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
    const validarFormulario = () => {
        const erroresValidacion = {};
        let esValido = true;

        if (!datosFormulario.correo) {
            erroresValidacion.correo = "El correo es obligatorio";
            esValido = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datosFormulario.correo)) {
            erroresValidacion.correo = "El correo electrónico no es válido";
            esValido = false;
        }

        if (!datosFormulario.contraseña) {
            erroresValidacion.contraseña = "La contraseña es obligatoria";
            esValido = false;
        }

        setErrores(erroresValidacion);
        return esValido;
    };

    /* Manejar eventos */
    const manejarInput = (campo, valor) => {
        setDatosFormulario(prev => ({
            ...prev, [campo]: valor
        }));
        if (errores[campo]) {
            setErrores(prev => ({
                ...prev, [campo]: null
            }));
        }
    };

    const alternarContraseña = () => {
        setMostrarContraseña(!mostrarContraseña);
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

                        <Form.Group>
                            <Form.Label>Correo Electrónico</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    value={datosFormulario.correo}
                                    onChange={(e) => manejarInput("correo", e.target.value)}
                                    isInvalid={!!errores.correo}
                                    placeholder='Ingrese su correo electrónico' />
                                <Form.Control.Feedback type='invalid'>{errores.correo}</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className='mt-3'>
                            <Form.Label>Contraseña</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    id='contrasena'
                                    disabled={cargando}
                                    type={mostrarContraseña ? "text" : "password"}
                                    value={datosFormulario.contraseña}
                                    onChange={(e) => manejarInput("contraseña", e.target.value)}
                                    isInvalid={!!errores.contraseña}
                                    placeholder='Ingrese su contraseña' />
                                <Button variant='outline-secondary'
                                    onClick={alternarContraseña}
                                    disabled={cargando}>
                                    {mostrarContraseña ? <EyeOff /> : <Eye />}
                                </Button>
                                <Form.Control.Feedback type='invalid'>{errores.contraseña}</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>


                        <Button
                            variant="primary"
                            className="w-100 mt-4"
                            onClick={iniciarSesion}
                            disabled={cargando}>
                            {cargando ? (
                                <>
                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                    <span className="ms-2">Cargando...</span>
                                </>
                            ) : "Iniciar Sesión"}
                        </Button>
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
