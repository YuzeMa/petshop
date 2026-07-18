import { Entity } from './entity.js';

export class CartItem extends Entity {
  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    readonly cartId: string,
    readonly productId: string,
    readonly quantity: number,
  ) {
    super(id, createdAt, updatedAt);
  }
}
