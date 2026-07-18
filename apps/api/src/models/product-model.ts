import type { Product } from '../entities/product.js';
import type { ProductStore } from '../persistence/product-store.js';

export class ProductModel {
  constructor(private readonly store: ProductStore) {}

  findAll(): Product[] {
    return this.store.findAll();
  }

  findById(id: string): Product | undefined {
    return this.store.findById(id);
  }

  save(product: Product): void {
    this.store.save(product);
  }
}
