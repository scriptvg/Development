import roomsCalls from '../../../config/services/roomsCalls';
import Swal from 'sweetalert2';
import { ESTADOS } from '../utils/estadosConfig';

export const OBTENER_HABITACIONES = async (setHabitaciones, setHabitacionesFiltradas) => {
    try {
        const data = await roomsCalls.GetRooms();
        console.log('Habitaciones sin formato:', data);
        const habitacionesFormateadas = data.map(habitacion => ({
            id: habitacion.id,
            nombre: habitacion.name || habitacion.nombre || 'Sin nombre',
            tipo: habitacion.type || habitacion.tipo || 'Estándar',
            precio: parseFloat(habitacion.price || habitacion.precio || 0),
            descripcion: habitacion.description || habitacion.descripcion || 'Sin descripción',
            capacidad: parseInt(habitacion.capacity || habitacion.capacidad || 2),
            estado: habitacion.status || habitacion.estado || ESTADOS.NO_DISPONIBLE,
            servicios: habitacion.services || habitacion.servicios || [],
            imagen: habitacion.image || habitacion.imagen
        }));
        console.log('Habitaciones formateadas:', habitacionesFormateadas);
        setHabitaciones(habitacionesFormateadas);
        setHabitacionesFiltradas(habitacionesFormateadas);
    } catch (error) {
        console.error('Error al obtener habitaciones:', error);
        Swal.fire('Error', 'No se pudieron cargar las habitaciones', 'error');
    }
};

export const GUARDAR_HABITACION = async (datosHabitacion, setHabitaciones, handleCerrar) => {
    try {
        if (!datosHabitacion.id) {
            const nuevaHabitacion = {
                ...datosHabitacion,
                id: `HAB-${Date.now().toString(34).toUpperCase()}`
            };
            const habitacionAgregada = await roomsCalls.AddRoom(nuevaHabitacion);
            setHabitaciones(prev => [...prev, habitacionAgregada]);
            Swal.fire('Éxito', 'Habitación añadida correctamente', 'success');
        } else {
            await roomsCalls.UpdateRoom(datosHabitacion);
            setHabitaciones(prev => prev.map(h => h.id === datosHabitacion.id ? datosHabitacion : h));
            Swal.fire('Éxito', 'Habitación actualizada correctamente', 'success');
        }
        handleCerrar();
    } catch (error) {
        console.error('Error al guardar habitación:', error);
        Swal.fire('Error', 'No se pudo guardar la habitación', 'error');
    }
};

export const ELIMINAR_HABITACION = async (id, obtenerHabitaciones) => {
    try {
        await roomsCalls.DeleteRoom(id);
        Swal.fire('Éxito', 'Habitación eliminada correctamente', 'success');
        obtenerHabitaciones();
    } catch (error) {
        console.error('Error al eliminar habitación:', error);
        Swal.fire('Error', 'No se pudo eliminar la habitación', 'error');
    }
};

export const FILTRAR_HABITACIONES = (habitaciones, terminoBusqueda, estadoSeleccionado, pestanaActiva) => {
    if (!habitaciones) return [];
    
    let filtradas = [...habitaciones];

    if (terminoBusqueda) {
        filtradas = filtradas.filter(habitacion => 
            habitacion.id.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
            habitacion.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
            habitacion.tipo.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
            habitacion.descripcion.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
            habitacion.estado.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
            habitacion.precio.toString().includes(terminoBusqueda) ||
            habitacion.capacidad.toString().includes(terminoBusqueda) ||
            (habitacion.servicios && habitacion.servicios.some(servicio => 
                servicio.toLowerCase().includes(terminoBusqueda.toLowerCase())
            ))
        );
    }

    if (pestanaActiva !== 'todos') {
        filtradas = filtradas.filter(habitacion => habitacion.estado === pestanaActiva);
    }

    return filtradas;
};

const formatRoomData = (roomData) => {
    if (!roomData) return {};
    return {
        id: roomData.id || '',
        nombre: roomData.nombre || roomData.name || 'Sin nombre',
        tipo: roomData.tipo || roomData.type || 'Estándar',
        precio: parseFloat(roomData.precio || roomData.price || 0),
        descripcion: roomData.descripcion || roomData.description || 'Sin descripción',
        capacidad: parseInt(roomData.capacidad || roomData.capacity || 2),
        estado: roomData.estado || roomData.status || ESTADOS.NO_DISPONIBLE,
        servicios: roomData.servicios || roomData.services || [],
        imagen: roomData.imagen || roomData.image || ''
    };
};

const roomService = {
    OBTENER_HABITACIONES,
    GUARDAR_HABITACION,
    ELIMINAR_HABITACION,
    FILTRAR_HABITACIONES,
    formatRoomData
};

export default roomService;