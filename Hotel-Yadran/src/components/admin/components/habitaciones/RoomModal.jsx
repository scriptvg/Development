import React, { useState } from 'react';
import { Modal, Button, Form, Container } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import BadgeComponent from '../../utils/BadgeComponent';
import "./styles/roomModal.css"
import { Wifi, AirVent, Tv, Bath, Bed, DollarSign, Users, FileText, CheckSquare, Hash, Image } from 'lucide-react';
import { GiPalmTree } from 'react-icons/gi';
import Swal from 'sweetalert2';
import EstadoSelectModal from '../../utils/EstadoSelectModal';

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

const SERVICIOS = {
    WIFI: 'wifi',
    AIRE: 'aire_acondicionado',
    TV: 'tv',
    VISTA_MAR: 'vista_al_mar',
    BAÑO: 'bano_privado'
};

const LISTA_SERVICIOS = [
    { valor: SERVICIOS.WIFI, etiqueta: 'Wi-Fi', icono: <Wifi size={TAMAÑOS.ICONO_NORMAL} /> },
    { valor: SERVICIOS.AIRE, etiqueta: 'Aire Acondicionado', icono: <AirVent size={TAMAÑOS.ICONO_NORMAL} /> },
    { valor: SERVICIOS.TV, etiqueta: 'Smart TV', icono: <Tv size={TAMAÑOS.ICONO_NORMAL} /> },
    { valor: SERVICIOS.VISTA_MAR, etiqueta: 'Vista al Mar', icono: <GiPalmTree size={TAMAÑOS.ICONO_NORMAL} /> },
    { valor: SERVICIOS.BAÑO, etiqueta: 'Baño Privado', icono: <Bath size={TAMAÑOS.ICONO_NORMAL} /> }
];

const ESTADOS = {
    DISPONIBLE: 'disponible',
    NO_DISPONIBLE: 'no_disponible',
    MANTENIMIENTO: 'mantenimiento'
};

/* Componente modal de habitaciones */
const RoomModal = ({ show, handleClose, roomData, handleInputChange, handleSaveRoom: externalHandleSaveRoom }) => {
    const [previewImagen, setPreviewImagen] = useState(roomData.image || null);
    const servicios = Array.isArray(roomData.services) ? roomData.services : [];

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
        if (typeof externalHandleSaveRoom === 'function') {
                await Swal.fire({
                    title: '¿Estás seguro?',
                    text: roomData.id ? 
                        "¿Deseas actualizar esta habitación?" : 
                        "¿Deseas añadir esta nueva habitación?",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: roomData.id ? 'Sí, actualizar' : 'Sí, añadir',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
            externalHandleSaveRoom(roomData);
                        Swal.fire(
                            '¡Completado!',
                            roomData.id ? 
                                'La habitación ha sido actualizada exitosamente.' : 
                                'La habitación ha sido añadida exitosamente.',
                            'success'
                        );
                    }
                });
        } else {
            console.warn('No handleSaveRoom function provided to RoomModal');
            handleClose();
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
        const updatedServices = servicios.includes(serviceValue)
            ? servicios.filter(service => service !== serviceValue)
            : [...servicios, serviceValue];
        
        handleInputChange({ target: { name: 'services', value: updatedServices } });
    };

    const obtenerIconoServicio = (servicio) => {
        const iconSize = TAMAÑOS.ICONO_GRANDE;
        switch (servicio) {
            case SERVICIOS.WIFI: return <Wifi size={iconSize} />;
            case SERVICIOS.AIRE: return <AirVent size={iconSize} />;
            case SERVICIOS.TV: return <Tv size={iconSize} />;
            case SERVICIOS.VISTA_MAR: return <GiPalmTree size={iconSize} />;
            case SERVICIOS.BAÑO: return <Bath size={iconSize} />;
            default: return null;
        }
    };

    return (
        <Modal 
            show={show} 
            onHide={handleClose} 
            centered 
            className="room-modal"
            dialogClassName="modal-dialog-centered modal-dialog-scrollable"
            size={DIMENSIONES.MODAL}
        >
            <Modal.Header closeButton className="border-bottom bg-light">
                <Modal.Title className="d-flex align-items-center justify-content-between w-100">
                    <div className="d-flex align-items-center">
                        <Bed className="me-3 text-primary" size={28} />
                        <span className="h4 mb-0">
                            {roomData.id ? 'Editar Habitación' : 'Añadir Habitación'}
                        </span>
                    </div>
                    <div className="badge bg-secondary d-flex align-items-center">
                        <Hash size={14} className="me-1" />
                        <span className="fs-6">{roomData.id || 'Nueva'}</span>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="py-4 bg-white">
                <Form className="form-section form-section-left">
                    <div className="row g-4">
                        {/* Image Upload Section */}
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

                            <Container className="d-flex flex-wrap gap-2">
                                {LISTA_SERVICIOS.map(servicio => (
                                    <BadgeComponent
                                        key={servicio.valor}
                                        text={servicio.etiqueta}
                                        variant={servicios.includes(servicio.valor) ? 'info' : 'secondary'}
                                        icon={servicio.icono}
                                        onClick={() => handleServiceChange(servicio.valor)}
                                        className="cursor-pointer"
                                    />
                                ))}
                            </Container>

                            {/* Selector de Estado */}
                    <Container className='mb-3'>
                        <EstadoSelectModal 
                            estadoSeleccionado={roomData.estado || ESTADOS.DISPONIBLE}
                            onChange={(estado) => handleInputChange({
                                target: { name: 'estado', value: estado }
                            })}
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