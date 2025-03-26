import React from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import { Search, X } from 'lucide-react';
import './searchFilter.css';

/**
 * SearchFilter - A reusable search input component
 * 
 * @param {Object} props
 * @param {string} props.placeholder - Placeholder text for the search input
 * @param {string} props.value - Current search value
 * @param {Function} props.onChange - Callback when search value changes
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.showClearButton - Whether to show the clear button
 */
const SearchFilter = ({ 
    placeholder = "Buscar...", 
    value = '', 
    onChange, 
    className = '',
    showClearButton = true
}) => {
    const handleChange = (e) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    const handleClear = () => {
        if (onChange) {
            onChange('');
        }
    };

    return (
        <InputGroup className={`search-filter ${className}`}>
            <InputGroup.Text className="bg-white border-end-0 search-icon-container">
                <Search size={18} className="text-muted search-icon" />
            </InputGroup.Text>
            <Form.Control
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                className="border-start-0 shadow-none search-input"
                aria-label="Search"
            />
            {showClearButton && value && (
                <InputGroup.Text 
                    className="bg-white border-start-0 clear-button-container"
                    onClick={handleClear}
                >
                    <X size={16} className="text-muted clear-button" />
                </InputGroup.Text>
            )}
        </InputGroup>
    );
};

export default SearchFilter;
