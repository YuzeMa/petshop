import { describe, expect, it } from 'vitest';
import { GLOBAL_CART_ID } from '../entities/constants.js';
import { PRODUCT_CATEGORIES } from '../entities/product-category.js';
import { createModels } from './create-models.js';

describe('createModels', () => {
  it('boots 10 products, global cart, and empty cart items', () => {
    const { productModel, cartModel, cartItemModel } = createModels();

    const products = productModel.findAll();
    expect(products).toHaveLength(10);

    const categories = new Set(products.map((p) => p.category));
    for (const category of PRODUCT_CATEGORIES) {
      expect(categories.has(category)).toBe(true);
    }

    expect(cartModel.findById(GLOBAL_CART_ID)?.id).toBe(GLOBAL_CART_ID);
    expect(cartItemModel.findByCartId(GLOBAL_CART_ID)).toEqual([]);
  });
});
