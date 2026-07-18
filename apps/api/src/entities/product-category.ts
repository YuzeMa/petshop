export const PRODUCT_CATEGORIES = [
  'dry-food',
  'wet-food',
  'treats',
  'toys',
  'healthcare',
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];
