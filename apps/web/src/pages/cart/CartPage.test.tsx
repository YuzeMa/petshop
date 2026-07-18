import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { CartApi } from '../../shared/api/cart-api';
import { ApiRequestError } from '../../shared/http/http';
import { CartPageContent } from './CartPage';
import { CartProvider } from './state/CartProvider';

const sampleCartDto = {
  cartId: '1',
  items: [
    {
      productId: 'prod-001',
      name: 'Food',
      unitPrice: 12,
      currency: 'AUD',
      quantity: 2,
      lineSubtotal: 24,
    },
  ],
  grandTotal: 24,
};

describe('CartPage', () => {
  it('renders BE total and item count', async () => {
    const api: CartApi = {
      getCart: vi.fn().mockResolvedValue(sampleCartDto),
      removeItem: vi.fn(),
      updateQuantity: vi.fn(),
    };

    render(
      <CartProvider api={api}>
        <CartPageContent />
      </CartProvider>,
    );

    expect(await screen.findByText('2 items in the cart')).toBeInTheDocument();
    expect(screen.getByText(/Total:/)).toHaveTextContent(/24\.00/);
  });

  it('shows error banner when load fails', async () => {
    const api: CartApi = {
      getCart: vi
        .fn()
        .mockRejectedValue(new ApiRequestError('Cart unavailable', 'INTERNAL_ERROR', 500)),
      removeItem: vi.fn(),
      updateQuantity: vi.fn(),
    };

    render(
      <CartProvider api={api}>
        <CartPageContent />
      </CartProvider>,
    );

    expect(await screen.findByRole('alert')).toHaveTextContent('Cart unavailable');
  });

  it('shows error banner when remove fails', async () => {
    const user = userEvent.setup();
    const api: CartApi = {
      getCart: vi.fn().mockResolvedValue(sampleCartDto),
      removeItem: vi
        .fn()
        .mockRejectedValue(
          new ApiRequestError('Cart line not found', 'NOT_FOUND', 404),
        ),
      updateQuantity: vi.fn(),
    };

    render(
      <CartProvider api={api}>
        <CartPageContent />
      </CartProvider>,
    );

    await screen.findByText('Food');
    await user.click(screen.getAllByRole('button', { name: 'Delete' })[0]!);
    expect(await screen.findByRole('alert')).toHaveTextContent('Cart line not found');
  });

  it('shows error banner when quantity update fails', async () => {
    const user = userEvent.setup();
    const api: CartApi = {
      getCart: vi.fn().mockResolvedValue(sampleCartDto),
      removeItem: vi.fn(),
      updateQuantity: vi
        .fn()
        .mockRejectedValue(
          new ApiRequestError(
            'Quantity must be a positive integer',
            'VALIDATION_ERROR',
            400,
          ),
        ),
    };

    render(
      <CartProvider api={api}>
        <CartPageContent />
      </CartProvider>,
    );

    await screen.findByText('Food');
    await user.click(
      screen.getByRole('button', { name: 'Increase quantity of Food' }),
    );
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Quantity must be a positive integer',
    );
  });

  it('shows total skeleton while mutation is pending', async () => {
    const user = userEvent.setup();
    let resolveRemove: (value: unknown) => void = () => undefined;
    const api: CartApi = {
      getCart: vi.fn().mockResolvedValue(sampleCartDto),
      removeItem: vi.fn().mockImplementation(
        () =>
          new Promise((resolve) => {
            resolveRemove = resolve;
          }),
      ),
      updateQuantity: vi.fn(),
    };

    render(
      <CartProvider api={api}>
        <CartPageContent />
      </CartProvider>,
    );

    await screen.findByText('Food');
    await user.click(screen.getAllByRole('button', { name: 'Delete' })[0]!);
    expect(screen.getByLabelText('Updating total')).toBeInTheDocument();

    resolveRemove({ cartId: '1', items: [], grandTotal: 0 });
    expect(await screen.findByText('Your cart is empty.')).toBeInTheDocument();
  });

  it('keeps minus enabled when quantity is 1', async () => {
    const api: CartApi = {
      getCart: vi.fn().mockResolvedValue({
        cartId: '1',
        items: [
          {
            productId: 'prod-001',
            name: 'Food',
            unitPrice: 12,
            currency: 'AUD',
            quantity: 1,
            lineSubtotal: 12,
          },
        ],
        grandTotal: 12,
      }),
      removeItem: vi.fn(),
      updateQuantity: vi.fn(),
    };

    render(
      <CartProvider api={api}>
        <CartPageContent />
      </CartProvider>,
    );

    expect(
      await screen.findByRole('button', {
        name: 'Decrease quantity of Food',
      }),
    ).toBeEnabled();
  });
});
