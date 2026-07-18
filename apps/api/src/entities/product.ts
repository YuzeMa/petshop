import { Entity } from './entity.js';
import type { ProductCategory } from './product-category.js';

export class Product extends Entity {
  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    readonly name: string,
    readonly price: number,
    readonly currency: string,
    readonly category: ProductCategory,
    readonly description: string,
    readonly imageUrls: readonly string[],
  ) {
    super(id, createdAt, updatedAt);
  }
}
