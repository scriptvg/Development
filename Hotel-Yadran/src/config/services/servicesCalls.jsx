import React from 'react';

const API_URL = 'http://localhost:3001';

// Endpoints de API de servicios
const RUTA_SERVICIOS = `${API_URL}/services`;

// Obtener todos los servicios
const obtenerServicios = async () => {
    try {
        const respuesta = await fetch(RUTA_SERVICIOS);
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        return await respuesta.json();
    } catch (error) {
        console.error('Error al obtener servicios:', error);
        throw error;
    }
};

// Obtener servicio por ID
const obtenerServicio = async (idServicio) => {
    try {
        const respuesta = await fetch(`${RUTA_SERVICIOS}/${idServicio}`);
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        return await respuesta.json();
    } catch (error) {
        console.error(`Error al obtener servicio con ID ${idServicio}:`, error);
        throw error;
    }
};

// Añadir nuevo servicio
const agregarServicio = async (datosServicio) => {
    try {
        console.log('Agregando servicio:', JSON.stringify(datosServicio, null, 2));
        const respuesta = await fetch(RUTA_SERVICIOS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosServicio)
        });
        
        if (!respuesta.ok) {
            const error = await respuesta.text();
            console.error('Error del servidor:', error);
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        
        return await respuesta.json();
    } catch (error) {
        console.error('Error al agregar servicio:', error);
        throw error;
    }
};

// Actualizar servicio
const actualizarServicio = async (datosServicio) => {
    try {
        console.log('Actualizando servicio:', JSON.stringify(datosServicio, null, 2));
        const respuesta = await fetch(`${RUTA_SERVICIOS}/${datosServicio.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosServicio)
        });
        
        if (!respuesta.ok) {
            const error = await respuesta.text();
            console.error('Error del servidor:', error);
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        
        return await respuesta.json();
    } catch (error) {
        console.error('Error al actualizar servicio:', error);
        throw error;
    }
};

// Eliminar servicio
const eliminarServicio = async (idServicio) => {
    try {
        console.log('Eliminando servicio:', idServicio);
        const respuesta = await fetch(`${RUTA_SERVICIOS}/${idServicio}`, {
            method: 'DELETE'
        });
        
        if (!respuesta.ok) {
            const error = await respuesta.text();
            console.error('Error del servidor:', error);
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        
        return true;
    } catch (error) {
        console.error('Error al eliminar servicio:', error);
        throw error;
    }
};

// Exportación explícita de funciones
const llamadosServicios = {
    obtenerServicios,
    obtenerServicio,
    agregarServicio,
    actualizarServicio,
    eliminarServicio
};

export default llamadosServicios;
