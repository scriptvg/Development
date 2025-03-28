import React, { useState } from 'react';
import { Container, Card, Form, InputGroup, Button, Alert, Spinner } from 'react-bootstrap';
import { Eye, EyeOff } from 'lucide-react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Swal from 'sweetalert2';
import usersCalls from '../../config/services/usersCalls';
import { useAuth } from '../../config/context/auth/useAuth';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: "",
    email: "",
    contraseña: "",
    confirmarContraseña: "",
    imagenPerfil: null,
    imagenPerfilBase64: null
  });
  const [mensaje, setMensaje] = useState("");
  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [mostrarConfirmacionContraseña, setMostrarConfirmacionContraseña] = useState(false);

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

  const validarFormulario = () => {
    const erroresValidacion = {};
    let esValido = true;

    if (!datosFormulario.nombre) {
      erroresValidacion.nombre = "El nombre es obligatorio";
      esValido = false;
    }

    if (!datosFormulario.email) {
      erroresValidacion.email = "El correo es obligatorio";
      esValido = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datosFormulario.email)) {
      erroresValidacion.email = "El correo electrónico no es válido";
      esValido = false;
    }

    if (!datosFormulario.contraseña) {
      erroresValidacion.contraseña = "La contraseña es obligatoria";
      esValido = false;
    } else if (datosFormulario.contraseña.length < 6) {
      erroresValidacion.contraseña = "La contraseña debe tener al menos 6 caracteres";
      esValido = false;
    }

    if (!datosFormulario.confirmarContraseña) {
      erroresValidacion.confirmarContraseña = "Por favor confirme su contraseña";
      esValido = false;
    } else if (datosFormulario.contraseña !== datosFormulario.confirmarContraseña) {
      erroresValidacion.confirmarContraseña = "Las contraseñas no coinciden";
      esValido = false;
    }

    setErrores(erroresValidacion);
    return esValido;
  };

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

  const alternarConfirmacionContraseña = () => {
    setMostrarConfirmacionContraseña(!mostrarConfirmacionContraseña);
  };

  const registrarUsuario = async () => {
    if (!validarFormulario()) return;

    try {
      setCargando(true);

      // Estructura de datos para el usuario según el nuevo formato
      const datosUsuario = {
        email: datosFormulario.email,
        password: datosFormulario.contraseña,
        rol: "usuario",
        img: {
          imgPerfil: datosFormulario.imagenPerfilBase64
        },
        datos: {
          nombre: datosFormulario.nombre,
          telefono: "",  // Vacío ya que no se recolecta en el formulario
          direccion: ""  // Vacío ya que no se recolecta en el formulario
        }
      };

      // Llamar al servicio para crear el usuario con la nueva estructura
      const usuarioCreado = await usersCalls.PostUsers(
        datosUsuario.email,
        datosUsuario.password,
        datosUsuario.rol,
        datosUsuario.img,
        datosUsuario.datos
      );

      // Datos completos del usuario para el login
      const datosUsuarioCompletos = {
        ...usuarioCreado,
        roles: ["usuario"], // Asegurar que tenga rol de usuario para compatibilidad
        nombre: datosUsuario.datos.nombre,
        ImgPerfil: datosUsuario.img.imgPerfil
      };

      // Iniciar sesión con el usuario recién creado
      login(datosUsuarioCompletos);

      await mostrarAlerta("success", "¡Registro exitoso!", "Usuario registrado exitosamente");
      setMensaje("¡Registro exitoso!");

      // Limpiar el formulario
      setDatosFormulario({
        nombre: "",
        email: "",
        contraseña: "",
        confirmarContraseña: "",
        imagenPerfil: null,
        imagenPerfilBase64: null
      });

      // Redirigir al usuario a la página principal después del registro
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      await mostrarAlerta("error", "Error", "Ocurrió un error al registrar el usuario");
      console.error("Error al registrar el usuario:", error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <Container className='register-container'>
      <Card className='formRegister shadow' >
        <Card.Header>
          <Card.Title className='text-center'>Registro</Card.Title>
        </Card.Header>

        {mensaje && <Alert variant="success">{mensaje}</Alert>}

        <Card.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <InputGroup>
                <Form.Control
                  value={datosFormulario.nombre}
                  onChange={(e) => manejarInput("nombre", e.target.value)}
                  isInvalid={!!errores.nombre}
                  placeholder='Ingrese su nombre' />
                <Form.Control.Feedback type='invalid'>{errores.nombre}</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group className='mt-3'>
              <Form.Label>Correo Electrónico</Form.Label>
              <InputGroup>
                <Form.Control
                  value={datosFormulario.email}
                  onChange={(e) => manejarInput("email", e.target.value)}
                  isInvalid={!!errores.email}
                  placeholder='Ingrese su correo electrónico' />
                <Form.Control.Feedback type='invalid'>{errores.email}</Form.Control.Feedback>
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

            <Form.Group className='mt-3'>
              <Form.Label>Confirmar Contraseña</Form.Label>
              <InputGroup>
                <Form.Control
                  id='confirmarContrasena'
                  disabled={cargando}
                  type={mostrarConfirmacionContraseña ? "text" : "password"}
                  value={datosFormulario.confirmarContraseña}
                  onChange={(e) => manejarInput("confirmarContraseña", e.target.value)}
                  isInvalid={!!errores.confirmarContraseña}
                  placeholder='Confirme su contraseña' />
                <Button variant='outline-secondary'
                  onClick={alternarConfirmacionContraseña}
                  disabled={cargando}>
                  {mostrarConfirmacionContraseña ? <EyeOff /> : <Eye />}
                </Button>
                <Form.Control.Feedback type='invalid'>{errores.confirmarContraseña}</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group className='mt-3'>
              <Form.Label>Imagen de Perfil</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    manejarInput("imagenPerfil", e.target.files[0]);
                    // Convertir la imagen a Base64
                    const lector = new FileReader();
                    lector.onload = () => {
                      setDatosFormulario(prev => ({
                        ...prev, imagenPerfilBase64: lector.result
                      }));
                    };
                    lector.readAsDataURL(e.target.files[0]);
                  }
                }}
                isInvalid={!!errores.imagenPerfil}
              />
              <Form.Control.Feedback type='invalid'>{errores.imagenPerfil}</Form.Control.Feedback>
              {datosFormulario.imagenPerfil && (
                <div className="mt-2">
                  <small className="text-success">
                    Imagen seleccionada: {datosFormulario.imagenPerfil.name}
                  </small>
                </div>
              )}
            </Form.Group>

            <Form.Group>
              <Button
                variant="primary"
                className="w-100 mt-4"
                onClick={registrarUsuario}
                disabled={cargando}>
                {cargando ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                    <span className="ms-2">Cargando...</span>
                  </>
                ) : "Registrar"}
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default RegisterForm;