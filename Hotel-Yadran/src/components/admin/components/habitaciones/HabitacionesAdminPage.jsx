import React, { useState } from 'react';
import RoomFilters from './components/filters/RoomFilters';
import RoomsTable from './components/RoomsTable';

const HabitacionesAdminPage = () => {
    const [habitaciones, setHabitaciones] = useState([]);
    const [filters, setFilters] = useState({
        search: '',
        priceMin: '',
        priceMax: '',
        tipo: '',
        capacidad: '',
        estado: '',
        servicios: []
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const tiposHabitacion = [...new Set(habitaciones.map(h => h.tipo))];

    const filtrarHabitaciones = () => {
        return habitaciones.filter(habitacion => {
            if (filters.search && !habitacion.nombre.toLowerCase().includes(filters.search.toLowerCase()) && 
                !habitacion.id.toString().includes(filters.search)) {
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
                } else if (filters.capacidad !== '5+' && habitacion.capacidad.toString() !== filters.capacidad) {
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

    const habitacionesFiltradas = filtrarHabitaciones();

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        onPageChange(1);
    };

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="habitaciones-admin">
            <RoomFilters 
                onFilterChange={handleFilterChange}
                tiposHabitacion={tiposHabitacion}
                initialFilters={filters}
            />
            <RoomsTable 
                habitacionesFiltradas={habitacionesFiltradas}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChange={onPageChange}
            />
        </div>
    );
};

export default HabitacionesAdminPage;