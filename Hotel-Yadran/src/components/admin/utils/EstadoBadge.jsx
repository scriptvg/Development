import React from 'react';
import BadgeComponent from './BadgeComponent';
import { obtenerEstado } from '../utils/estadosConfig';

const EstadoBadge = ({ estado }) => {
    const estadoInfo = obtenerEstado(estado);
    
    return (
        <BadgeComponent
            text={estadoInfo.etiqueta}
            variant={estadoInfo.variante}
            icon={estadoInfo.icono}
            className="estado-badge"
        />
    );
};

export default EstadoBadge;
