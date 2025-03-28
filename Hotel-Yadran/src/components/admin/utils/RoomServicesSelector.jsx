import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Badge, Spinner } from 'react-bootstrap';
// Importa explícitamente con llaves
import { useServicios, renderizarIcono } from './ServiciosAPI';
import { TAMAÑO_ICONO } from './ServicesConfig';
import {
    FaWifi, FaSnowflake, FaTv, FaWater, FaBath, FaCoffee,
    FaSwimmingPool, FaHome, FaWind, FaWineGlass, FaCar, FaPaw,
    FaBiking, FaBed, FaUtensils, FaLaptop, FaClock, FaUmbrella
} from 'react-icons/fa';

/**
 * Selector de servicios para habitaciones que consume datos de la API
 */
const RoomServicesSelector = ({
    serviciosSeleccionados = [],
    onChange,
    maxColumns = 3,
    checkboxSize = 'md',
    soloHabilitados = true // Por defecto solo muestra servicios habilitados
}) => {
    const { servicios, cargando, error } = useServicios(soloHabilitados);
    const [seleccionados, setSeleccionados] = useState(serviciosSeleccionados);

    // Actualizar estado local cuando cambian los servicios seleccionados externamente
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
            <Form.Label>Servicios de la Habitación</Form.Label>
            <Row>
                {columns}
            </Row>
        </Form.Group>
    );
};

export default RoomServicesSelector;
