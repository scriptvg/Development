import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Badge, Spinner } from 'react-bootstrap';
import {
    FaWifi, FaSnowflake, FaTv, FaWater, FaBath, FaCoffee,
    FaSwimmingPool, FaHome, FaWind, FaWineGlass, FaCar, FaPaw,
    FaBiking, FaBed, FaUtensils
} from 'react-icons/fa';
import llamadosServicios from '../../../config/services/servicesCalls';

// Mapeo de iconos para los servicios
const iconosMap = {
    FaWifi,
    FaSnowflake,
    FaTv,
    FaWater,
    FaBath,
    FaCoffee,
    FaSwimmingPool,
    FaHome,
    FaWind,
    FaWineGlass,
    FaCar,
    FaPaw,
    FaBiking,
    FaBed,
    FaUtensils
};

// Componente de badge para servicios seleccionados
const BadgeComponent = ({ text, icon, variant = 'primary', onRemove }) => {
    // Renderizar icono si existe
    const renderIcon = () => {
        if (!icon) return null;
        const IconComponent = iconosMap[icon] || FaBed;
        return <IconComponent className="me-1" />;
    };

    return (
        <Badge
            bg={variant}
            className="py-2 px-3 d-flex align-items-center"
            style={{ cursor: onRemove ? 'pointer' : 'default' }}
            onClick={onRemove}
        >
            {renderIcon()}
            {text}
            {onRemove && <span className="ms-2">&times;</span>}
        </Badge>
    );
};

/**
 * Modal para seleccionar servicios con buscador y varias columnas
 */
const ServiciosSelectModal = ({
    show,
    onHide,
    title = "Seleccionar Servicios",
    services = [], // valores de los servicios seleccionados
    onServicesChange,
    columns = 2,
    soloHabilitados = true
}) => {
    const [serviciosData, setServiciosData] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [filtro, setFiltro] = useState('');
    const [serviciosSeleccionados, setServiciosSeleccionados] = useState(services);

    // Cargar servicios desde la API
    useEffect(() => {
        const cargarServicios = async () => {
            setCargando(true);
            try {
                const respuesta = await llamadosServicios.obtenerServicios();

                // Filtrar servicios habilitados si es necesario
                const serviciosFiltrados = soloHabilitados
                    ? respuesta.filter(servicio => servicio.habilitado !== false)
                    : respuesta;

                setServiciosData(serviciosFiltrados);
                setError(null);
            } catch (err) {
                console.error('Error al cargar servicios:', err);
                setError('No se pudieron cargar los servicios. Por favor, intente nuevamente.');
            } finally {
                setCargando(false);
            }
        };

        cargarServicios();
    }, [soloHabilitados]);

    // Actualizar selección cuando cambian los servicios externos
    useEffect(() => {
        setServiciosSeleccionados(services);
    }, [services]);

    // Función para aplicar los cambios
    const aplicarCambios = () => {
        if (onServicesChange) {
            onServicesChange(serviciosSeleccionados);
        }
        onHide();
    };

    // Filtrar servicios por texto de búsqueda
    const serviciosFiltrados = serviciosData.filter(servicio =>
        servicio.etiqueta.toLowerCase().includes(filtro.toLowerCase()) ||
        servicio.descripcion.toLowerCase().includes(filtro.toLowerCase())
    );

    // Manejar toggle de servicios
    const toggleServicio = (valor) => {
        setServiciosSeleccionados(prev => {
            if (prev.includes(valor)) {
                return prev.filter(s => s !== valor);
            } else {
                return [...prev, valor];
            }
        });
    };

    // Obtener detalles de un servicio por su valor
    const getServicioDetails = (valor) => {
        return serviciosData.find(s => s.valor === valor) || { etiqueta: valor, icono: 'FaBed', variante: 'primary' };
    };

    // Dividir servicios en columnas
    const distribuirEnColumnas = (elementos, numColumnas) => {
        const columnas = Array(numColumnas).fill().map(() => []);
        const elementosPorColumna = Math.ceil(elementos.length / numColumnas);

        elementos.forEach((elemento, index) => {
            const columnaIndex = Math.floor(index / elementosPorColumna);
            columnas[columnaIndex].push(elemento);
        });

        return columnas;
    };

    const columnasServicios = distribuirEnColumnas(serviciosFiltrados, columns);

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Buscador de servicios */}
                <Form.Group className="mb-4">
                    <Form.Control
                        type="text"
                        placeholder="Buscar servicios..."
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                </Form.Group>

                {/* Contenido según estado */}
                {cargando ? (
                    <div className="text-center my-4">
                        <Spinner animation="border" variant="primary" />
                        <p className="mt-2">Cargando servicios...</p>
                    </div>
                ) : error ? (
                    <div className="alert alert-danger">{error}</div>
                ) : (
                    <>
                        {/* Lista de servicios disponibles */}
                        <Row className="mb-4">
                            {columnasServicios.map((columna, colIndex) => (
                                <Col key={colIndex} md={12 / columns}>
                                    {columna.map(servicio => {
                                        const isSelected = serviciosSeleccionados.includes(servicio.valor);
                                        return (
                                            <Form.Check
                                                key={servicio.id}
                                                type="checkbox"
                                                id={`service-${servicio.id}`}
                                                className="mb-3"
                                                checked={isSelected}
                                                onChange={() => toggleServicio(servicio.valor)}
                                                label={
                                                    <div className="d-flex align-items-center">
                                                        <Badge
                                                            bg={isSelected ? servicio.variante : 'light'}
                                                            text={isSelected ? 'white' : 'dark'}
                                                            className="me-2 py-1 px-2"
                                                        >
                                                            {(() => {
                                                                const IconComp = iconosMap[servicio.icono] || FaBed;
                                                                return <IconComp />;
                                                            })()}
                                                        </Badge>
                                                        <span className="fw-bold">{servicio.etiqueta}</span>
                                                        <span className="ms-2 text-muted small">${servicio.precio}</span>
                                                    </div>
                                                }
                                            />
                                        );
                                    })}
                                </Col>
                            ))}
                        </Row>

                        {/* Servicios seleccionados */}
                        <Form.Group controlId="formRoomSelectedServices" className="mt-4">
                            <Form.Label className="h5 mb-3 text-primary">Servicios Seleccionados</Form.Label>
                            <div className="d-flex flex-wrap gap-2">
                                {serviciosSeleccionados.map(servicioValor => {
                                    const servicio = getServicioDetails(servicioValor);
                                    return (
                                        <BadgeComponent
                                            key={servicioValor}
                                            text={servicio.etiqueta}
                                            icon={servicio.icono}
                                            variant={servicio.variante}
                                            onRemove={() => toggleServicio(servicioValor)}
                                        />
                                    );
                                })}
                                {serviciosSeleccionados.length === 0 && (
                                    <p className="text-muted fst-italic">No hay servicios seleccionados</p>
                                )}
                            </div>
                        </Form.Group>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={aplicarCambios}>
                    Aplicar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ServiciosSelectModal;