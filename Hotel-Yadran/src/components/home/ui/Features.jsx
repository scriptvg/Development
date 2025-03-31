import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Features = () => {
    const features = [
        {
            id: 1,
            title: 'Ocean View',
            description: 'Enjoy breathtaking views of the ocean from your room.',
            icon: '🌊' // You can replace with FontAwesome or other icon libraries
        },
        {
            id: 2,
            title: 'Luxury Rooms',
            description: 'Experience the comfort of our elegantly designed rooms.',
            icon: '🛏️'
        },
        {
            id: 3,
            title: 'Fine Dining',
            description: 'Savor gourmet meals prepared by world-class chefs.',
            icon: '🍽️'
        },
        {
            id: 4,
            title: 'Spa & Wellness',
            description: 'Relax and rejuvenate with our spa and wellness services.',
            icon: '💆'
        },
    ];

    return (
        <section className="features-section py-5">
            <Container>
                <Row className="mb-5">
                    <Col className="text-center">
                        <h2 className="fw-bold">Our Features</h2>
                        <div className="divider-line mx-auto mb-4"></div>
                        <p className="lead">Experience luxury and comfort with our exceptional amenities</p>
                    </Col>
                </Row>

                <Row>
                    {features.map((feature) => (
                        <Col key={feature.id} md={6} lg={3} className="mb-4">
                            <Card className="h-100 feature-card border-0 shadow-sm">
                                <Card.Body className="text-center p-4">
                                    <div className="feature-icon mb-3">
                                        <span style={{ fontSize: '2.5rem' }}>{feature.icon}</span>
                                    </div>
                                    <Card.Title as="h3" className="fw-bold mb-3">
                                        {feature.title}
                                    </Card.Title>
                                    <Card.Text>
                                        {feature.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default Features;