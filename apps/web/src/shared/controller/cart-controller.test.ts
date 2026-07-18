import { describe, expect, it, vi } from 'vitest';
import type { CartApi } from '../api/cart-api';
import { createCartController, type CartAction } from './cart-controller';

describe('createCartController', () => {
  it('dispatches mutation success with mapped cart after remove', async () => {
    const actions: CartAction[] = [];
    const dispatch = (action: CartAction) => {
      actions.push(action);
    };
    const api: CartApi = {
      getCart: vi.fn(),
      removeItem: vi.fn().mockResolvedValue({
        cartId: '1',
        items: [],
        grandTotal: 0,
      }),
      updateQuantity: vi.fn(),
    };

    const controller = createCartController(dispatch, api);
    await controller.removeItem('prod-001');

    expect(actions[0]).toEqual({
      type: 'MUTATION_START',
      productId: 'prod-001',
    });
    expect(actions[1]).toMatchObject({
      type: 'MUTATION_SUCCESS',
      productId: 'prod-001',
      cart: {
        cartId: '1',
        grandTotal: 0,
        itemCount: 0,
        items: [],
      },
    });
  });

  it('dispatches updateQuantity via PATCH payload', async () => {
    const actions: CartAction[] = [];
    const dispatch = (action: CartAction) => {
      actions.push(action);
    };
    const api: CartApi = {
      getCart: vi.fn(),
      removeItem: vi.fn(),
      updateQuantity: vi.fn().mockResolvedValue({
        cartId: '1',
        items: [
          {
            productId: 'prod-001',
            name: 'Food',
            unitPrice: 10,
            currency: 'AUD',
            quantity: 3,
            lineSubtotal: 30,
          },
        ],
        grandTotal: 30,
      }),
    };

    const controller = createCartController(dispatch, api);
    await controller.updateQuantity('prod-001', 3);

    expect(api.updateQuantity).toHaveBeenCalledWith(
      'prod-001',
      { quantity: 3 },
      undefined,
    );
    expect(actions[1]).toMatchObject({
      type: 'MUTATION_SUCCESS',
      cart: { grandTotal: 30, itemCount: 3 },
    });
  });
});
