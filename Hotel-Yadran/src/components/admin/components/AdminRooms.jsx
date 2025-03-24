import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Card, Row, Col, Badge, InputGroup, Form, Dropdown, Nav } from 'react-bootstrap';
import Swal from 'sweetalert2';
import roomsCalls from '../../../config/services/roomsCalls';
import RoomModal from './RoomModal';
import RoomModalVer from './RoomModalVer';
import "../styles/adminRooms.css"
import { CirclePlus, FilePlus } from 'lucide-react';
import EstadoBadge from './EstadoBadge';
import { ESTADOS, LISTA_ESTADOS } from '../utils/estadosConfig';
import roomDataService from '../../../config/services/roomDataService';

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
    const [pestanaActiva, setPestanaActiva] = useState('todos');

    // Manejo de modales
    const handleMostrarVer = (habitacion) => {
        setDatosHabitacion(habitacion);
        setMostrarModalVer(true);
    };
    const handleCerrarVer = () => setMostrarModalVer(false);

    // Efectos para cargar y filtrar habitaciones
    useEffect(() => {
        obtenerHabitaciones();
    }, []);

    useEffect(() => {
        filtrarHabitaciones();
    }, [habitaciones, terminoBusqueda, estadoSeleccionado, pestanaActiva]);

    // Función para obtener habitaciones
    const obtenerHabitaciones = async () => {
        try {
            const data = await roomsCalls.GetRooms();
            console.log('Habitaciones sin formato:', data); // Debug log
            const habitacionesFormateadas = data.map(room => ({
                id: room.id,
                nombre: room.name || room.nombre || 'Sin nombre',
                tipo: room.type || room.tipo || 'Estándar',
                precio: parseFloat(room.price || room.precio || 0),
                descripcion: room.description || room.descripcion || 'Sin descripción',
                capacidad: parseInt(room.capacity || room.capacidad || 2),
                estado: room.status || room.estado || ESTADOS.NO_DISPONIBLE,
                servicios: room.services || room.servicios || [],
                imagen: room.image || room.imagen
            }));
            console.log('Habitaciones formateadas:', habitacionesFormateadas); // Debug log
            setHabitaciones(habitacionesFormateadas);
            setHabitacionesFiltradas(habitacionesFormateadas);
        } catch (error) {
            console.error('Error al obtener habitaciones:', error);
            Swal.fire('Error', 'No se pudieron cargar las habitaciones', 'error');
        }
    };

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

    // Guardar habitación
    const handleGuardarHabitacion = async () => {
        try {
            if (!datosHabitacion.id) {
                const nuevaHabitacion = {
                    ...datosHabitacion,
                    id: `HAB-${Date.now().toString(34).toUpperCase()}`
                };
                const habitacionAgregada = await roomsCalls.AddRoom(nuevaHabitacion);
                setHabitaciones(prev => [...prev, habitacionAgregada]);
                Swal.fire('Éxito', 'Habitación añadida correctamente', 'success');
            } else {
                await roomsCalls.UpdateRoom(datosHabitacion);
                setHabitaciones(prev => prev.map(h => h.id === datosHabitacion.id ? datosHabitacion : h));
                Swal.fire('Éxito', 'Habitación actualizada correctamente', 'success');
            }
            handleCerrar();
        } catch (error) {
            console.error('Error al guardar habitación:', error);
            Swal.fire('Error', 'No se pudo guardar la habitación', 'error');
        }
    };

    // Eliminar habitación
    const handleEliminarHabitacion = async (id) => {
        try {
            await roomsCalls.DeleteRoom(id);
            Swal.fire('Éxito', 'Habitación eliminada correctamente', 'success');
            obtenerHabitaciones();
        } catch (error) {
            console.error('Error al eliminar habitación:', error);
            Swal.fire('Error', 'No se pudo eliminar la habitación', 'error');
        }
    };

    // Filtrar habitaciones
    const filtrarHabitaciones = () => {
        let filtradas = habitaciones;

        if (terminoBusqueda) {
            filtradas = filtradas.filter(habitacion =>
                habitacion.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                habitacion.tipo.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                habitacion.descripcion.toLowerCase().includes(terminoBusqueda.toLowerCase())
            );
        }

        if (pestanaActiva !== 'todos') {
            filtradas = filtradas.filter(habitacion => habitacion.estado === pestanaActiva);
        }

        setHabitacionesFiltradas(filtradas);
    };

    // Limpiar filtros
    const limpiarFiltro = () => {
        setTerminoBusqueda('');
        setEstadoSeleccionado('');
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
                                        <Nav.Link eventKey="todos">Todos</Nav.Link>
                                    </Nav.Item>
                                    {LISTA_ESTADOS.map(estado => (
                                        <Nav.Item key={estado.valor}>
                                            <Nav.Link eventKey={estado.valor}>
                                                {estado.etiqueta}
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
                                <Button variant="secondary" onClick={filtrarHabitaciones}>Filtrar</Button>
                                <Button variant="danger" onClick={limpiarFiltro}>X LIMPIAR</Button>
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
                                                onClick={() => handleEliminarHabitacion(habitacion.id)}
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
                handleSaveRoom={handleGuardarHabitacion}
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
