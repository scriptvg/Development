import React, { useState } from 'react';
import { 
    Card, 
    Accordion, 
    Form, 
    Button, 
    ListGroup, 
    Dropdown, 
    InputGroup, 
    Row, 
    Col,
    Badge
} from 'react-bootstrap';
import { 
    SlidersHorizontal, 
    Table2, 
    Eye, 
    EyeOff, 
    ArrowUpDown, 
    Download, 
    Printer, 
    RefreshCw, 
    Save, 
    Search,
    Check
} from 'lucide-react';
import './tableSettingsPanel.css';

/**
 * Excel-like table settings panel component
 * 
 * @param {Object} props Component props
 * @param {Object} props.columns Information about all available columns
 * @param {Function} props.onColumnVisibilityChange Callback when visibility changes
 * @param {Function} props.onSortChange Callback when sort changes
 * @param {Function} props.onReset Callback to reset table settings
 * @param {Function} props.onExport Callback to export table data
 * @param {Function} props.onPrint Callback to print table
 * @param {Object} props.currentSettings Current settings object
 */
const TableSettingsPanel = ({ 
    columns = {},
    onColumnVisibilityChange,
    onSortChange,
    onReset,
    onExport,
    onPrint,
    currentSettings
}) => {
    const [showColumnSettings, setShowColumnSettings] = useState(false);
    const [activeKeys, setActiveKeys] = useState(['0']);
    
    // Convert columns object to array for easier mapping
    const columnsList = Object.keys(columns).map(key => ({
        id: key,
        ...columns[key]
    }));
    
    // Toggle a single column visibility
    const toggleColumn = (columnId) => {
        if (onColumnVisibilityChange) {
            onColumnVisibilityChange(columnId, !currentSettings.visibleColumns[columnId]);
        }
    };
    
    // Toggle all columns visibility
    const toggleAllColumns = (visible) => {
        const newVisibility = {};
        
        // Set all columns to the specified visibility
        columnsList.forEach(column => {
            newVisibility[column.id] = visible;
        });
        
        if (onColumnVisibilityChange) {
            onColumnVisibilityChange(newVisibility, true);
        }
    };
    
    // Set sort for a column
    const setColumnSort = (columnId, direction) => {
        if (onSortChange) {
            onSortChange(columnId, direction);
        }
    };

    // Handle accordion toggle
    const handleAccordionToggle = (eventKey) => {
        setActiveKeys(prevKeys => {
            if (prevKeys.includes(eventKey)) {
                return prevKeys.filter(key => key !== eventKey);
            } else {
                return [...prevKeys, eventKey];
            }
        });
    };
    
    return (
        <div className="table-settings mb-3">
            <div className="d-flex align-items-center mb-2">
                <div className="flex-grow-1">
                    <h5 className="mb-0 text-primary d-flex align-items-center">
                        <SlidersHorizontal size={16} className="me-2" />
                        Configuración de tabla
                    </h5>
                    <p className="text-muted small mb-0">Personaliza la visualización de la tabla</p>
                </div>
                <div>
                    <Button 
                        variant="outline-secondary" 
                        size="sm"
                        onClick={() => setShowColumnSettings(!showColumnSettings)}
                        className="d-flex align-items-center gap-1"
                    >
                        <Table2 size={14} />
                        {showColumnSettings ? 'Ocultar opciones' : 'Mostrar opciones'}
                    </Button>
                </div>
            </div>
            
            {showColumnSettings && (
                <Card className="shadow-sm border-0 mt-3">
                    <Card.Body className="p-0">
                        <Accordion activeKey={activeKeys}>
                            {/* Columns Visibility Panel */}
                            <Accordion.Item eventKey="0">
                                <Accordion.Header 
                                    onClick={() => handleAccordionToggle('0')}
                                >
                                    <span className="d-flex align-items-center">
                                        <Eye size={16} className="me-2" />
                                        Columnas visibles
                                    </span>
                                </Accordion.Header>
                                <Accordion.Body className="py-2">
                                    <Row className="mb-2 align-items-center">
                                        <Col>
                                            <Form.Text>Selecciona las columnas que deseas mostrar en la tabla</Form.Text>
                                        </Col>
                                        <Col xs="auto">
                                            <Button 
                                                variant="outline-primary" 
                                                size="sm" 
                                                onClick={() => toggleAllColumns(true)}
                                                className="me-1 py-1 px-2"
                                            >
                                                Mostrar todo
                                            </Button>
                                            <Button 
                                                variant="outline-secondary" 
                                                size="sm" 
                                                onClick={() => toggleAllColumns(false)}
                                                className="py-1 px-2"
                                            >
                                                Ocultar todo
                                            </Button>
                                        </Col>
                                    </Row>
                                    
                                    <ListGroup variant="flush" className="column-list">
                                        {columnsList.map(column => (
                                            <ListGroup.Item 
                                                key={column.id}
                                                className="d-flex justify-content-between align-items-center py-2 px-3"
                                            >
                                                <div className="d-flex align-items-center">
                                                    <Form.Check
                                                        type="switch"
                                                        id={`column-${column.id}`}
                                                        checked={currentSettings.visibleColumns[column.id] ?? true}
                                                        onChange={() => toggleColumn(column.id)}
                                                        label={column.label}
                                                    />
                                                </div>
                                                <Dropdown align="end">
                                                    <Dropdown.Toggle 
                                                        variant="light" 
                                                        size="sm"
                                                        className="btn-icon no-arrow"
                                                    >
                                                        <ArrowUpDown size={14} />
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item 
                                                            onClick={() => setColumnSort(column.id, 'asc')}
                                                            active={currentSettings.sortBy === column.id && currentSettings.sortDirection === 'asc'}
                                                        >
                                                            <div className="d-flex align-items-center gap-2">
                                                                <span>Orden ascendente</span>
                                                                {currentSettings.sortBy === column.id && currentSettings.sortDirection === 'asc' && (
                                                                    <Check size={14} className="text-primary ms-2" />
                                                                )}
                                                            </div>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item 
                                                            onClick={() => setColumnSort(column.id, 'desc')}
                                                            active={currentSettings.sortBy === column.id && currentSettings.sortDirection === 'desc'}
                                                        >
                                                            <div className="d-flex align-items-center gap-2">
                                                                <span>Orden descendente</span>
                                                                {currentSettings.sortBy === column.id && currentSettings.sortDirection === 'desc' && (
                                                                    <Check size={14} className="text-primary ms-2" />
                                                                )}
                                                            </div>
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                            
                            {/* Data Export & Actions Panel */}
                            <Accordion.Item eventKey="1">
                                <Accordion.Header 
                                    onClick={() => handleAccordionToggle('1')}
                                >
                                    <span className="d-flex align-items-center">
                                        <Download size={16} className="me-2" />
                                        Exportar y acciones
                                    </span>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <div className="d-flex flex-wrap gap-2">
                                        <Button 
                                            variant="outline-success" 
                                            size="sm"
                                            onClick={onExport}
                                            className="d-flex align-items-center gap-1"
                                        >
                                            <Download size={14} />
                                            Exportar a Excel
                                        </Button>
                                        <Button 
                                            variant="outline-secondary" 
                                            size="sm"
                                            onClick={onPrint}
                                            className="d-flex align-items-center gap-1"
                                        >
                                            <Printer size={14} />
                                            Imprimir
                                        </Button>
                                        <Button 
                                            variant="outline-danger" 
                                            size="sm"
                                            onClick={onReset}
                                            className="d-flex align-items-center gap-1"
                                        >
                                            <RefreshCw size={14} />
                                            Restablecer
                                        </Button>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
};

export default TableSettingsPanel;
