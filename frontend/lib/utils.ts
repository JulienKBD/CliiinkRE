import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options,
  })
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    // Article categories
    EVENEMENT: 'Événement',
    TRI: 'Tri & Recyclage',
    PARTENAIRES: 'Partenaires',
    RESULTATS: 'Résultats',
    ACTUALITE: 'Actualité',
    CONSEILS: 'Conseils',
    // Partner categories
    RESTAURANT: 'Restaurant',
    BAR: 'Bar',
    CAFE: 'Café',
    BOUTIQUE: 'Boutique',
    SUPERMARCHE: 'Supermarché',
    LOISIRS: 'Loisirs',
    BEAUTE: 'Beauté & Bien-être',
    SERVICES: 'Services',
    AUTRE: 'Autre',
  }
  return labels[category] || category
}

export function getBorneStatusLabel(status: string): { label: string; color: string } {
  const statuses: Record<string, { label: string; color: string }> = {
    ACTIVE: { label: 'Disponible', color: 'bg-green-500' },
    MAINTENANCE: { label: 'En maintenance', color: 'bg-orange-500' },
    FULL: { label: 'Pleine', color: 'bg-red-500' },
    INACTIVE: { label: 'Hors service', color: 'bg-gray-500' },
  }
  return statuses[status] || { label: status, color: 'bg-gray-500' }
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
