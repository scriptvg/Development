import React from 'react';

// Rate types
export const RATE_TYPES = {
    STANDARD: 'standard',
    SPECIAL: 'special',
    SEASONAL: 'seasonal',
    WEEKEND: 'weekend',
    HOLIDAY: 'holiday'
};

// Rate types list for UI
export const RATE_TYPES_LIST = [
    { valor: RATE_TYPES.STANDARD, etiqueta: 'Tarifa Estándar' },
    { valor: RATE_TYPES.SPECIAL, etiqueta: 'Tarifa Especial' },
    { valor: RATE_TYPES.SEASONAL, etiqueta: 'Tarifa de Temporada' },
    { valor: RATE_TYPES.WEEKEND, etiqueta: 'Tarifa de Fin de Semana' },
    { valor: RATE_TYPES.HOLIDAY, etiqueta: 'Tarifa Festivos' }
];

// Default additional person structure
export const DEFAULT_ADDITIONAL_PERSON_RATE = {
    secondAdult: 0,
    thirdAdult: 35,
    fourthAdult: 35,
    firstChild: 0,
    secondChild: 0,
    thirdChild: 0,
};

// Function to create a default rate object
export const createDefaultRate = (basePrice = 0) => ({
    name: 'Standard Rate',
    type: RATE_TYPES.STANDARD,
    basePrice: basePrice,
    includesAdults: 1,
    includesChildren: 0,
    additionalPerson: { ...DEFAULT_ADDITIONAL_PERSON_RATE },
    // Default daily availability and prices
    dailyRates: createEmptyDailyRates()
});

// Function to create empty daily rates for a week
export const createEmptyDailyRates = (startDate = null) => {
    // If no start date provided, use current date
    const start = startDate || new Date();
    
    // Create 7 days of rates
    const dailyRates = {};
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(start);
        currentDate.setDate(start.getDate() + i);
        
        // Format date as YYYY-MM-DD
        const dateKey = currentDate.toISOString().split('T')[0];
        
        // Create empty rate for this date
        dailyRates[dateKey] = {
            available: true,
            basePrice: null, // null means use the default base price
            additionalPerson: {
                secondAdult: null, // null means use the default additional person rate
                thirdAdult: null,
                fourthAdult: null,
                firstChild: null,
                secondChild: null,
                thirdChild: null
            }
        };
    }
    
    return dailyRates;
};

// Format a rate for display
export const formatRateForDisplay = (rate) => {
    if (!rate) return 'N/A';
    
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(rate);
};

export default {
    RATE_TYPES,
    RATE_TYPES_LIST,
    DEFAULT_ADDITIONAL_PERSON_RATE,
    createDefaultRate,
    createEmptyDailyRates,
    formatRateForDisplay
};
