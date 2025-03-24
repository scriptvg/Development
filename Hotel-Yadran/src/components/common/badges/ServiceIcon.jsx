import React from 'react';
import { Wifi, AirVent, Tv, Bath } from 'lucide-react';
import { GiPalmTree } from 'react-icons/gi';

export const ServiceIcon = ({ service }) => {
  switch(service) {
    case 'wifi':
      return <Wifi size={22} />;
    case 'aire_acondicionado':
      return <AirVent size={22} />;
    case 'tv':
      return <Tv size={22} />;
    case 'vista_al_mar':
      return <GiPalmTree size={22} />;
    case 'bano_privado':
      return <Bath size={22} />;
    default:
      return null;
  }
};