import React from 'react';
import { CheckCircle, XCircle, Wrench, FilePlus, CirclePlus, X } from 'lucide-react';

export const TAMAÑO_ICONO = 18;

export const ESTADOS = {

    DISPONIBLE: 'Disponible',
    NO_DISPONIBLE: 'No disponible',
    MANTENIMIENTO: 'Mantenimiento',
    RESERVADO: 'Reservado',
    CANCELADO: 'Reserva cancelada',
    EN_CURSO: 'En Curso',
    EN_PROCESO: 'En Proceso',
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
