import { BaseService } from './BaseService';
import { PaginationResponse, Product } from '../interfaces/product.interface';
export class ProductService extends BaseService {
  private readonly basePath = '/api/products';

  async getProducts(params?: {
    page?: number;
    limit?: number;
    type?: string;
  }): Promise<PaginationResponse<Product>> {
    return this.get<PaginationResponse<Product>>(this.basePath, {
      params: params,
    });
  }

  async getProduct(id: number): Promise<Product> {
    return this.get<Product>(`${this.basePath}/${id}`);
  }
}
