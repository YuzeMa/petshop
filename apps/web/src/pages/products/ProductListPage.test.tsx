import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { ProductsApi } from '../../shared/api/products-api';
import { ApiRequestError } from '../../shared/http/http';
import { ProductListPageContent } from './ProductListPage';
import { ProductsProvider } from './state/ProductsProvider';

const sampleProduct = {
  id: 'prod-001',
  name: 'Dry Food',
  description: 'Kibble',
  price: 12,
  currency: 'AUD',
  category: 'dry-food',
  imageUrls: [] as string[],
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

describe('ProductListPage', () => {
  it('renders product cards after load', async () => {
    const api: ProductsApi = {
      listProducts: vi.fn().mockResolvedValue([sampleProduct]),
      addToCart: vi.fn(),
    };

    render(
      <ProductsProvider api={api}>
        <ProductListPageContent />
      </ProductsProvider>,
    );

    expect(await screen.findByText('Dry Food')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add to Cart' })).toBeInTheDocument();
  });

  it('shows error banner when load fails', async () => {
    const api: ProductsApi = {
      listProducts: vi.fn().mockRejectedValue(new Error('Network down')),
      addToCart: vi.fn(),
    };

    render(
      <ProductsProvider api={api}>
        <ProductListPageContent />
      </ProductsProvider>,
    );

    expect(await screen.findByRole('alert')).toHaveTextContent('Network down');
  });

  it('shows error banner when add fails', async () => {
    const user = userEvent.setup();
    const api: ProductsApi = {
      listProducts: vi.fn().mockResolvedValue([sampleProduct]),
      addToCart: vi
        .fn()
        .mockRejectedValue(
          new ApiRequestError('Product not found: missing', 'NOT_FOUND', 404),
        ),
    };

    render(
      <ProductsProvider api={api}>
        <ProductListPageContent />
      </ProductsProvider>,
    );

    await user.click(await screen.findByRole('button', { name: 'Add to Cart' }));
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Product not found: missing',
    );
  });

  it('disables add button while pending', async () => {
    const user = userEvent.setup();
    let resolveAdd: (value: unknown) => void = () => undefined;
    const api: ProductsApi = {
      listProducts: vi.fn().mockResolvedValue([sampleProduct]),
      addToCart: vi.fn().mockImplementation(
        () =>
          new Promise((resolve) => {
            resolveAdd = resolve;
          }),
      ),
    };

    render(
      <ProductsProvider api={api}>
        <ProductListPageContent />
      </ProductsProvider>,
    );

    const button = await screen.findByRole('button', { name: 'Add to Cart' });
    await user.click(button);
    expect(await screen.findByRole('button', { name: 'Adding…' })).toBeDisabled();

    resolveAdd({ cartId: '1', items: [], grandTotal: 0 });
    expect(
      await screen.findByRole('button', { name: 'Add to Cart' }),
    ).toBeEnabled();
  });
});
