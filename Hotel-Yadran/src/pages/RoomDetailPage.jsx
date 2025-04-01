import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button, Table, Carousel } from 'react-bootstrap';

// This would typically come from an API, but for demo purposes we'll use static data
const roomsData = [
    {
        id: 1,
        name: 'Standard Room',
        description: 'Our Standard Room offers comfort and convenience for travelers looking for quality accommodation on a budget. Featuring all essential amenities and comfortable furnishings, this room ensures a pleasant stay for leisure or business travelers.',
        price: 99,
        capacity: '2 Adults',
        size: '25m²',
        bedType: '1 Queen Bed',
        amenities: [
            'Free Wi-Fi', 'Air Conditioning', 'Flat-screen TV', 'Private Bathroom', 
            'Hairdryer', 'Safe', 'Mini-fridge', 'Coffee Maker'
        ],
        images: [
            'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
        ]
    },
    {
        id: 2,
        name: 'Deluxe Room',
        description: 'Our Deluxe Room offers additional space and upgraded amenities for a more comfortable stay. Featuring a beautiful view and premium furnishings, this room is perfect for travelers looking for extra comfort and convenience.',
        price: 149,
        capacity: '2 Adults, 1 Child',
        size: '35m²',
        bedType: '1 King Bed',
        amenities: [
            'Free Wi-Fi', 'Air Conditioning', '42" Smart TV', 'Premium Bathroom Amenities',
            'Bathrobes & Slippers', 'In-room Safe', 'Mini-bar', 'Nespresso Machine', 
            'Workspace', 'Balcony'
        ],
        images: [
            'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1609949279531-cf48d64bed89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
        ]
    },
    {
        id: 3,
        name: 'Suite',
        description: 'Our luxurious Suite offers separate living and sleeping areas, providing ultimate comfort and space. Featuring top-tier amenities and elegant décor, this suite delivers a premium experience for guests seeking the best accommodation.',
        price: 249,
        capacity: '2 Adults, 2 Children',
        size: '55m²',
        bedType: '1 King Bed + Sofa Bed',
        amenities: [
            'Free Wi-Fi', 'Central Air Conditioning', '55" Smart TV', 'Luxury Bathroom',
            'Jacuzzi Tub', 'Premium Toiletries', 'Bathrobes & Slippers', 'Electronic Safe',
            'Fully-stocked Mini-bar', 'Espresso Machine', 'Separate Living Area', 
            'Dining Table', 'Private Terrace', 'Welcome Champagne'
        ],
        images: [
            'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
        ]
    }
];

const RoomDetailPage = () => {
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // Simulate API call
        const fetchRoom = () => {
            const foundRoom = roomsData.find(room => room.id === parseInt(id));
            setRoom(foundRoom);
            setLoading(false);
        };
        
        fetchRoom();
    }, [id]);
    
    if (loading) {
        return (
            <Container className="py-5 text-center">
                <p>Loading room details...</p>
            </Container>
        );
    }
    
    if (!room) {
        return (
            <Container className="py-5 text-center">
                <p>Room not found.</p>
                <Button as={Link} to="/rooms" variant="primary" className="mt-3">
                    View All Rooms
                </Button>
            </Container>
        );
    }
    
    return (
        <Container className="py-5">
            {/* Breadcrumb navigation */}
            <div className="mb-4">
                <Link to="/" className="text-decoration-none">Home</Link>
                {' > '}
                <Link to="/rooms" className="text-decoration-none">Rooms</Link>
                {' > '}
                <span className="text-muted">{room.name}</span>
            </div>
            
            <Row>
                {/* Left column: Images */}
                <Col lg={8} className="mb-4">
                    <Carousel className="room-detail-carousel">
                        {room.images.map((image, index) => (
                            <Carousel.Item key={index}>
                                <img
                                    className="d-block w-100 room-detail-image"
                                    src={image}
                                    alt={`${room.name} - Image ${index + 1}`}
                                    style={{ borderRadius: '8px', maxHeight: '500px', objectFit: 'cover' }}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Col>
                
                {/* Right column: Details */}
                <Col lg={4}>
                    <Card className="border-0 shadow-sm">
                        <Card.Body>
                            <Card.Title as="h2" className="fw-bold mb-3">{room.name}</Card.Title>
                            
                            <div className="price-tag mb-4">
                                <span className="display-6">${room.price}</span>
                                <span className="text-muted"> / night</span>
                            </div>
                            
                            <div className="mb-4">
                                <h5 className="mb-3">Quick Info:</h5>
                                <Table bordered>
                                    <tbody>
                                        <tr>
                                            <td><strong>Capacity:</strong></td>
                                            <td>{room.capacity}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Size:</strong></td>
                                            <td>{room.size}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Bed Type:</strong></td>
                                            <td>{room.bedType}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            
                            <div className="d-grid gap-2">
                                <Button variant="primary" size="lg">Book Now</Button>
                                <Button variant="outline-secondary">Add to Wishlist</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
            <Row className="mt-4">
                <Col>
                    <h3 className="fw-bold mb-4">Room Description</h3>
                    <p className="lead">{room.description}</p>
                    
                    <h3 className="fw-bold mb-4 mt-5">Amenities</h3>
                    <Row>
                        {room.amenities.map((amenity, index) => (
                            <Col md={6} lg={4} key={index} className="mb-3">
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                                    <span>{amenity}</span>
                                </div>
                            </Col>
                        ))}
                    </Row>
                    
                    <h3 className="fw-bold mb-4 mt-5">Room Policy</h3>
                    <ul className="policy-list">
                        <li>Check-in time: 2:00 PM</li>
                        <li>Check-out time: 12:00 PM</li>
                        <li>No smoking</li>
                        <li>Pets not allowed</li>
                        <li>Cancellation policy: 48 hours before arrival</li>
                    </ul>
                </Col>
            </Row>
        </Container>
    );
};

export default RoomDetailPage;
