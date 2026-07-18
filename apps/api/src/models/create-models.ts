import { Cart } from '../entities/cart.js';
import { GLOBAL_CART_ID } from '../entities/constants.js';
import { seedProducts } from '../entities/product-factory.js';
import {
  createPersistence,
  type Persistence,
} from '../persistence/create-persistence.js';
import { CartItemModel } from './cart-item-model.js';
import { CartModel } from './cart-model.js';
import { ProductModel } from './product-model.js';

export type Models = {
  productModel: ProductModel;
  cartModel: CartModel;
  cartItemModel: CartItemModel;
};

const SEED_BOOTSTRAP_AT = new Date('2026-01-01T00:00:00.000Z');

export function createModels(persistence: Persistence = createPersistence()): Models {
  const productModel = new ProductModel(persistence.productStore);
  const cartModel = new CartModel(persistence.cartStore);
  const cartItemModel = new CartItemModel(persistence.cartItemStore);

  // PROTOTYPE HACK: seed the in-memory store at process start.
  // There is no real DB/migration yet — this gives the API a catalog + empty cart.
  // Replace with DB migrations + optional seed scripts when a real adapter lands.
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
