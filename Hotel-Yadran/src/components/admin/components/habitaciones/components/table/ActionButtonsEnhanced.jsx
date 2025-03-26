import React, { useState, useRef } from 'react';
import { Button, Overlay, Popover } from 'react-bootstrap';
import { Eye, Edit, Trash2, AlertTriangle, Check, X } from 'lucide-react';
import Swal from 'sweetalert2';

const ActionButtonsEnhanced = ({ 
    habitacion, 
    handleMostrarVer, 
    handleMostrarEditar, 
    handleEliminarHabitacion 
}) => {
    // State for delete confirmation popover
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const deleteButtonRef = useRef(null);
    
    // Function to handle the delete confirmation
    const confirmDelete = () => {
        setShowDeleteConfirm(false);
        
        Swal.fire({
            title: '¿Estás seguro?',
            text: `La habitación "${habitacion.nombre}" será eliminada permanentemente`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            buttonsStyling: true,
            customClass: {
                confirmButton: 'btn btn-danger',
                cancelButton: 'btn btn-secondary'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                handleEliminarHabitacion(habitacion.id);
                Swal.fire(
                    '¡Eliminada!',
                    'La habitación ha sido eliminada.',
                    'success'
                );
            }
        });
    };
    
    return (
        <div className="d-flex justify-content-center gap-2">
            {/* Ver Button */}
            <Button 
                variant="outline-primary" 
                size="sm"
                onClick={() => handleMostrarVer(habitacion)}
                className="btn-icon rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '36px', height: '36px', padding: 0 }}
                title="Ver detalles"
            >
                <Eye size={18} />
            </Button>

            {/* Editar Button */}
            <Button 
                variant="outline-warning" 
                size="sm"
                onClick={() => handleMostrarEditar(habitacion)}
                className="btn-icon rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '36px', height: '36px', padding: 0 }}
                title="Editar habitación"
            >
                <Edit size={18} />
            </Button>

            {/* Eliminar Button */}
            <Button 
                ref={deleteButtonRef}
                variant="outline-danger" 
                size="sm"
                onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}
                className="btn-icon rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '36px', height: '36px', padding: 0 }}
                title="Eliminar habitación"
            >
                <Trash2 size={18} />
            </Button>

            {/* Delete Confirmation Overlay */}
            <Overlay
                show={showDeleteConfirm}
                target={deleteButtonRef.current}
                placement="top"
                container={document.body}
                containerPadding={20}
            >
                <Popover id="popover-delete-confirm" className="border-danger">
                    <Popover.Header as="h3" className="bg-danger text-white d-flex align-items-center gap-2">
                        <AlertTriangle size={18} />
                        Confirmar eliminación
                    </Popover.Header>
                    <Popover.Body>
                        <p className="mb-2">¿Estás seguro de eliminar esta habitación?</p>
                        <p className="mb-3 fw-bold">{habitacion.nombre}</p>
                        <div className="d-flex justify-content-end gap-2">
                            <Button 
                                variant="outline-secondary" 
                                size="sm" 
                                onClick={() => setShowDeleteConfirm(false)}
                                className="d-flex align-items-center gap-1"
                            >
                                <X size={14} />
                                Cancelar
                            </Button>
                            <Button 
                                variant="danger" 
                                size="sm" 
                                onClick={confirmDelete}
                                className="d-flex align-items-center gap-1"
                            >
                                <Check size={14} />
                                Eliminar
                            </Button>
                        </div>
                    </Popover.Body>
                </Popover>
            </Overlay>
        </div>
    );
};

export default ActionButtonsEnhanced;
