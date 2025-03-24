import React from 'react';
import { Form } from 'react-bootstrap';
import { ServiceIcon } from './ServiceIcon';
import { CheckSquare } from 'lucide-react';

export const ServiceCheckChip = ({ service, label, icon, isSelected, onClick, className }) => (
  <div 
    className={`d-flex align-items-center p-2 ${isSelected ? 'bg-primary bg-opacity-10' : 'bg-light'} rounded-3 ${className || ''}`}
    style={{ cursor: onClick ? 'pointer' : 'default', transition: 'all 0.2s' }}
    onClick={onClick}
  >
    <Form.Check
      type="checkbox"
      id={service}
      label={<>
        <span className="ms-2 text-dark">{label}</span>
        <span className="ms-2 text-muted">{icon || <ServiceIcon service={service} />}</span>
        {isSelected && <CheckSquare size={16} className="ms-2 text-primary" />}
      </>}
      checked={isSelected}
      disabled={!onClick}
      className="w-100"
      readOnly
    />
  </div>
);