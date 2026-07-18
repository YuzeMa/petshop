import type { ProductDto } from '@petcircle/api-types';

export type ProductViewModel = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string | null;
};

export function mapProductDto(dto: ProductDto): ProductViewModel {
  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    price: dto.price,
    currency: dto.currency,
    imageUrl: dto.imageUrls[0] ?? null,
  };
}

export function mapProductList(dtos: readonly ProductDto[]): ProductViewModel[] {
  return dtos.map(mapProductDto);
}
