import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Card, Row, Col, InputGroup, Form, Nav, DropdownButton, Dropdown } from 'react-bootstrap';
import RoomModal from './RoomModal';
import RoomModalVer from './RoomModalVer';
import "../styles/adminRooms.css"
import { FilePlus, Funnel, Paintbrush } from 'lucide-react';
import EstadoBadge from './EstadoBadge';
import { ESTADOS, LISTA_ESTADOS } from '../utils/estadosConfig.jsx';
import { OBTENER_HABITACIONES, GUARDAR_HABITACION, ELIMINAR_HABITACION, FILTRAR_HABITACIONES } from './roomService';

function AdminRooms() {
    // Estados para manejar datos y modales
    const [habitaciones, setHabitaciones] = useState([]);
    const [habitacionesFiltradas, setHabitacionesFiltradas] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarModalVer, setMostrarModalVer] = useState(false);
    const [datosHabitacion, setDatosHabitacion] = useState({
        id: '',
        nombre: '',
        tipo: '',
        precio: '',
        descripcion: '',
        capacidad: '',
        disponible: false,
        servicios: [],
        estado: ESTADOS.DISPONIBLE
    });
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const [estadoSeleccionado, setEstadoSeleccionado] = useState('');
    const [filtroTexto, setFiltroTexto] = useState('Filtrar por...');
    const [pestanaActiva, setPestanaActiva] = useState('todos');

    // Manejo de modales
    const handleMostrarVer = (habitacion) => {
        setDatosHabitacion(habitacion);
        setMostrarModalVer(true);
    };
    const handleCerrarVer = () => setMostrarModalVer(false);

    // Efectos para cargar y filtrar habitaciones
    useEffect(() => {
        OBTENER_HABITACIONES(setHabitaciones, setHabitacionesFiltradas);
    }, []);

    useEffect(() => {
        const habitacionesFiltradas = FILTRAR_HABITACIONES(habitaciones, terminoBusqueda, estadoSeleccionado, pestanaActiva);
        setHabitacionesFiltradas(habitacionesFiltradas);
    }, [habitaciones, terminoBusqueda, estadoSeleccionado, pestanaActiva]);

    // Manejo de modales
    const handleMostrar = () => setMostrarModal(true);
    const handleCerrar = () => {
        setMostrarModal(false);
        setDatosHabitacion({ id: '', nombre: '', tipo: '', precio: '', descripcion: '', capacidad: '', disponible: false, servicios: [] });
    };

    // Manejo de cambios en los inputs
    const handleCambioInput = (e) => {
        const { name, value } = e.target;
        setDatosHabitacion({ ...datosHabitacion, [name]: value });
    };
    
    // Agregar esta función antes del return
    const handleFiltroSelect = (tipo, texto) => {
        setEstadoSeleccionado(tipo);
        setFiltroTexto(texto);
    };

    // Limpiar filtros
    const limpiarFiltro = () => {
        setTerminoBusqueda('');
        setEstadoSeleccionado('');
        setFiltroTexto('Filtrar por...');
    };

    return (
        <Container className="containerRooms py-5">
            <Card className="shadow-lg border-0 rounded-4">
                <Card.Body className="p-4">
                    <Row className="align-items-center mb-5">
                        <Col>
                            <Card.Title className="display-6 fw-bold text-primary mb-0">
                                Gestión de Habitaciones
                            </Card.Title>
                            <Card.Subtitle className='text-secondary fs-5 mb-3 fw-semibold'>
                                Aquí puedes ver, añadir, editar y eliminar las habitaciones del hotel.
                            </Card.Subtitle>
                        </Col>
                        <Col xs="auto">
                            <Button
                                variant="primary"
                                onClick={handleMostrar}
                                className="d-flex align-items-center rounded-3 px-4"
                                size="lg">
                                <FilePlus className='bi bi-plus-circle-fill me-2' />
                                Añadir Habitación
                            </Button>
                        </Col>
                    </Row>

                    <Row className="mb-3 mt-3">
                        <Col>
                            <InputGroup>
                                <Nav variant="tabs" activeKey={pestanaActiva} onSelect={(selectedKey) => setPestanaActiva(selectedKey)}>
                                    <Nav.Item>
                                    <Nav.Link eventKey="todos">
                                        <i className="bi bi-list me-2"></i>Todos
                                    </Nav.Link>
                                    </Nav.Item>
                                    {LISTA_ESTADOS.map(estado => (
                                        <Nav.Item key={estado.valor}>
                                            <Nav.Link eventKey={estado.valor}>
                                                {estado.icono}{estado.etiqueta}
                                            </Nav.Link>
                                        </Nav.Item>
                                    ))}
                                </Nav>
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="Buscar..."
                                    value={terminoBusqueda}
                                    onChange={(e) => setTerminoBusqueda(e.target.value)}
                                />
                                <DropdownButton
                                    as={InputGroup.Append}
                                    variant="outline-secondary"
                                    title={<>
                                        <Funnel className="me-2" />
                                        {filtroTexto}
                                    </>}
                                    id="input-group-dropdown-2"
                                >
                                    <Dropdown.Item onClick={() => handleFiltroSelect('id', 'Filtrar por ID')}>ID</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleFiltroSelect('nombre', 'Filtrar por Nombre')}>Nombre</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleFiltroSelect('tipo', 'Filtrar por Tipo')}>Tipo</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleFiltroSelect('precio', 'Filtrar por Precio')}>Precio</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleFiltroSelect('capacidad', 'Filtrar por Capacidad')}>Capacidad</Dropdown.Item>
                                </DropdownButton>
                                <Button variant="danger" onClick={limpiarFiltro}><Paintbrush/></Button>
                            </InputGroup>
                        </Col>
                    </Row>

                    <Table striped bordered hover responsive className="align-middle table-hover">
                        <thead>
                            <tr className="bg-light">
                                <th className="text-center py-3 text-uppercase fs-6 fw-bold text-secondary">ID</th>
                                <th className="py-3 text-uppercase fs-6 fw-bold text-secondary">Nombre</th>
                                <th className="py-3 text-uppercase fs-6 fw-bold text-secondary">Tipo</th>
                                <th className="text-center py-3 text-uppercase fs-6 fw-bold text-secondary">Precio</th>
                                <th className="text-center py-3 text-uppercase fs-6 fw-bold text-secondary">Capacidad</th>
                                <th className="py-3 text-uppercase fs-6 fw-bold text-secondary">Descripción</th>
                                <th className="text-center py-3 text-uppercase fs-6 fw-bold text-secondary">Estado</th>
                                <th className="text-center py-3 text-uppercase fs-6 fw-bold text-secondary">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {habitacionesFiltradas.length > 0 ? (
                                habitacionesFiltradas.map(habitacion => (
                                    <tr key={habitacion.id} className="align-middle">
                                        <td className="text-center fw-bold text-primary">{habitacion.id}</td>
                                        <td className="fw-semibold">{habitacion.nombre}</td>
                                        <td>{habitacion.tipo}</td>
                                        <td className="text-center fw-bold">
                                            ${habitacion.precio.toLocaleString()}
                                        </td>
                                        <td className="text-center">{habitacion.capacidad} personas</td>
                                        <td className="text-truncate" style={{ maxWidth: '250px' }}>
                                            {habitacion.descripcion}
                                        </td>
                                        <td className="text-center">
                                            <EstadoBadge estado={habitacion.estado} />
                                        </td>
                                        <td className="text-center">
                                            <Button
                                                variant="outline-warning"
                                                className="me-2 mb-1 mb-md-0 rounded-3"
                                                onClick={() => { setDatosHabitacion(habitacion); handleMostrar(); }}
                                            >
                                                <i className="bi bi-pencil-square me-1"></i> Editar
                                            </Button>
                                            <Button
                                                variant="outline-info"
                                                className="me-2 mb-1 mb-md-0 rounded-3"
                                                onClick={() => handleMostrarVer(habitacion)}
                                            >
                                                <i className="bi bi-eye me-1"></i> Ver
                                            </Button>
                                            <Button
                                                variant="outline-danger"
                                                className="rounded-3"
                                                onClick={() => ELIMINAR_HABITACION(habitacion.id, () => OBTENER_HABITACIONES(setHabitaciones, setHabitacionesFiltradas))}
                                            >
                                                <i className="bi bi-trash-fill me-1"></i> Eliminar
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center py-5">
                                        <i className="bi bi-inbox-fill text-secondary fs-1 mb-3 d-block"></i>
                                        <p className="mb-3 text-secondary fs-5">No hay habitaciones disponibles</p>
                                        <Button
                                            variant="primary"
                                            className="rounded-3 px-4"
                                            onClick={handleMostrar}
                                        >
                                            <i className="bi bi-plus-circle me-2"></i>
                                            Añadir una habitación
                                        </Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <RoomModal
                show={mostrarModal}
                handleClose={handleCerrar}
                roomData={datosHabitacion}
                handleInputChange={handleCambioInput}
                handleSaveRoom={async () => {
                    try {
                        await GUARDAR_HABITACION(datosHabitacion);
                        await OBTENER_HABITACIONES(setHabitaciones, setHabitacionesFiltradas);
                        handleCerrar();
                    } catch (error) {
                        console.error('Error al guardar:', error);
                    }
                }}
            />
            <RoomModalVer
                show={mostrarModalVer}
                handleClose={handleCerrarVer}
                roomData={datosHabitacion}
                onHide={handleCerrarVer}
            />
        </Container>
    );
}

export default AdminRooms;
