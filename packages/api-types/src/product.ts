export type ProductDto = {
  id: string;
  name: string;
  price: number;
  currency: string;
  category: string;
  description: string;
  imageUrls: readonly string[];
  createdAt: string;
  updatedAt: string;
};

export type ProductListResponse = ProductDto[];
