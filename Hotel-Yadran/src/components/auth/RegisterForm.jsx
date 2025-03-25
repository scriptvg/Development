import React, { useState } from 'react';
import { Container, Card, Form, InputGroup, Button, Alert, Spinner } from 'react-bootstrap';
import { Eye, EyeClosed, EyeOff } from 'lucide-react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Swal from 'sweetalert2';
import usersCalls from '../../config/services/usersCalls';

function RegisterForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    passwordConfirm: "",
    profileImage: null,
    profileImageBase64: null
  });
  const [mensaje, setMensaje] = useState("");
  const [errors, setErrors] = useState({});
  const [Cargando, setCargando] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const validateForm = () => {
    const errores = {};
    let esValido = true;

    if (!formData.nombre) {
      errores.nombre = "El nombre es obligatorio";
      esValido = false;
    }

    if (!formData.email) {
      errores.email = "El correo es obligatorio";
      esValido = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errores.email = "El correo electrónico no es válido";
      esValido = false;    
    }

    if (!formData.password) {
      errores.password = "La contraseña es obligatoria";
      esValido = false; 
    } else if (formData.password.length < 6) {
      errores.password = "La contraseña debe tener al menos 6 caracteres";
      esValido = false; 
    }

    if (!formData.passwordConfirm) {
      errores.passwordConfirm = "Por favor confirme su contraseña";
      esValido = false; 
    } else if (formData.password !== formData.passwordConfirm) {
      errores.passwordConfirm = "Las contraseñas no coinciden";
      esValido = false; 
    }

    setErrors(errores);
    return esValido;
  };

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
    setShowPassword(!showPassword);
  };

  const altShowConfirmPass = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const register = async () => {
    if (!validateForm()) return;

    try {
      setCargando(true);
      // Subir la imagen de perfil
      if (formData.profileImageBase64) {
        await usersCalls.PostUsers({
          ...formData,
          profileImage: formData.profileImageBase64
        });
      }
      await usersCalls.PostUsers(formData.nombre, formData.email, formData.password);
      await mostrarAlerta("success", "¡Registro exitoso!", "Usuario registrado exitosamente");
      setMensaje("¡Registro exitoso!");
      setFormData({
        nombre: "",
        email: "",
        password: "",
        passwordConfirm: "",
        profileImage: null,
        profileImageBase64: null
      });
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
                  value={formData.nombre}
                  onChange={(e) => manejarInput("nombre", e.target.value)}
                  isInvalid={!!errors.nombre}
                  placeholder='Ingrese su nombre'/>
                <Form.Control.Feedback type='invalid'>{errors.nombre}</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group className='mt-3'>
              <Form.Label>Correo Electrónico</Form.Label>
              <InputGroup>
                <Form.Control
                  value={formData.email}
                  onChange={(e) => manejarInput("email", e.target.value)}
                  isInvalid={!!errors.email}
                  placeholder='Ingrese su correo electrónico'/>
                <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group className='mt-3'>
              <Form.Label>Contraseña</Form.Label>
              <InputGroup>
                <Form.Control
                  id='contrasena'
                  disabled={Cargando}
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => manejarInput("password", e.target.value)}
                  isInvalid={!!errors.password}
                  placeholder='Ingrese su contraseña'/>
                <Button variant='outline-secondary'
                  onClick={altShowPass}
                  disabled={Cargando}>
                  {showPassword ? <EyeOff /> : <Eye />}
                </Button>
                <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group className='mt-3'>
              <Form.Label>Confirmar Contraseña</Form.Label>
              <InputGroup>
                <Form.Control
                  id='confirmarContrasena'
                  disabled={Cargando}
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.passwordConfirm}
                  onChange={(e) => manejarInput("passwordConfirm", e.target.value)}
                  isInvalid={!!errors.passwordConfirm}
                  placeholder='Confirme su contraseña'/>
                <Button variant='outline-secondary'
                  onClick={altShowConfirmPass}
                  disabled={Cargando}>
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </Button>
                <Form.Control.Feedback type='invalid'>{errors.passwordConfirm}</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group className='mt-3'>
              <Form.Label>Imagen de Perfil</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => {
                  manejarInput("profileImage", e.target.files[0]);
                  // Convertir la imagen a Base64
                  const reader = new FileReader();
                  reader.onload = () => {
                    setFormData(prev => ({
                      ...prev, profileImageBase64: reader.result
                    }));
                  };
                  reader.readAsDataURL(e.target.files[0]);
                }}
                isInvalid={!!errors.profileImage}
              />
              <Form.Control.Feedback type='invalid'>{errors.profileImage}</Form.Control.Feedback>
            </Form.Group>

            <Button 
              variant="primary" 
              className="w-100 mt-4" 
              onClick={register} 
              disabled={Cargando}>
              {Cargando ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                  <span className="ms-2">Cargando...</span>
                </>
              ) : "Registrar"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default RegisterForm