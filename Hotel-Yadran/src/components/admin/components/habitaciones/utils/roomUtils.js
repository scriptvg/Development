export const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(price);
};

export const validateRoom = (roomData) => {
    const validations = [
        { field: 'name', message: 'El nombre de la habitación es requerido' },
        { field: 'type', message: 'El tipo de habitación es requerido' },
        { field: 'price', message: 'El precio debe ser mayor a 0' },
        { field: 'capacity', message: 'La capacidad debe ser mayor a 0' },
        { field: 'description', message: 'La descripción es requerida' },
        { field: 'image', message: 'La imagen es requerida' },
        { field: 'estado', message: 'El estado de la habitación es requerido' }
    ];

    for (const validation of validations) {
        if (!roomData[validation.field]) {
            return { isValid: false, message: validation.message };
        }
    }

    return { isValid: true };
};
