import React from 'react';
import { Table, Card } from 'react-bootstrap';
import { ESTADOS } from '../../../../utils/estadosConfig.jsx';
import EstadoBadge from '../../../../utils/EstadoBadge';
import TableBadge from '../../../../components/common/TableBadge';
import ServiceBadge from '../../../../components/common/ServiceBadge';
import PaginationControls from './PaginationControls';
import TabNavigator from './TabNavigator';
import ActionButtons from './ActionButtonsEnhanced';
import '../../styles/paginationStyles.css';
import '../../../../components/common/serviceBadge.css';

const RoomsTable = ({ 
    habitaciones,
    habitacionesFiltradas, 
    handleMostrarVer, 
    handleMostrarEditar, 
    handleEliminarHabitacion,
    currentPage,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange,
    activeTab,
    onTabChange
}) => {
    // Calculate pagination details
    const indexOfLastItem = Math.min(currentPage * itemsPerPage, habitacionesFiltradas.length);
    const indexOfFirstItem = Math.min((currentPage - 1) * itemsPerPage, indexOfLastItem);
    const currentItems = habitacionesFiltradas.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.max(1, Math.ceil(habitacionesFiltradas.length / itemsPerPage));

    // Calculate tab counts correctly using ESTADOS from .jsx file
    const tabCounts = {
        all: habitaciones.length,
        [ESTADOS.DISPONIBLE]: habitaciones.filter(h => h.estado === ESTADOS.DISPONIBLE).length,
        [ESTADOS.RESERVADO]: habitaciones.filter(h => h.estado === ESTADOS.RESERVADO).length,
        [ESTADOS.MANTENIMIENTO]: habitaciones.filter(h => h.estado === ESTADOS.MANTENIMIENTO).length,
        [ESTADOS.NO_DISPONIBLE]: habitaciones.filter(h => h.estado === ESTADOS.NO_DISPONIBLE).length,
        archivada: habitaciones.filter(h => h.estado === 'archivada').length,
    };

    // Format price
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP'
        }).format(price);
    };

    // Get main service to display
    const getMainService = (services = []) => {
        return services[0] || null;
    };

    return (
        <div>
            {/* Tab Navigation */}
            <TabNavigator 
                activeTab={activeTab} 
                onTabChange={onTabChange} 
                tabCounts={tabCounts} 
            />

            <Card className="border-0 shadow-sm overflow-hidden">
                <div className="table-responsive">
                    <Table hover responsive className="align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="py-3 px-4 border-0" style={{ minWidth: "120px" }}>ID</th>
                                <th className="py-3 px-4 border-0" style={{ minWidth: "180px" }}>Nombre</th>
                                <th className="py-3 px-4 border-0" style={{ minWidth: "150px" }}>Tipo</th>
                                <th className="py-3 px-4 text-end border-0" style={{ minWidth: "140px" }}>Precio</th>
                                <th className="py-3 px-4 text-center border-0" style={{ minWidth: "120px" }}>Capacidad</th>
                                <th className="py-3 px-4 border-0" style={{ minWidth: "200px" }}>Servicios</th>
                                <th className="py-3 px-4 text-center border-0" style={{ minWidth: "180px" }}>Estado</th>
                                <th className="py-3 px-4 text-center border-0" style={{ minWidth: "150px" }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.length > 0 ? (
                                currentItems.map((habitacion, index) => (
                                    <tr key={habitacion.id} className={index < currentItems.length - 1 ? "border-bottom" : ""}>
                                        <td className="py-3 px-4">
                                            <TableBadge 
                                                variant="light" 
                                                textColor="dark"
                                                monospace={true}
                                                onClick={() => handleMostrarVer(habitacion)}
                                            >
                                                {habitacion.id}
                                            </TableBadge>
                                        </td>
                                        <td className="py-3 px-4 fw-medium">{habitacion.nombre}</td>
                                        <td className="py-3 px-4">{habitacion.tipo}</td>
                                        <td className="py-3 px-4 text-end fw-bold">{formatPrice(habitacion.precio)}</td>
                                        <td className="py-3 px-4 text-center">{habitacion.capacidad} personas</td>
                                        <td className="py-3 px-4" style={{ maxWidth: "250px", overflow: "hidden" }}>
                                            {habitacion.servicios?.length > 0 ? (
                                                <div className="d-flex flex-wrap gap-1">
                                                    {getMainService(habitacion.servicios) && (
                                                        <ServiceBadge 
                                                            serviceId={getMainService(habitacion.servicios)} 
                                                            size="sm" 
                                                            maxWidth="150px"
                                                        />
                                                    )}
                                                    {habitacion.servicios.length > 1 && (
                                                        <span className="badge bg-light text-dark">+{habitacion.servicios.length - 1}</span>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="text-muted">Ninguno</span>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <EstadoBadge estado={habitacion.estado} />
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <ActionButtons 
                                                habitacion={habitacion}
                                                handleMostrarVer={handleMostrarVer}
                                                handleMostrarEditar={handleMostrarEditar}
                                                handleEliminarHabitacion={handleEliminarHabitacion}
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8} className="text-center py-5">
                                        <div className="py-5">
                                            <div className="mb-3 fs-1">🔍</div>
                                            <h5 className="fw-semibold">No se encontraron habitaciones</h5>
                                            <p className="text-muted">Prueba con otros criterios de búsqueda</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </Card>
            
            {/* Pagination Controls */}
            <PaginationControls 
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                totalItems={habitacionesFiltradas.length}
                onPageChange={onPageChange}
                onItemsPerPageChange={onItemsPerPageChange}
            />
        </div>
    );
};

export default RoomsTable;