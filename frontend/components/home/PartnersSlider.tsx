"use client"

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../ui/button'
import { getCategoryLabel } from '../../lib/utils'

// Sample partners - will be replaced with database data
const partners = [
  {
    id: '1',
    name: 'Le Comptoir Créole',
    slug: 'le-comptoir-creole',
    category: 'RESTAURANT',
    discount: '-10%',
    logoUrl: null,
  },
  {
    id: '2',
    name: 'Ti Punch Bar',
    slug: 'ti-punch-bar',
    category: 'BAR',
    discount: '1 boisson offerte',
    logoUrl: null,
  },
  {
    id: '3',
    name: 'Boutique Vanille Bourbon',
    slug: 'boutique-vanille-bourbon',
    category: 'BOUTIQUE',
    discount: '-15%',
    logoUrl: null,
  },
  {
    id: '4',
    name: 'Café des Îles',
    slug: 'cafe-des-iles',
    category: 'CAFE',
    discount: 'Café offert',
    logoUrl: null,
  },
  {
    id: '5',
    name: 'Super U Saint-Denis',
    slug: 'super-u-saint-denis',
    category: 'SUPERMARCHE',
    discount: '5€ en bon d\'achat',
    logoUrl: null,
  },
  {
    id: '6',
    name: 'Spa Lagon Bleu',
    slug: 'spa-lagon-bleu',
    category: 'BEAUTE',
    discount: '-20%',
    logoUrl: null,
  },
]

const categoryEmojis: Record<string, string> = {
  RESTAURANT: '🍽️',
  BAR: '🍹',
  CAFE: '☕',
  BOUTIQUE: '🛍️',
  SUPERMARCHE: '🛒',
  LOISIRS: '🎮',
  BEAUTE: '💆',
  SERVICES: '🔧',
  AUTRE: '📦',
}

export default function PartnersSlider() {
  const sliderRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 300
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="inline-block px-4 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
              Partenaires
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Nos commerçants partenaires
            </h2>
            <p className="text-gray-600 mt-2">
              Échangez vos points contre des réductions exclusives
            </p>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <div className="flex gap-2">
              <button
                onClick={() => scroll('left')}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
                aria-label="Précédent"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
                aria-label="Suivant"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <Button asChild variant="ghost">
              <Link href="/partenaires">
                Voir tous
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Partners Slider */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory"
        >
          {partners.map((partner) => (
            <Link
              key={partner.id}
              href={`/partenaires/${partner.slug}`}
              className="flex-shrink-0 w-64 snap-start group"
            >
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 h-full group-hover:-translate-y-1">
                {/* Logo / Icon */}
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">
                    {categoryEmojis[partner.category] || '📦'}
                  </span>
                </div>

                {/* Category */}
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  {getCategoryLabel(partner.category)}
                </p>

                {/* Name */}
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {partner.name}
                </h3>

                {/* Discount */}
                <div className="inline-flex items-center px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-semibold">
                  {partner.discount}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-gray-400">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏪</span>
            <span className="text-sm">Commerces locaux</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✅</span>
            <span className="text-sm">Partenaires vérifiés</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌱</span>
            <span className="text-sm">Engagement écologique</span>
          </div>
        </div>
      </div>
    </section>
  )
}
