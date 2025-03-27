import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import BadgeComponent from '../../utils/BadgeComponent';
import EstadoSelectChips from '../../components/common/EstadoSelectChips';
import "./styles/roomModal.css"
import { Bed, DollarSign, Users, FileText, Hash, Image } from 'lucide-react';
import Swal from 'sweetalert2';
import { LISTA_SERVICIOS, SERVICIOS } from '../../utils/ServicesConfig.jsx';
import { ESTADOS } from '../../utils/estadosConfig.jsx';
import './styles/modalStyles.css';

/* Constantes de configuración */
const TAMAÑOS = {
    ICONO_PEQUEÑO: 14,
    ICONO_NORMAL: 18,
    ICONO_GRANDE: 22,
    ICONO_EXTRA: 28
};

const DIMENSIONES = {
    PREVIEW: {
        ANCHO: '100px',
        ALTO: '100px'
    },
    MODAL: 'lg'
};

/* Componente modal de habitaciones */
const RoomModal = ({ show, handleClose, handleSaveRoom: externalHandleSaveRoom }) => {
    const [roomData, setRoomData] = useState({
        name: '',
        type: '',
        price: '',
        capacity: '',
        description: '',
        image: null,
        services: [], // Make sure this is initialized as an empty array
        estado: ESTADOS.DISPONIBLE
    });
    
    const [previewImagen, setPreviewImagen] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRoomData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Añadir useEffect para actualizar el preview cuando cambian los datos
    useEffect(() => {
        if (roomData.image) {
            setPreviewImagen(roomData.image);
        } else {
            setPreviewImagen(null);
        }
    }, [roomData.image]);

    /* Función de validación del formulario */
    const validarFormulario = () => {
        if (!roomData.name?.trim()) {
            return { isValid: false, message: 'El nombre de la habitación es requerido' };
        }
        if (!roomData.type?.trim()) {
            return { isValid: false, message: 'El tipo de habitación es requerido' };
        }
        if (!roomData.price || roomData.price <= 0) {
            return { isValid: false, message: 'El precio debe ser mayor a 0' };
        }
        if (!roomData.capacity || roomData.capacity <= 0) {
            return { isValid: false, message: 'La capacidad debe ser mayor a 0' };
        }
        if (!roomData.description?.trim()) {
            return { isValid: false, message: 'La descripción es requerida' };
        }
        if (!roomData.image) {
            return { isValid: false, message: 'La imagen es requerida' };
        }
        if (!roomData.estado) {
            return { isValid: false, message: 'El estado de la habitación es requerido' };
        }
        return { isValid: true };
    };

    /* Manejador de cambio de imagen */
    const manejarCambioImagen = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImagen(reader.result);
                handleInputChange({ 
                    target: { 
                        name: 'image', 
                        value: reader.result 
                    } 
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveRoom = async () => {
        const validation = validarFormulario();
        
        if (!validation.isValid) {
            await Swal.fire({
                icon: 'error',
                title: 'Error de validación',
                text: validation.message,
                confirmButtonColor: '#3085d6'
            });
            return;
        }

        try {
            // Convertir los datos al formato esperado por el backend
            const roomToSave = {
                nombre: roomData.name,
                tipo: roomData.type,
                precio: parseFloat(roomData.price),
                capacidad: parseInt(roomData.capacity),
                descripcion: roomData.description,
                imagen: roomData.image,
                servicios: roomData.services,
                estado: roomData.estado
            };

            if (typeof externalHandleSaveRoom === 'function') {
                await Swal.fire({
                    title: '¿Estás seguro?',
                    text: "¿Deseas añadir esta nueva habitación?",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, añadir',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        externalHandleSaveRoom(roomToSave);
                        handleClose();
                        Swal.fire(
                            '¡Completado!',
                            'La habitación ha sido añadida exitosamente.',
                            'success'
                        );
                    }
                });
            }
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al procesar la solicitud',
                confirmButtonColor: '#3085d6'
            });
        }
    };

    const handleServiceChange = (serviceValue) => {
        const currentServices = Array.isArray(roomData.services) ? roomData.services : [];
        const updatedServices = currentServices.includes(serviceValue)
            ? currentServices.filter(service => service !== serviceValue)
            : [...currentServices, serviceValue];
        
        setRoomData(prev => ({
            ...prev,
            services: updatedServices
        }));
    };

    const obtenerIconoServicio = (servicio) => {
        const service = LISTA_SERVICIOS.find(s => s.valor === servicio);
        if (!service) return null;
        
        return React.cloneElement(service.icono, { size: TAMAÑOS.ICONO_GRANDE });
    };

    return (
        <Modal 
            show={show} 
            onHide={handleClose} 
            centered 
            className="room-modal"
            size="lg"
        >
            <Modal.Header closeButton className="bg-primary text-white">
                <Modal.Title className="d-flex align-items-center gap-2">
                    <Bed className="text-light" size={28} />
                    <span className="h4 mb-0">
                        Nueva Habitación
                    </span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="py-4 bg-light">
                <Form className="form-section form-section-left">
                    <div className="row g-4">
                        <div className="col-12 mb-4">
                            <Form.Group controlId="formRoomImage">
                                <Form.Label className="fw-semibold mb-2 text-dark">
                                    <Image className="me-2 text-primary" size={18} />
                                    Imagen de la Habitación <span className="text-danger">*</span>
                                </Form.Label>
                                <div className="d-flex align-items-center gap-3">
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        onChange={manejarCambioImagen}
                                        className="form-control-lg shadow-sm"
                                    />
                                    {previewImagen && (
                                        <div className="image-preview" style={{width: '100px', height: '100px'}}>
                                            <img 
                                                src={previewImagen} 
                                                alt="Preview" 
                                                style={{
                                                    width: '100%', 
                                                    height: '100%', 
                                                    objectFit: 'cover',
                                                    borderRadius: '8px'
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-6">
                    <Form.Group controlId="formRoomName">
                                <Form.Label className="fw-semibold mb-2 text-dark">
                                    <Bed className="me-2 text-primary" size={18} />
                                    Nombre <span className="text-danger">*</span>
                                </Form.Label>
                        <Form.Control
                            type="text"  
                            name="name"
                            value={roomData.name}
                            onChange={handleInputChange}
                            placeholder="Nombre de la habitación"
                            required
                                    className="form-control-lg shadow-sm"
                        />
                    </Form.Group>
                        </div>
                        <div className="col-md-6">
                    <Form.Group controlId="formRoomType">
                                <Form.Label className="fw-semibold mb-2 text-dark">
                                    <FileText className="me-2 text-primary" size={18} />
                                    Tipo <span className="text-danger">*</span>
                                </Form.Label>
                        <Form.Control
                            type="text"
                            name="type"
                            value={roomData.type}
                            onChange={handleInputChange}
                            placeholder="Tipo de habitación"
                            required
                                    className="form-control-lg shadow-sm"
                        />
                    </Form.Group>
                        </div>
                        <div className="col-md-6">
                    <Form.Group controlId="formRoomPrice">
                                <Form.Label className="fw-semibold mb-2 text-dark">
                                    <DollarSign className="me-2 text-success" size={18} />
                                    Precio <span className="text-danger">*</span>
                                </Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={roomData.price}
                            onChange={handleInputChange}
                            placeholder="Precio de la habitación"
                            required
                                    className="form-control-lg shadow-sm"
                        />
                    </Form.Group>
                        </div>
                        <div className="col-md-6">
                    <Form.Group controlId="formRoomCapacity">
                                <Form.Label className="fw-semibold mb-2 text-dark">
                                    <Users className="me-2 text-info" size={18} />
                                    Capacidad <span className="text-danger">*</span>
                                </Form.Label>
                        <Form.Control
                            type="number"
                            name="capacity"
                            value={roomData.capacity}
                            onChange={handleInputChange}
                            placeholder="Capacidad de la habitación"
                            required
                                    className="form-control-lg shadow-sm"
                        />
                    </Form.Group>
                        </div>
                        <div className="col-12">
                            <Form.Group controlId="formRoomDescription">
                                <Form.Label className="fw-semibold mb-2 text-dark">
                                    <FileText className="me-2 text-primary" size={TAMAÑOS.ICONO_NORMAL} />
                                    Descripción <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="description"
                                    value={roomData.description}
                                    onChange={handleInputChange}
                                    placeholder="Descripción detallada de la habitación..."
                                    required
                                    className="form-control-lg shadow-sm"
                                    rows={4}
                                    style={{resize: 'none'}}
                                />
                            </Form.Group>
                        </div>
                    </div>

                </Form>
                
                <Container className="form-section services-section mt-4 pt-4 border-top">
                    <Container className='mb-3'>
                            <Form.Group controlId="formRoomServices">
                            
                            <Form.Label className="h5 mb-3 text-primary">Servicios Disponibles</Form.Label>

                            <Container className="d-flex flex-wrap gap-3">
                                {LISTA_SERVICIOS.map(servicio => (
                                    <BadgeComponent
                                        key={servicio.valor}
                                        text={servicio.etiqueta}
                                        variant={(roomData.services || []).includes(servicio.valor) ? 'info' : 'secondary'}
                                        icon={servicio.icono}
                                        onClick={() => handleServiceChange(servicio.valor)}
                                        className="cursor-pointer service-chip"
                                        maxWidth="auto" // Allow full width for service chips
                                    />
                                ))}
                            </Container>

                            {/* Selector de Estado (replace with new component) */}
                            <Container className='mb-3 mt-4'>
                                <Form.Label className="h5 mb-3 text-primary">Estado de la Habitación</Form.Label>
                                <EstadoSelectChips
                                    estadoSeleccionado={roomData.estado || ESTADOS.DISPONIBLE}
                                    onChange={(estado) => handleInputChange({
                                        target: { name: 'estado', value: estado }
                                    })}
                                    className="mt-2"
                                />
                            </Container>

                        </Form.Group>
                    </Container>
                
                    </Container>
                    
                    
                    
                    
                    
              
            </Modal.Body>
            <Modal.Footer className="border-top py-3 bg-light">
                <Button 
                    variant="outline-secondary" 
                    onClick={handleClose} 
                    size="lg"
                    className="px-4"
                >
                    Cancelar
                </Button>
                <Button 
                    variant="primary" 
                    onClick={handleSaveRoom} 
                    size="lg"
                    className="px-4"
                >
                    {roomData.id ? 'Actualizar' : 'Añadir'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RoomModal;