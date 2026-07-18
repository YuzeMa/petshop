import type { CartResponse, ProductDto } from '@petcircle/api-types';
import type { Product } from '../entities/product.js';
import type { CartView } from '../services/cart-service.js';

export function toProductDto(product: Product): ProductDto {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    currency: product.currency,
    category: product.category,
    description: product.description,
    imageUrls: product.imageUrls,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };
}

export function toCartResponse(cart: CartView): CartResponse {
  return {
    cartId: cart.cartId,
    items: cart.lines.map((line) => ({
      productId: line.product.id,
      name: line.product.name,
      unitPrice: line.product.price,
      currency: line.product.currency,
      quantity: line.item.quantity,
      lineSubtotal: line.lineSubtotal,
    })),
    grandTotal: cart.grandTotal,
  };
}
