import React, { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { Eye, EyeOff } from 'lucide-react';

export const PasswordInput = ({ 
  label, 
  value, 
  onChange, 
  error, 
  disabled,
  placeholder = 'Ingrese su contraseña'
}) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <Form.Group className='mt-3'>
      <Form.Label>{label}</Form.Label>
      <InputGroup>
        <Form.Control
          type={showPass ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          disabled={disabled}
          isInvalid={!!error}
          placeholder={placeholder}
        />
        <Button
          variant='outline-secondary'
          onClick={() => setShowPass(!showPass)}
          disabled={disabled}
        >
          {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
        </Button>
        <Form.Control.Feedback type='invalid'>{error}</Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
};