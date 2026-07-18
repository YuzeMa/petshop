import type { CartItem } from '../entities/cart-item.js';
import { GLOBAL_CART_ID } from '../entities/constants.js';
import type { Product } from '../entities/product.js';
import { createCartItem } from '../entities/product-factory.js';
import type { CartItemModel } from '../models/cart-item-model.js';
import type { ProductModel } from '../models/product-model.js';
import { NotFoundError, ValidationError } from './errors.js';

export type CartLineView = {
  item: CartItem;
  product: Product;
  lineSubtotal: number;
};

export type CartView = {
  cartId: string;
  lines: CartLineView[];
  grandTotal: number;
};

export class CartService {
  constructor(
    private readonly productModel: ProductModel,
    private readonly cartItemModel: CartItemModel,
  ) {}

  getCart(): CartView {
    const items = this.cartItemModel.findByCartId(GLOBAL_CART_ID);
    const lines: CartLineView[] = [];
    let grandTotal = 0;

    for (const item of items) {
      const product = this.productModel.findById(item.productId);
      if (!product) {
        throw new NotFoundError(`Product not found: ${item.productId}`);
      }

      const lineSubtotal = product.price * item.quantity;
      grandTotal += lineSubtotal;
      lines.push({ item, product, lineSubtotal });
    }

    return {
      cartId: GLOBAL_CART_ID,
      lines,
      grandTotal,
    };
  }

  addToCart(productId: string, quantity: number): CartItem {
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new ValidationError('Quantity must be a positive integer');
    }

    const product = this.productModel.findById(productId);
    if (!product) {
      throw new NotFoundError(`Product not found: ${productId}`);
    }

    const existing = this.cartItemModel.findByCartIdAndProductId(
      GLOBAL_CART_ID,
      productId,
    );

    if (existing) {
      const next = createCartItem(
        existing.cartId,
        existing.productId,
        existing.quantity + quantity,
        {
          id: existing.id,
          createdAt: existing.createdAt,
          updatedAt: new Date(),
        },
      );
      this.cartItemModel.save(next);
      return next;
    }

    const created = createCartItem(GLOBAL_CART_ID, productId, quantity);
    this.cartItemModel.save(created);
    return created;
  }

  removeFromCart(productId: string): void {
    const existing = this.cartItemModel.findByCartIdAndProductId(
      GLOBAL_CART_ID,
      productId,
    );

    if (!existing) {
      throw new NotFoundError(
        `Cart line not found for product: ${productId}`,
      );
    }

    this.cartItemModel.delete(existing.id);
  }
}
