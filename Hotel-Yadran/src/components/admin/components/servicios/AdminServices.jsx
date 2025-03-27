import React, { useEffect, useState } from 'react';
import { Button, Container, Card, Row, Col, InputGroup, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import ServiceModal from './ServiceModal';
import ServiceModalVer from './ServiceModalVer';
import "./styles/adminServices.css";
import { FilePlus, Search, Filter, Download } from 'lucide-react';
import serviceDataService, { exportToExcel } from './services/serviceDataService.jsx';
import ServicesTable from './ServicesTable';
import EditServiceModal from './EditServiceModal';

function AdminServices() {
    // Estados para manejar datos y modales
    const [servicios, setServicios] = useState([]);
    const [serviciosFiltrados, setServiciosFiltrados] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarModalVer, setMostrarModalVer] = useState(false);
    const [datosServicio, setDatosServicio] = useState({
        id: '',
        nombre: '',
        descripcion: '',
        hasPrice: false,
        precio: '',
        imagen: null
    });
    
    // Estados de filtrado
    const [searchTerm, setSearchTerm] = useState('');
    const [filtroPrecio, setFiltroPrecio] = useState('todos'); // 'todos', 'conPrecio', 'sinPrecio'
    const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
    const [servicioSeleccionado, setServicioSeleccionado] = useState(null);

    // Estados para paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // Cargar servicios
    useEffect(() => {
        serviceDataService.getAllServices(setServicios, setServiciosFiltrados);
    }, []);

    // Filtrar servicios cuando cambian los filtros
    useEffect(() => {
        let filteredServices = [...servicios];
        
        // Aplicar filtros (búsqueda y precio)
        if (searchTerm) {
            filteredServices = filteredServices.filter(servicio => 
                servicio.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                servicio.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        if (filtroPrecio === 'conPrecio') {
            filteredServices = filteredServices.filter(servicio => servicio.hasPrice);
        } else if (filtroPrecio === 'sinPrecio') {
            filteredServices = filteredServices.filter(servicio => !servicio.hasPrice);
        }
        
        setServiciosFiltrados(filteredServices);
    }, [servicios, searchTerm, filtroPrecio]);

    // Restablecer a la primera página cuando cambian los filtros
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filtroPrecio]);

    // Manejadores
    const handleMostrarVer = (servicio) => {
        setDatosServicio(servicio);
        setMostrarModalVer(true);
    };
    
    const handleCerrarVer = () => setMostrarModalVer(false);
    
    const handleMostrar = () => setMostrarModal(true);
    
    const handleCerrar = () => {
        setMostrarModal(false);
        setDatosServicio({ 
            id: '', 
            nombre: '', 
            descripcion: '',
            hasPrice: false,
            precio: ''
        });
    };

    const handleLimpiarFiltros = () => {
        setSearchTerm('');
        setFiltroPrecio('todos');
    };

    const handleExportarDatos = () => {
        const dataToExport = serviciosFiltrados.map(service => ({
            ID: service.id,
            Nombre: service.nombre,
            Descripción: service.descripcion,
            "Tiene Precio": service.hasPrice ? 'Sí' : 'No',
            Precio: service.hasPrice ? service.precio : 'N/A'
        }));
        exportToExcel(dataToExport);
    };

    const handleEliminarServicio = async (id) => {
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
                await serviceDataService.deleteService(id);
                await serviceDataService.getAllServices(setServicios, setServiciosFiltrados);
                Swal.fire(
                    '¡Eliminado!',
                    'El servicio ha sido eliminado.',
                    'success'
                );
            }
        } catch (error) {
            console.error('Error al eliminar:', error);
            Swal.fire(
                'Error',
                'No se pudo eliminar el servicio.',
                'error'
            );
        }
    };

    const handleMostrarEditar = (servicio) => {
        setServicioSeleccionado(servicio);
        setMostrarModalEditar(true);
    };

    const handleCerrarEditar = () => {
        setMostrarModalEditar(false);
        setServicioSeleccionado(null);
    };

    const handleGuardarCambios = async (servicioEditado) => {
        try {
            await serviceDataService.saveService(servicioEditado);
            await serviceDataService.getAllServices(setServicios, setServiciosFiltrados);
            handleCerrarEditar();
        } catch (error) {
            console.error('Error al guardar los cambios:', error);
            Swal.fire('Error', 'No se pudieron guardar los cambios', 'error');
        }
    };

    const handleSaveService = async (serviceData) => {
        try {
            await serviceDataService.saveService(serviceData);
            await serviceDataService.getAllServices(setServicios, setServiciosFiltrados);
            handleCerrar();
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'El servicio se ha guardado correctamente',
                confirmButtonColor: '#3085d6'
            });
        } catch (error) {
            console.error('Error al guardar:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo guardar el servicio',
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
        <Container className="containerServices py-5">
            <Card className="shadow-lg border-0 rounded-4 mb-4">
                <Card.Body className="p-4">
                    <Row className="align-items-center mb-4">
                        <Col>
                            <Card.Title className="display-6 fw-bold text-primary mb-0">
                                Gestión de Servicios
                            </Card.Title>
                            <Card.Subtitle className='text-secondary fs-5 mb-0 mt-1 fw-semibold'>
                                Administra los servicios del hotel
                            </Card.Subtitle>
                        </Col>
                        <Col xs="auto">
                            <Button
                                variant="primary"
                                onClick={handleMostrar}
                                className="d-flex align-items-center gap-2 rounded-3 px-4"
                                size="lg">
                                <FilePlus size={20}/>
                                Añadir Servicio
                            </Button>
                        </Col>
                        <Col>
                            <Button 
                                variant="outline-primary" 
                                className="d-flex align-items-center gap-1"
                                onClick={handleExportarDatos}
                            >
                                <Download size={16} />
                                Exportar datos
                            </Button>
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
                                            placeholder="Buscar por nombre o descripción..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="border-start-0 ps-0"
                                        />
                                        <Form.Select
                                            className='w-5' 
                                            value={filtroPrecio}
                                            onChange={(e) => setFiltroPrecio(e.target.value)}
                                        >
                                            <option value="todos">Todos los servicios</option>
                                            <option value="conPrecio">Con precio</option>
                                            <option value="sinPrecio">Sin precio</option>
                                        </Form.Select>
                                        <Button 
                                            variant="outline-secondary" 
                                            className="w-10"
                                            onClick={handleLimpiarFiltros}
                                        >
                                            <Filter size={16} className="me-1" />
                                            Limpiar
                                        </Button>
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    
                    {/* Tabla de servicios con paginación */}
                    <ServicesTable 
                        servicios={servicios}
                        serviciosFiltrados={serviciosFiltrados} 
                        handleMostrarVer={handleMostrarVer} 
                        handleMostrarEditar={handleMostrarEditar} 
                        handleEliminarServicio={handleEliminarServicio}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                        onItemsPerPageChange={(e) => handleItemsPerPageChange(e)}
                    />
                </Card.Body>
            </Card>

            {/* Modales */}
            <ServiceModal
                show={mostrarModal}
                handleClose={handleCerrar}
                handleSaveService={handleSaveService}
            />
            <ServiceModalVer
                show={mostrarModalVer}
                handleClose={handleCerrarVer}
                serviceData={datosServicio}
                onHide={handleCerrarVer}
            />
            <EditServiceModal
                show={mostrarModalEditar}
                handleClose={handleCerrarEditar}
                service={servicioSeleccionado}
                handleSaveService={handleGuardarCambios}
            />
        </Container>
    );
}

export default AdminServices;