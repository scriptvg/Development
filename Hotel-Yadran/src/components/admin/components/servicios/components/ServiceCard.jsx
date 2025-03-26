import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Settings, Edit, Trash } from 'lucide-react';

/**
 * ServiceCard - Displays a service in card format
 * 
 * @param {Object} props
 * @param {Object} props.service - Service object to display
 * @param {Function} props.onEdit - Function to call when edit button is clicked
 * @param {Function} props.onDelete - Function to call when delete button is clicked
 */
const ServiceCard = ({ service, onEdit, onDelete }) => {
    return (
        <Card className="service-card h-100 border-0 shadow-sm">
            <Card.Header className={`bg-${service.variante || 'primary'} bg-opacity-10 d-flex justify-content-between align-items-center`}>
                <Badge bg={service.variante || 'primary'}>
                    {service.variante || 'primary'}
                </Badge>
                <div className="service-actions">
                    <Button 
                        variant="light" 
                        size="sm" 
                        className="btn-icon"
                        onClick={onEdit}
                    >
                        <Edit size={16} />
                    </Button>
                    <Button 
                        variant="light" 
                        size="sm" 
                        className="btn-icon ms-1"
                        onClick={onDelete}
                    >
                        <Trash size={16} />
                    </Button>
                </div>
            </Card.Header>
            <Card.Body className="d-flex flex-column">
                <div className="service-icon-wrapper mb-3">
                    <div className={`service-icon-bg bg-${service.variante || 'primary'} bg-opacity-10`}>
                        {service.icono && React.isValidElement(service.icono) 
                            ? React.cloneElement(service.icono, { size: 32 }) 
                            : <Settings size={32} className={`text-${service.variante || 'primary'}`} />}
                    </div>
                </div>
                <h5 className="service-title mb-2">{service.etiqueta}</h5>
                <div className="service-value mb-2">
                    <code className="bg-light px-2 py-1 rounded">
                        {service.valor}
                    </code>
                </div>
                <p className="service-description text-muted mb-0 flex-grow-1 small">
                    {service.descripcion || 'Sin descripción'}
                </p>
            </Card.Body>
            <Card.Footer className="bg-white border-top pt-0">
                <div className="d-grid gap-2">
                    <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={onEdit}
                    >
                        Editar Servicio
                    </Button>
                </div>
            </Card.Footer>
        </Card>
    );
};

export default ServiceCard;
