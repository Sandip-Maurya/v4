import { apiClient } from '../client'

export interface Product {
  id: string
  slug: string
  name: string
  description: string
  price: number
  currency: 'INR'
  category: 'COOKIE' | 'SNACK' | 'CAKE' | 'SWEET' | 'HAMPER'
  images: string[]
  tags: string[]
  is_available: boolean
  weight_grams?: number
}

export const catalogApi = {
  fetchProducts: () => apiClient.get<Product[]>('/products'),
  fetchProduct: (slug: string) => apiClient.get<Product>(`/products/${slug}`),
}

