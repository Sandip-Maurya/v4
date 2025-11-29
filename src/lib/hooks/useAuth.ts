import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authApi, type LoginCredentials, type SignupData, type User } from '../api/endpoints/auth'

export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (user: User) => {
      // Store user in query cache for easy access
      queryClient.setQueryData(['user'], user)
    },
  })
}

export function useSignup() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: SignupData) => authApi.signup(data),
    onSuccess: (user: User) => {
      queryClient.setQueryData(['user'], user)
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      // Clear user data on logout
      queryClient.removeQueries({ queryKey: ['user'] })
      // Optionally clear other user-specific data
      queryClient.removeQueries({ queryKey: ['orders'] })
      queryClient.removeQueries({ queryKey: ['cart'] })
    },
  })
}

