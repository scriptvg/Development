import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Badge, Breadcrumb, Card, Carousel, Alert } from 'react-bootstrap';
import { 
    ArrowLeft, Bed, Users, Coffee, Wifi, 
    Star, Calendar, MapPin, DollarSign, 
    CheckCircle, Info, ArrowRight 
} from 'lucide-react';
import roomDataService from '../../admin/components/habitaciones/services/roomDataService.jsx';
import ServiceBadge from '../../admin/components/common/ServiceBadge.jsx';
import { expandirServicios } from '../../admin/utils/ServicesConfig.jsx';
import './roomDetail.css';

const RoomDetail = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const [room, setRoom] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [relatedRooms, setRelatedRooms] = useState([]);
    
    // Load room data
    useEffect(() => {
        const fetchRoomData = async () => {
            setIsLoading(true);
            setError(null);
            
            try {
                roomDataService.getAllRooms(
                    (allRooms) => {
                        // Find the specific room
                        const foundRoom = allRooms.find(r => r.id === roomId);
                        
                        if (!foundRoom) {
                            setError("La habitación que buscas no existe o no está disponible.");
                            setIsLoading(false);
                            return;
                        }
                        
                        setRoom(foundRoom);
                        
                        // Find related rooms (same type or similar price)
                        const related = allRooms
                            .filter(r => r.id !== roomId && r.estado === 'disponible')
                            .filter(r => r.tipo === foundRoom.tipo || 
                                Math.abs(r.precio - foundRoom.precio) < foundRoom.precio * 0.2)
                            .slice(0, 3);
                            
                        setRelatedRooms(related);
                        setIsLoading(false);
                    },
                    (error) => {
                        console.error("Error fetching room:", error);
                        setError("No pudimos cargar la información de esta habitación.");
                        setIsLoading(false);
                    }
                );
            } catch (err) {
                console.error("Exception loading room:", err);
                setError("Ocurrió un error al cargar los datos de la habitación.");
                setIsLoading(false);
            }
        };
        
        fetchRoomData();
    }, [roomId]);
    
    // Format price
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP'
        }).format(price);
    };
    
    if (isLoading) {
        return (
            <div className="py-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-3 text-muted">Cargando información de la habitación...</p>
            </div>
        );
    }
    
    if (error) {
        return (
            <Container className="py-5">
                <Alert variant="danger" className="text-center">
                    <Alert.Heading>Error al cargar la habitación</Alert.Heading>
                    <p>{error}</p>
                    <Button 
                        variant="outline-danger" 
                        onClick={() => navigate('/habitaciones')}
                        className="mt-3"
                    >
                        <ArrowLeft size={16} className="me-2" />
                        Volver a habitaciones
                    </Button>
                </Alert>
            </Container>
        );
    }
    
    if (!room) {
        return (
            <Container className="py-5">
                <Alert variant="warning" className="text-center">
                    <Alert.Heading>Habitación no encontrada</Alert.Heading>
                    <p>La habitación que buscas no existe o no está disponible.</p>
                    <Button 
                        variant="outline-primary" 
                        onClick={() => navigate('/habitaciones')}
                        className="mt-3"
                    >
                        <ArrowLeft size={16} className="me-2" />
                        Volver a habitaciones
                    </Button>
                </Alert>
            </Container>
        );
    }

    // Get all service information
    const roomServices = expandirServicios(room.servicios || []);
    
    return (
        <div className="room-detail-page">
            {/* Hero Section */}
            <div className="room-detail-hero" style={{ 
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${room.imagen || 'https://via.placeholder.com/1200x600?text=Hotel+Yadran'})` 
            }}>
                <Container>
                    <Row className="align-items-center py-5">
                        <Col md={8}>
                            <Breadcrumb className="breadcrumb-light mb-3">
                                <Breadcrumb.Item onClick={() => navigate('/')}>Inicio</Breadcrumb.Item>
                                <Breadcrumb.Item onClick={() => navigate('/habitaciones')}>Habitaciones</Breadcrumb.Item>
                                <Breadcrumb.Item active>{room.nombre}</Breadcrumb.Item>
                            </Breadcrumb>
                            <h1 className="display-4 text-white fw-bold mb-3">{room.nombre}</h1>
                            <div className="d-flex align-items-center gap-3 mb-3">
                                <Badge bg="light" text="dark" className="hero-badge">
                                    <Bed size={14} className="me-1" />
                                    {room.tipo}
                                </Badge>
                                <Badge bg="light" text="dark" className="hero-badge">
                                    <Users size={14} className="me-1" />
                                    {room.capacidad} personas
                                </Badge>
                                <div className="d-flex align-items-center gap-1 rating-badge">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} className="text-warning" />
                                    ))}
                                    <span className="ms-1 text-white">(5.0)</span>
                                </div>
                            </div>
                            <p className="text-white-50 lead mb-4">
                                {room.descripcion}
                            </p>
                            <div className="d-flex gap-3">
                                <Button variant="primary" size="lg" className="px-4 py-3 rounded-pill">
                                    <Calendar size={20} className="me-2" />
                                    Reservar ahora
                                </Button>
                                <Button variant="outline-light" size="lg" className="px-4 py-3 rounded-pill" onClick={() => navigate('/habitaciones')}>
                                    <ArrowLeft size={20} className="me-2" />
                                    Volver
                                </Button>
                            </div>
                        </Col>
                        <Col md={4} className="text-center text-md-end mt-4 mt-md-0">
                            <div className="pricing-badge">
                                <div className="price-label">Precio por noche</div>
                                <div className="price-amount">{formatPrice(room.precio)}</div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            
            {/* Room Details */}
            <Container className="py-5">
                <Row className="g-4">
                    <Col lg={8}>
                        {/* Room Features */}
                        <Card className="border-0 shadow-sm rounded-4 mb-4 p-4">
                            <h2 className="room-section-title">Características de la habitación</h2>
                            <p className="mb-4">
                                {room.descripcion}
                            </p>
                            
                            {/* Main features */}
                            <div className="main-features mb-4">
                                <Row className="g-3">
                                    <Col md={6}>
                                        <div className="feature-item">
                                            <div className="feature-icon">
                                                <Bed size={24} />
                                            </div>
                                            <div className="feature-info">
                                                <h4 className="feature-title">Tipo de habitación</h4>
                                                <p className="feature-text">{room.tipo}</p>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="feature-item">
                                            <div className="feature-icon">
                                                <Users size={24} />
                                            </div>
                                            <div className="feature-info">
                                                <h4 className="feature-title">Capacidad</h4>
                                                <p className="feature-text">{room.capacidad} personas</p>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="feature-item">
                                            <div className="feature-icon">
                                                <DollarSign size={24} />
                                            </div>
                                            <div className="feature-info">
                                                <h4 className="feature-title">Precio por noche</h4>
                                                <p className="feature-text">{formatPrice(room.precio)}</p>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="feature-item">
                                            <div className="feature-icon">
                                                <MapPin size={24} />
                                            </div>
                                            <div className="feature-info">
                                                <h4 className="feature-title">Ubicación</h4>
                                                <p className="feature-text">Punta Arenas, Chile</p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            
                            {/* Services */}
                            <h3 className="room-subsection-title">Servicios incluidos</h3>
                            {roomServices.length > 0 ? (
                                <div className="services-grid">
                                    {roomServices.map((service, index) => (
                                        <div key={index} className="service-item">
                                            <div className="service-icon">
                                                {service.icono}
                                            </div>
                                            <div className="service-name">{service.etiqueta}</div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted">Esta habitación no tiene servicios adicionales asignados.</p>
                            )}
                        </Card>
                        
                        {/* Policies */}
                        <Card className="border-0 shadow-sm rounded-4 mb-4 p-4">
                            <h2 className="room-section-title">Políticas de la habitación</h2>
                            <div className="policy-items">
                                <div className="policy-item">
                                    <h4>Check-in / Check-out</h4>
                                    <p>Check-in: 3:00 PM - 8:00 PM</p>
                                    <p>Check-out: 7:00 AM - 11:00 AM</p>
                                </div>
                                <div className="policy-item">
                                    <h4>Cancelación</h4>
                                    <p>Cancelación gratuita hasta 48 horas antes del check-in.</p>
                                    <p>Después de ese período, se cobrará el 50% del valor total.</p>
                                </div>
                                <div className="policy-item">
                                    <h4>Reglas del hotel</h4>
                                    <p>No se permiten mascotas.</p>
                                    <p>No fumar en las habitaciones.</p>
                                    <p>No se permiten fiestas o eventos.</p>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    
                    <Col lg={4}>
                        {/* Booking Card */}
                        <Card className="border-0 shadow-sm rounded-4 book-now-card sticky-top p-4">
                            <h3 className="text-center mb-4">Reserva esta habitación</h3>
                            <div className="price-info mb-4">
                                <div className="price-label">Precio por noche</div>
                                <div className="price-value">{formatPrice(room.precio)}</div>
                            </div>
                            
                            <div className="availability-info mb-4">
                                <div className="d-flex align-items-center mb-3">
                                    <CheckCircle size={20} className="text-success me-2" />
                                    <span>Disponible para reserva inmediata</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <Info size={20} className="text-info me-2" />
                                    <span>Pago seguro y confirmación instantánea</span>
                                </div>
                            </div>
                            
                            <Button variant="primary" size="lg" className="w-100 mb-3 py-3 rounded-pill">
                                <Calendar size={20} className="me-2" />
                                Reservar ahora
                            </Button>
                            
                            <Button variant="outline-secondary" size="lg" className="w-100 py-3 rounded-pill">
                                Contactar al hotel
                            </Button>
                        </Card>
                    </Col>
                </Row>
                
                {/* Related Rooms */}
                {relatedRooms.length > 0 && (
                    <div className="related-rooms-section mt-5">
                        <h2 className="room-section-title text-center mb-4">También te puede interesar</h2>
                        <Row xs={1} md={2} lg={3} className="g-4">
                            {relatedRooms.map(relatedRoom => (
                                <Col key={relatedRoom.id}>
                                    <Card 
                                        className="h-100 related-room-card border-0 shadow-sm rounded-4 overflow-hidden"
                                        onClick={() => navigate(`/habitaciones/${relatedRoom.id}`)}
                                    >
                                        <div className="related-room-img-container">
                                            <Card.Img 
                                                variant="top" 
                                                src={relatedRoom.imagen || 'https://via.placeholder.com/300x200?text=Hotel+Yadran'} 
                                                alt={relatedRoom.nombre}
                                                className="related-room-img"
                                            />
                                            <div className="related-room-price">
                                                {formatPrice(relatedRoom.precio)}
                                            </div>
                                        </div>
                                        <Card.Body className="p-3">
                                            <Card.Title className="fw-bold mb-2">{relatedRoom.nombre}</Card.Title>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <Badge bg="light" text="dark">
                                                    <Bed size={14} className="me-1" />
                                                    {relatedRoom.tipo}
                                                </Badge>
                                                <Badge bg="light" text="dark">
                                                    <Users size={14} className="me-1" />
                                                    {relatedRoom.capacidad}
                                                </Badge>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default RoomDetail;
