import { Cart } from '../entities/cart.js';
import { GLOBAL_CART_ID } from '../entities/constants.js';
import { seedProducts } from '../entities/product-factory.js';
import { MapCartItemStore } from '../persistence/in-memory/map-cart-item-store.js';
import { MapCartStore } from '../persistence/in-memory/map-cart-store.js';
import { MapProductStore } from '../persistence/in-memory/map-product-store.js';
import { CartItemModel } from './cart-item-model.js';
import { CartModel } from './cart-model.js';
import { ProductModel } from './product-model.js';

export type Models = {
  productModel: ProductModel;
  cartModel: CartModel;
  cartItemModel: CartItemModel;
};

const SEED_BOOTSTRAP_AT = new Date('2026-01-01T00:00:00.000Z');

export function createModels(): Models {
  const productModel = new ProductModel(new MapProductStore());
  const cartModel = new CartModel(new MapCartStore());
  const cartItemModel = new CartItemModel(new MapCartItemStore());

  for (const product of seedProducts()) {
    productModel.save(product);
  }

  cartModel.save(new Cart(GLOBAL_CART_ID, SEED_BOOTSTRAP_AT, SEED_BOOTSTRAP_AT));

  return {
    productModel,
    cartModel,
    cartItemModel,
  };
}
