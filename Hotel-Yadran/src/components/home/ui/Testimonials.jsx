import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: 'John Doe',
            position: 'Business Traveler',
            feedback: 'Amazing experience! The staff was very friendly and the service was excellent. The ocean view from my room was breathtaking.',
            date: 'March 15, 2023',
            rating: 5,
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        {
            id: 2,
            name: 'Jane Smith',
            position: 'Family Vacation',
            feedback: 'The rooms were clean and comfortable. Highly recommend staying here! The kids loved the pool and beach access.',
            date: 'April 10, 2023',
            rating: 5,
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
        },
        {
            id: 3,
            name: 'Michael Brown',
            position: 'Honeymoon Stay',
            feedback: 'Great location and wonderful amenities. Will definitely come back! The couples spa package was the highlight of our stay.',
            date: 'May 5, 2023',
            rating: 4,
            avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
        },
    ];

    // Function to render star ratings
    const renderStars = (rating) => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <span key={i} className={`star ${i < rating ? 'star-filled' : 'star-empty'}`}>
                    {i < rating ? '★' : '☆'}
                </span>
            );
        }
        return <div className="testimonial-rating mb-3">{stars}</div>;
    };

    return (
        <section className="testimonials-section py-5 bg-light">
            <Container>
                <Row className="mb-5">
                    <Col className="text-center">
                        <h2 className="fw-bold">What Our Guests Say</h2>
                        <div className="divider-line mx-auto mb-4"></div>
                        <p className="lead">Hear from our satisfied guests about their experiences</p>
                    </Col>
                </Row>

                <Row>
                    {testimonials.map((testimonial) => (
                        <Col key={testimonial.id} md={4} className="mb-4">
                            <Card className="testimonial-card h-100 border-0 shadow-sm">
                                <Card.Body className="p-4">
                                    <div className="d-flex align-items-center mb-4">
                                        <div className="testimonial-avatar me-3">
                                            <img
                                                src={testimonial.avatar}
                                                alt={testimonial.name}
                                                className="rounded-circle"
                                                width="60"
                                                height="60"
                                            />
                                        </div>
                                        <div>
                                            <h5 className="card-title mb-0">{testimonial.name}</h5>
                                            <p className="card-subtitle text-muted mb-2">{testimonial.position}</p>
                                            {renderStars(testimonial.rating)}
                                        </div>
                                    </div>

                                    <div className="testimonial-content">
                                        <p className="card-text quote-text">"{testimonial.feedback}"</p>
                                        <p className="card-text text-muted mt-3 small">{testimonial.date}</p>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <Row className="mt-4">
                    <Col className="text-center">
                        <a href="#" className="btn btn-outline-primary">View All Reviews</a>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Testimonials;