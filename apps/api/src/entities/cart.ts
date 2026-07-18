import { Entity } from './entity.js';

export class Cart extends Entity {
  constructor(id: string, createdAt: Date, updatedAt: Date) {
    super(id, createdAt, updatedAt);
  }
}
