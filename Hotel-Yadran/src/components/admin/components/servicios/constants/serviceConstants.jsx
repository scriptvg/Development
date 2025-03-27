import React from 'react';
import { 
    Wifi, 
    Coffee, 
    AirVent, 
    Tv, 
    Bath, 
    UtensilsCrossed, 
    Car, 
    Pool, 
    Dumbbell
} from 'lucide-react';

export const TAMAÑOS = {
    ICONO_PEQUEÑO: 14,
    ICONO_NORMAL: 18,
    ICONO_GRANDE: 22,
    ICONO_EXTRA: 28
};

export const TIPOS_SERVICIOS = {
    HABITACION: 'habitacion',
    HOTEL: 'hotel',
    RESTAURANT: 'restaurant',
    OTROS: 'otros'
};

export const ICONOS_PREDEFINIDOS = [
    { id: 'wifi', component: <Wifi /> },
    { id: 'coffee', component: <Coffee /> },
    { id: 'airvent', component: <AirVent /> },
    { id: 'tv', component: <Tv /> },
    { id: 'bath', component: <Bath /> },
    { id: 'food', component: <UtensilsCrossed /> },
    { id: 'car', component: <Car /> },
    { id: 'pool', component: <Pool /> },
    { id: 'gym', component: <Dumbbell /> },
];

export const obtenerIconoPorId = (id) => {
    const iconoEncontrado = ICONOS_PREDEFINIDOS.find(icono => icono.id === id);
    return iconoEncontrado ? iconoEncontrado.component : <Coffee />;
};