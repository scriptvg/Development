import React, { useRef } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Eye, Edit, Trash2 } from 'lucide-react';

const ActionButtons = ({ 
    habitacion, 
    handleMostrarVer, 
    handleMostrarEditar, 
    handleEliminarHabitacion 
}) => {
    // Refs for action buttons
    const viewButtonRef = useRef(null);
    const editButtonRef = useRef(null);
    const deleteButtonRef = useRef(null);

    // Function to handle delete with confirmation
    const handleDelete = () => {
        if (confirm('¿Está seguro que desea eliminar esta habitación?')) {
            handleEliminarHabitacion(habitacion.id);
        }
    };
    
    // Button render with tooltips - icons only
    return (
        <div className="d-flex justify-content-center gap-2">
            {/* Ver Button */}
            <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Ver detalles</Tooltip>}
            >
                <Button 
                    ref={viewButtonRef}
                    variant="outline-primary" 
                    size="sm"
                    onClick={() => handleMostrarVer(habitacion)}
                    className="btn-icon rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: '36px', height: '36px', padding: 0 }}
                >
                    <Eye size={18} />
                </Button>
            </OverlayTrigger>

            {/* Editar Button */}
            <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Editar habitación</Tooltip>}
            >
                <Button 
                    ref={editButtonRef}
                    variant="outline-warning" 
                    size="sm"
                    onClick={() => handleMostrarEditar(habitacion)}
                    className="btn-icon rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: '36px', height: '36px', padding: 0 }}
                >
                    <Edit size={18} />
                </Button>
            </OverlayTrigger>

            {/* Eliminar Button */}
            <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Eliminar habitación</Tooltip>}
            >
                <Button 
                    ref={deleteButtonRef}
                    variant="outline-danger" 
                    size="sm"
                    onClick={handleDelete}
                    className="btn-icon rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: '36px', height: '36px', padding: 0 }}
                >
                    <Trash2 size={18} />
                </Button>
            </OverlayTrigger>
        </div>
    );
};

export default ActionButtons;
