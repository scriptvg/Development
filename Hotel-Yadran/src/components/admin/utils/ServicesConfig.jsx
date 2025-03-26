import React from 'react';
import { Wifi, Snowflake, Tv, Waves, Bath, Coffee, Waves as PoolIcon, Home, Wind, Wine, Car, PawPrint, Bike } from 'lucide-react';

// Tamaño estándar para los iconos de servicios
export const TAMAÑO_ICONO = 18;

// Definición de servicios disponibles
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

// Define the services list
export const LISTA_SERVICIOS = [
    {
        id: 'srv-1',
        valor: 'wifi',
        etiqueta: 'WiFi Gratis',
        descripcion: 'Conexión WiFi de alta velocidad en todas las habitaciones y áreas comunes.',
        variante: 'primary',
        icono: <Wifi size={TAMAÑO_ICONO} />
    },
    {
        id: 'srv-2',
        valor: 'aire_acondicionado',
        etiqueta: 'Aire Acondicionado',
        descripcion: 'Control individual de temperatura para su máximo confort.',
        variante: 'info',
        icono: <Snowflake size={TAMAÑO_ICONO} />
    },
    {
        id: 'srv-3',
        valor: 'tv',
        etiqueta: 'TV HD',
        descripcion: 'Televisor de alta definición con canales premium.',
        variante: 'secondary',
        icono: <Tv size={TAMAÑO_ICONO} />
    },
    {
        id: 'srv-4',
        valor: 'vista_al_mar',
        etiqueta: 'Vista al Mar',
        descripcion: 'Impresionantes vistas al mar desde la habitación.',
        variante: 'info',
        icono: <Waves size={TAMAÑO_ICONO} />
    },
    {
        id: 'srv-5',
        valor: 'bano_privado',
        etiqueta: 'Baño Privado',
        descripcion: 'Baño privado completamente equipado con artículos de tocador.',
        variante: 'primary',
        icono: <Bath size={TAMAÑO_ICONO} />
    },
    {
        id: 'srv-6',
        valor: 'desayuno',
        etiqueta: 'Desayuno Incluido',
        descripcion: 'Desayuno bufé completo incluido en la tarifa.',
        variante: 'warning',
        icono: <Coffee size={TAMAÑO_ICONO} />
    },
    {
        id: 'srv-7',
        valor: 'piscina',
        etiqueta: 'Acceso a Piscina',
        descripcion: 'Acceso gratuito a la piscina principal del hotel.',
        variante: 'info',
        icono: <PoolIcon size={TAMAÑO_ICONO} />
    },
    {
        id: 'srv-8',
        valor: 'balcon',
        etiqueta: 'Balcón Privado',
        descripcion: 'Espacioso balcón privado con mobiliario exterior.',
        variante: 'success',
        icono: <Home size={TAMAÑO_ICONO} />
    },
    {
        id: 'srv-9',
        valor: 'toallas',
        etiqueta: 'Toallas de Playa',
        descripcion: 'Toallas de playa disponibles sin cargo adicional.',
        variante: 'primary',
        icono: <Wind size={TAMAÑO_ICONO} />
    },
    {
        id: 'srv-10',
        valor: 'minibar',
        etiqueta: 'Minibar',
        descripcion: 'Minibar surtido con bebidas y snacks (cargo adicional).',
        variante: 'danger',
        icono: <Wine size={TAMAÑO_ICONO} />
    },
    {
        id: 'srv-11',
        valor: 'estacionamiento',
        etiqueta: 'Estacionamiento',
        descripcion: 'Estacionamiento gratuito para huéspedes.',
        variante: 'dark',
        icono: <Car size={TAMAÑO_ICONO} />
    },
    {
        id: 'srv-12',
        valor: 'mascotas',
        etiqueta: 'Pet Friendly',
        descripcion: 'Habitación que admite mascotas (con restricciones).',
        variante: 'success',
        icono: <PawPrint size={TAMAÑO_ICONO} />
    },
    {
        id: 'srv-13',
        valor: 'bicicletas',
        etiqueta: 'Préstamo de Bicicletas',
        descripcion: 'Bicicletas disponibles para explorar los alrededores.',
        variante: 'warning',
        icono: <Bike size={TAMAÑO_ICONO} />
    }
];

// Servicios básicos que están presentes en la mayoría de habitaciones
export const SERVICIOS_BASICOS = [
    SERVICIOS.WIFI,
    SERVICIOS.BAÑO_PRIVADO,
    SERVICIOS.TV
];

// Servicios premium para habitaciones de categoría superior
export const SERVICIOS_PREMIUM = [
    ...SERVICIOS_BASICOS,
    SERVICIOS.AIRE_ACONDICIONADO,
    SERVICIOS.VISTA_MAR,
    SERVICIOS.DESAYUNO,
    SERVICIOS.MINIBAR
];

/**
 * Obtiene información detallada de un servicio específico
 * @param {string} servicio - El identificador del servicio
 * @returns {Object} - Objeto con la información del servicio
 */
export const obtenerServicio = (serviceId) => {
    return LISTA_SERVICIOS.find(service => 
        service.id === serviceId || service.valor === serviceId
    );
};

/**
 * Convierte un array de IDs de servicios en objetos con información completa
 * @param {Array<string>} listaServicios - Array con IDs de servicios
 * @returns {Array<Object>} - Array con objetos de información de servicios
 */
export const expandirServicios = (serviceIds = []) => {
    if (!Array.isArray(serviceIds)) return [];
    
    return serviceIds.map(serviceId => obtenerServicio(serviceId))
        .filter(service => service !== undefined);
};

export default {
    SERVICIOS,
    LISTA_SERVICIOS,
    SERVICIOS_BASICOS,
    SERVICIOS_PREMIUM,
    obtenerServicio,
    expandirServicios
};
