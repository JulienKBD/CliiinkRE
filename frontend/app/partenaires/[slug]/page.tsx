"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Gift, 
  ArrowLeft,
  ExternalLink,
  Clock,
  Star,
  Share2
} from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Card, CardContent } from '../../../components/ui/card'
import { getCategoryLabel } from '../../../lib/utils'
import { getPartnerBySlug, getPartners, type Partner } from '../../../lib/api'

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

export default function PartnerPage() {
  const params = useParams()
  const slug = params.slug as string

  const [partner, setPartner] = useState<Partner | null>(null)
  const [similarPartners, setSimilarPartners] = useState<Partner[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return

    setIsLoading(true)
    setError(null)

    getPartnerBySlug(slug)
      .then((data) => {
        setPartner(data)
        // Fetch similar partners (same category)
        return getPartners({ category: data.category, isActive: true })
      })
      .then((similar) => {
        setSimilarPartners(similar.filter((p) => p.slug !== slug).slice(0, 3))
      })
      .catch((err) => {
        console.error('Error fetching partner:', err)
        setError('Partenaire non trouvé')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [slug])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !partner) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Partenaire non trouvé</h1>
        <Button asChild>
          <Link href="/partenaires">Retour aux partenaires</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back button */}
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <Link
            href="/partenaires"
            className="inline-flex items-center text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux partenaires
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary via-secondary-400 to-reward-dark text-white">
        <div className="container-custom py-12">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            {/* Logo */}
            <div className="w-32 h-32 bg-white rounded-2xl shadow-xl flex items-center justify-center flex-shrink-0">
              {partner.logoUrl ? (
                <Image
                  src={partner.logoUrl}
                  alt={partner.name}
                  width={96}
                  height={96}
                  className="object-contain"
                />
              ) : (
                <span className="text-6xl">
                  {categoryEmojis[partner.category] || '📦'}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Badge className="bg-white/20 text-white">
                  {getCategoryLabel(partner.category)}
                </Badge>
                {partner.isFeatured && (
                  <Badge className="bg-yellow-400 text-yellow-900">
                    <Star className="h-3 w-3 mr-1" />
                    Partenaire vedette
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {partner.name}
              </h1>

              <p className="text-lg text-white/90 mb-4">
                {partner.description}
              </p>

              {/* Location */}
              <div className="flex items-center text-white/80">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{partner.address}, {partner.zipCode} {partner.city}</span>
              </div>
            </div>

            {/* Share */}
            <div>
              <Button variant="white" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardContent className="p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  À propos
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {partner.longDescription || partner.description}
                </p>
              </CardContent>
            </Card>

            {/* Advantages */}
            <Card>
              <CardContent className="p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  <Gift className="inline h-5 w-5 mr-2 text-secondary" />
                  Vos avantages Cliiink
                </h2>
                
                {/* Main discount */}
                <div className="bg-secondary/10 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Avantage principal</p>
                      <p className="text-3xl font-bold text-secondary">
                        {partner.discount}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">À partir de</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {partner.pointsRequired} <span className="text-base font-normal">points</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* All advantages */}
                {partner.advantages && partner.advantages.length > 0 && (
                  <div className="space-y-3">
                    {partner.advantages.map((advantage, index) => (
                      <div
                        key={index}
                        className="flex items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center mr-3">
                          <Gift className="h-4 w-4 text-secondary" />
                        </div>
                        <span className="text-gray-700">{advantage}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Map placeholder */}
            {partner.latitude && partner.longitude && (
              <Card>
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    <MapPin className="inline h-5 w-5 mr-2 text-primary" />
                    Localisation
                  </h2>
                  <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
                    <p className="text-gray-500">Carte à venir</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-600">
                      {partner.address}<br />
                      {partner.zipCode} {partner.city}
                    </p>
                    <Button asChild className="mt-4">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          `${partner.address}, ${partner.zipCode} ${partner.city}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MapPin className="h-4 w-4 mr-2" />
                        Voir sur Google Maps
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">Contact</h3>
                <div className="space-y-4">
                  {partner.phone && (
                    <a
                      href={`tel:${partner.phone}`}
                      className="flex items-center text-gray-600 hover:text-primary transition-colors"
                    >
                      <Phone className="h-5 w-5 mr-3 text-gray-400" />
                      {partner.phone}
                    </a>
                  )}
                  {partner.email && (
                    <a
                      href={`mailto:${partner.email}`}
                      className="flex items-center text-gray-600 hover:text-primary transition-colors"
                    >
                      <Mail className="h-5 w-5 mr-3 text-gray-400" />
                      {partner.email}
                    </a>
                  )}
                  {partner.website && (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 hover:text-primary transition-colors"
                    >
                      <Globe className="h-5 w-5 mr-3 text-gray-400" />
                      Visiter le site web
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="bg-primary text-white">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold text-lg mb-2">
                  Profitez de cette offre
                </h3>
                <p className="text-white/80 text-sm mb-4">
                  Présentez votre QR code Cliiink en caisse pour bénéficier de vos avantages.
                </p>
                <Button variant="white" className="w-full">
                  Télécharger l&apos;app
                </Button>
              </CardContent>
            </Card>

            {/* Similar partners */}
            {similarPartners.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4">
                    Partenaires similaires
                  </h3>
                  <div className="space-y-3">
                    {similarPartners.map((similar) => (
                      <Link
                        key={similar.id}
                        href={`/partenaires/${similar.slug}`}
                        className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3">
                          {similar.logoUrl ? (
                            <Image
                              src={similar.logoUrl}
                              alt={similar.name}
                              width={32}
                              height={32}
                              className="object-contain"
                            />
                          ) : (
                            <span className="text-xl">
                              {categoryEmojis[similar.category] || '📦'}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {similar.name}
                          </p>
                          <p className="text-sm text-secondary">
                            {similar.discount}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
