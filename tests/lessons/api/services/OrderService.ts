import { OrderFilterParams, OrderPaginationResponse, Order } from '../interfaces/order.interface';
import { BaseService } from './BaseService';

export class OrderService extends BaseService {
  private readonly basePath = '/api/orders';

  async getOrders(params?: OrderFilterParams): Promise<OrderPaginationResponse> {
    return this.get<OrderPaginationResponse>(this.basePath, {
      params: params as Record<string, string | number>,
    });
  }

  async getOrder(id: number): Promise<Order> {
    return this.get<Order>(`${this.basePath}/${id}`);
  }
}
