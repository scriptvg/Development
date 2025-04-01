import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={4} className="mb-3 mb-md-0">
            <h5>Hotel Yadran</h5>
            <p className="text-muted">
              Luxury hotel offering exceptional experiences and unforgettable moments.
            </p>
          </Col>
          <Col md={4} className="mb-3 mb-md-0">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-muted">Home</a></li>
              <li><a href="/rooms" className="text-muted">Rooms</a></li>
              <li><a href="/amenities" className="text-muted">Amenities</a></li>
              <li><a href="/contact" className="text-muted">Contact</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact Info</h5>
            <address className="text-muted">
              <p>123 Beach Road,<br />
              Coastal City, 12345<br />
              Phone: (123) 456-7890<br />
              Email: info@hotelyadran.com</p>
            </address>
          </Col>
        </Row>
        <hr className="mt-4" />
        <div className="text-center text-muted">
          <small>&copy; {new Date().getFullYear()} Hotel Yadran. All rights reserved.</small>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
