import React from 'react';
import { Modal, Button, Row, Col, Badge } from 'react-bootstrap';
import { Bed, DollarSign, Users, FileText, Tag, CheckSquare, Eye, Edit, MapPin, Calendar } from 'lucide-react';
import "./styles/roomModal.css";
import { formatRoomData } from './services/roomDataService.jsx';
import EstadoBadge from '../../utils/EstadoBadge';
import TableBadge from '../../components/common/TableBadge';
import ServiceBadge from '../../components/common/ServiceBadge';
import { LISTA_SERVICIOS } from '../../utils/ServicesConfig.jsx';
import '../../components/common/serviceBadge.css';
import './styles/modalStyles.css';

const RoomModalVer = ({ show, handleClose, roomData, onEdit }) => {
    const formattedRoom = formatRoomData(roomData);
    const services = formattedRoom.servicios || [];

    // Formatear el precio con separador de miles
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP'
        }).format(price);
    };

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
                    <div className="bg-primary bg-opacity-10 p-2 rounded-circle">
                        <Bed className="text-primary" size={24} />
                    </div>
                    <div>
                        <span className="h4 mb-0 fw-bold">{formattedRoom.nombre}</span>
                        <div className="text-muted small">
                            <TableBadge variant="light" textColor="dark">
                                {formattedRoom.id}
                            </TableBadge>
                        </div>
                    </div>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="p-0">
                {formattedRoom.imagen && (
                    <div className="room-hero-image" style={{ height: '250px', overflow: 'hidden', position: 'relative' }}>
                        <img 
                            src={formattedRoom.imagen} 
                            alt={formattedRoom.nombre} 
                            style={{
                                width: '100%', 
                                height: '100%', 
                                objectFit: 'cover'
                            }}
                            className="hover-zoom"
                        />
                        <div className="room-hero-overlay" 
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                                padding: '2rem 1.5rem 1rem',
                                color: 'white'
                            }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <EstadoBadge estado={formattedRoom.estado} />
                                <div className="fs-5 fw-bold">{formatPrice(formattedRoom.precio)}</div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="p-4">
                    <Row className="mb-4 g-3">
                        <Col md={3} sm={6}>
                            <div className="detail-card p-3 bg-light rounded-3 border border-light h-100 hover-shadow">
                                <div className="detail-label text-muted mb-1 d-flex align-items-center gap-2">
                                    <Tag size={16} className="text-primary" />
                                    <span>Tipo</span>
                                </div>
                                <div className="detail-value fw-bold">{formattedRoom.tipo}</div>
                            </div>
                        </Col>
                        <Col md={3} sm={6}>
                            <div className="detail-card p-3 bg-light rounded-3 border border-light h-100 hover-shadow">
                                <div className="detail-label text-muted mb-1 d-flex align-items-center gap-2">
                                    <DollarSign size={16} className="text-primary" />
                                    <span>Precio</span>
                                </div>
                                <div className="detail-value fw-bold">{formatPrice(formattedRoom.precio)}</div>
                            </div>
                        </Col>
                        <Col md={3} sm={6}>
                            <div className="detail-card p-3 bg-light rounded-3 border border-light h-100 hover-shadow">
                                <div className="detail-label text-muted mb-1 d-flex align-items-center gap-2">
                                    <Users size={16} className="text-primary" />
                                    <span>Capacidad</span>
                                </div>
                                <div className="detail-value fw-bold">{formattedRoom.capacidad} personas</div>
                            </div>
                        </Col>
                        <Col md={3} sm={6}>
                            <div className="detail-card p-3 bg-light rounded-3 border border-light h-100 hover-shadow">
                                <div className="detail-label text-muted mb-1 d-flex align-items-center gap-2">
                                    <MapPin size={16} className="text-primary" />
                                    <span>Estado</span>
                                </div>
                                <div className="detail-value">
                                    <EstadoBadge estado={formattedRoom.estado} size="sm" />
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <div className="mb-4">
                        <div className="detail-label text-muted mb-2 d-flex align-items-center gap-2">
                            <FileText size={16} className="text-primary" />
                            <span>Descripción</span>
                        </div>
                        <div className="description-content p-3 bg-light rounded-3 border border-light">
                            {formattedRoom.descripcion}
                        </div>
                    </div>

                    <div className="services-section">
                        <div className="detail-label text-muted mb-3 d-flex align-items-center gap-2">
                            <CheckSquare size={16} className="text-primary" />
                            <span>Servicios</span>
                        </div>
                        {services.length > 0 ? (
                            <div className="service-badges-container">
                                {services.map((service, index) => (
                                    <ServiceBadge 
                                        key={service}
                                        serviceId={service}
                                        size="md"
                                        className={`service-badge-animated`}
                                        style={{ animationDelay: `${index * 50}ms` }}
                                        maxWidth="200px" // Add fixed max width to prevent overflow
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="p-4 text-center bg-light rounded-3 border border-light">
                                <p className="text-muted mb-0">No hay servicios registrados para esta habitación</p>
                            </div>
                        )}
                    </div>
                </div>
            </Modal.Body>
                
            <Modal.Footer className="d-flex justify-content-between">
                <div>
                    <Badge 
                        bg="light" 
                        text="dark" 
                        className="d-flex align-items-center gap-1 p-2 border"
                    >
                        <Calendar size={14} className="text-primary" />
                        <span>Creado: {formattedRoom.createdAt || 'Fecha no disponible'}</span>
                    </Badge>
                </div>
                <div className="d-flex gap-2">
                    <Button 
                        variant="outline-secondary" 
                        onClick={handleClose}
                        className="px-4 d-flex align-items-center gap-2"
                    >
                        <Eye size={18} />
                        Cerrar
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={() => {
                            if (typeof onEdit === 'function') onEdit(formattedRoom);
                            handleClose();
                        }}
                        className="px-4 d-flex align-items-center gap-2"
                    >
                        <Edit size={18} />
                        Editar
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default RoomModalVer;