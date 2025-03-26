import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { ArrowRight, MapPin, Star } from 'lucide-react';
import heroimg from '../../../assets/img/475382133_1016713003818433_3614689992057952440_n.jpg';
import '../styles/card-img-home.css';

function Hero() {
    return (
        <section className="hero-section">
            <div className="hero-background">
                <img src={heroimg} alt="Hotel Yadran" className="hero-image" />
                <div className="hero-overlay"></div>
            </div>
            
            <Container className="hero-content">
                <Row className="h-100">
                    <Col lg={7} className="hero-text-container d-flex flex-column justify-content-center">
                        <div className="hero-badge">
                            <div className="d-flex align-items-center">
                                <MapPin size={14} />
                                <span className="ms-1">PUNTA ARENAS, CHILE</span>
                            </div>
                            <div className="d-flex align-items-center ms-3">
                                <Star size={14} className="text-warning" />
                                <Star size={14} className="text-warning" />
                                <Star size={14} className="text-warning" />
                                <Star size={14} className="text-warning" />
                                <Star size={14} className="text-warning" />
                            </div>
                        </div>
                        
                        <h1 className="hero-title">
                            Bienvenido a <br/>
                            <span className="text-primary">Hotel Yadran</span>
                        </h1>
                        
                        <p className="hero-subtitle">
                            Disfrute de una experiencia única en nuestro hotel de lujo con vistas 
                            impresionantes al mar y servicio excepcional en el corazón de la Patagonia.
                        </p>
                        
                        <div className="hero-buttons">
                            <Button 
                                variant="primary" 
                                size="lg" 
                                className="btn-reservar"
                            >
                                Reservar Ahora
                            </Button>
                            
                            <Button 
                                variant="outline-light" 
                                size="lg" 
                                className="btn-rooms"
                            >
                                <span>Ver habitaciones</span>
                                <ArrowRight size={16} className="ms-2" />
                            </Button>
                        </div>
                        
                        <div className="hero-features">
                            <div className="feature">
                                <div className="feature-icon">
                                    <i className="bi bi-geo-alt"></i>
                                </div>
                                <div className="feature-text">
                                    <span>Ubicación céntrica</span>
                                </div>
                            </div>
                            <div className="feature">
                                <div className="feature-icon">
                                    <i className="bi bi-shield-check"></i>
                                </div>
                                <div className="feature-text">
                                    <span>Protocolo COVID</span>
                                </div>
                            </div>
                            <div className="feature">
                                <div className="feature-icon">
                                    <i className="bi bi-wifi"></i>
                                </div>
                                <div className="feature-text">
                                    <span>Wi-Fi gratuito</span>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Hero;