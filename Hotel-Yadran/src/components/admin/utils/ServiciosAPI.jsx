import React, { useState, useEffect } from 'react';
import { Badge, Spinner, Alert } from 'react-bootstrap';
import llamadosServicios from '../../../config/services/servicesCalls';
import {
    FaWifi, FaSnowflake, FaTv, FaWater, FaBath, FaCoffee,
    FaSwimmingPool, FaHome, FaWind, FaWineGlass, FaCar, FaPaw,
    FaBiking, FaBed, FaUtensils
} from 'react-icons/fa';

const TAMAÑO_ICONO = 18;

// Mapeo de nombres de iconos a componentes
const iconosMap = {
    FaWifi, FaSnowflake, FaTv, FaWater, FaBath, FaCoffee,
    FaSwimmingPool, FaHome, FaWind, FaWineGlass, FaCar, FaPaw,
    FaBiking, FaBed, FaUtensils
};

// Función para renderizar icono
export const renderizarIcono = (nombreIcono, color, tamaño = TAMAÑO_ICONO) => {
    const IconoComponente = iconosMap[nombreIcono];
    if (IconoComponente) {
        return <IconoComponente style={{ color }} size={tamaño} />;
    }
    return <FaBed style={{ color }} size={tamaño} />;
};

/**
 * Hook personalizado para cargar servicios desde la API
 */
export const useServicios = (soloHabilitados = false) => {
    const [servicios, setServicios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarServicios = async () => {
            try {
                const respuesta = await llamadosServicios.obtenerServicios();
                const serviciosFiltrados = soloHabilitados
                    ? respuesta.filter(servicio => servicio.habilitado !== false)
                    : respuesta;
                setServicios(serviciosFiltrados);
                setError(null);
            } catch (err) {
                console.error('Error al cargar servicios:', err);
                setError('No se pudieron cargar los servicios desde la API');
            } finally {
                setCargando(false);
            }
        };

        cargarServicios();
    }, [soloHabilitados]);

    return { servicios, cargando, error };
};

/**
 * Obtiene un servicio por ID o valor
 */
export const obtenerServicio = (servicioId, servicios = []) => {
    if (!servicioId || !servicios.length) return null;
    return servicios.find(servicio =>
        servicio.id === servicioId || servicio.valor === servicioId
    );
};

/**
 * Expande una lista de IDs de servicios a objetos completos
 */
export const expandirServicios = (serviciosIds = [], servicios = []) => {
    if (!Array.isArray(serviciosIds) || !servicios.length) return [];
    return serviciosIds
        .map(id => obtenerServicio(id, servicios))
        .filter(Boolean);
};

// Componentes visuales
export const ServicioBadge = ({ servicioId, size = 'md', className = '' }) => {
    const { servicios, cargando, error } = useServicios();
    if (cargando) return <Spinner animation="border" size="sm" />;
    if (error) return null;
    const servicio = obtenerServicio(servicioId, servicios);
    if (!servicio) return null;
    return (
        <Badge
            bg={servicio.variante || 'primary'}
            className={`${className} me-1`}
        >
            {renderizarIcono(servicio.icono, '#fff', size === 'lg' ? 20 : TAMAÑO_ICONO)} {" "}
            {servicio.etiqueta}
        </Badge>
    );
};

export const ServiciosBadgeList = ({ serviciosIds = [], className = '', column = false }) => {
    const { servicios, cargando, error } = useServicios();
    if (cargando) return <Spinner animation="border" size="sm" />;
    if (error) return <Alert variant="danger" className="p-2 m-1">{error}</Alert>;
    if (!serviciosIds.length) return <span className="text-muted">No hay servicios seleccionados</span>;
    const serviciosExpandidos = expandirServicios(serviciosIds, servicios);
    return (
        <div className={`${className} ${column ? 'd-flex flex-column' : ''}`}>
            {serviciosExpandidos.map((servicio) => (
                <Badge
                    key={servicio.id}
                    bg={servicio.variante || 'primary'}
                    className={`me-1 mb-1 ${column ? 'py-2' : ''}`}
                >
                    {renderizarIcono(servicio.icono, '#fff')} {" "}
                    {servicio.etiqueta}
                </Badge>
            ))}
        </div>
    );
};

// Como referencia, mantener un objeto constante SERVICIOS
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

// Servicios básicos comunes
export const SERVICIOS_BASICOS = [
    SERVICIOS.WIFI,
    SERVICIOS.BAÑO_PRIVADO,
    SERVICIOS.TV
];

// Servicios premium
export const SERVICIOS_PREMIUM = [
    ...SERVICIOS_BASICOS,
    SERVICIOS.AIRE_ACONDICIONADO,
    SERVICIOS.VISTA_MAR,
    SERVICIOS.DESAYUNO,
    SERVICIOS.MINIBAR
];

export {
    SERVICIOS,
    SERVICIOS_BASICOS,
    SERVICIOS_PREMIUM,
    useServicios,
    obtenerServicio,
    expandirServicios,
    ServicioBadge,
    ServiciosBadgeList,
    renderizarIcono,
    TAMAÑO_ICONO
};

export default {
    SERVICIOS,
    SERVICIOS_BASICOS,
    SERVICIOS_PREMIUM,
    useServicios,
    obtenerServicio,
    expandirServicios,
    ServicioBadge,
    ServiciosBadgeList,
    renderizarIcono,
    TAMAÑO_ICONO
};
