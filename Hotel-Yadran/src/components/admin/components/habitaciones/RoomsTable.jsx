import React from 'react';
import { Table, Button, OverlayTrigger, Tooltip, Badge } from 'react-bootstrap';
import { Edit2, Eye, Trash2, AlertCircle } from 'lucide-react';
import EstadoBadge from '../../utils/EstadoBadge';

const RoomsTable = ({ habitacionesFiltradas, handleMostrar, handleMostrarVer, handleMostrarEditar, handleEliminarHabitacion }) => {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP'
        }).format(price);
    };

    return (
        <div className="table-responsive">
            <Table hover className="align-middle shadow-sm border-top mb-0">
                <thead>
                    <tr className="bg-light">
                        <th className="text-center py-3 px-4 text-uppercase fs-6 fw-bold text-primary" style={{width: '80px'}}>ID</th>
                        <th className="py-3 px-4 text-uppercase fs-6 fw-bold text-primary">Nombre</th>
                        <th className="py-3 px-4 text-uppercase fs-6 fw-bold text-primary">Tipo</th>
                        <th className="text-end py-3 px-4 text-uppercase fs-6 fw-bold text-primary">Precio</th>
                        <th className="text-center py-3 px-4 text-uppercase fs-6 fw-bold text-primary">Capacidad</th>
                        <th className="text-center py-3 px-4 text-uppercase fs-6 fw-bold text-primary">Estado</th>
                        <th className="text-end py-3 px-4 text-uppercase fs-6 fw-bold text-primary">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {habitacionesFiltradas.length > 0 ? (
                        habitacionesFiltradas.map(habitacion => (
                            <tr key={habitacion.id} className="border-bottom">
                                <td className="text-center px-4">
                                    <Badge bg="light" text="dark" className="px-2 py-1">
                                        #{habitacion.id}
                                    </Badge>
                                </td>
                                <td className="px-4">
                                    <div className="fw-semibold">{habitacion.nombre}</div>
                                    <small className="text-muted text-truncate d-block" style={{maxWidth: '200px'}}>
                                        {habitacion.descripcion}
                                    </small>
                                </td>
                                <td className="px-4">
                                    <Badge bg="light" text="dark" className="px-3 py-2">
                                        {habitacion.tipo}
                                    </Badge>
                                </td>
                                <td className="text-end px-4 fw-bold">
                                    {formatPrice(habitacion.precio)}
                                </td>
                                <td className="text-center px-4">
                                    <Badge bg="info" className="px-2 py-1">
                                        {habitacion.capacidad} personas
                                    </Badge>
                                </td>
                                <td className="text-center px-4">
                                    <EstadoBadge estado={habitacion.estado} />
                                </td>
                                <td className="text-end px-4">
                                    <div className="d-flex gap-2 justify-content-end">
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>Ver detalles</Tooltip>}
                                        >
                                            <Button
                                                variant="light"
                                                size="sm"
                                                className="d-flex align-items-center p-2"
                                                onClick={() => handleMostrarVer(habitacion)}
                                            >
                                                <Eye size={16} />
                                            </Button>
                                        </OverlayTrigger>

                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>Editar habitación</Tooltip>}
                                        >
                                            <Button
                                                variant="light"
                                                size="sm"
                                                className="d-flex align-items-center p-2"
                                                onClick={() => handleMostrarEditar(habitacion)}
                                            >
                                                <Edit2 size={16} />
                                            </Button>
                                        </OverlayTrigger>

                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>Eliminar habitación</Tooltip>}
                                        >
                                            <Button
                                                variant="light"
                                                size="sm"
                                                className="d-flex align-items-center p-2 text-danger"
                                                onClick={() => handleEliminarHabitacion(habitacion.id)}
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </OverlayTrigger>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center py-5">
                                <AlertCircle size={40} className="text-secondary mb-3" />
                                <p className="text-secondary mb-3">No hay habitaciones disponibles</p>
                                <Button
                                    variant="primary"
                                    className="px-4"
                                    onClick={handleMostrar}
                                >
                                    Añadir habitación
                                </Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default RoomsTable;