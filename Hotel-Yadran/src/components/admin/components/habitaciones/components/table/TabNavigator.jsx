import React from 'react';
import { Nav } from 'react-bootstrap';
import { CheckCircle, XCircle, Wrench, FilePlus, Layers, Archive } from 'lucide-react';
import { ESTADOS } from '../../../../utils/estadosConfig.jsx';
import '../../styles/paginationStyles.css';

const TabNavigator = ({ activeTab, onTabChange, tabCounts }) => {
    // Tab configuration using the correct ESTADOS from estadosConfig.jsx
    const tabs = [
        { 
            id: 'todos', 
            label: 'Todas', 
            icon: <Layers size={18} />, 
            count: tabCounts.all || 0 
        },
        { 
            id: ESTADOS.DISPONIBLE, 
            label: 'Disponibles', 
            icon: <CheckCircle size={18} className="text-success" />, 
            count: tabCounts.disponible || 0,
            className: 'text-success'
        },
        { 
            id: ESTADOS.RESERVADO, 
            label: 'Reservadas', 
            icon: <FilePlus size={18} className="text-warning" />, 
            count: tabCounts.reservado || 0,
            className: 'text-warning'
        },
        { 
            id: ESTADOS.MANTENIMIENTO, 
            label: 'En Mantenimiento', 
            icon: <Wrench size={18} className="text-danger" />, 
            count: tabCounts.mantenimiento || 0,
            className: 'text-danger'
        },
        { 
            id: ESTADOS.NO_DISPONIBLE, 
            label: 'No Disponibles', 
            icon: <XCircle size={18} className="text-secondary" />, 
            count: tabCounts.noDisponible || 0,
            className: 'text-secondary'
        },
        { 
            id: 'archivada', 
            label: 'Archivadas', 
            icon: <Archive size={18} className="text-muted" />, 
            count: tabCounts.archivada || 0,
            className: 'text-muted'
        }
    ];

    return (
        <Nav 
            variant="tabs" 
            className="custom-tabs mb-4 border-0"
            activeKey={activeTab}
        >
            {tabs.map(tab => (
                <Nav.Item key={tab.id}>
                    <Nav.Link 
                        eventKey={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`d-flex align-items-center gap-2 ${tab.className || ''}`}
                    >
                        {React.cloneElement(tab.icon, { key: `icon-${tab.id}` })}
                        <span key={`label-${tab.id}`}>{tab.label}</span>
                        <span key={`badge-${tab.id}`} className="badge bg-light text-dark rounded-pill ms-1">
                            {tab.count}
                        </span>
                    </Nav.Link>
                </Nav.Item>
            ))}
        </Nav>
    );
};

export default TabNavigator;
