import { useQuery } from '@tanstack/react-query'
import { catalogApi } from '../api/endpoints/catalog'

export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters?: string) => [...productKeys.lists(), { filters }] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (slug: string) => [...productKeys.details(), slug] as const,
}

export function useProducts() {
  return useQuery({
    queryKey: productKeys.lists(),
    queryFn: () => catalogApi.fetchProducts(),
  })
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: productKeys.detail(slug),
    queryFn: () => catalogApi.fetchProduct(slug),
    enabled: !!slug,
  })
}

