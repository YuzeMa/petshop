export type AddToCartRequest = {
  productId: string;
  quantity: number;
};

export type UpdateCartItemRequest = {
  quantity: number;
};

export type CartLineDto = {
  productId: string;
  name: string;
  unitPrice: number;
  currency: string;
  quantity: number;
  lineSubtotal: number;
};

export type CartResponse = {
  cartId: string;
  items: CartLineDto[];
  grandTotal: number;
};
