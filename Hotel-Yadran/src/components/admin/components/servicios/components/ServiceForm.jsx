import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Save, X, Check } from 'lucide-react';
import IconSelector from './IconSelector.jsx';

/**
 * ServiceForm - Form for adding or editing a service
 * 
 * @param {Object} props
 * @param {Object} props.service - Service object for editing, null for adding
 * @param {Function} props.onSubmit - Function called with form data on submit
 * @param {Function} props.onCancel - Function called when cancel button is clicked
 */
const ServiceForm = ({ service = null, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        etiqueta: '',
        valor: '',
        descripcion: '',
        variante: 'primary',
        icono: null
    });
    
    const [validated, setValidated] = useState(false);
    
    // Initialize form with service data if provided
    useEffect(() => {
        if (service) {
            setFormData({
                etiqueta: service.etiqueta || '',
                valor: service.valor || '',
                descripcion: service.descripcion || '',
                variante: service.variante || 'primary',
                icono: service.icono || null
            });
        }
    }, [service]);
    
    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    
    // Handle icon selection
    const handleIconSelect = (iconComponent) => {
        setFormData({
            ...formData,
            icono: iconComponent
        });
    };
    
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }
        
        // Process form data and call onSubmit
        onSubmit(formData);
    };
    
    // Generate slug from etiqueta for valor field
    const generateSlug = () => {
        if (!formData.etiqueta) return;
        
        const slug = formData.etiqueta
            .toLowerCase()
            .replace(/[áàäâã]/g, 'a')
            .replace(/[éèëê]/g, 'e')
            .replace(/[íìïî]/g, 'i')
            .replace(/[óòöôõ]/g, 'o')
            .replace(/[úùüû]/g, 'u')
            .replace(/ñ/g, 'n')
            .replace(/[^a-z0-9]/g, '_');
            
        setFormData({
            ...formData,
            valor: slug
        });
    };
    
    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="g-3">
                <Col md={6}>
                    <Form.Group controlId="formEtiqueta">
                        <Form.Label>Nombre del Servicio <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                            type="text"
                            name="etiqueta"
                            value={formData.etiqueta}
                            onChange={handleChange}
                            placeholder="Ej: WiFi Gratis"
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor ingresa un nombre para el servicio.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                
                <Col md={6}>
                    <Form.Group controlId="formValor">
                        <Form.Label>
                            Identificador <span className="text-danger">*</span>
                            <Button
                                variant="link"
                                size="sm"
                                className="p-0 ms-2"
                                onClick={generateSlug}
                                type="button"
                            >
                                <small>Generar</small>
                            </Button>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="valor"
                            value={formData.valor}
                            onChange={handleChange}
                            placeholder="Ej: wifi_gratis"
                            required
                        />
                        <Form.Text className="text-muted">
                            Identificador único sin espacios ni caracteres especiales.
                        </Form.Text>
                        <Form.Control.Feedback type="invalid">
                            Por favor ingresa un identificador para el servicio.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                
                <Col md={12}>
                    <Form.Group controlId="formDescripcion">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            placeholder="Breve descripción del servicio..."
                            rows={3}
                        />
                    </Form.Group>
                </Col>
                
                <Col md={6}>
                    <Form.Group controlId="formVariante">
                        <Form.Label>Variante <span className="text-danger">*</span></Form.Label>
                        <Form.Select
                            name="variante"
                            value={formData.variante}
                            onChange={handleChange}
                            required
                        >
                            <option value="primary">Primary</option>
                            <option value="secondary">Secondary</option>
                            <option value="success">Success</option>
                            <option value="danger">Danger</option>
                            <option value="warning">Warning</option>
                            <option value="info">Info</option>
                            <option value="dark">Dark</option>
                        </Form.Select>
                        <Form.Text className="text-muted">
                            Determina el color con el que se mostrará el servicio.
                        </Form.Text>
                    </Form.Group>
                </Col>
                
                <Col md={6}>
                    <Form.Group controlId="formIcono">
                        <Form.Label>Ícono <span className="text-danger">*</span></Form.Label>
                        <IconSelector 
                            selectedIcon={formData.icono}
                            onSelectIcon={handleIconSelect}
                            variant={formData.variante}
                        />
                        <Form.Text className="text-muted">
                            Selecciona un ícono para representar este servicio.
                        </Form.Text>
                    </Form.Group>
                </Col>
            </Row>
            
            <div className="d-flex justify-content-end gap-2 mt-4">
                <Button 
                    variant="outline-secondary" 
                    onClick={onCancel}
                    type="button"
                >
                    <X size={18} className="me-1" />
                    Cancelar
                </Button>
                <Button 
                    variant="primary" 
                    type="submit"
                >
                    <Save size={18} className="me-1" />
                    {service ? 'Actualizar Servicio' : 'Guardar Servicio'}
                </Button>
            </div>
        </Form>
    );
};

export default ServiceForm;
