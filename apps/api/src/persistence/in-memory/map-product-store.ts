import type { Product } from '../../entities/product.js';
import type { ProductStore } from '../product-store.js';

export class MapProductStore implements ProductStore {
  private readonly products = new Map<string, Product>();

  constructor(initial: readonly Product[] = []) {
    for (const product of initial) {
      this.products.set(product.id, product);
    }
  }

  findAll(): Product[] {
    return [...this.products.values()];
  }

  findById(id: string): Product | undefined {
    return this.products.get(id);
  }

  save(product: Product): void {
    this.products.set(product.id, product);
  }
}
