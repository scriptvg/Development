import React, { useState, useEffect } from 'react';
import RoomFilters from './components/filters/RoomFilters';
import { getAllRooms } from './services/roomDataService';
import { ESTADOS } from '../../utils/estadosConfig.jsx';
import { Alert, Spinner } from 'react-bootstrap';

// Error Boundary para capturar errores en componentes hijos
class ErrorHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error en componente:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Alert variant="danger" className="my-3">
                    <Alert.Heading>Ha ocurrido un error</Alert.Heading>
                    <p>{this.state.error?.message || "Error inesperado al cargar el componente."}</p>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-outline-danger" onClick={() => window.location.reload()}>
                            Recargar página
                        </button>
                    </div>
                </Alert>
            );
        }

        return this.props.children;
    }
}

const HabitacionesAdminPage = () => {
    // Estado para datos de habitaciones
    const [habitaciones, setHabitaciones] = useState([]);
    const [habitacionesFiltradas, setHabitacionesFiltradas] = useState([]);

    // Estado para filtros
    const [filters, setFilters] = useState({
        search: '',
        priceMin: '',
        priceMax: '',
        tipo: '',
        capacidad: '',
        estado: '',
        servicios: []
    });

    // Estado para UI
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('todos');

    // Importar RoomsTable dinámicamente para evitar problemas con import estático
    const [RoomsTable, setRoomsTable] = useState(null);

    useEffect(() => {
        // Importar el componente de tabla dinámicamente
        import('./components/table/RoomsTable')
            .then(module => {
                setRoomsTable(() => module.default);
            })
            .catch(err => {
                console.error("Error importando RoomsTable:", err);
                setError("No se pudo cargar el componente de tabla. Por favor recargue la página.");
            });
    }, []);

    // Load rooms data on component mount
    useEffect(() => {
        const loadRooms = async () => {
            try {
                setLoading(true);
                setError(null);

                await getAllRooms(
                    (data) => {
                        if (Array.isArray(data)) {
                            setHabitaciones(data);
                            setHabitacionesFiltradas(data);
                        } else {
                            console.warn("Datos de habitaciones no son un array:", data);
                            setHabitaciones([]);
                            setHabitacionesFiltradas([]);
                        }
                        setLoading(false);
                    },
                    (err) => {
                        console.error("Error cargando habitaciones:", err);
                        setError("Error al cargar habitaciones: " + (err.message || "Error desconocido"));
                        setLoading(false);
                        setHabitaciones([]);
                        setHabitacionesFiltradas([]);
                    }
                );
            } catch (err) {
                console.error("Error inesperado:", err);
                setError("Error inesperado: " + (err.message || "Error desconocido"));
                setLoading(false);
                setHabitaciones([]);
                setHabitacionesFiltradas([]);
            }
        };

        loadRooms();
    }, []);

    const tiposHabitacion = [...new Set(habitaciones.filter(h => h && h.tipo).map(h => h.tipo))];

    const filtrarHabitaciones = () => {
        if (!Array.isArray(habitaciones)) return [];

        return habitaciones.filter(habitacion => {
            if (!habitacion) return false;

            if (filters.search && !habitacion.nombre?.toLowerCase().includes(filters.search.toLowerCase()) &&
                !habitacion.id?.toString().includes(filters.search)) {
                return false;
            }
            if (filters.priceMin && habitacion.precio < parseInt(filters.priceMin)) {
                return false;
            }
            if (filters.priceMax && habitacion.precio > parseInt(filters.priceMax)) {
                return false;
            }
            if (filters.tipo && habitacion.tipo !== filters.tipo) {
                return false;
            }
            if (filters.capacidad) {
                if (filters.capacidad === '5+' && habitacion.capacidad < 5) {
                    return false;
                } else if (filters.capacidad !== '5+' && habitacion.capacidad?.toString() !== filters.capacidad) {
                    return false;
                }
            }
            if (filters.estado && habitacion.estado !== filters.estado) {
                return false;
            }
            if (filters.servicios.length > 0) {
                const habitacionServicios = habitacion.servicios || [];
                if (!filters.servicios.every(s => habitacionServicios.includes(s))) {
                    return false;
                }
            }
            return true;
        });
    };

    // Apply filters whenever filters state changes
    useEffect(() => {
        const filtered = filtrarHabitaciones();
        setHabitacionesFiltradas(filtered);
        setCurrentPage(1);
    }, [filters, habitaciones]);

    // Add filter for tab changes
    useEffect(() => {
        if (activeTab !== 'todos') {
            const filteredByTab = habitaciones.filter(h =>
                h && (activeTab === 'archivada' ? h.estado === 'archivada' : h.estado === activeTab)
            );
            setHabitacionesFiltradas(filteredByTab);
            setCurrentPage(1);
        } else {
            // Apply regular filters
            const filtered = filtrarHabitaciones();
            setHabitacionesFiltradas(filtered);
        }
    }, [activeTab, habitaciones]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (value) => {
        setItemsPerPage(value);
        setCurrentPage(1);
    };

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);

        // If selecting a specific tab, clear estado filter to avoid confusion
        if (tabId !== 'todos') {
            setFilters(prev => ({ ...prev, estado: '' }));
        }
    };

    // Placeholder handlers for room actions
    const handleMostrarVer = (habitacion) => {
        console.log("Ver habitación:", habitacion?.id);
    };

    const handleMostrarEditar = (habitacion) => {
        console.log("Editar habitación:", habitacion?.id);
    };

    const handleEliminarHabitacion = (id) => {
        console.log("Eliminar habitación:", id);
    };

    if (loading) {
        return (
            <div className="p-5 text-center">
                <Spinner animation="border" role="status" variant="primary" />
                <p className="mt-3">Cargando datos de habitaciones...</p>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="danger" className="m-4">
                <Alert.Heading>Error</Alert.Heading>
                <p>{error}</p>
                <div className="d-flex justify-content-end">
                    <button 
                        className="btn btn-outline-danger" 
                        onClick={() => window.location.reload()}
                    >
                        Reintentar
                    </button>
                </div>
            </Alert >
        );
    }

return (
    <ErrorHandler>
        <div className="habitaciones-admin">
            <RoomFilters
                onFilterChange={handleFilterChange}
                tiposHabitacion={tiposHabitacion}
                initialFilters={filters}
            />

            {RoomsTable ? (
                <RoomsTable
                    habitaciones={habitaciones}
                    habitacionesFiltradas={habitacionesFiltradas}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    onPageChange={onPageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                    handleMostrarVer={handleMostrarVer}
                    handleMostrarEditar={handleMostrarEditar}
                    handleEliminarHabitacion={handleEliminarHabitacion}
                />
            ) : (
                <div className="text-center my-5">
                    <Spinner animation="border" role="status" variant="primary" />
                    <p>Cargando tabla de habitaciones...</p>
                </div>
            )}
        </div>
    </ErrorHandler>
);
};

export default HabitacionesAdminPage;