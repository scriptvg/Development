import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [validated, setValidated] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id.replace('form', '').toLowerCase()]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            // Here you would normally send the data to your backend
            console.log("Form data:", formData);
            setSubmitted(true);
            setFormData({ name: '', email: '', message: '' });
            
            // Reset submitted state after 5 seconds
            setTimeout(() => setSubmitted(false), 5000);
        }
        
        setValidated(true);
    };

    return (
        <section className="contact-section py-5 bg-light">
            <Container>
                <Row className="mb-4">
                    <Col>
                        <h2 className="text-center fw-bold">Contact Us</h2>
                        <div className="text-center mb-4">
                            <div className="divider-line mx-auto"></div>
                        </div>
                        <p className="text-center lead">
                            Have questions or need assistance? Feel free to reach out to us!
                        </p>
                    </Col>
                </Row>
                
                {submitted && (
                    <Row className="mb-4">
                        <Col md={{ span: 6, offset: 3 }}>
                            <Alert variant="success">
                                Thank you for your message! We'll get back to you soon.
                            </Alert>
                        </Col>
                    </Row>
                )}
                
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form noValidate validated={validated} onSubmit={handleSubmit} 
                              className="contact-form p-4 bg-white shadow-sm rounded">
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter your name" 
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide your name.
                                </Form.Control.Feedback>
                            </Form.Group>
                            
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid email address.
                                </Form.Control.Feedback>
                            </Form.Group>
                            
                            <Form.Group className="mb-3" controlId="formMessage">
                                <Form.Label>Message</Form.Label>
                                <Form.Control 
                                    as="textarea" 
                                    rows={4} 
                                    placeholder="Enter your message" 
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter your message.
                                </Form.Control.Feedback>
                            </Form.Group>
                            
                            <Button variant="primary" type="submit" className="w-100 py-2 mt-3">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ContactSection;