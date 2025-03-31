/**
 * Adaptador para conectar servicesCalls.js con los componentes de servicios
 * Mantiene la misma interfaz pero usa llamadosServicios internamente
 */
import llamadosServicios from '../../../../../config/services/servicesCalls';

/**
 * Prepara un servicio para guardarlo asegurando que tiene todos los campos necesarios
 */
export const prepareServiceData = (serviceData) => {
    return {
        id: serviceData.id || `srv-${Date.now()}`,
        valor: serviceData.valor || '',
        etiqueta: serviceData.etiqueta || '',
        descripcion: serviceData.descripcion || '',
        precio: typeof serviceData.precio === 'number' ? serviceData.precio : 0,
        variante: serviceData.variante || 'primary',
        icono: serviceData.icono || 'FaBed',
        size: serviceData.size || 18,
        habilitado: typeof serviceData.habilitado === 'boolean' ? serviceData.habilitado : true
    };
};

/**
 * Exporta una función para obtener todos los servicios
 */
export const getServices = async () => {
    return await llamadosServicios.obtenerServicios();
};

/**
 * Exporta una función para obtener un servicio por ID
 */
export const getServiceById = async (serviceId) => {
    return await llamadosServicios.obtenerServicio(serviceId);
};

/**
 * Exporta una función para añadir un servicio
 */
export const addService = async (serviceData) => {
    const prepared = prepareServiceData(serviceData);
    return await llamadosServicios.agregarServicio(prepared);
};

/**
 * Exporta una función para actualizar un servicio
 */
export const updateService = async (serviceData) => {
    const prepared = prepareServiceData(serviceData);
    return await llamadosServicios.actualizarServicio(prepared);
};

/**
 * Exporta una función para eliminar un servicio
 */
export const deleteService = async (serviceId) => {
    return await llamadosServicios.eliminarServicio(serviceId);
};

export default {
    getServices,
    getServiceById,
    addService,
    updateService,
    deleteService
};
