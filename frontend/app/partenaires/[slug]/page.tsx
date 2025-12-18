import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
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

// Sample data - will be replaced with database calls
const partnersData: Record<string, any> = {
  'le-comptoir-creole': {
    id: '1',
    name: 'Le Comptoir Créole',
    slug: 'le-comptoir-creole',
    description: 'Restaurant traditionnel réunionnais',
    longDescription: 'Découvrez les saveurs authentiques de La Réunion dans ce restaurant familial. Cari, rougail, et spécialités locales vous attendent dans une ambiance chaleureuse et conviviale. Notre chef met un point d\'honneur à utiliser des produits locaux et de saison pour vous offrir le meilleur de la cuisine créole.',
    category: 'RESTAURANT',
    address: '45 Rue Pasteur',
    city: 'Saint-Denis',
    zipCode: '97400',
    latitude: -20.8792,
    longitude: 55.4456,
    phone: '0262 21 45 67',
    email: 'contact@comptoircreole.re',
    advantages: [
      '10% de réduction sur l\'addition',
      'Apéritif offert à partir de 50€ d\'achat',
      'Dessert offert pour votre anniversaire',
    ],
    pointsRequired: 100,
    discount: '-10%',
    isActive: true,
    isFeatured: true,
  },
  'ti-punch-bar': {
    id: '2',
    name: 'Ti Punch Bar',
    slug: 'ti-punch-bar',
    description: 'Bar ambiance tropicale',
    longDescription: 'Le meilleur rhum arrangé de l\'île ! Ambiance conviviale et musicale tous les weekends. Notre carte propose plus de 30 variétés de rhums arrangés maison, des cocktails exotiques et une sélection de tapas créoles.',
    category: 'BAR',
    address: '12 Front de Mer',
    city: 'Saint-Pierre',
    zipCode: '97410',
    latitude: -21.3401,
    longitude: 55.4789,
    phone: '0262 35 78 90',
    advantages: [
      '1 Ti Punch offert pour 200 points',
      'Happy Hour prolongé jusqu\'à 20h',
      '-15% sur les cocktails',
    ],
    pointsRequired: 200,
    discount: '1 boisson offerte',
    isActive: true,
    isFeatured: true,
  },
  'boutique-vanille-bourbon': {
    id: '3',
    name: 'Boutique Vanille Bourbon',
    slug: 'boutique-vanille-bourbon',
    description: 'Épicerie fine et produits locaux',
    longDescription: 'Vanille, épices, confitures artisanales et produits du terroir réunionnais. Nous sélectionnons avec soin les meilleurs producteurs de l\'île pour vous offrir des produits d\'exception.',
    category: 'BOUTIQUE',
    address: '8 Rue du Commerce',
    city: 'Saint-Paul',
    zipCode: '97460',
    latitude: -21.0098,
    longitude: 55.2715,
    phone: '0262 22 33 44',
    website: 'https://vanille-bourbon.re',
    advantages: [
      '15% sur les achats',
      'Échantillon vanille offert',
      'Livraison gratuite dès 50€',
    ],
    pointsRequired: 150,
    discount: '-15%',
    isActive: true,
    isFeatured: true,
  },
  'cafe-des-iles': {
    id: '4',
    name: 'Café des Îles',
    slug: 'cafe-des-iles',
    description: 'Café torréfié localement',
    longDescription: 'Café Bourbon pointu et autres variétés torréfiées sur place. Espace dégustation et vente de café en grains ou moulu.',
    category: 'CAFE',
    address: '3 Place de l\'Église',
    city: 'Sainte-Marie',
    zipCode: '97438',
    latitude: -20.8975,
    longitude: 55.5350,
    phone: '0262 53 21 00',
    advantages: [
      'Café offert',
      '10% sur les sachets de café',
    ],
    pointsRequired: 50,
    discount: 'Café offert',
    isActive: true,
    isFeatured: false,
  },
  'super-u-saint-denis': {
    id: '5',
    name: 'Super U Saint-Denis',
    slug: 'super-u-saint-denis',
    description: 'Supermarché partenaire',
    longDescription: 'Votre supermarché de proximité, engagé dans la démarche éco-responsable. Large choix de produits locaux et bio.',
    category: 'SUPERMARCHE',
    address: 'Centre Commercial Californie',
    city: 'Saint-Denis',
    zipCode: '97400',
    latitude: -20.8850,
    longitude: 55.4520,
    phone: '0262 20 10 20',
    advantages: [
      'Bons de réduction',
      '5% de remise immédiate',
      'Points doublés le samedi',
    ],
    pointsRequired: 300,
    discount: '5€ en bon d\'achat',
    isActive: true,
    isFeatured: false,
  },
  'spa-lagon-bleu': {
    id: '6',
    name: 'Spa Lagon Bleu',
    slug: 'spa-lagon-bleu',
    description: 'Centre de bien-être et spa',
    longDescription: 'Massages, soins du corps, hammam et sauna dans un cadre relaxant face au lagon. Notre équipe de professionnels vous accueille pour une parenthèse de détente.',
    category: 'BEAUTE',
    address: '20 Route des Plages',
    city: 'Saint-Gilles',
    zipCode: '97434',
    latitude: -21.0667,
    longitude: 55.2167,
    phone: '0262 24 56 78',
    website: 'https://spa-lagonbleu.re',
    advantages: [
      '20% sur le premier soin',
      'Accès hammam offert',
      'Produit de soin offert dès 100€',
    ],
    pointsRequired: 500,
    discount: '-20%',
    isActive: true,
    isFeatured: true,
  },
}

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

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const partner = partnersData[params.slug]

  if (!partner) {
    return {
      title: 'Partenaire non trouvé',
    }
  }

  return {
    title: partner.name,
    description: `${partner.description} - ${partner.discount} avec vos points Cliiink. ${partner.address}, ${partner.city}.`,
    openGraph: {
      title: `${partner.name} | Partenaire Cliiink Réunion`,
      description: partner.description,
    },
  }
}

export default function PartnerPage({ params }: PageProps) {
  const partner = partnersData[params.slug]

  if (!partner) {
    notFound()
  }

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${partner.address}, ${partner.zipCode} ${partner.city}`
  )}`

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
      <section className="bg-gradient-to-br from-secondary/10 to-reward-light">
        <div className="container-custom py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main info */}
            <div className="lg:col-span-2">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-5xl">
                    {categoryEmojis[partner.category]}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Badge>{getCategoryLabel(partner.category)}</Badge>
                    {partner.isFeatured && (
                      <Badge variant="secondary">
                        <Star className="h-3 w-3 mr-1" />
                        En vedette
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {partner.name}
                  </h1>
                  <p className="text-xl text-gray-600">
                    {partner.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Discount card */}
            <div>
              <Card className="bg-white shadow-xl">
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">Avantage Cliiink</p>
                    <p className="text-4xl font-bold text-secondary mb-2">
                      {partner.discount}
                    </p>
                    <p className="text-gray-600">
                      À partir de <span className="font-semibold">{partner.pointsRequired} points</span>
                    </p>
                  </div>
                  <div className="mt-6 pt-6 border-t">
                    <Button className="w-full" size="lg">
                      <Gift className="h-5 w-5 mr-2" />
                      Utiliser mes points
                    </Button>
                    <p className="text-xs text-gray-400 text-center mt-2">
                      Via l&apos;application Cliiink
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container-custom py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  À propos
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {partner.longDescription}
                </p>
              </CardContent>
            </Card>

            {/* Advantages */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Avantages Cliiink
                </h2>
                <div className="space-y-4">
                  {partner.advantages.map((advantage: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-secondary/5 rounded-xl"
                    >
                      <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                        <Gift className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{advantage}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Présentez votre QR code Cliiink en caisse
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* How to use */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Comment utiliser vos points ?
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl font-bold text-primary">1</span>
                    </div>
                    <p className="font-medium text-gray-900">Ouvrez l&apos;app</p>
                    <p className="text-sm text-gray-500">Cliiink sur votre téléphone</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl font-bold text-primary">2</span>
                    </div>
                    <p className="font-medium text-gray-900">Sélectionnez l&apos;offre</p>
                    <p className="text-sm text-gray-500">Et générez votre QR code</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl font-bold text-primary">3</span>
                    </div>
                    <p className="font-medium text-gray-900">Présentez en caisse</p>
                    <p className="text-sm text-gray-500">Et profitez de l&apos;avantage !</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact info */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Informations
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">{partner.address}</p>
                      <p className="text-gray-500">{partner.zipCode} {partner.city}</p>
                      <a
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline inline-flex items-center mt-1"
                      >
                        Voir sur Google Maps
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>

                  {partner.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <a
                        href={`tel:${partner.phone.replace(/\s/g, '')}`}
                        className="text-gray-900 hover:text-primary"
                      >
                        {partner.phone}
                      </a>
                    </div>
                  )}

                  {partner.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <a
                        href={`mailto:${partner.email}`}
                        className="text-gray-900 hover:text-primary"
                      >
                        {partner.email}
                      </a>
                    </div>
                  )}

                  {partner.website && (
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-primary" />
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-900 hover:text-primary inline-flex items-center"
                      >
                        Site web
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Share */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Partager
                </h2>
                <Button variant="outline" className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  Partager ce partenaire
                </Button>
              </CardContent>
            </Card>

            {/* Map preview */}
            <Card>
              <CardContent className="p-0 overflow-hidden">
                <div className="aspect-video bg-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="text-sm text-gray-500">{partner.city}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <Button asChild variant="outline" className="w-full">
                    <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                      Itinéraire
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
