import { Wifi, AirVent, Tv, Bath, FileCheck } from 'lucide-react';
import { GiPalmTree } from 'react-icons/gi';

export const servicesList = [
    { value: 'wifi', label: 'Wi-Fi', icon: <Wifi size={18} /> },
    { value: 'aire_acondicionado', label: 'Aire Acondicionado', icon: <AirVent size={18} /> },
    { value: 'tv', label: 'Smart TV', icon: <Tv size={18} /> },
    { value: 'vista_al_mar', label: 'Vista al Mar', icon: <GiPalmTree size={18} /> },
    { value: 'bano_privado', label: 'Baño Privado', icon: <Bath size={18} /> }
  ];
  
  export const statusList = [
    { value: 'disponible', label: 'Disponible', variant: 'success', icon: <FileCheck size={18} /> },
    { value: 'ocupada', label: 'Ocupada', variant: 'danger' },
    { value: 'mantenimiento', label: 'En Mantenimiento', variant: 'warning' },
    { value: 'limpieza', label: 'En Limpieza', variant: 'info' },
    { value: 'reservada', label: 'Reservada', variant: 'primary' }
  ];