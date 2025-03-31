/**
 * Modelo para usuarios
 */

export class User {
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || '';
    this.email = data.email || '';
    this.role = data.role || 'client';
    this.phone = data.phone || '';
    this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
  }
}