import React from 'react';
import { Button } from 'react-bootstrap';

export const ActionButton = ({ 
  icon: Icon, 
  variant, 
  onClick, 
  tooltip, 
  className,
  size = 'lg'
}) => (
  <Button
    variant={`outline-${variant}`}
    onClick={onClick}
    className={`rounded-3 me-2 ${className}`}
    title={tooltip}
    size={size}
  >
    <Icon className='icon-acciones' width={20} />
  </Button>
);