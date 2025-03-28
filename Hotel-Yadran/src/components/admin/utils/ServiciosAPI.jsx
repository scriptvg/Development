import React, { useState, useEffect } from 'react';
import { Badge, Spinner, Alert, Row, Col, Form } from 'react-bootstrap';
import llamadosServicios from '../../../config/services/servicesCalls';
import {
    FaWifi, FaSnowflake, FaTv, FaWater, FaBath, FaCoffee,
    FaSwimmingPool, FaHome, FaWind, FaWineGlass, FaCar, FaPaw,
    FaBiking, FaBed, FaUtensils
} from 'react-icons/fa';

const TAMAÑO_ICONO = 18;

// Mapeo de nombres de iconos a componentes
const iconosMap = {
    FaWifi: FaWifi,
    FaSnowflake: FaSnowflake,
    FaTv: FaTv,
    FaWater: FaWater,
    FaBath: FaBath,
    FaCoffee: FaCoffee,
    FaSwimmingPool: FaSwimmingPool,
    FaHome: FaHome,
    FaWind: FaWind,
    FaWineGlass: FaWineGlass,
    FaCar: FaCar,
    FaPaw: FaPaw,
    FaBiking: FaBiking,
    FaBed: FaBed,
    FaUtensils: FaUtensils
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
 * @param {boolean} soloHabilitados - Si es true, solo devuelve servicios habilitados
 */
export const useServicios = (soloHabilitados = false) => {
    const [servicios, setServicios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarServicios = async () => {
            try {
                const respuesta = await llamadosServicios.obtenerServicios();

                // Filtrar servicios habilitados si es necesario
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
 * @param {string} servicioId - ID o valor del servicio
 * @param {Array} servicios - Lista de servicios disponibles
 * @returns {Object|null} - Objeto con información del servicio o null si no se encuentra
 */
export const obtenerServicio = (servicioId, servicios = []) => {
    if (!servicioId || !servicios.length) return null;

    return servicios.find(servicio =>
        servicio.id === servicioId || servicio.valor === servicioId
    );
};

/**
 * Expande una lista de IDs de servicios a objetos completos
 * @param {Array} serviciosIds - Lista de IDs o valores de servicios
 * @param {Array} servicios - Lista completa de servicios
 * @returns {Array} - Lista de objetos de servicios
 */
export const expandirServicios = (serviciosIds = [], servicios = []) => {
    if (!Array.isArray(serviciosIds) || !servicios.length) return [];

    return serviciosIds
        .map(id => obtenerServicio(id, servicios))
        .filter(Boolean); // Elimina los undefined/null
};

/**
 * Componente para mostrar un servicio como Badge
 */
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
            {servicio.nombre || servicio.etiqueta}
        </Badge>
    );
};

/**
 * Componente para mostrar múltiples servicios como Badges
 */
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
                    {servicio.nombre || servicio.etiqueta}
                </Badge>
            ))}
        </div>
    );
};

/**
 * Componente para seleccionar servicios (reemplazo del ServiciosList anterior)
 */
export const ServiciosSelector = ({
    serviciosSeleccionados = [],
    onChange,
    maxColumns = 3,
    checkboxSize = 'md',
    titulo = 'Servicios Disponibles',
    soloHabilitados = true // Por defecto solo muestra servicios habilitados
}) => {
    const { servicios, cargando, error } = useServicios(soloHabilitados);
    const [seleccionados, setSeleccionados] = useState(serviciosSeleccionados);

    useEffect(() => {
        setSeleccionados(serviciosSeleccionados);
    }, [serviciosSeleccionados]);

    const handleChange = (servicioId, checked) => {
        let nuevaSeleccion;

        if (checked) {
            nuevaSeleccion = [...seleccionados, servicioId];
        } else {
            nuevaSeleccion = seleccionados.filter(id => id !== servicioId);
        }

        setSeleccionados(nuevaSeleccion);
        if (onChange) {
            onChange(nuevaSeleccion);
        }
    };

    if (cargando) {
        return (
            <div className="text-center my-3">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Cargando servicios disponibles...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-warning">
                <p className="mb-0">No se pudieron cargar los servicios. Por favor, inténtelo de nuevo más tarde.</p>
                <small>{error}</small>
            </div>
        );
    }

    // Calcular cantidad de servicios por columna
    const itemsPerColumn = Math.ceil(servicios.length / maxColumns);
    const columns = [];

    for (let i = 0; i < maxColumns; i++) {
        const startIndex = i * itemsPerColumn;
        const columnServices = servicios.slice(startIndex, startIndex + itemsPerColumn);

        if (columnServices.length > 0) {
            columns.push(
                <Col key={i} md={12 / maxColumns}>
                    {columnServices.map((servicio) => {
                        const isChecked = seleccionados.includes(servicio.valor);

                        return (
                            <Form.Check
                                key={servicio.id}
                                type="checkbox"
                                id={`service-${servicio.id}`}
                                className="mb-2"
                                label={
                                    <div className="d-flex align-items-center">
                                        <Badge
                                            bg={isChecked ? (servicio.variante || 'primary') : 'light'}
                                            text={isChecked ? undefined : 'dark'}
                                            className="me-2 p-2"
                                        >
                                            {renderizarIcono(servicio.icono, isChecked ? '#fff' : servicio.colorIcono)}
                                        </Badge>
                                        <span>{servicio.nombre || servicio.etiqueta}</span>
                                    </div>
                                }
                                checked={isChecked}
                                onChange={(e) => handleChange(servicio.valor, e.target.checked)}
                                size={checkboxSize}
                            />
                        );
                    })}
                </Col>
            );
        }
    }

    return (
        <Form.Group className="mt-3">
            {titulo && <Form.Label>{titulo}</Form.Label>}
            <Row>
                {columns}
            </Row>
        </Form.Group>
    );
};

// Como referencia, mantener un objeto constante SERVICIOS para los componentes que lo necesiten
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

// Exportación por defecto también debe ser correcta
const ServiciosAPI = {
    SERVICIOS,
    SERVICIOS_BASICOS,
    SERVICIOS_PREMIUM,
    useServicios,
    obtenerServicio,
    expandirServicios,
    ServicioBadge,
    ServiciosBadgeList,
    ServiciosSelector,
    renderizarIcono,
    TAMAÑO_ICONO
};

export default ServiciosAPI;

export {
    SERVICIOS,
    SERVICIOS_BASICOS,
    SERVICIOS_PREMIUM,
    useServicios,
    obtenerServicio,
    expandirServicios,
    ServicioBadge,
    ServiciosBadgeList,
    ServiciosSelector,
    renderizarIcono,
    TAMAÑO_ICONO
};
