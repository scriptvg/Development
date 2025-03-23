import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Card, Row, Col, Badge, InputGroup, Form, Dropdown, Nav } from 'react-bootstrap';
import Swal from 'sweetalert2';
import roomsCalls from '../../../config/services/roomsCalls';
import RoomModal from './RoomModal';
import RoomModalVer from './RoomModalVer';
import "../styles/adminRooms.css"
import { CirclePlus, FilePlus } from 'lucide-react';

function AdminRooms() {
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [roomData, setRoomData] = useState({
        id: '',
        name: '',
        type: '',
        price: '',
        description: '',
        capacity: '',
        available: false,
        services: []
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [activeTab, setActiveTab] = useState('Todos');

    const handleShowView = () => setShowViewModal(true);
    const handleCloseView = () => setShowViewModal(false);

    useEffect(() => {
        fetchRooms();
    }, []);

    useEffect(() => {
        filterRooms();
    }, [rooms, searchTerm, selectedState, activeTab]);

    const fetchRooms = async () => {
        try {
            const data = await roomsCalls.GetRooms();
            setRooms(data);
        } catch (error) {
            console.error('Error fetching rooms:', error);
            Swal.fire('Error', 'No se pudieron cargar las habitaciones', 'error');
        }
    };

    const handleShow = () => setShowModal(true);
    const handleClose = () => {
        setShowModal(false);
        setRoomData({ id: '', name: '', type: '', price: '', description: '', capacity: '', available: false, services: [] });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRoomData({ ...roomData, [name]: value });
    };

    const handleSaveRoom = async () => {
        try {
            if (!roomData.id) {
                const newRoomData = {
                    ...roomData,
                    id: `HAB-${Date.now().toString(34).toUpperCase()}`
                };
                const newRoom = await roomsCalls.AddRoom(newRoomData);
                setRooms(prev => [...prev, newRoom]);
                Swal.fire('Éxito', 'Habitación añadida correctamente', 'success');
            } else {
                await roomsCalls.UpdateRoom(roomData);
                setRooms(prev => prev.map(r => r.id === roomData.id ? roomData : r));
                Swal.fire('Éxito', 'Habitación actualizada correctamente', 'success');
            }
            handleClose();
        } catch (error) {
            console.error('Error saving room:', error);
            Swal.fire('Error', 'No se pudo guardar la habitación', 'error');
        }
    };

    const handleDeleteRoom = async (id) => {
        try {
            await roomsCalls.DeleteRoom(id);
            Swal.fire('Éxito', 'Habitación eliminada correctamente', 'success');
            fetchRooms();
        } catch (error) {
            console.error('Error deleting room:', error);
            Swal.fire('Error', 'No se pudo eliminar la habitación', 'error');
        }
    };

    const filterRooms = () => {
        let filtered = rooms;

        if (searchTerm) {
            filtered = filtered.filter(room =>
                room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                room.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedState) {
            filtered = filtered.filter(room => room.available === (selectedState === 'Disponible'));
        }

        if (activeTab !== 'Todos') {
            filtered = filtered.filter(room => room.available === (activeTab === 'Disponible'));
        }

        setFilteredRooms(filtered);
    };

    const clearFilter = () => {
        setSearchTerm('');
        setSelectedState('');
    };

    const uniqueStates = ['Todos', 'Disponible', 'No Disponible', 'En Mantenimiento', 'Ocupada' ];

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
                                onClick={handleShow}
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

                                <Nav variant="tabs" activeKey={activeTab} onSelect={(selectedKey) => setActiveTab(selectedKey)}>
                                    <Nav.Item>
                                        <Nav.Link eventKey="Todos">Todos</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="Disponible">Disponible</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="No Disponible">No Disponible</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="En Mantenimiento">En Mantenimiento</Nav.Link>
                                    </Nav.Item>
                                </Nav>

                            </InputGroup>

                        </Col>

                        <Col>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="Buscar..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Button variant="secondary" onClick={filterRooms}>Filtrar</Button>
                                <Button variant="danger" onClick={clearFilter}>X LIMPIAR</Button>
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
                            {filteredRooms.length > 0 ? (
                                filteredRooms.map(room => (
                                    <tr key={room.id} className="align-middle">
                                        <td className="text-center fw-bold text-primary">{room.id}</td>
                                        <td className="fw-semibold">{room.name}</td>
                                        <td>{room.type}</td>
                                        <td className="text-center fw-bold">${room.price}</td>
                                        <td className="text-center">{room.capacity} personas</td>
                                        <td className="text-truncate" style={{ maxWidth: '250px' }}>{room.description}</td>
                                        <td className="text-center">
                                            <Badge
                                                bg={room.available ? 'success' : 'danger'}
                                                className="px-3 py-2 rounded-pill fw-semibold"
                                            >
                                                {room.available ? 'Disponible' : 'No Disponible'}
                                            </Badge>
                                        </td>
                                        <td className="text-center">
                                            <Button
                                                variant="outline-warning"
                                                className="me-2 mb-1 mb-md-0 rounded-3"
                                                onClick={() => { setRoomData(room); handleShow(); }}
                                            >
                                                <i className="bi bi-pencil-square me-1"></i> Editar
                                            </Button>
                                            <Button
                                                variant="outline-info"
                                                className="me-2 mb-1 mb-md-0 rounded-3"
                                                onClick={() => { setRoomData(room); handleShowView(); }}
                                            >
                                                <i className="bi bi-eye me-1"></i> Ver
                                            </Button>
                                            <Button
                                                variant="outline-danger"
                                                className="rounded-3"
                                                onClick={() => handleDeleteRoom(room.id)}
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
                                            onClick={handleShow}
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
                show={showModal}
                handleClose={handleClose}
                roomData={roomData}
                handleInputChange={handleInputChange}
                handleSaveRoom={handleSaveRoom}
            />
            <RoomModalVer
                show={showViewModal}
                handleClose={handleCloseView}
                roomData={roomData}
            />
        </Container>
    );
}

export default AdminRooms;