import axios from 'axios';
import { API_URL } from './api';

// Services API endpoints
const SERVICES_ENDPOINT = `${API_URL}/services`;

// Get all services
const GetServices = async () => {
    try {
        const response = await axios.get(SERVICES_ENDPOINT);
        return response.data;
    } catch (error) {
        console.error('Error fetching services:', error);
        throw error;
    }
};

// Get service by ID
const GetService = async (serviceId) => {
    try {
        const response = await axios.get(`${SERVICES_ENDPOINT}/${serviceId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching service with ID ${serviceId}:`, error);
        throw error;
    }
};

// Add new service
const AddService = async (serviceData) => {
    try {
        const response = await axios.post(SERVICES_ENDPOINT, serviceData);
        return response.data;
    } catch (error) {
        console.error('Error adding service:', error);
        throw error;
    }
};

// Update service
const UpdateService = async (serviceData) => {
    try {
        const response = await axios.put(`${SERVICES_ENDPOINT}/${serviceData.id}`, serviceData);
        return response.data;
    } catch (error) {
        console.error('Error updating service:', error);
        throw error;
    }
};

// Delete service
const DeleteService = async (serviceId) => {
    try {
        const response = await axios.delete(`${SERVICES_ENDPOINT}/${serviceId}`);
        return response.data;
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
    DeleteService
};

export default servicesCalls;
