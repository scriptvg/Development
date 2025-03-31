/**
 * Modelo para habitaciones
 */

export class Room {
  constructor(data = {}) {
    this.id = data.id || null;
    this.number = data.number || '';
    this.type = data.type || '';
    this.capacity = data.capacity || 0;
    this.price = data.price || 0;
    this.available = data.available !== undefined ? data.available : true;
    this.amenities = data.amenities || [];
    this.images = data.images || [];
  }
}