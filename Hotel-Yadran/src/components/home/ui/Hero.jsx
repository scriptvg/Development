import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { ArrowRight, MapPin, Star } from 'lucide-react';
import heroimg from '../../../assets/img/475382133_1016713003818433_3614689992057952440_n.jpg';
import '../styles/card-img-home.css';

const features = [
    { icon: 'bi-geo-alt', text: 'Ubicación céntrica' },
    { icon: 'bi-shield-check', text: 'Protocolo COVID' },
    { icon: 'bi-wifi', text: 'Wi-Fi gratuito' },
];

const Feature = ({ icon, text }) => (
    <div className="feature">
        <div className="feature-icon">
            <i className={`bi ${icon}`}></i>
        </div>
        <>
            <div className="feature-text">
                <span>{text}</span>
            </div>
            <div className="feature-image">
                {/* ...existing content... */}
            </div>
        </>
    </div>
);

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
                        <div className="hero-badge mb-3">
                            <div className="d-flex align-items-center">
                                <MapPin size={16} />
                                <span className="ms-2">Hotel Yadran, Puntarenas</span>
                            </div>
                            <div className="d-flex align-items-center ms-3">
                                {[...Array(5)].map((_, index) => (
                                    <Star key={index} size={16} className="text-warning" />
                                ))}
                            </div>
                        </div>
                        <h1 className="hero-title mb-4">
                            Bienvenido a <span className="text-primary">Hotel Yadran</span>
                        </h1>
                        <p className="hero-subtitle mb-4">
                            Disfruta de una experiencia única en nuestro hotel de lujo con vistas impresionantes al mar.
                        </p>
                        <div className="hero-buttons d-flex gap-3">
                            <Button variant="primary" size="lg" className="btn-reservar">
                                Reservar Ahora
                            </Button>
                            <Button variant="outline-light" size="lg" className="btn-rooms">
                                Ver Habitaciones <ArrowRight size={16} className="ms-2" />
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Hero;
