import React from 'react';
import { Table, Button } from 'react-bootstrap';
import EstadoBadge from '../../utils/EstadoBadge';

const RoomsTable = ({ habitacionesFiltradas, handleMostrar, handleMostrarVer, handleEliminarHabitacion }) => {
    return (
        <Table striped bordered hover responsive className="align-middle table-hover">
            <thead>
                <tr className="bg-light">
                    <th className="text-center py-3 text-uppercase fs-6 fw-bold text-secondary">ID</th>
                    <th className="py-3 text-uppercase fs-6 fw-bold text-secondary">Nombre</th>
                    <th className="py-3 text-uppercase fs-6 fw-bold text-secondary">Tipo</th>
                    <th className="text-center py-3 text-uppercase fs-6 fw-bold text-secondary">Precio</th>
                    <th className="text-center py-3 text-uppercase fs-6 fw-bold text-secondary">Capacidad</th>
                    <th className="py-3 text-uppercase fs-6 fw-bold text-secondary">Descripción</th>
                    <th className="text-center py-3 text-uppercase fs-6 fw-bold text-secondary">Estado</th>
                    <th className="text-center py-3 text-uppercase fs-6 fw-bold text-secondary">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {habitacionesFiltradas.length > 0 ? (
                    habitacionesFiltradas.map(habitacion => (
                        <tr key={habitacion.id} className="align-middle">
                            <td className="text-center fw-bold text-primary">{habitacion.id}</td>
                            <td className="fw-semibold">{habitacion.nombre}</td>
                            <td>{habitacion.tipo}</td>
                            <td className="text-center fw-bold">
                                ${habitacion.precio.toLocaleString()}
                            </td>
                            <td className="text-center">{habitacion.capacidad} personas</td>
                            <td className="text-truncate" style={{ maxWidth: '250px' }}>
                                {habitacion.descripcion}
                            </td>
                            <td className="text-center">
                                <EstadoBadge estado={habitacion.estado} />
                            </td>
                            <td className="text-center">
                                <Button
                                    variant="outline-warning"
                                    className="me-2 mb-1 mb-md-0 rounded-3"
                                    onClick={() => { handleMostrar(habitacion); }}
                                >
                                    <i className="bi bi-pencil-square me-1"></i> Editar
                                </Button>
                                <Button
                                    variant="outline-info"
                                    className="me-2 mb-1 mb-md-0 rounded-3"
                                    onClick={() => handleMostrarVer(habitacion)}
                                >
                                    <i className="bi bi-eye me-1"></i> Ver
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    className="rounded-3"
                                    onClick={() => handleEliminarHabitacion(habitacion.id)}
                                >
                                    <i className="bi bi-trash-fill me-1"></i> Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="8" className="text-center py-5">
                            <i className="bi bi-inbox-fill text-secondary fs-1 mb-3 d-block"></i>
                            <p className="mb-3 text-secondary fs-5">No hay habitaciones disponibles</p>
                            <Button
                                variant="primary"
                                className="rounded-3 px-4"
                                onClick={handleMostrar}
                            >
                                <i className="bi bi-plus-circle me-2"></i>
                                Añadir una habitación
                            </Button>
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
};

export default RoomsTable; 