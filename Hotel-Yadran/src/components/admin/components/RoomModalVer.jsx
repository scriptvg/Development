import React, { useState } from 'react';
import { Modal, Button, Badge, Container, Row, Col } from 'react-bootstrap';
import { Wifi, AirVent, Tv, Bath, Bed, DollarSign, Users, FileText, CheckSquare, Hash, Image } from 'lucide-react';
import { GiPalmTree } from 'react-icons/gi';
import "../styles/roomModal.css";
import { servicesList, statusList } from '../../../config/constants/constants.jsx';
import { ServiceCheckChip, StatusBadge, ServiceIcon } from '../../common/badges';
import ModalHeader from '../../common/modals/ModalHeader';
import { ModalBodySections } from '../../common/modals/ModalBodySections';

function RoomModalVer({ show, handleClose, roomData }) {
    // Initialize services array safely from roomData
    const services = Array.isArray(roomData?.services) ? roomData.services : [];
    const [selectedServices, setSelectedServices] = useState(services);

    // Function to determine room status from room data
    const getStatusFromRoomData = () => {
        if (!roomData) return 'N/A';
        if (roomData.available) return 'disponible';
        if (roomData.maintenance) return 'mantenimiento';
        if (roomData.cleaning) return 'limpieza';
        if (roomData.reserved) return 'reservada';
        return 'ocupada';
    };

    return (
        <Modal 
            show={show} 
            onHide={handleClose} 
            centered
            className="room-modal skeleton-loading"
            dialogClassName="modal-dialog-centered modal-dialog-scrollable"
            size="lg"
            backdrop="static"
            keyboard={false}
        >
            <ModalHeader 
                title="Detalles de la Habitación"
                icon={Bed}
                roomId={roomData?.id}
                onClose={handleClose}
            />

            <Modal.Body className="py-4 bg-white">
                <div className="form-section form-section-left mb-4">
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
                                    Precio 1 noche(s)
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
                        <StatusBadge status={getStatusFromRoomData()} />
                    </div>
                </div>
            </Modal.Body>

            <ModalBodySections 
                roomData={roomData}
                selectedServices={selectedServices}
                servicesList={servicesList}
                statusList={statusList}
            />

            <Modal.Footer className="border-top py-3 bg-light">
                <Button 
                    variant="outline-primary"
                    onClick={handleClose}
                    size="lg"
                    className="px-4 rounded-3"
                    style={{ minWidth: '120px' }}
                >
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default RoomModalVer;