import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Container, Row, Col, InputGroup } from 'react-bootstrap';
import BadgeComponent from '../../utils/BadgeComponent';
import EstadoSelectChips from '../../components/common/EstadoSelectChips';
import { Bed, DollarSign, Users, FileText, Hash, Image, Save, X, Upload, Tv } from 'lucide-react';
import Swal from 'sweetalert2';
import { LISTA_SERVICIOS, SERVICIOS } from '../../utils/ServicesConfig.jsx';
import './styles/modalStyles.css';

const EditRoomModal = ({ show, handleClose, room, handleSaveRoom }) => {
    const [editedRoom, setEditedRoom] = useState(null);
    const [previewImagen, setPreviewImagen] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        if (room) {
            // Asegurarse de que la imagen se maneja correctamente
            const formattedRoom = {
                id: room.id,
                name: room.nombre || room.name,
                type: room.tipo || room.type,
                price: room.precio || room.price,
                capacity: room.capacidad || room.capacity,
                description: room.descripcion || room.description,
                image: room.imagen || room.image, // Añadir verificación para 'imagen'
                services: room.servicios || room.services || [],
                estado: room.estado
            };
            setEditedRoom(formattedRoom);
            setPreviewImagen(formattedRoom.image);
            console.log("Imagen recibida:", formattedRoom.image); // Debug
        }
    }, [room]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedRoom(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleServiceChange = (serviceValue) => {
        const services = Array.isArray(editedRoom.services) ? editedRoom.services : [];
        const updatedServices = services.includes(serviceValue)
            ? services.filter(service => service !== serviceValue)
            : [...services, serviceValue];
        
        setEditedRoom(prev => ({
            ...prev,
            services: updatedServices
        }));
    };

    const handleSubmit = async () => {
        try {
            // Convertir los campos de vuelta al formato esperado por el backend
            const roomToSave = {
                ...editedRoom,
                nombre: editedRoom.name,
                tipo: editedRoom.type,
                precio: editedRoom.price,
                capacidad: editedRoom.capacity,
                descripcion: editedRoom.description,
                servicios: editedRoom.services,
                imagen: editedRoom.image
            };

            await Swal.fire({
                title: '¿Confirmar cambios?',
                text: "¿Deseas guardar los cambios realizados?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Guardar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    handleSaveRoom(roomToSave);
                    handleClose();
                }
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al guardar los cambios'
            });
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            processFile(file);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Formato no válido',
                text: 'Por favor sube una imagen válida'
            });
        }
    };

    const manejarCambioImagen = (e) => {
        const file = e.target.files[0];
        if (file) {
            processFile(file);
        }
    };

    const processFile = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImagen(reader.result);
            setEditedRoom(prev => ({
                ...prev,
                image: reader.result
            }));
        };
        reader.readAsDataURL(file);
    };

    if (!editedRoom) return null;

    return (
        <Modal 
            show={show} 
            onHide={handleClose} 
            centered 
            size="lg"
            className="room-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title className="d-flex align-items-center gap-2">
                    <div className="bg-primary bg-opacity-20 p-2 rounded-circle">
                        <Bed className="text-primary" size={24} />
                    </div>
                    <div>
                        <span className="h4 mb-0 fw-bold">Editar Habitación</span>
                        <div className="text-muted small fw-medium">{editedRoom.id}</div>
                    </div>
                </Modal.Title>
            </Modal.Header>
            
            <Modal.Body className="pt-4 pb-3">
                <Form className="custom-form">
                    <Row className="g-4">
                        <Col lg={12}>
                            <Form.Group>
                                <Form.Label className="d-flex align-items-center gap-2 mb-3">
                                    <Image size={18} className="text-primary" />
                                    <span className="fw-semibold">Imagen de la habitación</span>
                                </Form.Label>
                                
                                <div 
                                    className={`p-3 mb-3 rounded-4 text-center ${isDragging ? 'bg-primary bg-opacity-10' : 'bg-light'}`}
                                    style={{
                                        border: `2px dashed ${isDragging ? '#3498db' : '#dee2e6'}`,
                                        transition: 'all 0.2s ease'
                                    }}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    {previewImagen ? (
                                        <div className="position-relative">
                                            <img 
                                                src={previewImagen} 
                                                alt="Vista previa" 
                                                style={{
                                                    maxWidth: '100%',
                                                    maxHeight: '250px',
                                                    objectFit: 'contain',
                                                    borderRadius: '8px',
                                                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="py-4">
                                            <Upload size={48} className="text-primary mb-3" />
                                            <p className="mb-0">Arrastra una imagen aquí o haz clic para seleccionar</p>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="d-flex justify-content-center mb-4">
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        onChange={manejarCambioImagen}
                                        className="d-none"
                                        id="imageUpload"
                                    />
                                    <label htmlFor="imageUpload" className="btn btn-outline-primary d-flex align-items-center gap-2">
                                        <Upload size={16} />
                                        Seleccionar imagen
                                    </label>
                                </div>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group>
                                <Form.Label className="fw-semibold d-flex align-items-center gap-2" htmlFor="roomName">
                                    <Hash size={16} className="text-primary" />
                                    Nombre
                                </Form.Label>
                                <Form.Control
                                    id="roomName"
                                    type="text"
                                    name="name"
                                    value={editedRoom.name || ''}
                                    onChange={handleInputChange}
                                    className="shadow-sm"
                                    placeholder="Ej: Suite Deluxe"
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group>
                                <Form.Label className="fw-semibold d-flex align-items-center gap-2" htmlFor="roomType">
                                    <FileText size={16} className="text-primary" />
                                    Tipo
                                </Form.Label>
                                <Form.Control
                                    id="roomType"
                                    type="text"
                                    name="type"
                                    value={editedRoom.type || ''}
                                    onChange={handleInputChange}
                                    className="shadow-sm"
                                    placeholder="Ej: Standard, Premium, Suite"
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group>
                                <Form.Label className="fw-semibold d-flex align-items-center gap-2" htmlFor="roomPrice">
                                    <DollarSign size={16} className="text-primary" />
                                    Precio
                                </Form.Label>
                                <InputGroup className="shadow-sm">
                                    <InputGroup.Text className="bg-light">CLP</InputGroup.Text>
                                    <Form.Control
                                        id="roomPrice"
                                        type="number"
                                        name="price"
                                        value={editedRoom.price || ''}
                                        onChange={handleInputChange}
                                        placeholder="Ej: 150000"
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group>
                                <Form.Label className="fw-semibold d-flex align-items-center gap-2" htmlFor="roomCapacity">
                                    <Users size={16} className="text-primary" />
                                    Capacidad
                                </Form.Label>
                                <InputGroup className="shadow-sm">
                                    <Form.Control
                                        id="roomCapacity"
                                        type="number"
                                        name="capacity"
                                        value={editedRoom.capacity || ''}
                                        onChange={handleInputChange}
                                        placeholder="Ej: 2"
                                    />
                                    <InputGroup.Text className="bg-light">personas</InputGroup.Text>
                                </InputGroup>
                            </Form.Group>
                        </Col>

                        <Col xs={12}>
                            <Form.Group>
                                <Form.Label className="fw-semibold d-flex align-items-center gap-2" htmlFor="roomDescription">
                                    <FileText size={16} className="text-primary" />
                                    Descripción
                                </Form.Label>
                                <Form.Control
                                    id="roomDescription"
                                    as="textarea"
                                    name="description"
                                    value={editedRoom.description || ''}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="shadow-sm"
                                    placeholder="Describe los detalles de la habitación..."
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="mt-5 pt-3 border-top border-2">
                        <Form.Group>
                            <Form.Label className="fw-semibold fs-5 d-flex align-items-center gap-2 mb-3">
                                <Tv size={18} className="text-primary" />
                                Servicios disponibles
                            </Form.Label>
                            <div className="d-flex flex-wrap gap-2 mb-4">
                                {LISTA_SERVICIOS.map(servicio => (
                                    <div 
                                        key={servicio.valor}
                                        className={`p-2 px-3 rounded-pill d-flex align-items-center gap-2 shadow-sm cursor-pointer ${
                                            editedRoom.services?.includes(servicio.valor) 
                                                ? 'bg-primary text-white' 
                                                : 'bg-light text-dark'
                                        }`}
                                        style={{ 
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onClick={() => handleServiceChange(servicio.valor)}
                                    >
                                        {servicio.icono}
                                        <span className="fw-medium">{servicio.etiqueta}</span>
                                    </div>
                                ))}
                            </div>
                        </Form.Group>

                        <Form.Group className="mt-4">
                            <Form.Label className="fw-semibold fs-5 d-flex align-items-center gap-2 mb-3">
                                <FileText size={18} className="text-primary" />
                                Estado de la habitación
                            </Form.Label>
                            <div className="shadow-sm rounded-3 border p-3">
                                <EstadoSelectChips
                                    estadoSeleccionado={editedRoom.estado}
                                    onChange={(estado) => handleInputChange({
                                        target: { name: 'estado', value: estado }
                                    })}
                                />
                            </div>
                        </Form.Group>
                    </div>
                </Form>
            </Modal.Body>

            <Modal.Footer className="border-top py-3">
                <Button 
                    variant="light" 
                    onClick={handleClose}
                    className="px-4 py-2 d-flex align-items-center gap-2 shadow-sm"
                >
                    <X size={18} />
                    Cancelar
                </Button>
                <Button 
                    variant="primary" 
                    onClick={handleSubmit}
                    className="px-4 py-2 d-flex align-items-center gap-2 shadow-sm"
                >
                    <Save size={18} />
                    Guardar Cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditRoomModal;
