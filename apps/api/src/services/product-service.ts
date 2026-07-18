import type { Product } from '../entities/product.js';
import type { ProductModel } from '../models/product-model.js';

export class ProductService {
  constructor(private readonly productModel: ProductModel) {}

  listProducts(): Product[] {
    return this.productModel.findAll();
  }
}
