import { describe, expect, it } from 'vitest';
import { GLOBAL_CART_ID } from '../entities/constants.js';
import { createModels } from '../models/create-models.js';
import { CartService } from './cart-service.js';
import { NotFoundError, ValidationError } from './errors.js';
import { ProductService } from './product-service.js';

function setup() {
  const models = createModels();
  const productService = new ProductService(models.productModel);
  const cartService = new CartService(
    models.productModel,
    models.cartModel,
    models.cartItemModel,
  );
  return { productService, cartService, models };
}

describe('ProductService', () => {
  it('lists seeded products', () => {
    const { productService } = setup();

    expect(productService.listProducts()).toHaveLength(10);
  });
});

describe('CartService', () => {
  it('starts empty with zero grand total', () => {
    const { cartService } = setup();
    const cart = cartService.getCart(GLOBAL_CART_ID);

    expect(cart.cartId).toBe(GLOBAL_CART_ID);
    expect(cart.lines).toEqual([]);
    expect(cart.grandTotal).toBe(0);
  });

  it('adds a product and computes line subtotal and grand total', () => {
    const { cartService, productService } = setup();
    const product = productService.listProducts()[0]!;

    cartService.addToCart(GLOBAL_CART_ID, product.id, 2);
    const cart = cartService.getCart(GLOBAL_CART_ID);

    expect(cart.lines).toHaveLength(1);
    expect(cart.lines[0]!.item.quantity).toBe(2);
    expect(cart.lines[0]!.lineSubtotal).toBe(product.price * 2);
    expect(cart.grandTotal).toBe(product.price * 2);
  });

  it('increments quantity when the product is already in the cart', () => {
    const { cartService, productService } = setup();
    const product = productService.listProducts()[0]!;

    cartService.addToCart(GLOBAL_CART_ID, product.id, 1);
    cartService.addToCart(GLOBAL_CART_ID, product.id, 3);

    const cart = cartService.getCart(GLOBAL_CART_ID);
    expect(cart.lines).toHaveLength(1);
    expect(cart.lines[0]!.item.quantity).toBe(4);
  });

  it('rejects unknown product ids', () => {
    const { cartService } = setup();

    expect(() =>
      cartService.addToCart(GLOBAL_CART_ID, 'missing-product', 1),
    ).toThrow(NotFoundError);
  });

  it('rejects unknown cart ids', () => {
    const { cartService } = setup();

    expect(() => cartService.getCart('missing-cart')).toThrow(NotFoundError);
  });

  it('rejects non-positive quantities', () => {
    const { cartService, productService } = setup();
    const product = productService.listProducts()[0]!;

    expect(() =>
      cartService.addToCart(GLOBAL_CART_ID, product.id, 0),
    ).toThrow(ValidationError);
    expect(() =>
      cartService.addToCart(GLOBAL_CART_ID, product.id, -1),
    ).toThrow(ValidationError);
    expect(() =>
      cartService.addToCart(GLOBAL_CART_ID, product.id, 1.5),
    ).toThrow(ValidationError);
  });

  it('removes a line entirely', () => {
    const { cartService, productService } = setup();
    const product = productService.listProducts()[0]!;

    cartService.addToCart(GLOBAL_CART_ID, product.id, 2);
    cartService.removeFromCart(GLOBAL_CART_ID, product.id);

    expect(cartService.getCart(GLOBAL_CART_ID).lines).toEqual([]);
  });

  it('throws when removing a product that is not in the cart', () => {
    const { cartService, productService } = setup();
    const product = productService.listProducts()[0]!;

    expect(() =>
      cartService.removeFromCart(GLOBAL_CART_ID, product.id),
    ).toThrow(NotFoundError);
  });

  it('sets quantity on an existing line', () => {
    const { cartService, productService } = setup();
    const product = productService.listProducts()[0]!;

    cartService.addToCart(GLOBAL_CART_ID, product.id, 1);
    cartService.updateQuantity(GLOBAL_CART_ID, product.id, 5);

    const cart = cartService.getCart(GLOBAL_CART_ID);
    expect(cart.lines).toHaveLength(1);
    expect(cart.lines[0]!.item.quantity).toBe(5);
    expect(cart.lines[0]!.lineSubtotal).toBe(product.price * 5);
    expect(cart.grandTotal).toBe(product.price * 5);
  });

  it('throws when updating quantity for a product not in the cart', () => {
    const { cartService, productService } = setup();
    const product = productService.listProducts()[0]!;

    expect(() =>
      cartService.updateQuantity(GLOBAL_CART_ID, product.id, 2),
    ).toThrow(NotFoundError);
  });

  it('rejects non-positive quantities on update', () => {
    const { cartService, productService } = setup();
    const product = productService.listProducts()[0]!;

    cartService.addToCart(GLOBAL_CART_ID, product.id, 1);

    expect(() =>
      cartService.updateQuantity(GLOBAL_CART_ID, product.id, 0),
    ).toThrow(ValidationError);
    expect(() =>
      cartService.updateQuantity(GLOBAL_CART_ID, product.id, -1),
    ).toThrow(ValidationError);
    expect(() =>
      cartService.updateQuantity(GLOBAL_CART_ID, product.id, 1.5),
    ).toThrow(ValidationError);
  });
});
