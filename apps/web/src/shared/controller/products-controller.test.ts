import { describe, expect, it, vi } from 'vitest';
import type { ProductsApi } from '../api/products-api';
import {
  createProductsController,
  type ProductsAction,
} from './products-controller';

describe('createProductsController', () => {
  it('dispatches load success with mapped products', async () => {
    const actions: ProductsAction[] = [];
    const dispatch = (action: ProductsAction) => {
      actions.push(action);
    };
    const api: ProductsApi = {
      listProducts: vi.fn().mockResolvedValue([
        {
          id: 'prod-001',
          name: 'Dry Food',
          description: 'Kibble',
          price: 12,
          currency: 'AUD',
          category: 'dry-food',
          imageUrls: ['https://example.com/a.jpg'],
          createdAt: '2026-01-01T00:00:00.000Z',
          updatedAt: '2026-01-01T00:00:00.000Z',
        },
      ]),
      addToCart: vi.fn(),
    };

    const controller = createProductsController(dispatch, api);
    await controller.load();

    expect(actions[0]).toEqual({ type: 'LOAD_START' });
    expect(actions[1]).toEqual({
      type: 'LOAD_SUCCESS',
      products: [
        {
          id: 'prod-001',
          name: 'Dry Food',
          description: 'Kibble',
          price: 12,
          currency: 'AUD',
          imageUrl: 'https://example.com/a.jpg',
        },
      ],
    });
  });

  it('dispatches add pending then success', async () => {
    const actions: ProductsAction[] = [];
    const dispatch = (action: ProductsAction) => {
      actions.push(action);
    };
    const api: ProductsApi = {
      listProducts: vi.fn(),
      addToCart: vi.fn().mockResolvedValue({
        cartId: '1',
        items: [],
        grandTotal: 0,
      }),
    };

    const controller = createProductsController(dispatch, api);
    await controller.addToCart('prod-001');

    expect(actions).toEqual([
      { type: 'ADD_START', productId: 'prod-001' },
      { type: 'ADD_SUCCESS', productId: 'prod-001' },
    ]);
    expect(api.addToCart).toHaveBeenCalledWith(
      { productId: 'prod-001', quantity: 1 },
      undefined,
    );
  });
});
