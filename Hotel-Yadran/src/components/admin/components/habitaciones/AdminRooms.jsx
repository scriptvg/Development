import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Card, Row, Col, Badge, InputGroup, Form, Dropdown, Nav } from 'react-bootstrap';
import Swal from 'sweetalert2';
import roomsCalls from '../../../../config/services/roomsCalls';
import RoomModal from './RoomModal';
import RoomModalVer from './RoomModalVer';
import "./styles/adminRooms.css"
import { CirclePlus, FilePlus, Paintbrush, Funnel, Signature, IdCard, Type } from 'lucide-react';
import EstadoBadge from '../../utils/EstadoBadge';
import { ESTADOS, LISTA_ESTADOS } from '../../utils/estadosConfig';
import roomDataService from './services/roomDataService';
import RoomsTable from './RoomsTable';

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
    const [tipoFiltro, setTipoFiltro] = useState('ID');

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

        const result = await Swal.fire({
            tittle: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {

            try {
                await roomsCalls.DeleteRoom(id);
                Swal.fire('Éxito', 'Habitación eliminada correctamente', 'success');
                obtenerHabitaciones();
            } catch (error) {
                console.error('Error al eliminar habitación:', error);
                Swal.fire('Error', 'No se pudo eliminar la habitación', 'error');
            }

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

        // Aplicar el tipo de filtro seleccionado
        switch (tipoFiltro) {
            case 'Precio':
                filtradas.sort((a, b) => b.precio - a.precio); // Ordenar de mayor a menor
                break;
            case 'Capacidad':
                filtradas.sort((a, b) => b.capacidad - a.capacidad); // Ordenar de mayor a menor
                break;
            case 'ID':
                filtradas.sort((a, b) => a.id.localeCompare(b.id)); // Ordenar por ID
                break;
            case 'Nombre':
                filtradas.sort((a, b) => a.nombre.localeCompare(b.nombre)); // Ordenar por Nombre
                break;
            case 'Tipo':
                filtradas.sort((a, b) => a.tipo.localeCompare(b.tipo)); // Ordenar por Tipo
                break;
            default:
                break;
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
                                <FilePlus/>
                                Añadir Habitación
                            </Button>
                        </Col>
                    </Row>

                    <Row className="mb-3 mt-3">
                        <Col>
                            <InputGroup>
                                <Container className="scrollbar-container">
                                <Nav variant="tabs" activeKey={pestanaActiva} onSelect={(selectedKey) => setPestanaActiva(selectedKey)} className="pestanas">
                                    <Nav.Item>
                                        <Nav.Link eventKey="todos">Todos</Nav.Link>
                                    </Nav.Item>
                                    {LISTA_ESTADOS.map(estado => (
                                        <Nav.Item key={estado.valor}>
                                            <Nav.Link eventKey={estado.valor}>
                                                {estado.icono} {estado.etiqueta}
                                            </Nav.Link>
                                        </Nav.Item>
                                    ))}
                                </Nav>
                                </Container>
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup className='group-buscar'>
                                <Form.Control
                                    type="text"
                                    placeholder="Buscar..."
                                    value={terminoBusqueda}
                                    onChange={(e) => setTerminoBusqueda(e.target.value)}
                                    className="input-buscar rounded-3"/>
                                <Dropdown>
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                        <Funnel/> {tipoFiltro}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => setTipoFiltro('ID')}><IdCard/> ID</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setTipoFiltro('Nombre')}><Signature/> Nombre</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setTipoFiltro('Tipo')}><Type />Tipo</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setTipoFiltro('Precio')}>Precio (más alto al más bajo)</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setTipoFiltro('Capacidad')}>Capacidad</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Button variant="danger" onClick={limpiarFiltro}><Paintbrush/></Button>
                            </InputGroup>
                        </Col>
                    </Row>

                    <RoomsTable 
                        habitacionesFiltradas={habitacionesFiltradas} 
                        handleMostrar={handleMostrar} 
                        handleMostrarVer={handleMostrarVer} 
                        handleEliminarHabitacion={handleEliminarHabitacion} 
                    />
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
