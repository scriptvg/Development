import React from 'react';
import PropTypes from 'prop-types';
import { obtenerServicio } from '../../utils/ServicesConfig.jsx';
import './serviceChip.css';

/**
 * ServiceChip Component - Displays a service with its icon and label
 * 
 * @param {Object} props
 * @param {string} props.serviceId - ID of the service from ServiceConfig
 * @param {boolean} props.selected - Whether the service is selected
 * @param {function} props.onClick - Click handler (optional)
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.size - Size of the chip (sm, md, lg)
 */
const ServiceChip = ({ 
    serviceId, 
    selected = false, 
    onClick = null, 
    className = '', 
    size = 'md' 
}) => {
    const service = obtenerServicio(serviceId);
    
    if (!service) return null;
    
    const sizeClass = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : '';
    const isClickable = onClick !== null;
    
    return (
        <div 
            className={`
                service-chip 
                bg-${service.variante}-subtle 
                text-${service.variante} 
                border-${service.variante}
                ${selected ? 'selected bg-' + service.variante + ' text-white' : ''}
                ${isClickable ? 'cursor-pointer' : ''}
                ${sizeClass}
                ${className}
            `}
            onClick={isClickable ? onClick : undefined}
        >
            {service.icono && React.isValidElement(service.icono) && 
                React.cloneElement(service.icono, { 
                    size: size === 'sm' ? 14 : size === 'lg' ? 24 : 18 
                })
            }
            <span>{service.etiqueta}</span>
        </div>
    );
};

ServiceChip.propTypes = {
    serviceId: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    onClick: PropTypes.func,
    className: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg'])
};

export default ServiceChip;
