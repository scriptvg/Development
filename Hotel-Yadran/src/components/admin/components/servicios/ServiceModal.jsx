import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { Coffee, DollarSign, FileText, Hash, Image, Save, X } from 'lucide-react';
import Swal from 'sweetalert2';
import './styles/serviceModal.css';

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

const ServiceModal = ({ show, handleClose, handleSaveService }) => {
    const [serviceData, setServiceData] = useState({
        name: '',
        description: '',
        image: null,
        hasPrice: false,
        price: '',
        icon: ''
    });

    const [previewImagen, setPreviewImagen] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setServiceData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setServiceData(prev => ({
            ...prev,
            [name]: checked
        }));
    };

    // Cuando cambia hasPrice y no está checked, resetear el precio
    useEffect(() => {
        if (!serviceData.hasPrice) {
            setServiceData(prev => ({
                ...prev,
                price: ''
            }));
        }
    }, [serviceData.hasPrice]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            processFile(file);
        }
    };

    const processFile = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setServiceData(prev => ({
                ...prev,
                image: reader.result
            }));
            setPreviewImagen(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSave = async () => {
        try {
            // Validar datos
            if (!serviceData.name.trim()) {
                return Swal.fire('Error', 'El nombre del servicio es obligatorio', 'error');
            }

            if (!serviceData.description.trim()) {
                return Swal.fire('Error', 'La descripción del servicio es obligatoria', 'error');
            }

            if (serviceData.hasPrice && (!serviceData.price || parseInt(serviceData.price) <= 0)) {
                return Swal.fire('Error', 'Si el servicio tiene precio, debe ser mayor a 0', 'error');
            }

            // Preparar datos para guardar
            const serviceToSave = {
                ...serviceData,
                price: serviceData.hasPrice ? parseInt(serviceData.price) : null
            };

            await Swal.fire({
                title: '¿Guardar este servicio?',
                text: 'Confirma para guardar el nuevo servicio',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    handleSaveService(serviceToSave);
                    handleClose();
                }
            });
        } catch (error) {
            console.error('Error al guardar el servicio:', error);
            Swal.fire('Error', 'Hubo un error al guardar el servicio', 'error');
        }
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size={DIMENSIONES.MODAL}
            backdrop="static"
            keyboard={false}
            centered
            className="service-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title className="d-flex align-items-center gap-2">
                    <Coffee size={24} className="text-primary" />
                    <span>Agregar Nuevo Servicio</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row className="gx-5">
                        <Col lg={6}>
                            <Form.Group controlId="formServiceName" className="mb-4">
                                <Form.Label className="d-flex align-items-center gap-2">
                                    <Hash size={16} className="text-primary" />
                                    <span>Nombre del Servicio</span>
                                    <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese nombre del servicio"
                                    name="name"
                                    value={serviceData.name}
                                    onChange={handleInputChange}
                                    className="form-control-lg"
                                />
                            </Form.Group>

                            <Form.Group controlId="formServiceDescription" className="mb-4">
                                <Form.Label className="d-flex align-items-center gap-2">
                                    <FileText size={16} className="text-primary" />
                                    <span>Descripción</span>
                                    <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    placeholder="Describa el servicio"
                                    name="description"
                                    value={serviceData.description}
                                    onChange={handleInputChange}
                                    className="form-control-lg"
                                />
                            </Form.Group>

                            <Form.Group controlId="formServicePrice" className="mb-4">
                                <div className="d-flex align-items-center mb-2">
                                    <Form.Check
                                        type="checkbox"
                                        id="hasPrice"
                                        label="Este servicio tiene precio"
                                        name="hasPrice"
                                        checked={serviceData.hasPrice}
                                        onChange={handleCheckboxChange}
                                        className="me-2"
                                    />
                                </div>

                                {serviceData.hasPrice && (
                                    <InputGroup className="mt-2">
                                        <InputGroup.Text className="bg-light">
                                            <DollarSign size={18} className="text-primary" />
                                        </InputGroup.Text>
                                        <Form.Control
                                            type="number"
                                            placeholder="Precio del servicio"
                                            name="price"
                                            value={serviceData.price}
                                            onChange={handleInputChange}
                                            min="0"
                                        />
                                        <InputGroup.Text className="bg-light">CLP</InputGroup.Text>
                                    </InputGroup>
                                )}
                            </Form.Group>
                        </Col>

                        <Col lg={6}>
                            <Form.Group controlId="formServiceImage" className="mb-4">
                                <Form.Label className="d-flex align-items-center gap-2">
                                    <Image size={16} className="text-primary" />
                                    <span>Imagen del Servicio</span>
                                </Form.Label>
                                <div className="image-upload-container">
                                    <div
                                        className={`image-upload-area ${previewImagen ? 'has-image' : ''}`}
                                        onClick={() => document.getElementById('serviceImageInput').click()}
                                    >
                                        {previewImagen ? (
                                            <img
                                                src={previewImagen}
                                                alt="Preview"
                                                className="preview-image"
                                            />
                                        ) : (
                                            <div className="upload-placeholder">
                                                <Image size={48} className="text-muted mb-2" />
                                                <p className="text-muted">Click para subir una imagen</p>
                                            </div>
                                        )}
                                    </div>
                                    <Form.Control
                                        type="file"
                                        id="serviceImageInput"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="d-none"
                                    />
                                </div>
                            </Form.Group>

                            <Form.Group controlId="formServiceIcon" className="mb-4">
                                <Form.Label className="d-flex align-items-center gap-2">
                                    <Coffee size={16} className="text-primary" />
                                    <span>Ícono (opcional)</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nombre del ícono (ej: coffee, wifi)"
                                    name="icon"
                                    value={serviceData.icon}
                                    onChange={handleInputChange}
                                    className="form-control-lg"
                                />
                                <Form.Text className="text-muted">
                                    Ingrese el nombre del ícono de Lucide React o deje en blanco para usar el predeterminado.
                                </Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer className="border-top-0">
                <Button variant="outline-secondary" onClick={handleClose} className="d-flex align-items-center gap-2">
                    <X size={18} />
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSave} className="d-flex align-items-center gap-2">
                    <Save size={18} />
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ServiceModal;