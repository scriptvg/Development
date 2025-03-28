import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge, Form, InputGroup, Button, Alert } from 'react-bootstrap';
import { Search, Bed, Users, Filter, ArrowRight, Star, Calendar, DollarSign, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import roomDataService from '../../admin/components/habitaciones/services/roomDataService.jsx';
import ServiceBadge from '../../admin/components/common/ServiceBadge.jsx';
import { ESTADOS } from '../../admin/utils/estadosConfig.jsx';
import { expandirServicios } from '../../admin/utils/ServicesConfig.jsx';
import './publicRooms.css';
import BarraNav from '../../home/BarraNav.jsx';

const PublicRooms = () => {
    const navigate = useNavigate();
    // States for data and UI
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState([0, 500000]);
    const [capacityFilter, setCapacityFilter] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [maxPrice, setMaxPrice] = useState(500000);
    const [error, setError] = useState(null);

    // Load rooms from service
    useEffect(() => {
        setIsLoading(true);
        setError(null);
        
        try {
            roomDataService.getAllRooms(
                (allRooms) => {
                    // Filter only available rooms for public display
                    const availableRooms = allRooms.filter(
                        room => room.estado === ESTADOS.DISPONIBLE
                    );
                    
                    // Calculate max price for slider
                    if (availableRooms.length > 0) {
                        const highestPrice = Math.max(...availableRooms.map(room => room.precio || 0), 100000);
                        setMaxPrice(highestPrice);
                        setPriceRange([0, highestPrice]);
                    }
                    
                    setRooms(availableRooms);
                    setFilteredRooms(availableRooms);
                    setIsLoading(false);
                },
                (error) => {
                    console.error("Error loading rooms:", error);
                    setError("No se pudieron cargar las habitaciones. Por favor, intenta más tarde.");
                    setIsLoading(false);
                }
            );
        } catch (error) {
            console.error("Exception in room loading:", error);
            setError("Ocurrió un error al cargar las habitaciones.");
            setIsLoading(false);
        }
    }, []);

    // Filter rooms when search criteria change
    useEffect(() => {
        if (!rooms || rooms.length === 0) return;
        
        // Use existing filterRoomsByState method
        let results = roomDataService.filterRoomsByState(rooms, searchTerm, "");
        
        // Apply price range filter
        results = results.filter(room => 
            room.precio >= priceRange[0] && room.precio <= priceRange[1]
        );
        
        // Apply capacity filter
        if (capacityFilter) {
            results = results.filter(room => 
                room.capacidad >= parseInt(capacityFilter)
            );
        }
        
        setFilteredRooms(results);
    }, [searchTerm, priceRange, capacityFilter, rooms]);

    // Format price display
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP'
        }).format(price);
    };

    // Reset all filters
    const handleResetFilters = () => {
        setSearchTerm('');
        setPriceRange([0, maxPrice]);
        setCapacityFilter('');
    };
    
    // Handle room booking
    const handleBookRoom = (e, roomId) => {
        e.stopPropagation(); // Prevent triggering the card click
        console.log(`Booking room with ID: ${roomId}`);
        // Implement booking functionality here
    };

    // Navigate to room detail page
    const navigateToRoomDetail = (roomId) => {
        navigate(`/habitaciones/${roomId}`);
    };

    return (
        <>
        <BarraNav/>
        <div className="public-rooms-page">
            {/* Hero Section with Visual Hierarchy */}
            <div className="rooms-hero">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8} className="text-center">
                            <Badge bg="primary" className="hero-badge mb-3 px-3 py-2">
                                <MapPin size={14} className="me-1" />
                                <span>NUESTRAS HABITACIONES</span>
                            </Badge>
                            <h1 className="display-4 fw-bold text-white mb-3">Descubre tu Espacio Ideal</h1>
                            <p className="lead text-white-50 mb-4">
                                Habitaciones diseñadas para brindarte la máxima comodidad con vistas espectaculares 
                                y amenidades de primer nivel.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container className="py-5">
                {/* Error message if loading fails */}
                {error && (
                    <Alert variant="danger" className="mb-4">
                        <Alert.Heading>Error al cargar las habitaciones</Alert.Heading>
                        <p>{error}</p>
                        <Button variant="outline-danger" onClick={() => window.location.reload()}>
                            Reintentar
                        </Button>
                    </Alert>
                )}
                
                {/* Filters Section with Improved Visual Hierarchy */}
                <Card className="shadow-sm mb-5 border-0 rounded-4 overflow-hidden filter-card">
                    <Card.Body className="p-4">
                        <h4 className="mb-4 filter-title">
                            <Filter size={20} className="me-2 text-primary" />
                            Encuentra tu Habitación Perfecta
                        </h4>
                        <Row className="g-3">
                            <Col md={8}>
                                <InputGroup className="shadow-sm rounded-pill overflow-hidden">
                                    <InputGroup.Text className="bg-white border-0 ps-3">
                                        <Search size={18} className="text-primary" />
                                    </InputGroup.Text>
                                    <Form.Control
                                        placeholder="Buscar por nombre, tipo o descripción..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="border-0 py-2 px-3 search-input"
                                    />
                                </InputGroup>
                            </Col>
                            <Col md={2}>
                                <Form.Select 
                                    value={capacityFilter}
                                    onChange={(e) => setCapacityFilter(e.target.value)}
                                    className="shadow-sm border-0 py-2 rounded-pill capacity-select"
                                >
                                    <option value="">Capacidad</option>
                                    <option value="1">1+ personas</option>
                                    <option value="2">2+ personas</option>
                                    <option value="3">3+ personas</option>
                                    <option value="4">4+ personas</option>
                                </Form.Select>
                            </Col>
                            <Col md={2}>
                                <Button 
                                    variant="outline-secondary"
                                    onClick={handleResetFilters}
                                    className="w-100 py-2 rounded-pill d-flex align-items-center justify-content-center gap-2 reset-btn"
                                >
                                    <Filter size={16} />
                                    Limpiar
                                </Button>
                            </Col>
                        </Row>

                        <div className="mt-4 pt-2">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="price-label d-flex align-items-center">
                                    <DollarSign size={16} className="text-primary me-1" />
                                    <span className="fw-semibold">Rango de precios</span>
                                </span>
                                <span className="price-range-value">
                                    {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                                </span>
                            </div>
                            <Form.Range
                                min={0}
                                max={maxPrice}
                                step={10000}
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                className="price-range-slider"
                            />
                        </div>
                    </Card.Body>
                </Card>

                {/* Results Statistics */}
                <div className="results-stats mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0 results-title">
                            {filteredRooms.length} {filteredRooms.length === 1 ? 'habitación encontrada' : 'habitaciones encontradas'}
                        </h5>
                        <div className="d-flex align-items-center gap-2 results-sort">
                            <span className="text-muted small">Ordenado por:</span>
                            <Badge bg="light" text="dark" className="px-3 py-2">Precio (menor a mayor)</Badge>
                        </div>
                    </div>
                </div>

                {/* Results Section with Visual Hierarchy */}
                {isLoading ? (
                    <div className="text-center py-5 loading-container">
                        <div className="spinner-container mb-3">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                        </div>
                        <h5 className="fw-semibold text-muted">Cargando habitaciones disponibles...</h5>
                        <p className="text-muted">Esto podría tomar unos segundos</p>
                    </div>
                ) : filteredRooms.length > 0 ? (
                    <Row xs={1} md={2} lg={3} className="g-4 rooms-grid">
                        {filteredRooms.map((room) => (
                            <Col key={room.id} className="room-col">
                                <Card 
                                    className="h-100 room-card border-0 shadow-sm rounded-4 overflow-hidden clickable-card"
                                    onClick={() => navigateToRoomDetail(room.id)}
                                >
                                    <div className="room-img-container">
                                        <Card.Img 
                                            variant="top" 
                                            src={room.imagen || 'https://via.placeholder.com/500x300?text=Hotel+Yadran'} 
                                            alt={room.nombre}
                                            className="room-img"
                                        />
                                        <div className="room-price-badge">
                                            <Badge bg="primary" className="px-3 py-2 fw-bold fs-5 price-badge">
                                                {formatPrice(room.precio)}
                                            </Badge>
                                        </div>
                                        <div className="room-rating">
                                            <div className="rating-stars">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={14} className="text-warning" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <Card.Body className="p-4">
                                        <Badge bg="light" text="dark" className="mb-2 text-uppercase room-type-badge">
                                            {room.tipo}
                                        </Badge>
                                        <Card.Title className="fw-bold mb-3 fs-4 room-title">{room.nombre}</Card.Title>
                                        <Card.Text className="text-muted mb-3 room-description">
                                            {room.descripcion}
                                        </Card.Text>
                                        
                                        {/* Services using ServiceBadge component */}
                                        {room.servicios && room.servicios.length > 0 && (
                                            <div className="mb-3 services-container">
                                                {room.servicios.slice(0, 2).map((serviceId, index) => (
                                                    <ServiceBadge 
                                                        key={index}
                                                        serviceId={serviceId} 
                                                        size="sm"
                                                        maxWidth="150px"
                                                    />
                                                ))}
                                                {room.servicios.length > 2 && (
                                                    <Badge bg="light" text="dark" className="py-1 px-2 more-services">
                                                        +{room.servicios.length - 2} más
                                                    </Badge>
                                                )}
                                            </div>
                                        )}
                                        
                                        <div className="room-features mb-3">
                                            <div className="feature d-flex align-items-center">
                                                <Bed size={18} className="text-primary me-2" />
                                                <span className="fw-medium">Tipo: {room.tipo}</span>
                                            </div>
                                            <div className="feature d-flex align-items-center">
                                                <Users size={18} className="text-primary me-2" />
                                                <span className="fw-medium">Capacidad: {room.capacidad} personas</span>
                                            </div>
                                        </div>
                                        
                                        <Button 
                                            variant="primary" 
                                            className="w-100 d-flex align-items-center justify-content-center gap-2 book-btn"
                                            onClick={(e) => handleBookRoom(e, room.id)}
                                        >
                                            <Calendar size={16} />
                                            <span>Reservar Ahora</span>
                                            <ArrowRight size={16} />
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <div className="text-center py-5 no-results-container">
                        <div className="no-results-icon mb-4">
                            <Search size={48} className="text-secondary" />
                        </div>
                        <h3 className="fw-bold mb-2">No se encontraron habitaciones</h3>
                        <p className="text-muted mb-4">Intenta con otros criterios de búsqueda o reestablece los filtros</p>
                        <Button 
                            variant="outline-primary" 
                            onClick={handleResetFilters}
                            className="px-4 py-2 rounded-pill"
                        >
                            Restablecer filtros
                        </Button>
                    </div>
                )}
            </Container>
        </div>
        </>
    );
};

export default PublicRooms;
