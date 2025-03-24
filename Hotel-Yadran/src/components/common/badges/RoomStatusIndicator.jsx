import React from 'react';
import { StatusBadge } from './StatusBadge';

export const RoomStatusIndicator = ({ room }) => {
  const getStatus = () => {
    if (room.maintenance) return 'mantenimiento';
    if (room.cleaning) return 'limpieza';
    if (room.reserved) return 'reservada';
    if (room.occupied) return 'ocupada';
    return room.available ? 'disponible' : 'desconocido';
  };

  return <StatusBadge status={getStatus()} />;
};