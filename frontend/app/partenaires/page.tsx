"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Gift, ExternalLink, Search, Filter } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { getCategoryLabel } from '../../lib/utils'
import { getPartners, type Partner } from '../../lib/api'

const categories = [
  { value: 'ALL', label: 'Toutes les catégories', emoji: '🏪' },
  { value: 'RESTAURANT', label: 'Restaurants', emoji: '🍽️' },
  { value: 'BAR', label: 'Bars', emoji: '🍹' },
  { value: 'CAFE', label: 'Cafés', emoji: '☕' },
  { value: 'BOUTIQUE', label: 'Boutiques', emoji: '🛍️' },
  { value: 'SUPERMARCHE', label: 'Supermarchés', emoji: '🛒' },
  { value: 'BEAUTE', label: 'Beauté & Bien-être', emoji: '💆' },
  { value: 'LOISIRS', label: 'Loisirs', emoji: '🎮' },
  { value: 'SERVICES', label: 'Services', emoji: '🔧' },
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

export default function PartenairesPage() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const params = selectedCategory !== 'ALL' ? { category: selectedCategory, isActive: true } : { isActive: true }
    getPartners(params)
      .then((data) => {
        setPartners(data)
      })
      .catch((err) => {
        console.error('Error fetching partners:', err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [selectedCategory])

  const featuredPartners = partners.filter((p) => p.isFeatured)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary via-secondary-400 to-reward-dark text-white">
        <div className="container-custom py-16">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
              Récompenses
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Nos partenaires commerçants
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Échangez vos points Cliiink contre des réductions et avantages 
              exclusifs chez nos partenaires locaux.
            </p>
            <div className="flex items-center gap-6 text-white/80">
              <div className="flex items-center">
                <span className="text-3xl font-bold mr-2">{partners.length}+</span>
                <span className="text-sm">partenaires</span>
              </div>
              <div className="w-px h-10 bg-white/30" />
              <div className="flex items-center">
                <span className="text-3xl font-bold mr-2">
                  {new Set(partners.map(p => p.city)).size}
                </span>
                <span className="text-sm">villes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b sticky top-20 z-20">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={cat.value === selectedCategory ? 'default' : 'outline'}
                size="sm"
                className="whitespace-nowrap"
                onClick={() => setSelectedCategory(cat.value)}
              >
                <span className="mr-2">{cat.emoji}</span>
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <div className="container-custom py-12">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Featured Partners */}
            {featuredPartners.length > 0 && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  🌟 Partenaires en vedette
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredPartners.map((partner) => (
                    <Link key={partner.id} href={`/partenaires/${partner.slug}`}>
                      <Card hover className="h-full overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-secondary/10 to-reward-light p-6 relative">
                          <div className="absolute top-4 right-4">
                            <Badge variant="secondary">En vedette</Badge>
                          </div>
                          <div className="w-20 h-20 bg-white rounded-xl shadow-md flex items-center justify-center mb-4">
                            {partner.logoUrl ? (
                              <Image
                                src={partner.logoUrl}
                                alt={partner.name}
                                width={64}
                                height={64}
                                className="object-contain"
                              />
                            ) : (
                              <span className="text-4xl">
                                {categoryEmojis[partner.category] || '📦'}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">
                            {getCategoryLabel(partner.category)}
                          </p>
                          <h3 className="text-xl font-bold text-gray-900">
                            {partner.name}
                          </h3>
                        </div>

                        <CardContent className="p-6">
                          <p className="text-gray-600 mb-4">{partner.description}</p>

                          {/* Location */}
                          <div className="flex items-start text-sm text-gray-500 mb-4">
                            <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{partner.address}, {partner.city}</span>
                          </div>

                          {/* Discount highlight */}
                          <div className="bg-secondary/10 rounded-lg p-4 mb-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-500">Avantage</p>
                                <p className="text-xl font-bold text-secondary">
                                  {partner.discount}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-500">À partir de</p>
                                <p className="font-semibold text-gray-900">
                                  {partner.pointsRequired} pts
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Advantages */}
                          {partner.advantages && partner.advantages.length > 0 && (
                            <div className="space-y-2">
                              {partner.advantages.slice(0, 2).map((adv, i) => (
                                <div key={i} className="flex items-center text-sm text-gray-600">
                                  <Gift className="h-4 w-4 mr-2 text-secondary" />
                                  {adv}
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* All Partners */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory === 'ALL' ? 'Tous les partenaires' : getCategoryLabel(selectedCategory)}
                </h2>
                <p className="text-gray-500">{partners.length} partenaires</p>
              </div>

              {partners.length === 0 ? (
                <p className="text-center text-gray-500 py-12">Aucun partenaire trouvé</p>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {partners.map((partner) => (
                    <Link key={partner.id} href={`/partenaires/${partner.slug}`}>
                      <Card hover className="h-full p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            {partner.logoUrl ? (
                              <Image
                                src={partner.logoUrl}
                                alt={partner.name}
                                width={40}
                                height={40}
                                className="object-contain"
                              />
                            ) : (
                              <span className="text-2xl">
                                {categoryEmojis[partner.category] || '📦'}
                              </span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 uppercase tracking-wide">
                              {getCategoryLabel(partner.category)}
                            </p>
                            <h3 className="font-bold text-gray-900 truncate">
                              {partner.name}
                            </h3>
                            <p className="text-sm text-gray-500 truncate">
                              {partner.city}
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t flex items-center justify-between">
                          <span className="text-sm font-semibold text-secondary">
                            {partner.discount}
                          </span>
                          <span className="text-xs text-gray-400">
                            {partner.pointsRequired} pts
                          </span>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        {/* CTA for merchants */}
        <section className="mt-16">
          <Card className="bg-primary text-white p-8 md:p-12">
            <div className="md:flex items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl font-bold mb-2">
                  Vous êtes commerçant ?
                </h2>
                <p className="text-white/80">
                  Rejoignez le réseau Cliiink et attirez de nouveaux clients 
                  engagés dans une démarche éco-responsable.
                </p>
              </div>
              <Button asChild variant="white" size="lg">
                <Link href="/contact?type=commercant">
                  Devenir partenaire
                </Link>
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}
