/**
 * Get the API base URL.
 * In development with Vite proxy: Use relative path (same-origin)
 * In production: Use full URL from environment variable
 */
function getApiBaseUrl(): string {
  // Allow explicit override via environment variable (for production)
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL
  }
  
  // In development, use relative path so Vite proxy handles it
  // This makes requests same-origin, so cookies work with SameSite='Lax'
  if (import.meta.env.DEV) {
    return '/api'
  }
  
  // Fallback for production (should use VITE_API_BASE_URL)
  return 'http://127.0.0.1:8000/api'
}

export const config = {
  // In development: Uses Vite proxy (same-origin, cookies work)
  // In production: Uses VITE_API_BASE_URL environment variable
  apiBaseUrl: getApiBaseUrl(),
  useMockApi: import.meta.env.VITE_USE_MOCK_API === 'true',
}

