import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge, Alert, Spinner } from 'react-bootstrap';
import { MapPin, Star, Info, Wifi, Coffee, ShowerHead, Tv, Car } from 'lucide-react';
import servicesDataService from '../../admin/components/servicios/services/servicesDataService.jsx';
import { LISTA_SERVICIOS } from '../../admin/utils/ServicesConfig.jsx';
import './publicServices.css';

const PublicServices = () => {
    const [services, setServices] = useState([]);
    const [featuredServices, setFeaturedServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Load services
    useEffect(() => {
        const fetchServices = async () => {
            setIsLoading(true);
            setError(null);
            
            try {
                // Use a simpler approach with direct data loading
                servicesDataService.getAllServices(
                    (allServices) => {
                        setServices(allServices);
                        // Set featured services (first 3 services)
                        setFeaturedServices(allServices.slice(0, 3));
                        setIsLoading(false);
                    },
                    (error) => {
                        console.warn('Error loading services:', error);
                        setError('No pudimos cargar los servicios. Por favor, intenta más tarde.');
                        setIsLoading(false);
                    }
                );
            } catch (error) {
                console.error('Error loading services:', error);
                setError('No pudimos cargar los servicios. Por favor, intenta más tarde.');
                setIsLoading(false);
            }
        };
        
        fetchServices();
    }, []);
    
    // Group services by categories (using variant as category)
    const groupedServices = services.reduce((groups, service) => {
        const variant = service.variante || 'primary';
        if (!groups[variant]) {
            groups[variant] = [];
        }
        groups[variant].push(service);
        return groups;
    }, {});
    
    // Get category label
    const getCategoryLabel = (variant) => {
        switch (variant) {
            case 'primary': return 'Servicios Generales';
            case 'success': return 'Comodidades';
            case 'info': return 'Tecnología';
            case 'warning': return 'Alimentación';
            case 'danger': return 'Servicios Premium';
            case 'secondary': return 'Servicios Básicos';
            case 'dark': return 'Transporte';
            default: return 'Otros Servicios';
        }
    };
    
    if (isLoading) {
        return (
            <div className="py-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-3 text-muted">Cargando servicios...</p>
            </div>
        );
    }
    
    if (error) {
        return (
            <Container className="py-5">
                <Alert variant="danger">
                    <Alert.Heading>Error al cargar los servicios</Alert.Heading>
                    <p>{error}</p>
                </Alert>
            </Container>
        );
    }
    
    return (
        <div className="public-services-page">
            {/* Hero Section */}
            <div className="services-hero">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8} className="text-center">
                            <Badge bg="primary" className="hero-badge mb-3 px-3 py-2">
                                <MapPin size={14} className="me-1" />
                                <span>NUESTROS SERVICIOS</span>
                            </Badge>
                            <h1 className="display-4 fw-bold text-white mb-3">Experiencia de Hospedaje Premium</h1>
                            <p className="lead text-white-50 mb-4">
                                Descubre todos los servicios y comodidades que tenemos para ofrecerte durante tu estadía
                            </p>
                            <div className="d-flex justify-content-center">
                                <div className="rating-display">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={20} className="text-warning" />
                                    ))}
                                    <span className="ms-2 rating-text">Calificado con 5 estrellas</span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container className="py-5">
                {/* Featured Services */}
                <section className="mb-5">
                    <h2 className="section-title text-center mb-4">Servicios Destacados</h2>
                    <Row className="g-4">
                        {featuredServices.map((service, index) => (
                            <Col md={4} key={service.valor || index}>
                                <Card className="featured-service-card h-100 border-0 shadow-sm">
                                    <Card.Body className="p-4 text-center">
                                        <div className="featured-service-icon mx-auto mb-3">
                                            {service.icono && React.isValidElement(service.icono) 
                                                ? React.cloneElement(service.icono, { size: 32 }) 
                                                : <Info size={32} />
                                            }
                                        </div>
                                        <h3 className="h4 mb-3">{service.etiqueta}</h3>
                                        <p className="text-muted">{service.descripcion}</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </section>
                
                {/* All Services By Category */}
                <section>
                    <h2 className="section-title text-center mb-5">Todos Nuestros Servicios</h2>
                    
                    {Object.keys(groupedServices).map((variant) => (
                        <div key={variant} className="service-category mb-5">
                            <h3 className={`category-title text-${variant} mb-4`}>
                                {getCategoryLabel(variant)}
                            </h3>
                            <Row className="g-4">
                                {groupedServices[variant].map((service, index) => (
                                    <Col md={4} lg={3} key={service.valor || index}>
                                        <Card className="service-item-card h-100 border-0 shadow-sm">
                                            <Card.Body className="p-3">
                                                <div className="d-flex align-items-center mb-3">
                                                    <div className={`service-item-icon bg-${variant} bg-opacity-10 me-3`}>
                                                        {service.icono && React.isValidElement(service.icono) 
                                                            ? React.cloneElement(service.icono, { size: 24 }) 
                                                            : <Info size={24} />
                                                        }
                                                    </div>
                                                    <h4 className="h5 mb-0">{service.etiqueta}</h4>
                                                </div>
                                                <p className="text-muted small mb-0">{service.descripcion}</p>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    ))}
                </section>
            </Container>
            
            {/* Call to Action */}
            <section className="cta-section py-5 text-white text-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <h2 className="mb-4">¿Listo para disfrutar de estos servicios?</h2>
                            <p className="lead mb-4">
                                Reserva ahora y disfruta de todos nuestros servicios premium durante tu estadía
                            </p>
                            <a href="/habitaciones" className="btn btn-light btn-lg px-5 py-3 rounded-pill">
                                Ver Habitaciones
                            </a>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default PublicServices;
