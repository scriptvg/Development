import React from 'react';
import llamadosServicios from '../../../config/services/servicesCalls';

// Tamaño estándar para los iconos de servicios
export const TAMAÑO_ICONO = 18;

// Valores de servicios predeterminados (como referencia)
export const SERVICIOS = {
    WIFI: 'wifi',
    AIRE_ACONDICIONADO: 'aire_acondicionado',
    TV: 'tv',
    VISTA_MAR: 'vista_al_mar',
    BAÑO_PRIVADO: 'bano_privado',
    DESAYUNO: 'desayuno',
    PISCINA: 'piscina',
    BALCON: 'balcon',
    TOALLAS: 'toallas',
    MINIBAR: 'minibar',
    ESTACIONAMIENTO: 'estacionamiento',
    MASCOTAS: 'mascotas',
    BICICLETAS: 'bicicletas'
};

// Servicios básicos y premium
export const SERVICIOS_BASICOS = [SERVICIOS.WIFI, SERVICIOS.BAÑO_PRIVADO, SERVICIOS.TV];
export const SERVICIOS_PREMIUM = [...SERVICIOS_BASICOS, SERVICIOS.AIRE_ACONDICIONADO, SERVICIOS.VISTA_MAR, SERVICIOS.DESAYUNO, SERVICIOS.MINIBAR];

// Almacén de servicios (se actualiza dinámicamente)
export const LISTA_SERVICIOS = [];

/**
 * Filtra servicios por términos de búsqueda o estado habilitado
 */
export const filterServices = (servicios = [], terminoBusqueda = '', soloHabilitados = false) => {
    if (!servicios || !Array.isArray(servicios)) return [];

    return servicios.filter(servicio => {
        if (!servicio) return false;
        const busquedaCoincide = !terminoBusqueda ||
            (servicio.etiqueta?.toLowerCase() || '').includes(terminoBusqueda.toLowerCase()) ||
            (servicio.descripcion?.toLowerCase() || '').includes(terminoBusqueda.toLowerCase());
        const estadoCoincide = !soloHabilitados || servicio.habilitado !== false;
        return busquedaCoincide && estadoCoincide;
    });
};

/**
 * Obtiene un servicio específico por ID o valor
 */
export const obtenerServicio = (id, servicios = []) => {
    const listaServicios = servicios.length > 0 ? servicios : LISTA_SERVICIOS;
    if (!id || listaServicios.length === 0) return null;
    return listaServicios.find(servicio => servicio.id === id || servicio.valor === id);
};

/**
 * Expande una lista de valores de servicios a objetos completos
 */
export const expandirServicios = (serviciosIds = [], servicios = []) => {
    if (!Array.isArray(serviciosIds) || serviciosIds.length === 0) return [];
    const listaServicios = servicios.length > 0 ? servicios : LISTA_SERVICIOS;
    return serviciosIds.map(id => obtenerServicio(id, listaServicios)).filter(Boolean);
};

/**
 * Función para obtener los servicios disponibles para una habitación
 */
export const getServiciosHabitacion = async (serviciosIds = []) => {
    if (!serviciosIds || !serviciosIds.length) return [];
    try {
        if (LISTA_SERVICIOS.length === 0) {
            const datos = await llamadosServicios.obtenerServicios();
            LISTA_SERVICIOS.length = 0;
            LISTA_SERVICIOS.push(...datos);
        }
        return expandirServicios(serviciosIds, LISTA_SERVICIOS);
    } catch (error) {
        console.error('Error al obtener servicios de habitación:', error);
        return [];
    }
};

/**
 * Obtener el precio total de los servicios seleccionados
 */
export const calcularPrecioServicios = (serviciosIds = [], servicios = []) => {
    const serviciosExpandidos = expandirServicios(serviciosIds, servicios);
    return serviciosExpandidos.reduce((total, servicio) => total + (parseFloat(servicio.precio) || 0), 0);
};

// Inicializar la lista de servicios al importar este módulo
(async () => {
    try {
        if (LISTA_SERVICIOS.length === 0) {
            const datos = await llamadosServicios.obtenerServicios();
            LISTA_SERVICIOS.push(...datos);
        }
    } catch (error) {
        console.error('ServicesConfig: Error al inicializar lista de servicios:', error);
    }
})();

// Exportación por defecto
export default {
    SERVICIOS,
    SERVICIOS_BASICOS,
    SERVICIOS_PREMIUM,
    TAMAÑO_ICONO,
    obtenerServicio,
    expandirServicios,
    getServiciosHabitacion,
    calcularPrecioServicios,
    filterServices
};
