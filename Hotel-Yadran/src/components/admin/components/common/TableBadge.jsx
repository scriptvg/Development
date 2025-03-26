import React from 'react';
import { Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';

const TableBadge = ({ 
    children, 
    variant = 'light', 
    textColor = 'dark', 
    monospace = true, 
    className = '',
    onClick = null
}) => {
    const baseClasses = `
        border 
        fw-normal 
        ${monospace ? 'font-monospace' : ''} 
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
    `;
    
    return (
        <Badge 
            bg={variant} 
            text={textColor}
            className={baseClasses}
            onClick={onClick}
            style={{
                padding: '0.4rem 0.6rem',
                fontSize: '0.85rem',
                letterSpacing: monospace ? '-0.02em' : 'normal',
                transition: 'all 0.2s ease'
            }}
        >
            {children}
        </Badge>
    );
};

TableBadge.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.string,
    textColor: PropTypes.string,
    monospace: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func
};

export default TableBadge;
