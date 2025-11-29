import { apiClient } from '../client'

export interface User {
  id: string
  email: string
  name: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupData {
  email: string
  password: string
  name: string
}

export const authApi = {
  login: (credentials: LoginCredentials) =>
    apiClient.post<User>('/auth/login', credentials),
  logout: () => apiClient.post('/auth/logout'),
  signup: (data: SignupData) =>
    apiClient.post<User>('/auth/signup', data),
}

