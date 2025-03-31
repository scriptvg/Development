import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, InputGroup, Badge, Nav } from 'react-bootstrap';
import { Search, Check, X } from 'lucide-react';

// Importar iconos de Font Awesome de manera segura
import {
    FaWifi, FaSnowflake, FaTv, FaWater, FaBath, FaCoffee,
    FaSwimmingPool, FaHome, FaWind, FaWineGlass, FaCar, FaPaw,
    FaBiking, FaBed, FaUtensils, FaLaptop, FaMoneyBillWave,
    FaParking, FaShower, FaClock, FaUmbrella, FaGlassMartini,
    FaKey, FaDumbbell, FaSpa, FaTemperatureHigh, FaPhone,
    FaConciergeBell, FaLock, FaShuttleVan, FaChair, FaHeart,
    FaHands, FaDoorOpen, FaWheelchair, FaBaby, FaSmoking,
    FaSmokingBan, FaGlassCheers, FaMusic, FaCocktail, FaSun,
    FaMoon, FaMountain, FaTree, FaUmbrellaBeach, FaFish,
    FaLightbulb, FaTemperatureLow, FaFan, FaUserShield, FaPrint,
    FaShieldAlt, FaSatelliteDish, FaToolbox, FaSuitcase, FaFirstAid
} from 'react-icons/fa';

// Definir el objeto de iconos disponibles
const availableIcons = {
    // Font Awesome Icons - Solo incluimos FontAwesome para simplificar
    FaWifi, FaSnowflake, FaTv, FaWater, FaBath, FaCoffee,
    FaSwimmingPool, FaHome, FaWind, FaWineGlass, FaCar, FaPaw,
    FaBiking, FaBed, FaUtensils, FaLaptop, FaMoneyBillWave,
    FaParking, FaShower, FaClock, FaUmbrella, FaGlassMartini,
    FaKey, FaDumbbell, FaSpa, FaTemperatureHigh, FaPhone,
    FaConciergeBell, FaLock, FaShuttleVan, FaChair, FaHeart,
    FaHands, FaDoorOpen, FaWheelchair, FaBaby, FaSmoking,
    FaSmokingBan, FaGlassCheers, FaMusic, FaCocktail, FaSun,
    FaMoon, FaMountain, FaTree, FaUmbrellaBeach, FaFish,
    FaLightbulb, FaTemperatureLow, FaFan, FaUserShield, FaPrint,
    FaShieldAlt, FaSatelliteDish, FaToolbox, FaSuitcase, FaFirstAid
};

// Categorías de iconos para facilitar la navegación
const iconCategories = {
    'Habitación': [
        'FaBed', 'FaChair', 'FaDoorOpen', 'FaLightbulb', 'FaFan'
    ],
    'Comodidades': [
        'FaWifi', 'FaSnowflake', 'FaTv', 'FaLaptop', 'FaSatelliteDish',
        'FaPhone', 'FaPrint'
    ],
    'Baño & Spa': [
        'FaBath', 'FaShower', 'FaWater', 'FaSpa', 'FaHands', 'FaTemperatureHigh'
    ],
    'Comida & Bebida': [
        'FaCoffee', 'FaUtensils', 'FaWineGlass', 'FaGlassMartini', 'FaCocktail', 'FaGlassCheers'
    ],
    'Actividades': [
        'FaSwimmingPool', 'FaBiking', 'FaDumbbell', 'FaMusic'
    ],
    'Transporte': [
        'FaCar', 'FaParking', 'FaShuttleVan'
    ],
    'Entorno': [
        'FaHome', 'FaWind', 'FaUmbrella', 'FaSun', 'FaMoon', 'FaMountain', 'FaTree', 'FaUmbrellaBeach',
        'FaTemperatureLow'
    ],
    'Servicios': [
        'FaConciergeBell', 'FaMoneyBillWave', 'FaUserShield', 'FaShieldAlt', 'FaToolbox',
        'FaSuitcase', 'FaFirstAid'
    ],
    'Personas & Mascotas': [
        'FaPaw', 'FaWheelchair', 'FaBaby', 'FaSmoking', 'FaSmokingBan'
    ]
};

/**
 * IconSelector - Componente mejorado para seleccionar un icono
 */
const IconSelector = ({ selectedIcon, onSelectIcon, variant = 'primary' }) => {
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('Todos');

    // Filtrar íconos por el término de búsqueda y categoría
    const getFilteredIcons = () => {
        let iconKeys = Object.keys(availableIcons);

        // Filtrar por categoría si no es "Todos"
        if (activeCategory !== 'Todos') {
            iconKeys = iconCategories[activeCategory] || [];
        }

        // Filtrar por término de búsqueda
        if (searchTerm) {
            return iconKeys.filter(iconName =>
                iconName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return iconKeys;
    };

    // Obtener el componente de ícono actual
    const getCurrentIcon = () => {
        if (typeof selectedIcon === 'string' && availableIcons[selectedIcon]) {
            const IconComponent = availableIcons[selectedIcon];
            return <IconComponent size={24} />;
        }

        // Si no hay ícono seleccionado o es inválido, mostrar un ícono predeterminado
        return <FaBed size={24} />;
    };

    const filteredIcons = getFilteredIcons();

    return (
        <>
            <div className="d-flex align-items-center">
                <div
                    className="icon-preview me-2 d-flex align-items-center justify-content-center"
                    style={{
                        width: '46px',
                        height: '46px',
                        backgroundColor: `var(--bs-${variant})15`,
                        borderRadius: '8px',
                        border: `2px solid var(--bs-${variant})25`
                    }}
                >
                    {getCurrentIcon()}
                </div>
                <div className="flex-grow-1">
                    <Form.Control
                        type="text"
                        value={selectedIcon || ''}
                        placeholder="No hay ícono seleccionado"
                        disabled
                        className="bg-white"
                    />
                </div>
                <Button
                    variant="outline-primary"
                    className="ms-2 d-flex align-items-center"
                    onClick={() => setShowModal(true)}
                >
                    Seleccionar
                </Button>
            </div>

            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                size="xl"
                centered
                className="icon-selector-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div className="d-flex align-items-center">
                            <div className="me-2">Seleccionar ícono</div>
                            {selectedIcon && (
                                <Badge
                                    bg="light"
                                    text="dark"
                                    className="px-2 py-1 d-flex align-items-center"
                                >
                                    {getCurrentIcon()}
                                    <span className="ms-1">{selectedIcon}</span>
                                </Badge>
                            )}
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Buscador de iconos */}
                    <InputGroup className="mb-3 shadow-sm">
                        <InputGroup.Text className="bg-light">
                            <Search size={18} />
                        </InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Buscar iconos por nombre..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                            className="border-start-0"
                        />
                        {searchTerm && (
                            <Button
                                variant="outline-secondary"
                                onClick={() => setSearchTerm('')}
                            >
                                <X size={16} />
                            </Button>
                        )}
                    </InputGroup>

                    {/* Navegación por categorías */}
                    <Nav
                        variant="pills"
                        className="flex-nowrap mb-3 overflow-auto pb-2 category-nav"
                        style={{ whiteSpace: 'nowrap' }}
                    >
                        <Nav.Item>
                            <Nav.Link
                                active={activeCategory === 'Todos'}
                                onClick={() => setActiveCategory('Todos')}
                                className="icon-category-link"
                            >
                                Todos
                            </Nav.Link>
                        </Nav.Item>
                        {Object.keys(iconCategories).map(category => (
                            <Nav.Item key={category}>
                                <Nav.Link
                                    active={activeCategory === category}
                                    onClick={() => setActiveCategory(category)}
                                    className="icon-category-link"
                                >
                                    {category}
                                </Nav.Link>
                            </Nav.Item>
                        ))}
                    </Nav>

                    {/* Contenedor de iconos */}
                    <div className="icons-container mt-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {filteredIcons.length === 0 ? (
                            <div className="text-center my-5 text-muted">
                                <Search size={48} className="mb-3 opacity-50" />
                                <p>No se encontraron íconos que coincidan con la búsqueda</p>
                                <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    onClick={() => {
                                        setSearchTerm('');
                                        setActiveCategory('Todos');
                                    }}
                                >
                                    Limpiar búsqueda
                                </Button>
                            </div>
                        ) : (
                            <Row className="g-3 icon-grid">
                                {filteredIcons.map(iconName => {
                                    const IconComponent = availableIcons[iconName];
                                    const isSelected = selectedIcon === iconName;

                                    return (
                                        <Col xs={4} sm={3} md={2} key={iconName}>
                                            <div
                                                className={`icon-item text-center p-2 rounded ${isSelected ? 'selected' : ''}`}
                                                onClick={() => {
                                                    onSelectIcon(iconName);
                                                    setShowModal(false);
                                                }}
                                            >
                                                <div className="position-relative mb-2">
                                                    <div
                                                        className="d-flex align-items-center justify-content-center mx-auto"
                                                        style={{
                                                            width: '48px',
                                                            height: '48px',
                                                            backgroundColor: `var(--bs-${variant})20`,
                                                            borderRadius: '8px',
                                                            border: isSelected ? `2px solid var(--bs-${variant})` : `1px solid var(--bs-${variant})20`
                                                        }}
                                                    >
                                                        <IconComponent size={24} color={isSelected ? `var(--bs-${variant})` : "#555"} />
                                                    </div>
                                                    {isSelected && (
                                                        <div
                                                            className="position-absolute bottom-0 end-0 d-flex align-items-center justify-content-center"
                                                            style={{
                                                                width: '18px',
                                                                height: '18px',
                                                                backgroundColor: 'var(--bs-success)',
                                                                borderRadius: '50%',
                                                                transform: 'translate(25%, 25%)',
                                                                border: '2px solid white'
                                                            }}
                                                        >
                                                            <Check size={10} color="white" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div
                                                    className={`small text-truncate ${isSelected ? 'fw-semibold text-primary' : 'text-muted'}`}
                                                    style={{ fontSize: '10px' }}
                                                >
                                                    {iconName}
                                                </div>
                                            </div>
                                        </Col>
                                    );
                                })}
                            </Row>
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer className="justify-content-between">
                    <div>
                        <small className="text-muted">Mostrando {filteredIcons.length} de {Object.keys(availableIcons).length} iconos disponibles</small>
                    </div>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default IconSelector;
