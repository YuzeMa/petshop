import { CartItem } from './cart-item.js';
import { Product } from './product.js';
import type { ProductCategory } from './product-category.js';

export const DEFAULT_PRODUCT_CURRENCY = 'AUD';
export const DEFAULT_PRODUCT_IMAGE_URL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjEvr7aH1i4PDrgkczj9-EFhHdLDi0z9jRjUxV2BRT5A&s=10';
export const DEFAULT_RANDOM_SEED = 42;
export const PRODUCT_PRICE_MIN = 0;
export const PRODUCT_PRICE_MAX = 100;

export const PRODUCT_DESCRIPTIONS = [
  'A reliable everyday choice for happy pets.',
  'Carefully selected for quality and taste.',
  'Popular with pets and their humans alike.',
  'Simple, wholesome, and easy to love.',
  'A store favourite for daily routines.',
  'Made to keep tails wagging and bowls empty.',
  'Balanced nutrition in a convenient pack.',
  'Great value without compromising on quality.',
  'A go-to pick for pet parents on the move.',
  'Thoughtfully formulated for everyday wellbeing.',
] as const;

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  'dry-food': 'Dry Food',
  'wet-food': 'Wet Food',
  treats: 'Treats',
  toys: 'Toys',
  healthcare: 'Healthcare',
};

const SEED_BOOTSTRAP_AT = new Date('2026-01-01T00:00:00.000Z');

/** Catalog slots: 10 products across all 5 categories. */
const CATALOG_SLOTS: ReadonlyArray<{
  id: string;
  category: ProductCategory;
  randomSeed: number;
}> = [
  { id: 'prod-001', category: 'dry-food', randomSeed: 1 },
  { id: 'prod-002', category: 'dry-food', randomSeed: 2 },
  { id: 'prod-003', category: 'wet-food', randomSeed: 3 },
  { id: 'prod-004', category: 'wet-food', randomSeed: 4 },
  { id: 'prod-005', category: 'treats', randomSeed: 5 },
  { id: 'prod-006', category: 'treats', randomSeed: 6 },
  { id: 'prod-007', category: 'toys', randomSeed: 7 },
  { id: 'prod-008', category: 'toys', randomSeed: 8 },
  { id: 'prod-009', category: 'healthcare', randomSeed: 9 },
  { id: 'prod-010', category: 'healthcare', randomSeed: 10 },
];

export type ProductOverrides = {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  name?: string;
  price?: number;
  currency?: string;
  description?: string;
  imageUrls?: readonly string[];
};

export type CreateProductOptions = {
  randomSeed?: number;
};

export type CartItemOverrides = {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

function createSeededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

function randomPrice(rand: () => number): number {
  const raw =
    PRODUCT_PRICE_MIN + rand() * (PRODUCT_PRICE_MAX - PRODUCT_PRICE_MIN);
  return Math.round(raw * 100) / 100;
}

function randomDescription(rand: () => number): string {
  const index = Math.floor(rand() * PRODUCT_DESCRIPTIONS.length);
  return PRODUCT_DESCRIPTIONS[index] ?? PRODUCT_DESCRIPTIONS[0];
}

function buildProductName(category: ProductCategory, id: string): string {
  return `${CATEGORY_LABELS[category]} (${id})`;
}

function generateId(): string {
  return crypto.randomUUID();
}

function entityTimestamps(overrides: {
  createdAt?: Date;
  updatedAt?: Date;
}): { createdAt: Date; updatedAt: Date } {
  const createdAt = overrides.createdAt ?? new Date();
  const updatedAt = overrides.updatedAt ?? createdAt;
  return { createdAt, updatedAt };
}

export function createProduct(
  category: ProductCategory,
  overrides: ProductOverrides = {},
  options: CreateProductOptions = {},
): Product {
  const id = overrides.id ?? generateId();
  const rand = createSeededRandom(options.randomSeed ?? DEFAULT_RANDOM_SEED);
  const { createdAt, updatedAt } = entityTimestamps(overrides);

  return new Product(
    id,
    createdAt,
    updatedAt,
    overrides.name ?? buildProductName(category, id),
    overrides.price ?? randomPrice(rand),
    overrides.currency ?? DEFAULT_PRODUCT_CURRENCY,
    category,
    overrides.description ?? randomDescription(rand),
    overrides.imageUrls ?? [DEFAULT_PRODUCT_IMAGE_URL],
  );
}

export function createCartItem(
  cartId: string,
  productId: string,
  quantity: number,
  overrides: CartItemOverrides = {},
): CartItem {
  const id = overrides.id ?? generateId();
  const { createdAt, updatedAt } = entityTimestamps(overrides);

  return new CartItem(id, createdAt, updatedAt, cartId, productId, quantity);
}

export function seedProducts(): Product[] {
  return CATALOG_SLOTS.map(({ id, category, randomSeed }) =>
    createProduct(
      category,
      {
        id,
        createdAt: SEED_BOOTSTRAP_AT,
        updatedAt: SEED_BOOTSTRAP_AT,
      },
      { randomSeed },
    ),
  );
}
