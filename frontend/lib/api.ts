// Backend API utility functions
// Use NEXT_PUBLIC_ prefix for client-side access
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'http://localhost:3001'

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${BACKEND_URL}${endpoint}`
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(error.error || `API Error: ${response.status}`)
  }
  
  return response.json()
}

// Export fetchAPI for custom calls
export { fetchAPI }

// Articles API
export async function getArticles(params?: {
  category?: string
  isFeatured?: boolean
  limit?: number
}) {
  const searchParams = new URLSearchParams()
  if (params?.category) searchParams.set('category', params.category)
  if (params?.isFeatured !== undefined) searchParams.set('isFeatured', String(params.isFeatured))
  if (params?.limit) searchParams.set('limit', String(params.limit))
  
  const query = searchParams.toString()
  return fetchAPI<Article[]>(`/api/articles${query ? `?${query}` : ''}`)
}

export async function getArticleBySlug(slug: string) {
  return fetchAPI<Article>(`/api/articles/slug/${slug}`)
}

export async function getArticlesAdmin() {
  return fetchAPI<Article[]>('/api/articles/admin/all')
}

export async function getArticleCategories() {
  return fetchAPI<{ category: string; count: number }[]>('/api/articles/categories/list')
}

// Bornes API
export async function getBornes(params?: {
  city?: string
  status?: string
  isActive?: boolean
}) {
  const searchParams = new URLSearchParams()
  if (params?.city) searchParams.set('city', params.city)
  if (params?.status) searchParams.set('status', params.status)
  if (params?.isActive !== undefined) searchParams.set('isActive', String(params.isActive))
  
  const query = searchParams.toString()
  return fetchAPI<Borne[]>(`/api/bornes${query ? `?${query}` : ''}`)
}

export async function getBorneById(id: string) {
  return fetchAPI<Borne>(`/api/bornes/${id}`)
}

export async function getBornesCities() {
  return fetchAPI<{ city: string; count: number }[]>('/api/bornes/cities/list')
}

export async function getBornesStats() {
  return fetchAPI<{
    totalBornes: number
    activeBornes: number
    maintenanceBornes: number
    fullBornes: number
    totalCities: number
  }>('/api/bornes/stats/summary')
}

// Partners API
export async function getPartners(params?: {
  category?: string
  isFeatured?: boolean
  isActive?: boolean
}) {
  const searchParams = new URLSearchParams()
  if (params?.category) searchParams.set('category', params.category)
  if (params?.isFeatured !== undefined) searchParams.set('isFeatured', String(params.isFeatured))
  if (params?.isActive !== undefined) searchParams.set('isActive', String(params.isActive))
  
  const query = searchParams.toString()
  return fetchAPI<Partner[]>(`/api/partners${query ? `?${query}` : ''}`)
}

export async function getPartnerBySlug(slug: string) {
  return fetchAPI<Partner>(`/api/partners/slug/${slug}`)
}

export async function getPartnerCategories() {
  return fetchAPI<{ category: string; count: number }[]>('/api/partners/categories/list')
}

// Contact API
export async function getContactMessages(params?: {
  type?: string
  isRead?: boolean
  isArchived?: boolean
}) {
  const searchParams = new URLSearchParams()
  if (params?.type) searchParams.set('type', params.type)
  if (params?.isRead !== undefined) searchParams.set('isRead', String(params.isRead))
  if (params?.isArchived !== undefined) searchParams.set('isArchived', String(params.isArchived))
  
  const query = searchParams.toString()
  return fetchAPI<ContactMessage[]>(`/api/contact${query ? `?${query}` : ''}`)
}

export async function createContactMessage(data: {
  type: 'PARTICULIER' | 'COMMERCANT'
  name: string
  email: string
  message: string
  companyName?: string
  phone?: string
  position?: string
}) {
  return fetchAPI<{ id: string; message: string }>('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function getContactStats() {
  return fetchAPI<{
    totalMessages: number
    unreadMessages: number
    particulierMessages: number
    commercantMessages: number
  }>('/api/contact/stats/summary')
}

// Stats API
export async function getStats() {
  return fetchAPI<{
    totalBornes: number
    totalPartners: number
    totalArticles: number
    totalGlassCollected?: number
    totalUsers?: number
  }>('/api/stats')
}

export async function getMonthlyStats(year?: number) {
  const query = year ? `?year=${year}` : ''
  return fetchAPI<Statistics[]>(`/api/stats/monthly${query}`)
}

// Auth API
export async function loginUser(email: string, password: string) {
  return fetchAPI<{ token: string; user: User }>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export async function getUserByEmail(email: string) {
  return fetchAPI<User>(`/api/auth/user?email=${encodeURIComponent(email)}`)
}

// Types
export interface Article {
  id: string
  title: string
  slug: string
  excerpt?: string
  content?: string
  category: string
  tags: string[]
  imageUrl?: string
  isPublished: boolean
  isFeatured: boolean
  publishedAt: string | null
  createdAt: string
  updatedAt?: string
  authorId?: string
  authorName?: string
  author?: { name: string | null }
  views?: number
}

export interface Borne {
  id: string
  name: string
  address: string
  city: string
  zipCode: string
  latitude: number
  longitude: number
  isActive: boolean
  status: string
  description?: string | null
  createdAt?: string
  updatedAt?: string
}

export interface Partner {
  id: string
  name: string
  slug: string
  description?: string
  longDescription?: string
  category: string
  address: string
  city: string
  zipCode: string
  latitude?: number
  longitude?: number
  phone?: string
  email?: string
  website?: string
  logoUrl?: string
  imageUrl?: string
  advantages?: string[]
  pointsRequired?: number
  discount?: string
  isActive: boolean
  isFeatured?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface ContactMessage {
  id: string
  type: string
  name: string
  email: string
  message: string
  companyName?: string | null
  phone?: string | null
  position?: string | null
  isRead: boolean
  isArchived?: boolean
  createdAt: string
}

export interface Statistics {
  id: string
  year: number
  month: number
  totalGlassCollected: number
  totalPoints: number
  totalUsers: number
  totalPartners: number
  createdAt: string
}

export interface User {
  id: string
  email: string
  name: string | null
  role: 'ADMIN' | 'EDITOR' | 'USER'
  password?: string
}
