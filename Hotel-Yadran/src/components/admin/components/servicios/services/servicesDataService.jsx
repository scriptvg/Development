import llamadosServicios from '../../../../../config/services/servicesCalls';

/**
 * Adaptador para llamadosServicios que proporciona métodos con callbacks para mantener compatibilidad
 * con componentes existentes mientras usa servicesCalls.js
 */

/**
 * Get all services
 * @param {Function} successCallback - Called on success with services data
 * @param {Function} errorCallback - Called on error with error object
 */
const getAllServices = async (successCallback, errorCallback) => {
    try {
        const services = await llamadosServicios.obtenerServicios();

        if (typeof successCallback === 'function') {
            successCallback(services);
        }
        return services;
    } catch (error) {
        console.error('Error in services data flow:', error);
        if (typeof errorCallback === 'function') {
            errorCallback(error);
        }
        throw error;
    }
};

/**
 * Get service by ID
 * @param {string} serviceId - Service ID
 * @param {Function} successCallback - Called on success with service data
 * @param {Function} errorCallback - Called on error with error object
 */
const getServiceById = async (serviceId, successCallback, errorCallback) => {
    try {
        const service = await llamadosServicios.obtenerServicio(serviceId);

        if (typeof successCallback === 'function') {
            successCallback(service);
        }
        return service;
    } catch (error) {
        console.error(`Error fetching service with ID ${serviceId}:`, error);

        if (typeof errorCallback === 'function') {
            errorCallback(error);
        }
        throw error;
    }
};

/**
 * Format service data for saving
 * @param {Object} serviceData - The service data to format
 */
const formatServiceData = (serviceData) => {
    return {
        id: serviceData.id || `srv-${Date.now().toString(36).toUpperCase()}`,
        valor: serviceData.valor,
        etiqueta: serviceData.etiqueta,
        descripcion: serviceData.descripcion || '',
        variante: serviceData.variante || 'primary',
        icono: serviceData.icono,
        size: serviceData.size || 18,
        precio: serviceData.precio || 0,
        habilitado: typeof serviceData.habilitado === 'boolean' ? serviceData.habilitado : true
    };
};

/**
 * Add new service
 * @param {Object} serviceData - Service data to add
 * @param {Function} successCallback - Called on success
 * @param {Function} errorCallback - Called on error
 */
const addService = async (serviceData, successCallback, errorCallback) => {
    try {
        const formattedService = formatServiceData(serviceData);

        const result = await llamadosServicios.agregarServicio(formattedService);

        if (typeof successCallback === 'function') {
            successCallback(result);
        }
        return result;
    } catch (error) {
        console.error('Error adding service:', error);

        if (typeof errorCallback === 'function') {
            errorCallback(error);
        }
        throw error;
    }
};

/**
 * Update service
 * @param {Object} serviceData - Service data to update
 * @param {Function} successCallback - Called on success
 * @param {Function} errorCallback - Called on error
 */
const updateService = async (serviceData, successCallback, errorCallback) => {
    try {
        const formattedService = formatServiceData(serviceData);

        const result = await llamadosServicios.actualizarServicio(formattedService);

        if (typeof successCallback === 'function') {
            successCallback(result);
        }
        return result;
    } catch (error) {
        console.error('Error updating service:', error);

        if (typeof errorCallback === 'function') {
            errorCallback(error);
        }
        throw error;
    }
};

/**
 * Delete service
 * @param {string} serviceId - ID of service to delete
 * @param {Function} successCallback - Called on success
 * @param {Function} errorCallback - Called on error
 */
const deleteService = async (serviceId, successCallback, errorCallback) => {
    try {
        await llamadosServicios.eliminarServicio(serviceId);

        if (typeof successCallback === 'function') {
            successCallback({ success: true, id: serviceId });
        }
        return { success: true, id: serviceId };
    } catch (error) {
        console.error('Error deleting service:', error);

        if (typeof errorCallback === 'function') {
            errorCallback(error);
        }
        throw error;
    }
};

const servicesDataService = {
    getAllServices,
    getServiceById,
    formatServiceData,
    addService,
    updateService,
    deleteService
};

export default servicesDataService;
