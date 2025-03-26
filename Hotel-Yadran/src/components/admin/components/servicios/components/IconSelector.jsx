import React, { useState } from 'react';
import { Button, Modal, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { 
    Settings, Wifi, Coffee, Bed, Bath, Tv, Car, Bike, 
    Snowflake, Utensils, MapPin, PawPrint, Sun, Shirt,
    Wine, MessageSquare, Waves, Lock, Car as ParkingIcon, Baby, // Changed Parking to Car and aliased
    Fan, Dumbbell, Bell, ShowerHead, Computer, Phone, Globe, Bus,
    Search, X, CheckCircle
} from 'lucide-react';

/**
 * IconSelector - Component for selecting icons for services
 * 
 * @param {Object} props
 * @param {React.Element} props.selectedIcon - Currently selected icon
 * @param {Function} props.onSelectIcon - Callback when icon is selected
 * @param {string} props.variant - Bootstrap variant for icon preview
 */
const IconSelector = ({ selectedIcon, onSelectIcon, variant = 'primary' }) => {
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIconTemp, setSelectedIconTemp] = useState(null);
    
    // Available icons
    const availableIcons = [
        { key: 'wifi', component: <Wifi size={24} />, name: 'WiFi' },
        { key: 'coffee', component: <Coffee size={24} />, name: 'Café' },
        { key: 'bed', component: <Bed size={24} />, name: 'Cama' },
        { key: 'bath', component: <Bath size={24} />, name: 'Baño' },
        { key: 'tv', component: <Tv size={24} />, name: 'Televisión' },
        { key: 'car', component: <Car size={24} />, name: 'Coche' },
        { key: 'bike', component: <Bike size={24} />, name: 'Bicicleta' }, // Changed from Bicycle to Bike
        { key: 'snowflake', component: <Snowflake size={24} />, name: 'Aire Acondicionado' },
        { key: 'utensils', component: <Utensils size={24} />, name: 'Restaurante' },
        { key: 'map-pin', component: <MapPin size={24} />, name: 'Ubicación' },
        { key: 'paw-print', component: <PawPrint size={24} />, name: 'Mascotas' },
        { key: 'sun', component: <Sun size={24} />, name: 'Playa' },
        { key: 'shirt', component: <Shirt size={24} />, name: 'Lavandería' },
        { key: 'wine', component: <Wine size={24} />, name: 'Bar' },
        { key: 'message-square', component: <MessageSquare size={24} />, name: 'Mensajes' },
        { key: 'waves', component: <Waves size={24} />, name: 'Piscina' },
        { key: 'lock', component: <Lock size={24} />, name: 'Seguridad' },
        { key: 'parking', component: <ParkingIcon size={24} />, name: 'Estacionamiento' }, // Using ParkingIcon alias
        { key: 'baby', component: <Baby size={24} />, name: 'Bebés' },
        { key: 'fan', component: <Fan size={24} />, name: 'Ventilador' },
        { key: 'dumbbell', component: <Dumbbell size={24} />, name: 'Gimnasio' },
        { key: 'bell', component: <Bell size={24} />, name: 'Recepción' },
        { key: 'shower-head', component: <ShowerHead size={24} />, name: 'Ducha' },
        { key: 'computer', component: <Computer size={24} />, name: 'Computadora' },
        { key: 'phone', component: <Phone size={24} />, name: 'Teléfono' },
        { key: 'globe', component: <Globe size={24} />, name: 'Internet' },
        { key: 'bus', component: <Bus size={24} />, name: 'Transporte' }
    ];
    
    // Filter icons based on search term
    const filteredIcons = searchTerm.trim() === '' 
        ? availableIcons 
        : availableIcons.filter(icon => 
            icon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    
    // Open icon selector modal
    const openIconSelector = () => {
        setSelectedIconTemp(selectedIcon);
        setShowModal(true);
    };
    
    // Close icon selector modal
    const closeIconSelector = () => {
        setSelectedIconTemp(null);
        setSearchTerm('');
        setShowModal(false);
    };
    
    // Handle confirm icon selection
    const handleConfirmSelection = () => {
        onSelectIcon(selectedIconTemp);
        closeIconSelector();
    };
    
    // Find the currently selected icon from the list
    const findSelectedIcon = () => {
        if (!selectedIcon) return null;
        
        // Try to match the icon by comparing the type name
        const selectedType = selectedIcon.type?.name;
        return availableIcons.find(icon => 
            icon.component.type?.name === selectedType
        );
    };
    
    // Get display for the selected icon
    const selectedIconDisplay = findSelectedIcon() || { name: 'Ninguno', component: null };
    
    return (
        <>
            <div className="icon-selector">
                <Button 
                    variant="outline-secondary" 
                    onClick={openIconSelector}
                    className="d-flex justify-content-between align-items-center w-100"
                >
                    <div className="d-flex align-items-center">
                        {selectedIcon ? (
                            <>
                                <div className={`icon-preview bg-${variant} bg-opacity-10 me-2`}>
                                    {React.cloneElement(selectedIcon, { size: 20 })}
                                </div>
                                <span>{selectedIconDisplay.name}</span>
                            </>
                        ) : (
                            <>
                                <Settings size={20} className="me-2" />
                                <span>Seleccionar ícono</span>
                            </>
                        )}
                    </div>
                    <span className="small text-muted">Cambiar</span>
                </Button>
            </div>
            
            <Modal 
                show={showModal} 
                onHide={closeIconSelector} 
                size="lg" 
                centered
                className="icon-selector-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Seleccionar Ícono</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-4">
                        <InputGroup.Text>
                            <Search size={18} />
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Buscar íconos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <Button 
                                variant="outline-secondary" 
                                onClick={() => setSearchTerm('')}
                            >
                                <X size={18} />
                            </Button>
                        )}
                    </InputGroup>
                    
                    <div className="icon-grid">
                        <Row xs={3} sm={4} md={6} lg={8} className="g-3">
                            {filteredIcons.map(icon => (
                                <Col key={icon.key}>
                                    <div 
                                        className={`icon-item ${selectedIconTemp && selectedIconTemp.type?.name === icon.component.type?.name ? 'selected' : ''}`}
                                        onClick={() => setSelectedIconTemp(icon.component)}
                                    >
                                        <div className="icon-container">
                                            {icon.component}
                                            {selectedIconTemp && selectedIconTemp.type?.name === icon.component.type?.name && (
                                                <div className="selected-indicator">
                                                    <CheckCircle size={16} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="icon-name">{icon.name}</div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                        
                        {filteredIcons.length === 0 && (
                            <div className="text-center py-4">
                                <Search size={40} className="text-muted mb-2" />
                                <p>No se encontraron íconos que coincidan con "{searchTerm}"</p>
                                <Button 
                                    variant="outline-primary" 
                                    size="sm"
                                    onClick={() => setSearchTerm('')}
                                >
                                    Mostrar todos los íconos
                                </Button>
                            </div>
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={closeIconSelector}>
                        Cancelar
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={handleConfirmSelection}
                        disabled={!selectedIconTemp}
                    >
                        Seleccionar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default IconSelector;
