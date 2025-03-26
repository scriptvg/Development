import React from 'react';
<<<<<<< HEAD
import { CheckCircle, XCircle, Trash2, Clock, Brush, Calendar, Search } from 'lucide-react';
=======
import { CheckCircle, XCircle, Wrench, FilePlus, CirclePlus, X } from 'lucide-react';
>>>>>>> 6e29e2f8c1b2cae5df83b9a12f1af3577d4b77c5

export const TAMAÑO_ICONO = 18;

export const ESTADOS = {
<<<<<<< HEAD
    DISPONIBLE: 'disponible',
    NO_DISPONIBLE: 'no_disponible',
    MANTENIMIENTO: 'mantenimiento',
    LIMPIEZA: 'limpieza',
    RESERVADA: 'reservada',
    INSPECCION: 'inspeccion'
=======
    DISPONIBLE: 'Disponible',
    NO_DISPONIBLE: 'No disponible',
    MANTENIMIENTO: 'Mantenimiento',
    RESERVADO: 'Reservado',
    CANCELADO: 'Reserva cancelada',
    EN_CURSO: 'En Curso',
    EN_PROCESO: 'En Proceso',
>>>>>>> 6e29e2f8c1b2cae5df83b9a12f1af3577d4b77c5
};

export const LISTA_ESTADOS = [
    { 
        valor: ESTADOS.DISPONIBLE, 
        etiqueta: 'Disponible', 
        IconoComponente: CheckCircle,
        variante: 'success',
        icono: <CheckCircle size={TAMAÑO_ICONO} />
    },
    { 
        valor: ESTADOS.NO_DISPONIBLE, 
        etiqueta: 'No Disponible', 
        IconoComponente: XCircle,
        variante: 'danger',
        icono: <XCircle size={TAMAÑO_ICONO} />
    },
    { 
        valor: ESTADOS.MANTENIMIENTO, 
        etiqueta: 'En Mantenimiento', 
<<<<<<< HEAD
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
=======
        IconoComponente: Wrench,
        variante: 'warning',
        icono: <Wrench size={TAMAÑO_ICONO} />
    },
    {
        valor: ESTADOS.RESERVADO, 
        etiqueta: 'Reservado', 
        IconoComponente: FilePlus,
        variante: 'warning',
        icono: <FilePlus size={TAMAÑO_ICONO} />
    },
    {
        valor: ESTADOS.CANCELADO, 
        etiqueta: 'Reserva cancelada', 
        IconoComponente: X,
        variante: 'warning',
        icono: <X size={TAMAÑO_ICONO} />
    },
    {
        valor: ESTADOS.EN_CURSO, 
        etiqueta: 'En proceso', 
        IconoComponente: CirclePlus,
        variante: 'info',
        icono: <CirclePlus size={TAMAÑO_ICONO} />
>>>>>>> 6e29e2f8c1b2cae5df83b9a12f1af3577d4b77c5
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
