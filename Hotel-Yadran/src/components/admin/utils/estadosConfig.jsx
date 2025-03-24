import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

export const TAMAÑO_ICONO = 18;

export const ESTADOS = {
    DISPONIBLE: 'disponible',
    NO_DISPONIBLE: 'no_disponible',
    MANTENIMIENTO: 'mantenimiento'
};

export const LISTA_ESTADOS = [
    { 
        valor: ESTADOS.DISPONIBLE, 
        etiqueta: 'Disponible', 
        IconoComponente: CheckCircle,
        variante: 'success'
    },
    { 
        valor: ESTADOS.NO_DISPONIBLE, 
        etiqueta: 'No Disponible', 
        IconoComponente: XCircle,
        variante: 'danger'
    },
    { 
        valor: ESTADOS.MANTENIMIENTO, 
        etiqueta: 'En Mantenimiento', 
        IconoComponente:XCircle,
        variante: 'warning'
    }
];

export const obtenerEstado = (estado) => {
    const estadoEncontrado = LISTA_ESTADOS.find(e => e.valor === estado) || LISTA_ESTADOS[0];
    const IconoComponente = estadoEncontrado.IconoComponente;
    
    return {
        ...estadoEncontrado,
        icono: <IconoComponente size={TAMAÑO_ICONO} />
    };
};
