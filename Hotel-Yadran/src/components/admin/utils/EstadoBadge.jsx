import React from 'react';
import { Badge } from 'react-bootstrap';
import { CheckCircle, XCircle, Wrench, FilePlus, CirclePlus, X } from 'lucide-react';
// Fix the import path to include .jsx extension
import { ESTADOS } from './estadosConfig.jsx';

const EstadoBadge = ({ estado, size = 'md' }) => {
    const getEstadoInfo = (estado) => {
        switch (estado) {
            case ESTADOS.DISPONIBLE:
                return { 
                    color: 'success', 
                    label: 'Disponible',
                    icon: <CheckCircle size={size === 'lg' ? 18 : 14} className="me-1" />
                };
            case ESTADOS.RESERVADO:
                return { 
                    color: 'warning', 
                    label: 'Reservado',
                    icon: <FilePlus size={size === 'lg' ? 18 : 14} className="me-1" />
                };
            case ESTADOS.MANTENIMIENTO:
                return { 
                    color: 'danger', 
                    label: 'En Mantenimiento',
                    icon: <Wrench size={size === 'lg' ? 18 : 14} className="me-1" />
                };
            case ESTADOS.NO_DISPONIBLE:
                return { 
                    color: 'secondary', 
                    label: 'No Disponible',
                    icon: <XCircle size={size === 'lg' ? 18 : 14} className="me-1" />
                };
            case ESTADOS.CANCELADO:
                return { 
                    color: 'dark', 
                    label: 'Cancelado',
                    icon: <X size={size === 'lg' ? 18 : 14} className="me-1" />
                };
            case 'archivada':
                return { 
                    color: 'dark', 
                    label: 'Archivada',
                    icon: <X size={size === 'lg' ? 18 : 14} className="me-1" />
                };
            default:
                return { 
                    color: 'light', 
                    label: estado || 'Desconocido',
                    icon: <CirclePlus size={size === 'lg' ? 18 : 14} className="me-1" />
                };
        }
    };

    const { color, label, icon } = getEstadoInfo(estado);
    
    const badgeClass = size === 'lg' ? 'px-3 py-2' : '';

    return (
        <Badge 
            bg={color} 
            className={`d-inline-flex align-items-center ${badgeClass}`}
        >
            {icon}
            {label}
        </Badge>
    );
};

export default EstadoBadge;
