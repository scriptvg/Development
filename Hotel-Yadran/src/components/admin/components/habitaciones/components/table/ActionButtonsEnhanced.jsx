import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Eye, Edit, Trash2 } from 'lucide-react';

/**
 * ActionButtonsEnhanced - Component for room action buttons with tooltips
 */
const ActionButtonsEnhanced = ({
    habitacion,
    handleMostrarVer,
    handleMostrarEditar,
    handleEliminarHabitacion
}) => {
    return (
        <div className="d-flex gap-1 justify-content-center">
            {/* View Button */}
            <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Ver detalles</Tooltip>}
            >
                <Button
                    variant="outline-info"
                    size="sm"
                    className="btn-icon"
                    onClick={() => handleMostrarVer && handleMostrarVer(habitacion)}
                >
                    <Eye size={16} />
                </Button>
            </OverlayTrigger>

            {/* Edit Button */}
            <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Editar habitación</Tooltip>}
            >
                <Button
                    variant="outline-primary"
                    size="sm"
                    className="btn-icon"
                    onClick={() => handleMostrarEditar && handleMostrarEditar(habitacion)}
                >
                    <Edit size={16} />
                </Button>
            </OverlayTrigger>

            {/* Delete Button */}
            <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Eliminar habitación</Tooltip>}
            >
                <Button
                    variant="outline-danger"
                    size="sm"
                    className="btn-icon"
                    onClick={() => handleEliminarHabitacion && handleEliminarHabitacion(habitacion.id)}
                >
                    <Trash2 size={16} />
                </Button>
            </OverlayTrigger>
        </div>
    );
};

export default ActionButtonsEnhanced;
