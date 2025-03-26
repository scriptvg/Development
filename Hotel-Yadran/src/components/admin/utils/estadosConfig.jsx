import React from 'react';
import { CheckCircle, XCircle, Trash2, Clock, Brush, Calendar, Search } from 'lucide-react';

export const TAMAÑO_ICONO = 18;

export const ESTADOS = {
    DISPONIBLE: 'disponible',
    NO_DISPONIBLE: 'no_disponible',
    MANTENIMIENTO: 'mantenimiento',
    LIMPIEZA: 'limpieza',
    RESERVADA: 'reservada',
    INSPECCION: 'inspeccion'
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
        IconoComponente: Trash2,
        variante: 'warning'
    },
    { 
        valor: ESTADOS.LIMPIEZA, 
        etiqueta: 'En Limpieza', 
        IconoComponente: Brush,
        variante: 'info'
    },
    { 
        valor: ESTADOS.RESERVADA, 
        etiqueta: 'Reservada', 
        IconoComponente: Calendar,
        variante: 'primary'
    },
    { 
        valor: ESTADOS.INSPECCION, 
        etiqueta: 'En Inspección', 
        IconoComponente: Search,
        variante: 'secondary'
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
