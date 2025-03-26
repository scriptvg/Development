import { LISTA_SERVICIOS } from '../../../utils/ServicesConfig.jsx';

/**
 * Get all services
 * @param {Function} successCallback - Called on success with services data
 * @param {Function} errorCallback - Called on error with error object
 */
const getAllServices = async (successCallback, errorCallback) => {
    try {
        // Instead of trying API calls, just use the local data directly
        const services = [...LISTA_SERVICIOS];
        
        if (typeof successCallback === 'function') {
            successCallback(services);
        }
        return services;
    } catch (error) {
        console.error('Error in services data flow:', error);
        if (typeof errorCallback === 'function') {
            errorCallback(error);
        }
        return LISTA_SERVICIOS;
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
        // Find service in local data
        const service = LISTA_SERVICIOS.find(s => 
            s.id === serviceId || s.valor === serviceId
        );
        
        if (!service) {
            throw new Error(`Service with ID ${serviceId} not found`);
        }
        
        if (typeof successCallback === 'function') {
            successCallback(service);
        }
        return service;
    } catch (error) {
        console.error(`Error fetching service with ID ${serviceId}:`, error);
        
        if (typeof errorCallback === 'function') {
            errorCallback(error);
        }
        return null;
    }
};

/**
 * Format service data for saving
 * @param {Object} serviceData - The service data to format
 */
const formatServiceData = (serviceData) => {
    return {
        id: serviceData.id || `SRV-${Date.now().toString(36).toUpperCase()}`,
        valor: serviceData.valor,
        etiqueta: serviceData.etiqueta,
        descripcion: serviceData.descripcion || '',
        variante: serviceData.variante || 'primary',
        icono: serviceData.icono
    };
};

// Local services data store (in-memory)
let servicesStore = [...LISTA_SERVICIOS];

/**
 * Add new service
 * @param {Object} serviceData - Service data to add
 * @param {Function} successCallback - Called on success
 * @param {Function} errorCallback - Called on error
 */
const addService = async (serviceData, successCallback, errorCallback) => {
    try {
        const formattedService = formatServiceData(serviceData);
        
        // Add to local store
        servicesStore.push(formattedService);
        
        if (typeof successCallback === 'function') {
            successCallback(formattedService);
        }
        return formattedService;
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
        
        // Update in local store
        const index = servicesStore.findIndex(s => s.id === formattedService.id);
        
        if (index === -1) {
            throw new Error(`Service with ID ${formattedService.id} not found`);
        }
        
        servicesStore[index] = formattedService;
        
        if (typeof successCallback === 'function') {
            successCallback(formattedService);
        }
        return formattedService;
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
        // Delete from local store
        const initialLength = servicesStore.length;
        servicesStore = servicesStore.filter(s => s.id !== serviceId);
        
        if (servicesStore.length === initialLength) {
            throw new Error(`Service with ID ${serviceId} not found`);
        }
        
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
