/**
 * Modelo para reservas
 */

export class Booking {
  constructor(data = {}) {
    this.id = data.id || null;
    this.roomId = data.roomId || null;
    this.userId = data.userId || null;
    this.checkIn = data.checkIn ? new Date(data.checkIn) : null;
      this.checkOut = data.checkOut ? new Date(data.checkOut) : null;
    this.guests = data.guests || 1;
    this.status = data.status || 'pending';
    this.totalPrice = data.totalPrice || 0;
    this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
  }
}