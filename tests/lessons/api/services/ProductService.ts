import { BaseService } from './BaseService';
import {
  ImageUploadResponse,
  PaginationResponse,
  Product,
  ProductCreate,
  ProductPatch,
  ProductUpdate,
} from '../interfaces/product.interface';
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
  // Luồng CRUD =>

  async createProduct(data: ProductCreate): Promise<Product> {
    return this.post<Product, ProductCreate>(this.basePath, data);
  }

  async updateProduct(id: number, data: ProductUpdate): Promise<Product> {
    return this.put<Product, ProductUpdate>(`${this.basePath}/${id}`, data);
  }

  async pactchProduct(id: number, data: ProductPatch): Promise<Product> {
    return this.patch<Product, ProductPatch>(`${this.basePath}/${id}`, data);
  }

  async deleteProduct(id: number): Promise<void> {
    await this.delete(`${this.basePath}/${id}`);
  }

  async uploadImage(
    productId: number,
    imageFile: { name: string; mimeType: string; buffer: Buffer },
    baseUrl?: string
  ): Promise<ImageUploadResponse> {
    return this.post<ImageUploadResponse>(`${this.basePath}/${productId}/image`, undefined, {
      multipart: { image: imageFile },
      baseURL: baseUrl,
    });
  }
}

//service luuw trữ ảnh. S3. (AWS), tự host dùng minIO
// public cái endpoint để upload cho chúng ta.
// https://uploads-neko-coffee.autoneko.com/api/products/1/image
