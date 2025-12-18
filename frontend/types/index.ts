// Types pour l'application Cliiink Réunion

export interface Borne {
  id: string
  name: string
  address: string
  city: string
  zipCode: string
  latitude: number
  longitude: number
  status: BorneStatus
  capacity?: number
  fillLevel?: number
  lastCollected?: Date
  description?: string
  imageUrl?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export type BorneStatus = 'ACTIVE' | 'MAINTENANCE' | 'FULL' | 'INACTIVE'

export interface Partner {
  id: string
  name: string
  slug: string
  description?: string
  longDescription?: string
  category: PartnerCategory
  logoUrl?: string
  imageUrl?: string
  address: string
  city: string
  zipCode: string
  latitude?: number
  longitude?: number
  phone?: string
  email?: string
  website?: string
  advantages: string[]
  pointsRequired?: number
  discount?: string
  isActive: boolean
  isFeatured: boolean
  createdAt: Date
  updatedAt: Date
}

export type PartnerCategory =
  | 'RESTAURANT'
  | 'BAR'
  | 'CAFE'
  | 'BOUTIQUE'
  | 'SUPERMARCHE'
  | 'LOISIRS'
  | 'BEAUTE'
  | 'SERVICES'
  | 'AUTRE'

export interface Article {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  imageUrl?: string
  category: ArticleCategory
  tags: string[]
  isPublished: boolean
  isFeatured: boolean
  publishedAt?: Date
  views: number
  createdAt: Date
  updatedAt: Date
  authorId: string
  author?: User
}

export type ArticleCategory =
  | 'EVENEMENT'
  | 'TRI'
  | 'PARTENAIRES'
  | 'RESULTATS'
  | 'ACTUALITE'
  | 'CONSEILS'

export interface User {
  id: string
  email: string
  name?: string
  role: 'ADMIN' | 'EDITOR'
  createdAt: Date
  updatedAt: Date
}

export interface ContactMessage {
  id: string
  type: 'PARTICULIER' | 'COMMERCANT'
  name: string
  email: string
  message: string
  attachmentUrl?: string
  companyName?: string
  phone?: string
  position?: string
  isRead: boolean
  isArchived: boolean
  createdAt: Date
}

export interface SiteConfig {
  id: string
  key: string
  value: string
  description?: string
  updatedAt: Date
}

export interface Statistics {
  id: string
  year: number
  month: number
  totalGlassCollected: number
  totalPoints: number
  totalUsers: number
  totalPartners: number
  createdAt: Date
}

// Form types
export interface ContactFormData {
  type: 'PARTICULIER' | 'COMMERCANT'
  name: string
  email: string
  message: string
  companyName?: string
  phone?: string
  position?: string
  recaptchaToken?: string
}

export interface ArticleFormData {
  title: string
  slug?: string
  excerpt?: string
  content: string
  imageUrl?: string
  category: ArticleCategory
  tags: string[]
  isPublished: boolean
  isFeatured: boolean
  publishedAt?: Date
}

export interface PartnerFormData {
  name: string
  slug?: string
  description?: string
  longDescription?: string
  category: PartnerCategory
  logoUrl?: string
  imageUrl?: string
  address: string
  city: string
  zipCode: string
  latitude?: number
  longitude?: number
  phone?: string
  email?: string
  website?: string
  advantages: string[]
  pointsRequired?: number
  discount?: string
  isActive: boolean
  isFeatured: boolean
}

export interface BorneFormData {
  name: string
  address: string
  city: string
  zipCode: string
  latitude: number
  longitude: number
  status: BorneStatus
  capacity?: number
  description?: string
  imageUrl?: string
  isActive: boolean
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
