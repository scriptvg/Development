import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

export const FormInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  error, 
  placeholder, 
  type = 'text',
  icon: Icon
}) => (
  <Form.Group>
    <Form.Label>{label}</Form.Label>
    <InputGroup>
      {Icon && (
        <InputGroup.Text>
          <Icon size={18} />
        </InputGroup.Text>
      )}
      <Form.Control
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        isInvalid={!!error}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </InputGroup>
  </Form.Group>
);