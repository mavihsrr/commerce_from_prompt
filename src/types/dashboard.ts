// src/types/dashboard.ts

/**
 * Defines the available sections in the Creator Dashboard.
 */
export type DashboardSection =
  | 'products'
  | 'orders'
  | 'customers'
  | 'analytics'
  | 'inventory'
  | 'promotions'
  | 'communication';

// You can add more specific data types here as your application grows,
// e.g., interfaces for Product, Order, Customer data.
/*
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  // ... other product details
}

export interface Order {
  id: string;
  customerId: string;
  orderDate: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  // ... other order details
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  // ... other customer details
}
*/
