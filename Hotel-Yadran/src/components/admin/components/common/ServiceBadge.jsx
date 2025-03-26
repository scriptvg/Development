import React from 'react';
import { Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { obtenerServicio } from '../../utils/ServicesConfig.jsx';
import './serviceBadge.css';

/**
 * ServiceBadge Component - A stylish badge for displaying services
 * 
 * @param {Object} props
 * @param {string} props.serviceId - ID of the service from ServiceConfig
 * @param {string} props.size - Size of the badge ('sm', 'md', 'lg')
 * @param {string} props.className - Additional CSS classes
 * @param {Function} props.onClick - Optional click handler
 * @param {string|number} props.maxWidth - Optional max width for the badge
 */
const ServiceBadge = ({ 
    serviceId, 
    size = 'md', 
    className = '',
    onClick = null,
    maxWidth = null
}) => {
    const service = obtenerServicio(serviceId);
    
    if (!service) return null;
    
    const sizeClasses = {
        sm: 'px-2 py-1 fs-6',
        md: 'px-3 py-2',
        lg: 'px-3 py-2 fs-5'
    };
    
    const sizeClass = sizeClasses[size] || sizeClasses.md;
    const isClickable = onClick !== null;
    
    return (
        <Badge 
            bg={`${service.variante || 'primary'}`}
            className={`
                service-badge
                d-inline-flex 
                align-items-center 
                gap-2 
                shadow-sm 
                ${sizeClass}
                ${isClickable ? 'cursor-pointer service-badge-hover' : ''}
                ${className}
            `}
            onClick={isClickable ? onClick : undefined}
            style={{
                transition: 'all 0.2s ease',
                fontWeight: 500,
                borderRadius: '0.5rem',
                maxWidth: maxWidth || '100%',
                minWidth: size === 'sm' ? '80px' : '120px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'inline-flex'
            }}
        >
            {React.cloneElement(service.icono, { 
                size: size === 'sm' ? 14 : size === 'lg' ? 20 : 16,
                className: 'flex-shrink-0' // Prevent icon from shrinking
            })}
            <span className="text-truncate" style={{ maxWidth: '100%' }}>{service.etiqueta}</span>
        </Badge>
    );
};

ServiceBadge.propTypes = {
    serviceId: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    className: PropTypes.string,
    onClick: PropTypes.func,
    maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default ServiceBadge;
