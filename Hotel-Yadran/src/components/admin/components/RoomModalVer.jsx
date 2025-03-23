import React from 'react';
import { Modal, Button, Badge } from 'react-bootstrap';
import { Wifi, AirVent, Tv, Bath, Bed, DollarSign, Users, FileText, CheckSquare, Hash, Image } from 'lucide-react';
import { GiPalmTree } from 'react-icons/gi';
import BadgeComponent from '../../test/BadgeComponent';
import "../styles/roomModal.css";

function RoomModalVer({ show, handleClose, roomData }) {
    const services = Array.isArray(roomData?.services) ? roomData.services : [];

    const servicesList = [
        { value: 'wifi', label: 'Wi-Fi', icon: <Wifi size={18} /> },
        { value: 'aire_acondicionado', label: 'Aire Acondicionado', icon: <AirVent size={18} /> },
        { value: 'tv', label: 'Smart TV', icon: <Tv size={18} /> },
        { value: 'vista_al_mar', label: 'Vista al Mar', icon: <GiPalmTree size={18} /> },
        { value: 'bano_privado', label: 'Baño Privado', icon: <Bath size={18} /> }
    ];

    const getServiceIcon = (service) => {
        switch (service) {
            case 'wifi': return <Wifi size={22} />;
            case 'aire_acondicionado': return <AirVent size={22} />;
            case 'tv': return <Tv size={22} />;
            case 'vista_al_mar': return <GiPalmTree size={22} />;
            case 'bano_privado': return <Bath size={22} />;
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
            size="lg"
        >
            <Modal.Header closeButton className="border-bottom bg-light">
                <Modal.Title className="d-flex align-items-center justify-content-between w-100">
                    <div className="d-flex align-items-center">
                        <Bed className="me-3 text-primary" size={28} />
                        <span className="h4 mb-0">Detalles de la Habitación</span>
                    </div>
                    <div className="badge bg-secondary d-flex align-items-center">
                        <Hash size={14} className="me-1" />
                        <span className="fs-6">{roomData?.id || ''}</span>
                    </div>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="py-4 bg-white">
                <div className="form-section form-section-left">
                    <div className="row g-4">
                        <div className="col-12 mb-4">
                            <div className="d-flex align-items-center gap-3">
                                {roomData?.image && (
                                    <div className="image-preview" style={{width: '200px', height: '150px'}}>
                                        <img 
                                            src={roomData.image} 
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
                        </div>

                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="fw-semibold mb-2 text-dark d-flex align-items-center">
                                    <Bed className="me-2 text-primary" size={18} />
                                    Nombre
                                </label>
                                <div className="form-control-lg bg-light rounded p-2">
                                    {roomData?.name || 'N/A'}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="fw-semibold mb-2 text-dark d-flex align-items-center">
                                    <FileText className="me-2 text-primary" size={18} />
                                    Tipo
                                </label>
                                <div className="form-control-lg bg-light rounded p-2">
                                    {roomData?.type || 'N/A'}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="fw-semibold mb-2 text-dark d-flex align-items-center">
                                    <DollarSign className="me-2 text-success" size={18} />
                                    Precio
                                </label>
                                <div className="form-control-lg bg-light rounded p-2">
                                    ${roomData?.price || '0'}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="fw-semibold mb-2 text-dark d-flex align-items-center">
                                    <Users className="me-2 text-info" size={18} />
                                    Capacidad
                                </label>
                                <div className="form-control-lg bg-light rounded p-2">
                                    {roomData?.capacity || '0'} personas
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="mb-3">
                                <label className="fw-semibold mb-2 text-dark d-flex align-items-center">
                                    <FileText className="me-2 text-primary" size={18} />
                                    Descripción
                                </label>
                                <div className="form-control-lg bg-light rounded p-2" style={{minHeight: '100px'}}>
                                    {roomData?.description || 'N/A'}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="fw-semibold mb-2 text-dark">Estado</label>
                        <Badge 
                            bg={roomData?.available ? 'success' : 'danger'}
                            className="px-3 py-2 rounded-pill fw-semibold d-inline-block"
                        >
                            {roomData?.available ? 'Disponible' : 'No Disponible'}
                        </Badge>
                    </div>
                </div>

                <div className="form-section services-section mt-4 pt-4 border-top">
                    <div className="mb-4">
                        <h5 className="text-primary mb-3">Servicios Seleccionados</h5>
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
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer className="border-top py-3 bg-light">
                <Button 
                    variant="outline-secondary" 
                    onClick={handleClose} 
                    size="lg"
                    className="px-4"
                >
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default RoomModalVer;