import React from 'react';
import { Pagination, Form, Row, Col, Button } from 'react-bootstrap';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Settings } from 'lucide-react';

const PaginationControls = ({ 
    currentPage, 
    totalPages, 
    itemsPerPage, 
    totalItems,
    onPageChange, 
    onItemsPerPageChange 
}) => {
    // Generate page items with a more effective algorithm
    const renderPageItems = () => {
        const pageItems = [];
        const maxVisiblePages = 5; // Max visible page buttons
        
        // Always show first page button
        if (totalPages > 1) {
            pageItems.push(
                <Pagination.Item 
                    key="first"
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                    className="d-none d-sm-block"
                >
                    <ChevronsLeft size={16} />
                </Pagination.Item>
            );
        }
        
        // Previous page button
        pageItems.push(
            <Pagination.Item 
                key="prev"
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
            >
                <ChevronLeft size={16} />
            </Pagination.Item>
        );
        
        // Calculate range of page numbers to display
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        // Adjust startPage if endPage is at maximum
        if (endPage === totalPages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        // Add ellipsis if needed at the beginning
        if (startPage > 1) {
            pageItems.push(
                <Pagination.Ellipsis key="ellipsis1" disabled className="d-none d-sm-block" />
            );
        }
        
        // Add page number buttons
        for (let page = startPage; page <= endPage; page++) {
            pageItems.push(
                <Pagination.Item 
                    key={page} 
                    active={currentPage === page}
                    onClick={() => onPageChange(page)}
                    className="d-none d-sm-block"
                >
                    {page}
                </Pagination.Item>
            );
        }
        
        // Add ellipsis if needed at the end
        if (endPage < totalPages) {
            pageItems.push(
                <Pagination.Ellipsis key="ellipsis2" disabled className="d-none d-sm-block" />
            );
        }
        
        // Next page button
        pageItems.push(
            <Pagination.Item 
                key="next"
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
            >
                <ChevronRight size={16} />
            </Pagination.Item>
        );
        
        // Always show last page button
        if (totalPages > 1) {
            pageItems.push(
                <Pagination.Item 
                    key="last"
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="d-none d-sm-block"
                >
                    <ChevronsRight size={16} />
                </Pagination.Item>
            );
        }
        
        return pageItems;
    };
    
    return (
        <div className="pagination-container mt-4 p-3 bg-light rounded-3 border shadow-sm">
            <Row className="align-items-center">
                <Col xs={12} md={6} className="mb-3 mb-md-0 d-flex align-items-center">
                    <div className="pagination-settings rounded-3 border bg-white p-2 d-flex align-items-center shadow-sm">
                        <Settings size={14} className="text-muted ms-2 me-1" />
                        <span className="me-2 text-muted d-none d-sm-inline">Mostrar</span>
                        <Form.Select 
                            size="sm"
                            value={itemsPerPage}
                            onChange={onItemsPerPageChange}
                            className="shadow-none me-2 border-0"
                            style={{ width: "60px" }}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </Form.Select>
                        <span className="text-muted">elementos</span>
                    </div>
                    
                    <div className="pagination-info text-muted ms-3 fw-medium fs-sm">
                        <span className="d-none d-md-inline">Mostrando </span>
                        <span className="text-primary fw-bold">{Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}-{Math.min(currentPage * itemsPerPage, totalItems)}</span>
                        <span className="ms-1">de <span className="text-primary fw-bold">{totalItems}</span></span>
                    </div>
                </Col>
                
                <Col xs={12} md={6} className="d-flex justify-content-md-end justify-content-center">
                    <div className="pagination-controls rounded-3 border bg-white p-1 shadow-sm">
                        <Pagination className="m-0 flex-nowrap">
                            {renderPageItems()}
                        </Pagination>
                        
                        <div className="d-sm-none d-flex align-items-center text-muted mx-3">
                            <span className="mx-2 fw-medium">Página {currentPage} de {totalPages}</span>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default PaginationControls;
