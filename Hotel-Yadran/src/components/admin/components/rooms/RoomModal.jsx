import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { useServicios } from '../../utils/ServiciosAPI';
import EstadoSelectModal from '../../utils/EstadoSelectModal';
import RoomServicesSelector from '../../utils/RoomServicesSelector';

const RoomModal = ({ show, onHide, room, onSave }) => {
    const [habitacion, setHabitacion] = useState(room || {
        servicios: []
    });

    const { servicios: listaServicios } = useServicios();

    useEffect(() => {
        if (room) {
            setHabitacion(room);
        } else {
            setHabitacion({
                servicios: []
            });
        }
    }, [room, show]);

    const handleServiciosChange = (serviciosSeleccionados) => {
        setHabitacion(prev => ({
            ...prev,
            servicios: serviciosSeleccionados
        }));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setHabitacion(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave(habitacion);
    };

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    {room ? 'Editar Habitación' : 'Agregar Nueva Habitación'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-3" controlId="formNombre">
                        <Form.Label column sm="3">Nombre</Form.Label>
                        <Col sm="9">
                            <Form.Control
                                type="text"
                                name="nombre"
                                value={habitacion.nombre || ''}
                                onChange={handleInputChange}
                                required
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formDescripcion">
                        <Form.Label column sm="3">Descripción</Form.Label>
                        <Col sm="9">
                            <Form.Control
                                as="textarea"
                                name="descripcion"
                                value={habitacion.descripcion || ''}
                                onChange={handleInputChange}
                                required
                            />
                        </Col>
                    </Form.Group>

                    <RoomServicesSelector
                        serviciosSeleccionados={habitacion.servicios || []}
                        onChange={handleServiciosChange}
                    />

                    <EstadoSelectModal
                        estadoSeleccionado={habitacion.estado}
                        onChange={(estado) => handleInputChange({ target: { name: 'estado', value: estado } })}
                    />

                    <div className="d-flex justify-content-end mt-4">
                        <Button variant="secondary" onClick={onHide} className="me-2">
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit">
                            {room ? 'Actualizar' : 'Guardar'} Habitación
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default RoomModal;
