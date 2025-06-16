export interface Merchant {
  id?: number;
  name: string;
  email: string;
  category: 'Retail' | 'Food' | 'Services';
  createdAt?: Date;
}

export const MERCHANT_CATEGORIES = ['Retail', 'Food', 'Services'] as const;

// API response interfaces
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
