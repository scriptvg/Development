const formatRoomData = (room) => ({
    id: room.id || 'N/A',
    nombre: room.nombre || 'Sin nombre',
    tipo: room.tipo || 'No especificado',
    precio: typeof room.precio === 'number' ? room.precio.toLocaleString() : '0',
    capacidad: room.capacidad ? `${room.capacidad} personas` : 'No especificado',
    descripcion: room.descripcion || 'Sin descripción',
    estado: room.estado || 'NO_DISPONIBLE',
    servicios: Array.isArray(room.servicios) ? room.servicios : []
});

const getRoomDetails = (roomData) => ({
    ...formatRoomData(roomData),
    image: roomData.image || null,
    available: roomData.disponible || false,
    services: roomData.servicios || []
});

export const roomDataService = {
    formatRoomData,
    getRoomDetails
};

export default roomDataService;
