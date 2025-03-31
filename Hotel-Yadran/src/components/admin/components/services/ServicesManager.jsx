import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Table, Form, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import {
    FaPlus, FaEdit, FaTrash, FaTable, FaTh, FaCheck, FaSearch,
    FaWifi, FaSnowflake, FaTv, FaWater, FaBath, FaCoffee,
    FaSwimmingPool, FaHome, FaWind, FaWineGlass, FaCar, FaPaw,
    FaBiking, FaBed, FaUtensils, FaToggleOn, FaToggleOff
} from 'react-icons/fa';
import llamadosServicios from '../../../../config/services/servicesCalls';
import '../servicios/styles/servicesManager.css';

// Mapeo de nombres de iconos a componentes para renderizado dinámico
const iconosMap = {
    FaWifi, FaSnowflake, FaTv, FaWater, FaBath, FaCoffee,
    FaSwimmingPool, FaHome, FaWind, FaWineGlass, FaCar, FaPaw,
    FaBiking, FaBed, FaUtensils
};

// Función auxiliar para filtrar servicios (definida antes de usarla)
const filterServices = (servicios = [], terminoBusqueda = '', soloHabilitados = false) => {
    if (!servicios || !Array.isArray(servicios)) return [];

    return servicios.filter(servicio => {
        if (!servicio) return false;

        // Filtrar por término de búsqueda en nombre y descripción
        const busquedaCoincide = !terminoBusqueda ||
            (servicio.etiqueta?.toLowerCase() || '').includes(terminoBusqueda.toLowerCase()) ||
            (servicio.descripcion?.toLowerCase() || '').includes(terminoBusqueda.toLowerCase());

        // Filtrar por estado de habilitado
        const estadoCoincide = !soloHabilitados || servicio.habilitado !== false;

        return busquedaCoincide && estadoCoincide;
    });
};

const ServicesManager = () => {
    // Estado del componente
    const [servicios, setServicios] = useState([]);
    const [vistaTabla, setVistaTabla] = useState(false);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [mostrarSoloHabilitados, setMostrarSoloHabilitados] = useState(false);
    const [servicioActual, setServicioActual] = useState({
        etiqueta: '',
        descripcion: '',
        precio: 0,
        icono: 'FaBed',
        valor: '',
        variante: 'primary',
        size: 18,
        habilitado: true
    });
    const [mostrarIconSelector, setMostrarIconSelector] = useState(false);
    const [terminoBusqueda, setTerminoBusqueda] = useState('');

    // Cargar servicios al montar el componente
    useEffect(() => {
        cargarServicios();
    }, []);

    // Función para cargar servicios desde la API
    const cargarServicios = async () => {
        setCargando(true);
        try {
            const datos = await llamadosServicios.obtenerServicios();
            setServicios(datos);
            setError(null);
        } catch (error) {
            console.error('Error al cargar servicios:', error);
            setError('No se pudieron cargar los servicios. Por favor, intente nuevamente.');
        } finally {
            setCargando(false);
        }
    };

    // Manejar cambios en formulario
    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setServicioActual({ ...servicioActual, [name]: value });
    };

    // Función para generar un valor a partir del nombre (slug)
    const generarValor = (nombre) => {
        return nombre
            .toLowerCase()
            .replace(/\s+/g, '_')
            .replace(/[^\w\s]/gi, '')
            .trim();
    };

    // Función para cambiar el estado de habilitado/deshabilitado
    const toggleServicioEstado = async (servicio) => {
        try {
            const servicioActualizado = {
                ...servicio,
                habilitado: !servicio.habilitado
            };
            await llamadosServicios.actualizarServicio(servicioActualizado);
            cargarServicios();
        } catch (error) {
            console.error('Error al actualizar estado del servicio:', error);
        }
    };

    // Enviar formulario
    const enviarFormulario = async (e) => {
        e.preventDefault();

        try {
            // Crear una copia del servicio actual con todos los campos necesarios
            const servicioParaEnviar = {
                ...servicioActual,
                valor: servicioActual.valor || generarValor(servicioActual.etiqueta)
            };

            if (servicioParaEnviar.id) {
                await llamadosServicios.actualizarServicio(servicioParaEnviar);
            } else {
                // Para nuevos servicios, generamos un ID de tipo "srv-X"
                const nuevoId = `srv-${Date.now()}`;
                const nuevoServicio = {
                    ...servicioParaEnviar,
                    id: nuevoId,
                    habilitado: true
                };

                await llamadosServicios.agregarServicio(nuevoServicio);
            }

            // Recargar servicios y resetear formulario
            await cargarServicios();
            setMostrarFormulario(false);
            setServicioActual({
                etiqueta: '',
                descripcion: '',
                precio: 0,
                icono: 'FaBed',
                valor: '',
                variante: 'primary',
                size: 18,
                habilitado: true
            });
        } catch (error) {
            console.error('Error al guardar servicio:', error);
        }
    };

    // Abrir formulario para editar
    const editarServicio = (servicio) => {
        // Asegurarse de que todos los campos están presentes
        const servicioCompleto = {
            etiqueta: '',
            descripcion: '',
            precio: 0,
            icono: 'FaBed',
            valor: '',
            variante: 'primary',
            size: 18,
            habilitado: true,
            ...servicio
        };
        setServicioActual(servicioCompleto);
        setMostrarFormulario(true);
    };

    // Eliminar servicio
    const confirmarEliminacion = async (id) => {
        if (window.confirm('¿Está seguro que desea eliminar este servicio?')) {
            try {
                await llamadosServicios.eliminarServicio(id);
                await cargarServicios();
            } catch (error) {
                console.error('Error al eliminar servicio:', error);
            }
        }
    };

    // Filtrar servicios por término de búsqueda y estado de habilitado
    const serviciosFiltrados = filterServices(servicios, terminoBusqueda, mostrarSoloHabilitados);

    // Estadísticas para el panel
    const totalServicios = servicios.length;
    const serviciosHabilitados = servicios.filter(s => s.habilitado).length;
    const precioPromedio = servicios.length
        ? servicios.reduce((acc, servicio) => acc + parseFloat(servicio.precio || 0), 0) / servicios.length
        : 0;

    // Función para renderizar iconos dinámicamente
    const renderizarIcono = (nombreIcono, color, tamaño = 24) => {
        const IconoComponente = iconosMap[nombreIcono];
        if (IconoComponente) {
            return <IconoComponente style={{ color, fontSize: `${tamaño}px` }} />;
        }
        return <FaBed style={{ color, fontSize: `${tamaño}px` }} />; // Icono por defecto
    };

    return (
        <div className="services-manager">
            <Container fluid>
                {/* Cabecera con estadísticas */}
                <Row className="mb-4">
                    <Col>
                        <h2 className="mb-4">Administración de Servicios</h2>
                        <Row className="stats-row py-3">
                            <Col md={4} className="stats-item">
                                <div className="stats-label">Total de Servicios</div>
                                <div className="stats-value">{totalServicios}</div>
                            </Col>
                            <Col md={4} className="stats-item">
                                <div className="stats-label">Servicios Habilitados</div>
                                <div className="stats-value">{serviciosHabilitados}</div>
                            </Col>
                            <Col md={4} className="stats-item">
                                <div className="stats-label">Precio Promedio</div>
                                <div className="stats-value">${precioPromedio.toFixed(2)}</div>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                {/* Botones de acción y búsqueda */}
                <Row className="mb-4">
                    <Col md={6} className="d-flex">
                        <Button
                            variant="primary"
                            className="me-2"
                            onClick={() => {
                                setServicioActual({
                                    etiqueta: '',
                                    descripcion: '',
                                    precio: 0,
                                    icono: 'FaBed',
                                    valor: '',
                                    variante: 'primary',
                                    size: 18,
                                    habilitado: true
                                });
                                setMostrarFormulario(true);
                            }}
                        >
                            <FaPlus className="me-2" /> Agregar Servicio
                        </Button>
                        <Button
                            variant={vistaTabla ? "outline-secondary" : "secondary"}
                            className="me-2"
                            onClick={() => setVistaTabla(false)}
                        >
                            <FaTh />
                        </Button>
                        <Button
                            variant={vistaTabla ? "secondary" : "outline-secondary"}
                            className="me-2"
                            onClick={() => setVistaTabla(true)}
                        >
                            <FaTable />
                        </Button>

                        <Form.Check
                            type="switch"
                            id="switchMostrarHabilitados"
                            label="Solo habilitados"
                            checked={mostrarSoloHabilitados}
                            onChange={(e) => setMostrarSoloHabilitados(e.target.checked)}
                            className="ms-3 d-flex align-items-center"
                        />
                    </Col>
                    <Col md={6}>
                        <Form.Group className="d-flex">
                            <Form.Control
                                type="text"
                                placeholder="Buscar servicios..."
                                value={terminoBusqueda}
                                onChange={(e) => setTerminoBusqueda(e.target.value)}
                            />
                            <Button variant="outline-secondary">
                                <FaSearch />
                            </Button>
                        </Form.Group>
                    </Col>
                </Row>

                {/* Mensajes de carga o error */}
                {cargando && <div className="text-center my-5">Cargando servicios...</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                {/* Vista de tarjetas o tabla */}
                {!cargando && !error && (
                    vistaTabla ? (
                        <Table responsive striped bordered hover>
                            <thead>
                                <tr>
                                    <th style={{ width: '50px' }}>#</th>
                                    <th style={{ width: '60px' }}>Icono</th>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th style={{ width: '120px' }}>Precio</th>
                                    <th style={{ width: '80px' }}>Estado</th>
                                    <th style={{ width: '120px' }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {serviciosFiltrados.map((servicio, index) => (
                                    <tr key={servicio.id} className={!servicio.habilitado ? 'table-secondary' : ''}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="service-icon" style={{
                                                backgroundColor: servicio.variante ? `var(--bs-${servicio.variante})20` : '#f8f9fa',
                                                opacity: servicio.habilitado ? 1 : 0.5
                                            }}>
                                                {renderizarIcono(servicio.icono, servicio.variante ? `var(--bs-${servicio.variante})` : '#212529', servicio.size || 18)}
                                            </div>
                                        </td>
                                        <td>{servicio.etiqueta}</td>
                                        <td>{servicio.descripcion}</td>
                                        <td>${servicio.precio.toFixed(2)}</td>
                                        <td>
                                            <Badge bg={servicio.habilitado ? 'success' : 'secondary'}>
                                                {servicio.habilitado ? 'Activo' : 'Inactivo'}
                                            </Badge>
                                        </td>
                                        <td>
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={
                                                    <Tooltip>
                                                        {servicio.habilitado ? 'Deshabilitar' : 'Habilitar'} servicio
                                                    </Tooltip>
                                                }
                                            >
                                                <Button
                                                    variant={servicio.habilitado ? "outline-success" : "outline-secondary"}
                                                    size="sm"
                                                    className="me-1"
                                                    onClick={() => toggleServicioEstado(servicio)}
                                                >
                                                    {servicio.habilitado ? <FaToggleOn /> : <FaToggleOff />}
                                                </Button>
                                            </OverlayTrigger>
                                            <Button variant="outline-primary" size="sm" className="me-1" onClick={() => editarServicio(servicio)}>
                                                <FaEdit />
                                            </Button>
                                            <Button variant="outline-danger" size="sm" onClick={() => confirmarEliminacion(servicio.id)}>
                                                <FaTrash />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <Row>
                            {serviciosFiltrados.map(servicio => (
                                <Col md={4} lg={3} key={servicio.id} className="mb-4">
                                    <Card className={`h-100 service-card shadow-sm ${!servicio.habilitado ? 'bg-light' : ''}`}>
                                        <Card.Body>
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <Badge bg={servicio.habilitado ? 'success' : 'secondary'} className="py-1 px-2">
                                                    {servicio.habilitado ? 'Activo' : 'Inactivo'}
                                                </Badge>
                                                <Button
                                                    variant="link"
                                                    className="p-0 text-decoration-none"
                                                    onClick={() => toggleServicioEstado(servicio)}
                                                >
                                                    {servicio.habilitado ?
                                                        <FaToggleOn size={20} className="text-success" /> :
                                                        <FaToggleOff size={20} className="text-secondary" />
                                                    }
                                                </Button>
                                            </div>
                                            <div className="service-icon-wrapper mb-3">
                                                <div className="service-icon-bg" style={{
                                                    backgroundColor: servicio.variante ? `var(--bs-${servicio.variante})20` : '#f8f9fa',
                                                    opacity: servicio.habilitado ? 1 : 0.5
                                                }}>
                                                    {renderizarIcono(servicio.icono, servicio.variante ? `var(--bs-${servicio.variante})` : '#212529', servicio.size || 24)}
                                                </div>
                                            </div>
                                            <h5 className="service-title mb-2">{servicio.etiqueta}</h5>
                                            <div className="service-value mb-3">
                                                <Badge bg="light" text="dark" className="px-3 py-2">
                                                    ${servicio.precio.toFixed(2)}
                                                </Badge>
                                            </div>
                                            <p className="service-description mb-4">{servicio.descripcion}</p>
                                            <div className="service-actions d-flex justify-content-center">
                                                <Button
                                                    variant="outline-primary"
                                                    className="btn-icon me-2"
                                                    onClick={() => editarServicio(servicio)}
                                                >
                                                    <FaEdit />
                                                </Button>
                                                <Button
                                                    variant="outline-danger"
                                                    className="btn-icon"
                                                    onClick={() => confirmarEliminacion(servicio.id)}
                                                >
                                                    <FaTrash />
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    )
                )}

                {/* Modal de formulario */}
                <Modal
                    show={mostrarFormulario}
                    onHide={() => setMostrarFormulario(false)}
                    backdrop="static"
                    size="lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {servicioActual.id ? 'Editar Servicio' : 'Agregar Nuevo Servicio'}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={enviarFormulario}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Nombre del Servicio</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="etiqueta"
                                            value={servicioActual.etiqueta}
                                            onChange={manejarCambio}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Precio</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="precio"
                                            value={servicioActual.precio}
                                            onChange={manejarCambio}
                                            min="0"
                                            step="0.01"
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Descripción</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            name="descripcion"
                                            value={servicioActual.descripcion}
                                            onChange={manejarCambio}
                                            rows={3}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Check
                                            type="switch"
                                            id="switchHabilitado"
                                            label="Servicio habilitado"
                                            checked={servicioActual.habilitado === undefined ? true : servicioActual.habilitado}
                                            onChange={(e) => setServicioActual({ ...servicioActual, habilitado: e.target.checked })}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Icono</Form.Label>
                                        <div className="d-flex">
                                            <div className="icon-preview me-2" style={{
                                                backgroundColor: servicioActual.variante ? `var(--bs-${servicioActual.variante})20` : '#f8f9fa'
                                            }}>
                                                {renderizarIcono(servicioActual.icono, servicioActual.variante ? `var(--bs-${servicioActual.variante})` : '#212529', servicioActual.size || 18)}
                                            </div>
                                            <Button
                                                variant="outline-secondary"
                                                onClick={() => setMostrarIconSelector(true)}
                                                type="button"
                                            >
                                                Seleccionar Icono
                                            </Button>
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Variante</Form.Label>
                                        <Form.Select
                                            name="variante"
                                            value={servicioActual.variante}
                                            onChange={manejarCambio}
                                        >
                                            <option value="primary">Primary</option>
                                            <option value="secondary">Secondary</option>
                                            <option value="success">Success</option>
                                            <option value="danger">Danger</option>
                                            <option value="warning">Warning</option>
                                            <option value="info">Info</option>
                                            <option value="light">Light</option>
                                            <option value="dark">Dark</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>ID de referencia (opcional)</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="valor"
                                            value={servicioActual.valor}
                                            onChange={manejarCambio}
                                            placeholder="Se genera automáticamente si se deja vacío"
                                        />
                                        <Form.Text className="text-muted">
                                            Valor único para identificar el servicio (slug). Si no lo proporciona, se generará automáticamente.
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Tamaño del Icono</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="size"
                                            value={servicioActual.size}
                                            onChange={manejarCambio}
                                            min="12"
                                            max="36"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-end">
                                <Button
                                    variant="secondary"
                                    className="me-2"
                                    onClick={() => setMostrarFormulario(false)}
                                    type="button"
                                >
                                    Cancelar
                                </Button>
                                <Button variant="primary" type="submit">
                                    {servicioActual.id ? 'Actualizar' : 'Guardar'} Servicio
                                </Button>
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>

                {/* Modal selector de iconos */}
                <Modal
                    show={mostrarIconSelector}
                    onHide={() => setMostrarIconSelector(false)}
                    dialogClassName="icon-selector-modal"
                    size="lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Seleccionar Icono</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="icon-grid">
                            <Row>
                                {Object.keys(iconosMap).map(nombreIcono => (
                                    <Col xs={4} sm={3} md={2} key={nombreIcono}>
                                        <div
                                            className={`icon-item ${servicioActual.icono === nombreIcono ? 'selected' : ''}`}
                                            onClick={() => {
                                                setServicioActual({ ...servicioActual, icono: nombreIcono });
                                                setMostrarIconSelector(false);
                                            }}
                                        >
                                            <div className="icon-container">
                                                {renderizarIcono(nombreIcono, servicioActual.variante ? `var(--bs-${servicioActual.variante})` : '#212529')}
                                                {servicioActual.icono === nombreIcono && (
                                                    <div className="selected-indicator">
                                                        <FaCheck size={10} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="icon-name">{nombreIcono}</div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </Modal.Body>
                </Modal>
            </Container>
        </div>
    );
};

export default ServicesManager;