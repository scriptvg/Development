import React, { useEffect, useState } from 'react';
import { Button, Container, Card, Row, Col, InputGroup, Form, Dropdown, ButtonGroup } from 'react-bootstrap';
import Swal from 'sweetalert2';
import RoomModal from './RoomModal';
import RoomModalVer from './RoomModalVer';
import "./styles/adminRooms.css";
import { FilePlus, Paintbrush, Search, Filter, Download } from 'lucide-react';
import { ESTADOS, LISTA_ESTADOS } from '../../utils/estadosConfig.jsx';
import roomDataService, { exportToExcel } from './services/roomDataService.jsx';
import RoomsTable from './components/table/RoomsTable';
import EditRoomModal from './EditRoomModal';

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
    
    // Estados de filtrado simplificados
    const [searchTerm, setSearchTerm] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('');
    const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
    const [habitacionSeleccionada, setHabitacionSeleccionada] = useState(null);

    // Estado para el tab activo
    const [activeTab, setActiveTab] = useState('todos');

    // Estados para paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // Cargar habitaciones
    useEffect(() => {
        roomDataService.getAllRooms(setHabitaciones, setHabitacionesFiltradas);
    }, []);

    // Filtrar habitaciones cuando cambian los filtros o el tab activo
    useEffect(() => {
        let filteredRooms = [...habitaciones];
        
        // Filtrado por tab usando los ESTADOS correctos del archivo .jsx
        if (activeTab !== 'todos') {
            // For 'archivada', we need special handling
            if (activeTab === 'archivada') {
                filteredRooms = filteredRooms.filter(room => room.estado === 'archivada');
            } else {
                // For other tabs, use the tab ID directly (which now matches ESTADOS values from .jsx)
                filteredRooms = filteredRooms.filter(room => room.estado === activeTab);
            }
        }
        
        // Aplicar filtros adicionales (búsqueda y estado)
        if (searchTerm || filtroEstado) {
            filteredRooms = roomDataService.filterRoomsByState(
                filteredRooms, 
                searchTerm, 
                filtroEstado
            );
        }
        
        setHabitacionesFiltradas(filteredRooms);
    }, [habitaciones, searchTerm, filtroEstado, activeTab]);

    // Restablecer a la primera página cuando cambian los filtros o el tab
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filtroEstado, activeTab]);

    // Manejador para cambio de tab
    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        // Limpiar filtro de estado si se selecciona un tab específico para evitar confusión
        if (tabId !== 'todos') {
            setFiltroEstado('');
        }
    };

    // Manejadores
    const handleMostrarVer = (habitacion) => {
        setDatosHabitacion(habitacion);
        setMostrarModalVer(true);
    };
    
    const handleCerrarVer = () => setMostrarModalVer(false);
    
    const handleMostrar = () => setMostrarModal(true);
    
    const handleCerrar = () => {
        setMostrarModal(false);
        setDatosHabitacion({ 
            id: '', 
            nombre: '', 
            tipo: '', 
            precio: '', 
            descripcion: '', 
            capacidad: '', 
            disponible: false, 
            servicios: [] 
        });
    };

    const handleLimpiarFiltros = () => {
        setSearchTerm('');
        setFiltroEstado('');
    };

    const handleExportarDatos = () => {
        const dataToExport = habitacionesFiltradas.map(room => ({
            ID: room.id,
            Nombre: room.nombre,
            Tipo: room.tipo,
            Precio: room.precio,
            Capacidad: room.capacidad,
            Estado: room.estado,
            Descripción: room.descripcion
        }));
        exportToExcel(dataToExport);
    };

    const handleEliminarHabitacion = async (id) => {
        try {
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: "No podrás revertir esta acción",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                await roomDataService.deleteRoom(id);
                await roomDataService.getAllRooms(setHabitaciones, setHabitacionesFiltradas);
                Swal.fire(
                    '¡Eliminado!',
                    'La habitación ha sido eliminada.',
                    'success'
                );
            }
        } catch (error) {
            console.error('Error al eliminar:', error);
            Swal.fire(
                'Error',
                'No se pudo eliminar la habitación.',
                'error'
            );
        }
    };

    const handleMostrarEditar = (habitacion) => {
        setHabitacionSeleccionada(habitacion);
        setMostrarModalEditar(true);
    };

    const handleCerrarEditar = () => {
        setMostrarModalEditar(false);
        setHabitacionSeleccionada(null);
    };

    const handleGuardarCambios = async (habitacionEditada) => {
        try {
            await roomDataService.saveRoom(habitacionEditada);
            await roomDataService.getAllRooms(setHabitaciones, setHabitacionesFiltradas);
            handleCerrarEditar();
        } catch (error) {
            console.error('Error al guardar los cambios:', error);
            Swal.fire('Error', 'No se pudieron guardar los cambios', 'error');
        }
    };

    const handleSaveRoom = async (roomData) => {
        try {
            await roomDataService.saveRoom(roomData);
            await roomDataService.getAllRooms(setHabitaciones, setHabitacionesFiltradas);
            handleCerrar();
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'La habitación se ha guardado correctamente',
                confirmButtonColor: '#3085d6'
            });
        } catch (error) {
            console.error('Error al guardar:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo guardar la habitación',
                confirmButtonColor: '#3085d6'
            });
        }
    };

    // Manejador para cambio de página
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    // Manejador para cambiar items por página
    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value, 10));
        setCurrentPage(1); // Volver a la primera página al cambiar los items por página
    };

    return (
        <Container className="containerRooms py-5">
            <Card className="shadow-lg border-0 rounded-4 mb-4">
                <Card.Body className="p-4">
                    <Row className="align-items-center mb-4">
                        <Col>
                            <Card.Title className="display-6 fw-bold text-primary mb-0">
                                Gestión de Habitaciones
                            </Card.Title>
                            <Card.Subtitle className='text-secondary fs-5 mb-0 mt-1 fw-semibold'>
                                Administra las habitaciones del hotel
                            </Card.Subtitle>
                        </Col>
                        <Col xs="auto">
                            <Button
                                variant="primary"
                                onClick={handleMostrar}
                                className="d-flex align-items-center gap-2 rounded-3 px-4"
                                size="lg">
                                <FilePlus size={20}/>
                                Añadir Habitación
                            </Button>
                        </Col>
                        <Col>
                        <ButtonGroup>
                            <Button 
                                variant="outline-primary" 
                                className="d-flex align-items-center gap-1"
                                onClick={handleExportarDatos}
                            >
                                <Download size={16} />
                                Exportar datos
                            </Button>
                        </ButtonGroup>
                        </Col>
                    </Row>

                    {/* Filtros simplificados */}
                    <Card className="shadow-sm border-0 mb-4">
                        <Card.Body className="p-3">
                            <Row className="">
                                
                                <Col md={12} className="d-flex gap-2">
                                <InputGroup>
                                        <InputGroup.Text className="bg-light border-end-0">
                                            <Search size={25} />
                                        </InputGroup.Text>
                                        <Form.Control
                                            type="text"
                                            placeholder=" Buscar por nombre, tipo o descripción..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="border-start-0 ps-0"
                                        />
                                        {activeTab === 'todos' && (
                                            <Form.Select
                                                className='w-5' 
                                                value={filtroEstado}
                                                onChange={(e) => setFiltroEstado(e.target.value)}
                                            >
                                                <option value="">Todos los estados</option>
                                                {LISTA_ESTADOS.map(estado => (
                                                    <option key={estado.valor} value={estado.valor}>
                                                        {estado.etiqueta}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        )}
                                        <Button 
                                            variant="outline-secondary" 
                                            className="w-10"
                                            onClick={handleLimpiarFiltros}
                                        >
                                            <Paintbrush size={16} className="me-1" />
                                            Limpiar
                                        </Button>
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    
                    {/* Botones de acción y selector de items por página */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                       
                        
                        
                    </div>

                    {/* Tabla de habitaciones con paginación y tabs */}
                    <RoomsTable 
                        habitaciones={habitaciones}
                        habitacionesFiltradas={habitacionesFiltradas} 
                        handleMostrar={handleMostrar} 
                        handleMostrarVer={handleMostrarVer} 
                        handleMostrarEditar={handleMostrarEditar} 
                        handleEliminarHabitacion={handleEliminarHabitacion}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                        onItemsPerPageChange={(e) => handleItemsPerPageChange(e)}
                        activeTab={activeTab}
                        onTabChange={handleTabChange} 
                    />
                </Card.Body>
            </Card>

            {/* Modales */}
            <RoomModal
                show={mostrarModal}
                handleClose={handleCerrar}
                handleSaveRoom={handleSaveRoom}
            />
            <RoomModalVer
                show={mostrarModalVer}
                handleClose={handleCerrarVer}
                roomData={datosHabitacion}
                onHide={handleCerrarVer}
            />
            <EditRoomModal
                show={mostrarModalEditar}
                handleClose={handleCerrarEditar}
                room={habitacionSeleccionada}
                handleSaveRoom={handleGuardarCambios}
            />
        </Container>
    );
}

export default AdminRooms;
