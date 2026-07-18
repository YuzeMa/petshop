import { describe, expect, it } from 'vitest';
import { createProduct } from '../../entities/product-factory.js';
import { MapProductStore } from './map-product-store.js';

describe('MapProductStore', () => {
  it('finds all and by id after save', () => {
    const product = createProduct('toys', { id: 'prod-001' }, { randomSeed: 1 });
    const store = new MapProductStore();

    store.save(product);

    expect(store.findAll()).toEqual([product]);
    expect(store.findById('prod-001')).toBe(product);
    expect(store.findById('missing')).toBeUndefined();
  });

  it('accepts initial products', () => {
    const product = createProduct('treats', { id: 'prod-002' }, { randomSeed: 2 });
    const store = new MapProductStore([product]);

    expect(store.findById('prod-002')).toBe(product);
  });
});
