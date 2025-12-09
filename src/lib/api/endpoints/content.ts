import { apiClient } from '../client'

export interface SustainableGiftingItem {
  id: string
  title: string
  description: string
  image_url: string
  order: number
  is_active: boolean
}

export const contentApi = {
  fetchSustainableGiftingItems: () =>
    apiClient.get<SustainableGiftingItem[]>('/content/sustainable-gifting/'),
}

