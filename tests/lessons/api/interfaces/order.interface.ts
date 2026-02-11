// const STATUS_OPTIONS = {
//   ALL: '', // Tất cả trạng thái
//   PENDING: 'pending', // Chờ xử lý
//   CONFIRMED: 'confirmed', // Đã xác nhận
//   PROCESSING: 'processing', // Đang chuẩn bị
//   READY: 'ready', // Sẵn sàng giao
//   SHIPPED: 'shipped', // Đang giao hàng
//   DELIVERED: 'delivered', // Đã giao hàng
//   CANCELLED: 'cancelled', // Đã hủy
// };

// export enum PaymentStatus {
//   Paid = 'paid',
//   Unpaid = 'unpaid',
// }

// export enum PaymentMethod {
//   BankTransfer = 'bank_transfer',
//   Cod = 'cod',
//   Vnpay = 'vnpay',
// }
// export enum OrderType {
//   B2C = 'b2c',
// }

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'ready'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type PaymentStatus = 'paid' | 'unpaid';

export type PaymentMethod = 'bank_transfer' | 'cod' | 'vnpay';

export type OrderType = 'b2c';

export interface Order {
  id: number;
  order_number: string;
  order_type: OrderType;
  customer_id: number;
  status: string;
  subtotal: number;
  discount_percent: number;
  discount_amount: number;
  tax_amount: number;
  total_amount: number;
  paid_amount: number;
  payment_status: PaymentStatus;
  payment_method: PaymentMethod;
  notes: string | null;
  approved_by: null;
  approved_at: null;
  shipped_at: null;
  delivered_at: null;
  email: string;
  phone: string;
  shipping_name: string;
  shipping_address: string;
  created_at: string;
  updated_at: string;
}

export interface OrderPagination {
  page: number;
  limit: number;
  total_items: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface OrderPaginationResponse {
  data: Order[];
  pagination: OrderPagination;
}

export interface OrderFilterParams {
  page?: number;
  limit?: number;
  status?: OrderStatus;
  order_type?: OrderType;
  payment_status?: PaymentStatus;
}
