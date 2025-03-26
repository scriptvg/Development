import React from 'react';
import { Wifi, AirVent, Tv, Bath, Bed } from 'lucide-react';
import { GiPalmTree } from 'react-icons/gi';

export const TAMAÑOS = {
    ICONO_PEQUEÑO: 14,
    ICONO_NORMAL: 18,
    ICONO_GRANDE: 22,
    ICONO_EXTRA: 28
};

export const SERVICIOS = {
    WIFI: 'wifi',
    AIRE: 'aire_acondicionado',
    TV: 'tv',
    VISTA_MAR: 'vista_al_mar',
    BAÑO: 'bano_privado'
};

export const LISTA_SERVICIOS = [
    { valor: SERVICIOS.WIFI, etiqueta: 'Wi-Fi', icono: <Wifi size={TAMAÑOS.ICONO_NORMAL} /> },
    { valor: SERVICIOS.AIRE, etiqueta: 'Aire Acondicionado', icono: <AirVent size={TAMAÑOS.ICONO_NORMAL} /> },
    { valor: SERVICIOS.TV, etiqueta: 'Smart TV', icono: <Tv size={TAMAÑOS.ICONO_NORMAL} /> },
    { valor: SERVICIOS.VISTA_MAR, etiqueta: 'Vista al Mar', icono: <GiPalmTree size={TAMAÑOS.ICONO_NORMAL} /> },
    { valor: SERVICIOS.BAÑO, etiqueta: 'Baño Privado', icono: <Bath size={TAMAÑOS.ICONO_NORMAL} /> }
];