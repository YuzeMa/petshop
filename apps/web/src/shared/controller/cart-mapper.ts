import type { CartLineDto, CartResponse } from '@petcircle/api-types';

export type CartLineViewModel = {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineSubtotal: number;
  currency: string;
  imageUrl: string | null;
};

export type CartViewModel = {
  cartId: string;
  items: CartLineViewModel[];
  grandTotal: number;
  itemCount: number;
  currency: string;
};

function mapLine(dto: CartLineDto): CartLineViewModel {
  return {
    productId: dto.productId,
    name: dto.name,
    quantity: dto.quantity,
    unitPrice: dto.unitPrice,
    lineSubtotal: dto.lineSubtotal,
    currency: dto.currency,
    imageUrl: null,
  };
}

export function mapCartResponse(dto: CartResponse): CartViewModel {
  const items = dto.items.map(mapLine);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const currency = items[0]?.currency ?? 'AUD';

  return {
    cartId: dto.cartId,
    items,
    grandTotal: dto.grandTotal,
    itemCount,
    currency,
  };
}
