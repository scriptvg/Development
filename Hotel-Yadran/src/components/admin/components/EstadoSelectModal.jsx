import React from 'react';
import { Form, Container } from 'react-bootstrap';
import BadgeComponent from '../../test/BadgeComponent';
import { LISTA_ESTADOS, TAMAÑO_ICONO } from '../utils/estadosConfig';

const EstadoSelectModal = ({ estadoSeleccionado, onChange }) => {
    return (
        <Form.Group controlId="formRoomStatus" className="mt-4">
            <Form.Label className="h5 mb-3 text-primary">Estado de la Habitación</Form.Label>
            <Container className="d-flex flex-wrap gap-2">
                {LISTA_ESTADOS.map(estado => {
                    const IconoComponente = estado.IconoComponente;
                    return (
                        <BadgeComponent 
                            key={estado.valor}
                            text={estado.etiqueta}
                            variant={estadoSeleccionado === estado.valor ? estado.variante : 'secondary'}
                            icon={<IconoComponente size={TAMAÑO_ICONO} />}
                            onClick={() => onChange(estado.valor)}
                            className="cursor-pointer"
                        />
                    );
                })}
            </Container>
        </Form.Group>
    );
};

export default EstadoSelectModal;
