import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer mt-auto py-5">
            <Container>
                <Row className="gy-4">
                    <Col lg={4} md={6}>
                        <div className="footer-info">
                            <h4 className="mb-4">Hotel Yadran</h4>
                            <p className="mb-3">
                                Un lugar exclusivo para disfrutar de la Patagonia Chilena con vistas
                                impresionantes y servicios de primera calidad.
                            </p>
                            <div className="social-links d-flex mt-4">
                                <a href="https://facebook.com" className="social-link">
                                    <Facebook size={18} />
                                </a>
                                <a href="https://instagram.com" className="social-link">
                                    <Instagram size={18} />
                                </a>
                                <a href="https://twitter.com" className="social-link">
                                    <Twitter size={18} />
                                </a>
                            </div>
                        </div>
                    </Col>

                    <Col lg={2} md={6}>
                        <div className="footer-links">
                            <h4 className="mb-4">Enlaces rápidos</h4>
                            <Nav className="flex-column">
                                <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                                <Nav.Link as={Link} to="/habitaciones">Habitaciones</Nav.Link>
                                <Nav.Link as={Link} to="/servicios">Servicios</Nav.Link>
                                <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
                            </Nav>
                        </div>
                    </Col>

                    <Col lg={3} md={6}>
                        <div className="footer-contact">
                            <h4 className="mb-4">Contáctanos</h4>
                            <div className="contact-item">
                                <MapPin size={18} className="contact-icon" />
                                <span>
                                P.º de los Turistas, Provincia de Puntarenas, Puntarenas, Carmen</span>
                            </div>
                            <div className="contact-item">
                                <Phone size={18} className="contact-icon" />
                                <span>+(506) 2661-2662</span>
                            </div>

                            <div className="contact-item">
                                <Phone size={18} className="contact-icon" />
                                <span>+(506) 2661-2662</span>
                            </div>

                            <div className="contact-item">
                                <Mail size={18} className="contact-icon" />
                                <span>info@hotelyadran.cl</span>
                            </div>
                        </div>
                    </Col>

                    <Col lg={3} md={6}>
                        <div className="footer-newsletter">
                            <h4 className="mb-4">Newsletter</h4>
                            <p>Suscríbete a nuestro newsletter para recibir ofertas especiales</p>
                            <form className="mt-3">
                                <div className="input-group">
                                    <input type="email" className="form-control" placeholder="Tu email" />
                                    <button className="btn btn-primary" type="button">Suscribir</button>
                                </div>
                            </form>
                        </div>
                    </Col>
                </Row>

                <div className="text-center footer-bottom mt-5 pt-4">
                    <p className="mb-0">
                        &copy; {currentYear} <strong>Hotel Yadran</strong>. Todos los derechos reservados.
                    </p>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
