import React from 'react';
import { Row, Col, Badge } from 'react-bootstrap';
import { ESTADOS, LISTA_ESTADOS } from '../../utils/estadosConfig.jsx';
import { CheckCircle, XCircle, Wrench, FilePlus, CirclePlus, X } from 'lucide-react';
import './estadoSelectChips.css';

/**
 * Estado Select Chips Component
 * 
 * @param {Object} props Component props
 * @param {string} props.estadoSeleccionado Currently selected state
 * @param {Function} props.onChange Function called when state changes
 * @param {string} props.size Size of the chips ('sm', 'md', 'lg')
 * @param {string} props.className Additional classes for the container
 */
const EstadoSelectChips = ({ 
    estadoSeleccionado, 
    onChange, 
    size = 'md',
    className = '' 
}) => {
    // Get icon based on estado
    const getEstadoIcon = (estado) => {
        const iconSize = size === 'lg' ? 20 : 16;
        
        switch (estado) {
            case ESTADOS.DISPONIBLE:
                return <CheckCircle size={iconSize} className="me-2" />;
            case ESTADOS.NO_DISPONIBLE:
                return <XCircle size={iconSize} className="me-2" />;
            case ESTADOS.MANTENIMIENTO:
                return <Wrench size={iconSize} className="me-2" />;
            case ESTADOS.RESERVADO:
                return <FilePlus size={iconSize} className="me-2" />;
            case ESTADOS.CANCELADO:
                return <X size={iconSize} className="me-2" />;
            default:
                return <CirclePlus size={iconSize} className="me-2" />;
        }
    };

    // Get badge color based on estado
    const getEstadoColor = (estado) => {
        switch (estado) {
            case ESTADOS.DISPONIBLE: return 'success';
            case ESTADOS.NO_DISPONIBLE: return 'secondary';
            case ESTADOS.MANTENIMIENTO: return 'danger';
            case ESTADOS.RESERVADO: return 'warning';
            case ESTADOS.CANCELADO: return 'dark';
            case 'archivada': return 'dark';
            default: return 'info';
        }
    };

    // Find label for estado
    const getEstadoLabel = (estado) => {
        const estadoInfo = LISTA_ESTADOS.find(e => e.valor === estado);
        return estadoInfo ? estadoInfo.etiqueta : estado;
    };

    return (
        <div className={`estado-select-chips ${className}`}>
            <Row className="g-3">
                {LISTA_ESTADOS.map(estado => (
                    <Col key={estado.valor} sm={6} md={6} lg={6}>
                        <div 
                            className={`estado-chip-badge ${estadoSeleccionado === estado.valor ? 'selected' : ''}`}
                            onClick={() => onChange(estado.valor)}
                        >
                            <Badge
                                bg={getEstadoColor(estado.valor)}
                                className={`w-100 py-2 px-3 d-flex align-items-center gap-1 ${size === 'lg' ? 'fs-6' : ''}`}
                            >
                                {getEstadoIcon(estado.valor)}
                                <span className="text-truncate">{estado.etiqueta}</span>
                            </Badge>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default EstadoSelectChips;
