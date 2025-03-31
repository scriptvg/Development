import React from 'react';
import { Nav, Badge } from 'react-bootstrap';
import { ESTADOS } from '../../../../utils/estadosConfig.jsx';

/**
 * TabNavigator - Component for navigating between different room states
 */
const TabNavigator = ({ activeTab, onTabChange, tabCounts }) => {
    // Make sure tabCounts has default values to prevent errors
    const counts = tabCounts || {
        all: 0,
        [ESTADOS.DISPONIBLE]: 0,
        [ESTADOS.RESERVADO]: 0,
        [ESTADOS.MANTENIMIENTO]: 0,
        [ESTADOS.NO_DISPONIBLE]: 0,
        archivada: 0
    };

    // Get the appropriate class and background color for the active tab
    const getTabClass = (tabId) => {
        return tabId === activeTab
            ? "active bg-primary text-white"
            : "text-dark";
    };

    return (
        <Nav variant="tabs" className="mb-4 room-tabs border-0">
            <Nav.Item>
                <Nav.Link
                    className={`d-flex align-items-center gap-2 ${getTabClass('todos')}`}
                    onClick={() => onTabChange('todos')}
                >
                    Todas
                    <Badge bg={activeTab === 'todos' ? 'light' : 'primary'}
                        text={activeTab === 'todos' ? 'primary' : 'white'}>
                        {counts.all}
                    </Badge>
                </Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link
                    className={`d-flex align-items-center gap-2 ${getTabClass(ESTADOS.DISPONIBLE)}`}
                    onClick={() => onTabChange(ESTADOS.DISPONIBLE)}
                >
                    Disponibles
                    <Badge bg={activeTab === ESTADOS.DISPONIBLE ? 'light' : 'success'}
                        text={activeTab === ESTADOS.DISPONIBLE ? 'success' : 'white'}>
                        {counts[ESTADOS.DISPONIBLE]}
                    </Badge>
                </Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link
                    className={`d-flex align-items-center gap-2 ${getTabClass(ESTADOS.RESERVADO)}`}
                    onClick={() => onTabChange(ESTADOS.RESERVADO)}
                >
                    Reservadas
                    <Badge bg={activeTab === ESTADOS.RESERVADO ? 'light' : 'warning'}
                        text={activeTab === ESTADOS.RESERVADO ? 'warning' : 'white'}>
                        {counts[ESTADOS.RESERVADO]}
                    </Badge>
                </Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link
                    className={`d-flex align-items-center gap-2 ${getTabClass(ESTADOS.MANTENIMIENTO)}`}
                    onClick={() => onTabChange(ESTADOS.MANTENIMIENTO)}
                >
                    Mantenimiento
                    <Badge bg={activeTab === ESTADOS.MANTENIMIENTO ? 'light' : 'info'}
                        text={activeTab === ESTADOS.MANTENIMIENTO ? 'info' : 'white'}>
                        {counts[ESTADOS.MANTENIMIENTO]}
                    </Badge>
                </Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link
                    className={`d-flex align-items-center gap-2 ${getTabClass(ESTADOS.NO_DISPONIBLE)}`}
                    onClick={() => onTabChange(ESTADOS.NO_DISPONIBLE)}
                >
                    No disponibles
                    <Badge bg={activeTab === ESTADOS.NO_DISPONIBLE ? 'light' : 'secondary'}
                        text={activeTab === ESTADOS.NO_DISPONIBLE ? 'secondary' : 'white'}>
                        {counts[ESTADOS.NO_DISPONIBLE]}
                    </Badge>
                </Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link
                    className={`d-flex align-items-center gap-2 ${getTabClass('archivada')}`}
                    onClick={() => onTabChange('archivada')}
                >
                    Archivadas
                    <Badge bg={activeTab === 'archivada' ? 'light' : 'dark'}
                        text={activeTab === 'archivada' ? 'dark' : 'white'}>
                        {counts.archivada}
                    </Badge>
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
};

export default TabNavigator;
