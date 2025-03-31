import React from 'react';
import { Pagination, Form } from 'react-bootstrap';

/**
 * PaginationControls - Component for handling pagination
 */
const PaginationControls = ({
    currentPage = 1,
    totalPages = 1,
    itemsPerPage = 10,
    totalItems = 0,
    onPageChange,
    onItemsPerPageChange
}) => {
    // Generate page items for pagination
    const getPageItems = () => {
        const items = [];

        // First page
        items.push(
            <Pagination.Item
                key="first"
                active={currentPage === 1}
                onClick={() => onPageChange(1)}
            >
                1
            </Pagination.Item>
        );

        // If there are many pages, add ellipsis
        if (currentPage > 3) {
            items.push(<Pagination.Ellipsis key="ellipsis1" />);
        }

        // Pages around current page
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            if (i <= totalPages && i > 1) {
                items.push(
                    <Pagination.Item
                        key={i}
                        active={currentPage === i}
                        onClick={() => onPageChange(i)}
                    >
                        {i}
                    </Pagination.Item>
                );
            }
        }

        // If there are many pages at the end, add ellipsis
        if (currentPage < totalPages - 2) {
            items.push(<Pagination.Ellipsis key="ellipsis2" />);
        }

        // Last page
        if (totalPages > 1) {
            items.push(
                <Pagination.Item
                    key="last"
                    active={currentPage === totalPages}
                    onClick={() => onPageChange(totalPages)}
                >
                    {totalPages}
                </Pagination.Item>
            );
        }

        return items;
    };

    // Calculate the range of items being displayed
    const indexOfFirstItem = (currentPage - 1) * itemsPerPage + 1;
    const indexOfLastItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div className="d-flex justify-content-between align-items-center mt-3 pagination-controls">
            {/* Items per page selector */}
            <div className="d-flex align-items-center">
                <span className="me-2">Mostrar</span>
                <Form.Select
                    size="sm"
                    value={itemsPerPage}
                    onChange={(e) => onItemsPerPageChange(parseInt(e.target.value))}
                    style={{ width: '70px' }}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </Form.Select>
                <span className="ms-2">por página</span>
            </div>

            {/* Items range display */}
            <div className="text-muted">
                Mostrando {indexOfFirstItem} a {indexOfLastItem} de {totalItems} habitaciones
            </div>

            {/* Pagination controls */}
            <Pagination className="mb-0">
                <Pagination.Prev
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                />

                {getPageItems()}

                <Pagination.Next
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                />
            </Pagination>
        </div>
    );
};

export default PaginationControls;
