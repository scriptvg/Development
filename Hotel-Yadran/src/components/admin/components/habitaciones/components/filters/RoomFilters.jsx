import React, { useState } from 'react';
import { 
    Card, 
    Form, 
    Button, 
    Row, 
    Col, 
    InputGroup, 
    Badge, 
    OverlayTrigger, 
    Tooltip 
} from 'react-bootstrap';
import { 
    Search, 
    Filter, 
    Sliders, 
    ChevronDown, 
    ChevronUp, 
    X, 
    RefreshCw,
    Wifi,
    Tv,
    AirVent,
    Bath,
    DollarSign
} from 'lucide-react';
import { GiPalmTree } from 'react-icons/gi';
import './../../styles/filters.css';

const RoomFilters = ({ onFilterChange, tiposHabitacion, initialFilters = {} }) => {
    const [expanded, setExpanded] = useState(false);
    const [filters, setFilters] = useState({
        search: initialFilters.search || '',
        priceMin: initialFilters.priceMin || '',
        priceMax: initialFilters.priceMax || '',
        tipo: initialFilters.tipo || '',
        capacidad: initialFilters.capacidad || '',
        estado: initialFilters.estado || '',
        servicios: initialFilters.servicios || []
    });
    
    const [activeFiltersCount, setActiveFiltersCount] = useState(
        Object.values(filters).filter(val => 
            val !== '' && 
            !(Array.isArray(val) && val.length === 0)
        ).length
    );

    const handleFilterChange = (name, value) => {
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
        
        // Update active filters count
        setActiveFiltersCount(
            Object.values(newFilters).filter(val => 
                val !== '' && 
                !(Array.isArray(val) && val.length === 0)
            ).length
        );
        
        onFilterChange(newFilters);
    };

    const handleServiceToggle = (service) => {
        const updatedServices = filters.servicios.includes(service)
            ? filters.servicios.filter(s => s !== service)
            : [...filters.servicios, service];
        
        handleFilterChange('servicios', updatedServices);
    };

    const resetFilters = () => {
        const resetState = {
            search: '',
            priceMin: '',
            priceMax: '',
            tipo: '',
            capacidad: '',
            estado: '',
            servicios: []
        };
        setFilters(resetState);
        setActiveFiltersCount(0);
        onFilterChange(resetState);
    };

    return (
        <Card className="mb-4 border-0 shadow-sm">
            <Card.Header className="bg-white py-3">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <Sliders size={18} className="text-primary me-2" />
                        <h5 className="mb-0">Filtros</h5>
                        {activeFiltersCount > 0 && (
                            <Badge bg="primary" className="ms-2 px-2">{activeFiltersCount}</Badge>
                        )}
                    </div>
                    <div>
                        <Button 
                            variant="link" 
                            className="p-0 text-muted me-3"
                            onClick={resetFilters}
                            title="Restablecer filtros"
                        >
                            <RefreshCw size={18} />
                        </Button>
                        <Button 
                            variant="link" 
                            className="p-0 text-primary"
                            onClick={() => setExpanded(!expanded)}
                        >
                            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </Button>
                    </div>
                </div>
            </Card.Header>
            
            {/* Basic search always visible */}
            <Card.Body className="pt-0 pb-3">
                <Row className="mt-3">
                    <Col md={12}>
                        <InputGroup>
                            <InputGroup.Text className="bg-light border-end-0">
                                <Search size={18} className="text-muted" />
                            </InputGroup.Text>
                            <Form.Control
                                placeholder="Buscar por nombre o ID"
                                value={filters.search}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                                className="border-start-0"
                            />
                            {filters.search && (
                                <Button 
                                    variant="outline-secondary" 
                                    onClick={() => handleFilterChange('search', '')}
                                >
                                    <X size={16} />
                                </Button>
                            )}
                        </InputGroup>
                    </Col>
                </Row>
                
                {/* Advanced filters collapsible section */}
                {expanded && (
                    <>
                        <hr className="my-3" />
                        
                        <Row className="mb-3">
                            <Col md={6} lg={3} className="mb-3 mb-lg-0">
                                <Form.Group>
                                    <Form.Label className="d-flex align-items-center">
                                        <DollarSign size={16} className="me-1" />
                                        Rango de precio
                                    </Form.Label>
                                    <div className="d-flex">
                                        <Form.Control
                                            type="number"
                                            placeholder="Min"
                                            value={filters.priceMin}
                                            onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                                            className="me-2"
                                        />
                                        <Form.Control
                                            type="number"
                                            placeholder="Max"
                                            value={filters.priceMax}
                                            onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                                        />
                                    </div>
                                </Form.Group>
                            </Col>
                            
                            <Col md={6} lg={3} className="mb-3 mb-lg-0">
                                <Form.Group>
                                    <Form.Label>Tipo de habitación</Form.Label>
                                    <Form.Select
                                        value={filters.tipo}
                                        onChange={(e) => handleFilterChange('tipo', e.target.value)}
                                    >
                                        <option value="">Todos los tipos</option>
                                        {tiposHabitacion.map(tipo => (
                                            <option key={tipo} value={tipo}>{tipo}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            
                            <Col md={6} lg={3} className="mb-3 mb-lg-0">
                                <Form.Group>
                                    <Form.Label>Capacidad</Form.Label>
                                    <Form.Select
                                        value={filters.capacidad}
                                        onChange={(e) => handleFilterChange('capacidad', e.target.value)}
                                    >
                                        <option value="">Cualquier capacidad</option>
                                        <option value="1">1 persona</option>
                                        <option value="2">2 personas</option>
                                        <option value="3">3 personas</option>
                                        <option value="4">4 personas</option>
                                        <option value="5+">5 o más personas</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            
                            <Col md={6} lg={3}>
                                <Form.Group>
                                    <Form.Label>Estado</Form.Label>
                                    <Form.Select
                                        value={filters.estado}
                                        onChange={(e) => handleFilterChange('estado', e.target.value)}
                                    >
                                        <option value="">Todos los estados</option>
                                        <option value="disponible">Disponible</option>
                                        <option value="ocupada">Ocupada</option>
                                        <option value="mantenimiento">En mantenimiento</option>
                                        <option value="limpieza">En limpieza</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col md={12}>
                                <Form.Label>Servicios</Form.Label>
                                <div className="d-flex flex-wrap gap-2 mt-2">
                                    {[
                                        { id: 'wifi', label: 'Wi-Fi', icon: <Wifi size={16} /> },
                                        { id: 'aire_acondicionado', label: 'Aire Acond.', icon: <AirVent size={16} /> },
                                        { id: 'tv', label: 'Smart TV', icon: <Tv size={16} /> },
                                        { id: 'vista_al_mar', label: 'Vista al Mar', icon: <GiPalmTree size={16} /> },
                                        { id: 'bano_privado', label: 'Baño Privado', icon: <Bath size={16} /> }
                                    ].map(service => (
                                        <OverlayTrigger
                                            key={service.id}
                                            placement="top"
                                            overlay={<Tooltip>{service.label}</Tooltip>}
                                        >
                                            <Button
                                                variant={filters.servicios.includes(service.id) ? "primary" : "outline-secondary"}
                                                size="sm"
                                                className="d-flex align-items-center gap-1 px-3"
                                                onClick={() => handleServiceToggle(service.id)}
                                            >
                                                {service.icon}
                                                <span>{service.label}</span>
                                            </Button>
                                        </OverlayTrigger>
                                    ))}
                                </div>
                            </Col>
                        </Row>
                    </>
                )}
            </Card.Body>
        </Card>
    );
};

export default RoomFilters;
