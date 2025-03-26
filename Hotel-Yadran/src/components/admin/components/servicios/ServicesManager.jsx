import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Alert, Spinner } from 'react-bootstrap';
import { PlusCircle, Search, List, Grid, Settings, Filter } from 'lucide-react';
import Swal from 'sweetalert2';
import servicesDataService from './services/servicesDataService.jsx';
import ServiceForm from './components/ServiceForm.jsx';
import ServiceCard from './components/ServiceCard.jsx';
import TableSettingsPanel from '../habitaciones/components/table/TableSettingsPanel.jsx';
import SearchFilter from '../habitaciones/components/filters/SearchFilter.jsx';
import { LISTA_SERVICIOS } from '../../utils/ServicesConfig.jsx';
import './styles/servicesManager.css';

/**
 * ServicesManager - Admin component for managing hotel services
 */
const ServicesManager = () => {
    // State for services data
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // State for UI 
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedVariant, setSelectedVariant] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingService, setEditingService] = useState(null);
    
    // Table settings state
    const [tableSettings, setTableSettings] = useState({
        visibleColumns: {
            id: true,
            etiqueta: true,
            valor: true,
            descripcion: true, 
            variante: true,
            actions: true
        },
        sortBy: 'etiqueta',
        sortDirection: 'asc'
    });
    
    // Load services when component mounts
    useEffect(() => {
        loadServices();
    }, []);
    
    // Apply filtering when searchTerm or selectedVariant changes
    useEffect(() => {
        filterServices();
    }, [searchTerm, selectedVariant, services]);
    
    // Load services from local data service
    const loadServices = () => {
        setIsLoading(true);
        setError(null);
        
        servicesDataService.getAllServices(
            (data) => {
                setServices(data);
                setFilteredServices(data);
                setIsLoading(false);
            },
            (err) => {
                console.error("Error loading services:", err);
                setError("No se pudieron cargar los servicios.");
                setIsLoading(false);
            }
        );
    };
    
    // Filter services based on search term and variant
    const filterServices = () => {
        let filtered = [...services];
        
        // Apply search filter
        if (searchTerm.trim() !== '') {
            const search = searchTerm.toLowerCase();
            filtered = filtered.filter(service => 
                service.etiqueta.toLowerCase().includes(search) ||
                service.valor.toLowerCase().includes(search) ||
                service.descripcion.toLowerCase().includes(search)
            );
        }
        
        // Apply variant filter
        if (selectedVariant) {
            filtered = filtered.filter(service => 
                service.variante === selectedVariant
            );
        }
        
        // Apply sorting from table settings
        if (tableSettings.sortBy) {
            filtered.sort((a, b) => {
                const aValue = a[tableSettings.sortBy] || '';
                const bValue = b[tableSettings.sortBy] || '';
                
                // Handle case-insensitive string comparison
                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    const comparison = aValue.localeCompare(bValue);
                    return tableSettings.sortDirection === 'asc' ? comparison : -comparison;
                }
                
                // Handle number comparison
                const comparison = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
                return tableSettings.sortDirection === 'asc' ? comparison : -comparison;
            });
        }
        
        setFilteredServices(filtered);
    };
    
    // Add new service (client-side)
    const handleAddService = (serviceData) => {
        servicesDataService.addService(
            serviceData,
            (result) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Servicio añadido',
                    text: 'El servicio ha sido añadido con éxito'
                });
                // Update local state to show the new service immediately
                setServices(prevServices => [...prevServices, result]);
                setShowForm(false);
                setEditingService(null);
            },
            (error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo añadir el servicio'
                });
            }
        );
    };
    
    // Update existing service
    const handleUpdateService = (serviceData) => {
        servicesDataService.updateService(
            serviceData,
            (result) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Servicio actualizado',
                    text: 'El servicio ha sido actualizado con éxito'
                });
                setServices(services.map(s => s.id === result.id ? result : s));
                setShowForm(false);
                setEditingService(null);
            },
            (error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo actualizar el servicio'
                });
            }
        );
    };
    
    // Delete service
    const handleDeleteService = (serviceId) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                servicesDataService.deleteService(
                    serviceId,
                    (result) => {
                        Swal.fire(
                            '¡Eliminado!',
                            'El servicio ha sido eliminado.',
                            'success'
                        );
                        setServices(services.filter(s => s.id !== serviceId));
                    },
                    (error) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'No se pudo eliminar el servicio'
                        });
                    }
                );
            }
        });
    };
    
    // Edit service
    const handleEditService = (service) => {
        setEditingService(service);
        setShowForm(true);
    };
    
    // Handle form submission for add/update
    const handleFormSubmit = (serviceData) => {
        if (editingService) {
            handleUpdateService({...serviceData, id: editingService.id});
        } else {
            handleAddService(serviceData);
        }
    };
    
    // Handle form cancellation
    const handleFormCancel = () => {
        setShowForm(false);
        setEditingService(null);
    };
    
    // Handle table settings change
    const handleColumnVisibilityChange = (columnId, isVisible) => {
        if (typeof columnId === 'string') {
            setTableSettings({
                ...tableSettings,
                visibleColumns: {
                    ...tableSettings.visibleColumns,
                    [columnId]: isVisible
                }
            });
        } else if (typeof columnId === 'object') {
            // Handle the case where columnId is actually a complete visibility object
            setTableSettings({
                ...tableSettings,
                visibleColumns: columnId
            });
        }
    };
    
    // Handle sorting change
    const handleSortChange = (sortBy, sortDirection) => {
        setTableSettings({
            ...tableSettings,
            sortBy,
            sortDirection
        });
    };
    
    // Reset table settings
    const handleResetTableSettings = () => {
        setTableSettings({
            visibleColumns: {
                id: true,
                etiqueta: true,
                valor: true,
                descripcion: true, 
                variante: true,
                actions: true
            },
            sortBy: 'etiqueta',
            sortDirection: 'asc'
        });
    };
    
    // Define available variants
    const variantOptions = [
        { value: '', label: 'Todos' },
        { value: 'primary', label: 'Principal' },
        { value: 'secondary', label: 'Secundario' },
        { value: 'success', label: 'Éxito' },
        { value: 'danger', label: 'Peligro' },
        { value: 'warning', label: 'Advertencia' },
        { value: 'info', label: 'Información' },
        { value: 'dark', label: 'Oscuro' }
    ];
    
    // Columns configuration for the table
    const columns = {
        id: { label: 'ID' },
        etiqueta: { label: 'Nombre' },
        valor: { label: 'Valor' },
        descripcion: { label: 'Descripción' },
        variante: { label: 'Variante' },
        actions: { label: 'Acciones' }
    };
    
    return (
        <Container fluid className="py-4 services-manager">
            <Card className="shadow-sm border-0 mb-4">
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h1 className="h3 mb-1">Gestión de Servicios</h1>
                            <p className="text-muted mb-0">
                                Administra los servicios disponibles en tu hotel
                            </p>
                        </div>
                        
                        <div className="d-flex gap-2">
                            <Button 
                                variant={viewMode === 'grid' ? 'primary' : 'outline-primary'} 
                                className="d-flex align-items-center gap-2"
                                onClick={() => setViewMode('grid')}
                            >
                                <Grid size={18} />
                                <span className="d-none d-md-inline">Cuadrícula</span>
                            </Button>
                            
                            <Button 
                                variant={viewMode === 'table' ? 'primary' : 'outline-primary'} 
                                className="d-flex align-items-center gap-2"
                                onClick={() => setViewMode('table')}
                            >
                                <List size={18} />
                                <span className="d-none d-md-inline">Tabla</span>
                            </Button>
                            
                            <Button 
                                variant="success" 
                                className="d-flex align-items-center gap-2 ms-2"
                                onClick={() => {
                                    setEditingService(null);
                                    setShowForm(true);
                                }}
                            >
                                <PlusCircle size={18} />
                                <span className="d-none d-md-inline">Añadir Servicio</span>
                            </Button>
                        </div>
                    </div>
                    
                    <Row className="g-3">
                        <Col md={8}>
                            <SearchFilter 
                                placeholder="Buscar servicios..."
                                value={searchTerm}
                                onChange={setSearchTerm}
                            />
                        </Col>
                        <Col md={4}>
                            <div className="d-flex gap-2">
                                <select 
                                    className="form-select" 
                                    value={selectedVariant} 
                                    onChange={(e) => setSelectedVariant(e.target.value)}
                                    aria-label="Filtrar por variante"
                                >
                                    {variantOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                
                                <Button 
                                    variant="outline-secondary" 
                                    onClick={() => {
                                        setSearchTerm('');
                                        setSelectedVariant('');
                                    }}
                                >
                                    Limpiar
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    
                    {/* Stats row */}
                    <div className="stats-row py-3 my-3 border-top border-bottom">
                        <Row className="g-3">
                            <Col md={4}>
                                <div className="stats-item">
                                    <h6 className="stats-label">Total de servicios</h6>
                                    <div className="stats-value">{services.length}</div>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="stats-item">
                                    <h6 className="stats-label">Servicios filtrados</h6>
                                    <div className="stats-value">{filteredServices.length}</div>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="stats-item">
                                    <h6 className="stats-label">Modo de visualización</h6>
                                    <div className="stats-value">
                                        {viewMode === 'grid' ? 'Cuadrícula' : 'Tabla'}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Card.Body>
            </Card>
            
            {/* Form for adding/editing */}
            {showForm && (
                <Card className="shadow-sm border-0 mb-4">
                    <Card.Header className="bg-light">
                        <h5 className="mb-0">{editingService ? 'Editar Servicio' : 'Añadir Servicio'}</h5>
                    </Card.Header>
                    <Card.Body>
                        <ServiceForm 
                            service={editingService}
                            onSubmit={handleFormSubmit}
                            onCancel={handleFormCancel}
                        />
                    </Card.Body>
                </Card>
            )}
            
            {/* Error display if needed */}
            {error && (
                <Alert variant="warning" className="mb-4">
                    <Alert.Heading>Atención</Alert.Heading>
                    <p>{error}</p>
                </Alert>
            )}
            
            {/* Loading spinner */}
            {isLoading ? (
                <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-3">Cargando servicios...</p>
                </div>
            ) : filteredServices.length === 0 ? (
                <Card className="text-center py-5">
                    <Card.Body>
                        <Search size={48} className="text-muted mb-3" />
                        <h4>No se encontraron servicios</h4>
                        <p className="text-muted">
                            {searchTerm || selectedVariant ? 
                                'Prueba a ajustar los filtros de búsqueda' : 
                                'Añade tu primer servicio para comenzar'}
                        </p>
                        <Button 
                            variant="primary" 
                            onClick={() => {
                                setEditingService(null);
                                setShowForm(true);
                            }}
                            className="mt-2"
                        >
                            <PlusCircle size={18} className="me-2" />
                            Añadir Servicio
                        </Button>
                    </Card.Body>
                </Card>
            ) : (
                <>
                    {/* Table view for services */}
                    {viewMode === 'table' && (
                        <>
                            <TableSettingsPanel 
                                columns={columns}
                                onColumnVisibilityChange={handleColumnVisibilityChange}
                                onSortChange={handleSortChange}
                                onReset={handleResetTableSettings}
                                onExport={() => console.log('Export not implemented')}
                                onPrint={() => window.print()}
                                currentSettings={tableSettings}
                            />
                            
                            <Card className="shadow-sm border-0">
                                <Card.Body className="p-0">
                                    <div className="table-responsive">
                                        <Table hover className="align-middle mb-0">
                                            <thead className="bg-light">
                                                <tr>
                                                    {tableSettings.visibleColumns.id && (
                                                        <th>ID</th>
                                                    )}
                                                    {tableSettings.visibleColumns.etiqueta && (
                                                        <th>Nombre</th>
                                                    )}
                                                    {tableSettings.visibleColumns.valor && (
                                                        <th>Valor</th>
                                                    )}
                                                    {tableSettings.visibleColumns.descripcion && (
                                                        <th>Descripción</th>
                                                    )}
                                                    {tableSettings.visibleColumns.variante && (
                                                        <th>Variante</th>
                                                    )}
                                                    {tableSettings.visibleColumns.actions && (
                                                        <th className="text-center">Acciones</th>
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredServices.map(service => (
                                                    <tr key={service.id || service.valor}>
                                                        {tableSettings.visibleColumns.id && (
                                                            <td>
                                                                <code className="bg-light px-2 py-1 rounded">
                                                                    {service.id || service.valor}
                                                                </code>
                                                            </td>
                                                        )}
                                                        {tableSettings.visibleColumns.etiqueta && (
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <div className="service-icon me-2">
                                                                        {service.icono && React.isValidElement(service.icono) 
                                                                            ? React.cloneElement(service.icono, { size: 20 }) 
                                                                            : <Settings size={20} />}
                                                                    </div>
                                                                    <span className="fw-medium">{service.etiqueta}</span>
                                                                </div>
                                                            </td>
                                                        )}
                                                        {tableSettings.visibleColumns.valor && (
                                                            <td>
                                                                <code>{service.valor}</code>
                                                            </td>
                                                        )}
                                                        {tableSettings.visibleColumns.descripcion && (
                                                            <td className="text-truncate" style={{maxWidth: '300px'}}>
                                                                {service.descripcion}
                                                            </td>
                                                        )}
                                                        {tableSettings.visibleColumns.variante && (
                                                            <td>
                                                                <Badge bg={service.variante || 'primary'}>
                                                                    {service.variante || 'primary'}
                                                                </Badge>
                                                            </td>
                                                        )}
                                                        {tableSettings.visibleColumns.actions && (
                                                            <td className="text-center">
                                                                <Button 
                                                                    variant="outline-primary" 
                                                                    size="sm" 
                                                                    className="me-1"
                                                                    onClick={() => handleEditService(service)}
                                                                >
                                                                    Editar
                                                                </Button>
                                                                <Button 
                                                                    variant="outline-danger" 
                                                                    size="sm"
                                                                    onClick={() => handleDeleteService(service.id || service.valor)}
                                                                >
                                                                    Eliminar
                                                                </Button>
                                                            </td>
                                                        )}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                </Card.Body>
                            </Card>
                        </>
                    )}
                    
                    {/* Grid view for services */}
                    {viewMode === 'grid' && (
                        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                            {filteredServices.map(service => (
                                <Col key={service.id || service.valor}>
                                    <ServiceCard 
                                        service={service}
                                        onEdit={() => handleEditService(service)}
                                        onDelete={() => handleDeleteService(service.id || service.valor)}
                                    />
                                </Col>
                            ))}
                        </Row>
                    )}
                </>
            )}
        </Container>
    );
};

export default ServicesManager;
