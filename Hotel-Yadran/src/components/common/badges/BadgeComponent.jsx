import React from 'react';
import { Badge } from 'react-bootstrap';

const BadgeComponent = ({ text, variant, icon, onClick }) => {
  return (
    <Badge bg={variant} className="me-1" onClick={onClick}>
      {icon && <span className="me-1">{icon}</span>}
      {text}
    </Badge>
  );
};

export default BadgeComponent;