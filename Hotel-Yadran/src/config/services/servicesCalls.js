import { API_URL } from './api';

// Services API endpoints
const SERVICES_ENDPOINT = `${API_URL}/services`;

// Helper function to handle fetch responses
const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error in API call');
    }
    return response.json();
};

// Get all services
const GetServices = async () => {
    try {
        const response = await fetch(SERVICES_ENDPOINT);
        return await handleResponse(response);
    } catch (error) {
        console.error('Error fetching services:', error);
        throw error;
    }
};

// Get service by ID
const GetService = async (serviceId) => {
    try {
        const response = await fetch(`${SERVICES_ENDPOINT}/${serviceId}`);
        return await handleResponse(response);
    } catch (error) {
        console.error(`Error fetching service with ID ${serviceId}:`, error);
        throw error;
    }
};

// Add new service
const AddService = async (serviceData) => {
    try {
        const response = await fetch(SERVICES_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(serviceData),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Error adding service:', error);
        throw error;
    }
};

// Update service
const UpdateService = async (serviceData) => {
    try {
        const response = await fetch(`${SERVICES_ENDPOINT}/${serviceData.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(serviceData),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Error updating service:', error);
        throw error;
    }
};

// Delete service
const DeleteService = async (serviceId) => {
    try {
        const response = await fetch(`${SERVICES_ENDPOINT}/${serviceId}`, {
            method: 'DELETE',
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Error deleting service:', error);
        throw error;
    }
};

const servicesCalls = {
    GetServices,
    GetService,
    AddService,
    UpdateService,
    DeleteService,
};

export default servicesCalls;
