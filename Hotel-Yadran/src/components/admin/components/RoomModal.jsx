import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import BadgeComponent from '../../test/BadgeComponent';
import "../styles/roomModal.css"
import { Wifi, AirVent, Tv, Bath, Bed, DollarSign, Users, FileText, CheckSquare, Hash, Image } from 'lucide-react';
import { GiPalmTree } from 'react-icons/gi';
import Swal from 'sweetalert2';

const RoomModal = ({ show, handleClose, roomData, handleInputChange, handleSaveRoom: externalHandleSaveRoom }) => {
    const services = Array.isArray(roomData.services) ? roomData.services : [];
    const [imagePreview, setImagePreview] = useState(roomData.image || null);

    const validateForm = () => {
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
        return { isValid: true };
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
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
        const validation = validateForm();
        
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

    const servicesList = [
        { value: 'wifi', label: 'Wi-Fi', icon: <Wifi size={18} /> },
        { value: 'aire_acondicionado', label: 'Aire Acondicionado', icon: <AirVent size={18} /> },
        { value: 'tv', label: 'Smart TV', icon: <Tv size={18} /> },
        { value: 'vista_al_mar', label: 'Vista al Mar', icon: <GiPalmTree size={18} /> },
        { value: 'bano_privado', label: 'Baño Privado', icon: <Bath size={18} /> }
    ];

    const handleServiceChange = (e) => {
        const { value, checked } = e.target;
        let updatedServices;
        
        if (checked) {
            updatedServices = [...services, value];
        } else {
            updatedServices = services.filter(service => service !== value);
        }
        
        handleInputChange({ target: { name: 'services', value: updatedServices } });
    };

    const getServiceIcon = (service) => {
        switch (service) {
            case 'wifi':
                return <Wifi size={22} />;
            case 'aire_acondicionado':
                return <AirVent size={22} />;
            case 'tv':
                return <Tv size={22} />;
            case 'vista_al_mar':
                return <GiPalmTree size={22} />;
            case 'bano_privado':
                return <Bath size={22} />;
            default:
                return null;
        }
    };

    return (
        <Modal 
            show={show} 
            onHide={handleClose} 
            centered 
            className="room-modal"
            dialogClassName="modal-dialog-centered modal-dialog-scrollable"
            size="lg"
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
                                        onChange={handleImageChange}
                                        className="form-control-lg shadow-sm"
                                    />
                                    {imagePreview && (
                                        <div className="image-preview" style={{width: '100px', height: '100px'}}>
                                            <img 
                                                src={imagePreview} 
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
                                    <FileText className="me-2 text-primary" size={18} />
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

                    <Form.Group controlId="formRoomAvailable" className="mt-4">
                        <Form.Check
                            type="checkbox"
                            label={<span className="fs-5 text-success">
                                <CheckSquare className="me-2" size={18} />
                                Disponible
                            </span>}
                            name="available"
                            checked={roomData.available}
                            onChange={(e) => handleInputChange({ target: { name: 'available', value: e.target.checked } })}
                        />
                    </Form.Group>
                </Form>
                
                <div className="form-section services-section mt-4 pt-4 border-top">
                    <Form.Group controlId="formRoomServices">
                        <Form.Label className="h5 mb-3 text-primary">Servicios Disponibles</Form.Label>
                        <div className="row g-3">
                        {servicesList.map(service => (
                                <div className="col-md-6" key={service.value}>
                            <Form.Check
                                type="checkbox"
                                        label={<span className="fs-6 d-flex align-items-center">
                                            <span className="text-primary">{service.icon}</span>
                                            <span className="ms-2">{service.label}</span>
                                        </span>}
                                value={service.value}
                                checked={services.includes(service.value)}
                                onChange={handleServiceChange}
                                        className="py-2 custom-checkbox"
                            />
                                </div>
                        ))}
                        </div>
                    </Form.Group>
                    
                    <Form.Group controlId="formRoomSelectedServices" className="mt-4">
                        <Form.Label className="h5 mb-3 text-primary">Servicios Seleccionados</Form.Label>
                        <div className="d-flex flex-wrap gap-2">
                            {services.map(service => (
                                <BadgeComponent 
                                    key={service} 
                                    text={service} 
                                    variant="info" 
                                    icon={getServiceIcon(service)} 
                                />
                            ))}
                            {services.length === 0 && (
                                <p className="text-muted fst-italic">No hay servicios seleccionados</p>
                            )}
                        </div>
                    </Form.Group>
                </div>
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