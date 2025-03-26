import roomsCalls from '../../../../../config/services/roomsCalls';
import Swal from 'sweetalert2';
import { ESTADOS } from '../../../utils/estadosConfig.jsx';
import { createDefaultRate } from '../../../utils/rateConfig.jsx';
import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

// Funciones de utilidad
const exportToExcel = (data) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Habitaciones");
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    FileSaver.saveAs(dataBlob, `habitaciones_${new Date().toISOString()}.xlsx`);
};

const formatRoomData = (roomData) => {
    if (!roomData) return {};
    
    // Create a base formatted room object
    const formattedRoom = {
        id: roomData.id || '',
        nombre: roomData.nombre || roomData.name || 'Sin nombre',
        tipo: roomData.tipo || roomData.type || 'Estándar',
        precio: parseFloat(roomData.precio || roomData.price || 0),
        descripcion: roomData.descripcion || roomData.description || 'Sin descripción',
        capacidad: parseInt(roomData.capacidad || roomData.capacity || 2),
        estado: roomData.estado || roomData.status || ESTADOS.NO_DISPONIBLE,
        servicios: roomData.servicios || roomData.services || [],
        imagen: roomData.imagen || roomData.image || '',
        // Add rates information
        rates: roomData.rates || [createDefaultRate(parseFloat(roomData.precio || roomData.price || 0))]
    };
    
    return formattedRoom;
};

const filterRooms = (rooms, filters) => {
    return rooms.filter(room => {
        const matchesSearch = !filters.searchTerm || 
            room.nombre.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            room.tipo.toLowerCase().includes(filters.searchTerm.toLowerCase());
        
        const matchesPrice = !filters.priceRange || 
            (room.precio >= filters.priceRange[0] && room.precio <= filters.priceRange[1]);
        
        const matchesCapacity = !filters.capacity || room.capacidad === parseInt(filters.capacity);
        
        const matchesState = !filters.estado || room.estado === filters.estado;

        return matchesSearch && matchesPrice && matchesCapacity && matchesState;
    });
};

// Función mejorada para filtrar por estado y término de búsqueda
const filterRoomsByState = (rooms, searchTerm, stateFilter) => {
    if (!rooms || !Array.isArray(rooms)) return [];
    
    return rooms.filter(room => {
        // Filtrar por estado
        const matchesState = !stateFilter || room.estado === stateFilter;
        
        // Filtrar por término de búsqueda
        const searchLower = searchTerm.toLowerCase().trim();
        const matchesSearch = !searchTerm || 
            room.nombre?.toLowerCase().includes(searchLower) ||
            room.tipo?.toLowerCase().includes(searchLower) ||
            room.descripcion?.toLowerCase().includes(searchLower) ||
            room.id?.toLowerCase().includes(searchLower) ||
            room.precio?.toString().includes(searchLower) ||
            room.capacidad?.toString().includes(searchLower);
        
        return matchesState && matchesSearch;
    });
};

const sortRooms = (rooms, sortConfig) => {
    return [...rooms].sort((a, b) => {
        if (!sortConfig.key) return 0;
        
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (sortConfig.direction === 'ascending') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });
};

// Funciones principales del servicio
const getAllRooms = async (successCallback, errorCallback) => {
    try {
        const data = await roomsCalls.GetRooms();
        if (typeof successCallback === 'function') {
            const habitacionesFormateadas = Array.isArray(data) ? data.map(formatRoomData) : [];
            successCallback(habitacionesFormateadas);
        }
    } catch (error) {
        console.error('Error al obtener habitaciones:', error);
        if (typeof errorCallback === 'function') {
            errorCallback(error);
        } else {
            Swal.fire('Error', 'No se pudieron cargar las habitaciones', 'error');
        }
    }
};

const saveRoom = async (datosHabitacion) => {
    try {
        const roomToSave = formatRoomData(datosHabitacion);
        if (!roomToSave.id) {
            roomToSave.id = `HAB-${Date.now().toString(36).toUpperCase()}`;
            return await roomsCalls.AddRoom(roomToSave);
        } else {
            return await roomsCalls.UpdateRoom(roomToSave);
        }
    } catch (error) {
        console.error('Error al guardar habitación:', error);
        throw error;
    }
};

const deleteRoom = async (id) => {
    try {
        await roomsCalls.DeleteRoom(id);
    } catch (error) {
        console.error('Error al eliminar habitación:', error);
        throw error;
    }
};

// Export room to Excel with rates information
const exportToExcelWithRates = (data) => {
    // Create two worksheets - one for basic room info and one for rates
    const basicSheet = XLSX.utils.json_to_sheet(data.map(room => ({
        ID: room.id,
        Nombre: room.nombre,
        Tipo: room.tipo,
        'Precio Base': room.precio,
        Capacidad: room.capacidad,
        Estado: room.estado,
        Servicios: room.servicios?.join(', ') || ''
    })));
    
    // Flatten rates data for a second sheet
    const ratesData = [];
    data.forEach(room => {
        if (room.rates && room.rates.length > 0) {
            room.rates.forEach(rate => {
                ratesData.push({
                    'Room ID': room.id,
                    'Room Name': room.nombre,
                    'Rate Name': rate.name,
                    'Rate Type': rate.type,
                    'Base Price': rate.basePrice,
                    'Includes Adults': rate.includesAdults,
                    'Includes Children': rate.includesChildren,
                    'Additional 2nd Adult': rate.additionalPerson?.secondAdult || 0,
                    'Additional 3rd Adult': rate.additionalPerson?.thirdAdult || 0,
                    'Additional 4th Adult': rate.additionalPerson?.fourthAdult || 0,
                    'Additional 1st Child': rate.additionalPerson?.firstChild || 0,
                    'Additional 2nd Child': rate.additionalPerson?.secondChild || 0,
                    'Additional 3rd Child': rate.additionalPerson?.thirdChild || 0
                });
            });
        }
    });
    
    const ratesSheet = XLSX.utils.json_to_sheet(ratesData);
    
    // Create workbook with both sheets
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, basicSheet, "Habitaciones");
    XLSX.utils.book_append_sheet(wb, ratesSheet, "Tarifas");
    
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    FileSaver.saveAs(dataBlob, `habitaciones_con_tarifas_${new Date().toISOString()}.xlsx`);
};

// Add a rate to a room
const addRateToRoom = async (roomId, rate) => {
    try {
        // Get the room
        const room = await roomsCalls.GetRoom(roomId);
        if (!room) throw new Error('Room not found');
        
        // Format the room data
        const formattedRoom = formatRoomData(room);
        
        // Ensure rates array exists
        if (!formattedRoom.rates) formattedRoom.rates = [];
        
        // Add the new rate
        formattedRoom.rates.push(rate);
        
        // Update the room
        return await roomsCalls.UpdateRoom(formattedRoom);
    } catch (error) {
        console.error('Error adding rate to room:', error);
        throw error;
    }
};

// Update a rate in a room
const updateRateInRoom = async (roomId, rateIndex, updatedRate) => {
    try {
        // Get the room
        const room = await roomsCalls.GetRoom(roomId);
        if (!room) throw new Error('Room not found');
        
        // Format the room data
        const formattedRoom = formatRoomData(room);
        
        // Ensure rates array exists and is valid
        if (!formattedRoom.rates || rateIndex >= formattedRoom.rates.length) {
            throw new Error('Rate not found');
        }
        
        // Update the rate
        formattedRoom.rates[rateIndex] = updatedRate;
        
        // Update the room
        return await roomsCalls.UpdateRoom(formattedRoom);
    } catch (error) {
        console.error('Error updating rate in room:', error);
        throw error;
    }
};

// Delete a rate from a room
const deleteRateFromRoom = async (roomId, rateIndex) => {
    try {
        // Get the room
        const room = await roomsCalls.GetRoom(roomId);
        if (!room) throw new Error('Room not found');
        
        // Format the room data
        const formattedRoom = formatRoomData(room);
        
        // Ensure rates array exists and is valid
        if (!formattedRoom.rates || rateIndex >= formattedRoom.rates.length) {
            throw new Error('Rate not found');
        }
        
        // Remove the rate
        formattedRoom.rates.splice(rateIndex, 1);
        
        // If no rates left, add a default one
        if (formattedRoom.rates.length === 0) {
            formattedRoom.rates.push(createDefaultRate(formattedRoom.precio));
        }
        
        // Update the room
        return await roomsCalls.UpdateRoom(formattedRoom);
    } catch (error) {
        console.error('Error deleting rate from room:', error);
        throw error;
    }
};

const roomService = {
    formatRoomData,
    getAllRooms,
    filterRooms,
    filterRoomsByState,
    sortRooms,
    saveRoom,
    deleteRoom,
    exportToExcel,
    exportToExcelWithRates,
    addRateToRoom,
    updateRateInRoom,
    deleteRateFromRoom
};

// Para uso con import ... from
export default roomService;

// Para uso con import { ... }
export {
    formatRoomData,
    getAllRooms,
    filterRooms,
    filterRoomsByState,
    sortRooms,
    saveRoom,
    deleteRoom,
    exportToExcel,
    exportToExcelWithRates,
    addRateToRoom,
    updateRateInRoom,
    deleteRateFromRoom
};
