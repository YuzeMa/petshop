import type { Product } from '../entities/product.js';

export interface ProductStore {
  findAll(): Product[];
  findById(id: string): Product | undefined;
  save(product: Product): void;
}
