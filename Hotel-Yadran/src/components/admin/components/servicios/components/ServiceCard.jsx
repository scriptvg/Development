import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { Edit, Trash2, CheckCircle, XCircle, Layers } from 'lucide-react';
// Importar iconos de Font Awesome
import * as FaIcons from 'react-icons/fa';
// Importar iconos de Material Design
import * as MdIcons from 'react-icons/md';
// Importar iconos de IonIcons
import * as IoIcons from 'react-icons/io5';

// Función auxiliar para obtener el componente de icono
const getIconComponent = (iconName) => {
    if (typeof iconName !== 'string') return null;

    // Comprobar en diferentes librerías
    if (iconName.startsWith('Fa') && FaIcons[iconName]) {
        return FaIcons[iconName];
    }

    if (iconName.startsWith('Md') && MdIcons[iconName]) {
        return MdIcons[iconName];
    }

    if (iconName.startsWith('Io') && IoIcons[iconName]) {
        return IoIcons[iconName];
    }

    return null;
};

/**
 * ServiceCard - Card component for displaying a service
 */
const ServiceCard = ({ service, onEdit, onDelete, onToggle }) => {
    // Renderizar el icono apropiado
    const renderIcon = () => {
        // Obtener el componente de icono
        const IconComponent = getIconComponent(service.icono);

        if (IconComponent) {
            return <IconComponent size={24} className="text-white" />;
        }

        // Si no se puede obtener el icono, usar icono por defecto
        return <Layers size={24} className="text-white" />;
    };

    return (
        <Card className="service-card h-100 shadow-sm border-0 overflow-hidden">
            {/* Barra superior decorativa del color de la variante */}
            <div
                className="card-badge"
                style={{
                    backgroundColor: service.variante ? `var(--bs-${service.variante})` : 'var(--bs-primary)'
                }}
            />

            <Card.Body className="d-flex flex-column">
                {/* Badge estado (activo/inactivo) */}
                <div className="position-absolute top-0 end-0 m-2">
                    <Badge
                        bg={service.habilitado ? 'success' : 'secondary'}
                        className="rounded-pill px-2 py-1 d-flex align-items-center"
                    >
                        {service.habilitado ?
                            <><CheckCircle size={12} className="me-1" /> Activo</> :
                            <><XCircle size={12} className="me-1" /> Inactivo</>
                        }
                    </Badge>
                </div>

                {/* Contenido principal del servicio */}
                <div className="text-center mb-3 mt-2">
                    <div className="service-icon-wrapper">
                        <div
                            className="service-icon-bg"
                            style={{
                                backgroundColor: service.variante ? `var(--bs-${service.variante})` : 'var(--bs-primary)'
                            }}
                        >
                            {renderIcon()}
                        </div>
                    </div>

                    <h5 className="service-title">
                        {service.etiqueta}
                    </h5>

                    <Badge
                        bg="light"
                        text="dark"
                        className="mb-2 service-code px-2 py-1"
                    >
                        {service.valor}
                    </Badge>

                    <Card.Text className="service-description">
                        {service.descripcion}
                    </Card.Text>
                </div>

                {/* Footer con precio y acciones */}
                <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
                    <Badge
                        bg={service.variante || 'primary'}
                        className="px-3 py-2 d-flex align-items-center"
                    >
                        ${service.precio?.toFixed(2) || '0.00'}
                    </Badge>

                    <div className="service-actions">
                        <Button
                            variant="outline-primary"
                            size="sm"
                            className="btn-icon me-2"
                            onClick={onEdit}
                            title="Editar servicio"
                        >
                            <Edit size={15} />
                        </Button>
                        <Button
                            variant="outline-danger"
                            size="sm"
                            className="btn-icon"
                            onClick={onDelete}
                            title="Eliminar servicio"
                        >
                            <Trash2 size={15} />
                        </Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ServiceCard;
