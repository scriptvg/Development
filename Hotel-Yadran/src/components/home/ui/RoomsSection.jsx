import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RoomsSection = () => {
    const rooms = [
        {
            id: 1,
            name: 'Standard Room',
            description: 'Comfortable room with all basic amenities for a pleasant stay.',
            price: 99,
            capacity: '2 Adults',
            image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 2,
            name: 'Deluxe Room',
            description: 'Spacious room with additional amenities and scenic views.',
            price: 149,
            capacity: '2 Adults, 1 Child',
            image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 3,
            name: 'Suite',
            description: 'Luxury suite with separate living area and premium amenities.',
            price: 249,
            capacity: '2 Adults, 2 Children',
            image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
        }
    ];

    return (
        <section className="rooms-section py-5">
            <Container>
                <Row className="mb-5">
                    <Col className="text-center">
                        <h2 className="fw-bold">Our Rooms</h2>
                        <div className="divider-line mx-auto mb-4"></div>
                        <p className="lead">Choose from our selection of comfortable and luxurious accommodations</p>
                    </Col>
                </Row>

                <Row>
                    {rooms.map(room => (
                        <Col key={room.id} md={4} className="mb-4">
                            <Card className="room-card h-100 border-0 shadow-sm">
                                <div className="room-img-container">
                                    <Card.Img variant="top" src={room.image} alt={room.name} 
                                              className="room-img" />
                                    <div className="room-price">
                                        <span className="price-value">${room.price}</span>
                                        <span className="price-period"> / night</span>
                                    </div>
                                </div>
                                <Card.Body className="p-4">
                                    <Card.Title as="h3" className="fw-bold mb-3">
                                        {room.name}
                                    </Card.Title>
                                    <Card.Text className="mb-3">
                                        {room.description}
                                    </Card.Text>
                                    <div className="room-meta mb-4">
                                        <span className="room-capacity d-block mb-2">
                                            <i className="bi bi-people-fill me-2"></i> {room.capacity}
                                        </span>
                                    </div>
                                    <div className="d-grid gap-2">
                                        <Button 
                                            as={Link} 
                                            to={`/rooms/${room.id}`} 
                                            variant="outline-primary" 
                                            className="mt-2">
                                            View Details
                                        </Button>
                                        <Button variant="primary">Book Now</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                
                <Row className="mt-4">
                    <Col className="text-center">
                        <Button as={Link} to="/rooms" variant="outline-primary" size="lg">
                            View All Rooms
                        </Button>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default RoomsSection;
