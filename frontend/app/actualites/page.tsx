import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, ArrowRight, Tag, Search } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { formatDate, getCategoryLabel } from '../../lib/utils'

export const metadata: Metadata = {
  title: 'Actualités',
  description: 'Suivez les dernières actualités de Cliiink Réunion : événements, résultats du tri, nouveaux partenaires et conseils pour mieux recycler.',
  openGraph: {
    title: 'Actualités | Cliiink Réunion',
    description: 'Suivez les dernières actualités de Cliiink Réunion.',
  },
}

// Sample data - will be replaced with database data
const articles = [
  {
    id: '1',
    title: 'Lancement de Cliiink à La Réunion !',
    slug: 'lancement-cliiink-reunion',
    excerpt: 'Le dispositif Cliiink arrive enfin sur notre île. Découvrez comment gagner des récompenses en triant vos bouteilles en verre.',
    imageUrl: '/images/articles/launch.jpg',
    category: 'ACTUALITE',
    tags: ['lancement', 'cliiink', 'réunion'],
    publishedAt: new Date('2024-11-15'),
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Nos partenaires commerçants vous récompensent',
    slug: 'partenaires-commercants-recompenses',
    excerpt: 'Plus de 20 commerçants locaux vous offrent des réductions exclusives grâce à vos points Cliiink.',
    imageUrl: '/images/articles/partners.jpg',
    category: 'PARTENAIRES',
    tags: ['partenaires', 'récompenses'],
    publishedAt: new Date('2024-11-20'),
    isFeatured: true,
  },
  {
    id: '3',
    title: '10 conseils pour bien trier le verre',
    slug: '10-conseils-bien-trier-verre',
    excerpt: 'Adoptez les bons réflexes pour un tri efficace et maximisez vos points Cliiink.',
    imageUrl: '/images/articles/tips.jpg',
    category: 'CONSEILS',
    tags: ['conseils', 'tri', 'recyclage'],
    publishedAt: new Date('2024-11-25'),
    isFeatured: false,
  },
  {
    id: '4',
    title: 'Résultats du premier mois : 5 tonnes de verre collectées !',
    slug: 'resultats-premier-mois-5-tonnes',
    excerpt: 'Un mois après le lancement, les Réunionnais ont déjà adopté le réflexe Cliiink.',
    imageUrl: '/images/articles/results.jpg',
    category: 'RESULTATS',
    tags: ['résultats', 'statistiques'],
    publishedAt: new Date('2024-12-01'),
    isFeatured: true,
  },
]

const categories = [
  { value: 'ALL', label: 'Toutes les catégories' },
  { value: 'ACTUALITE', label: 'Actualités' },
  { value: 'EVENEMENT', label: 'Événements' },
  { value: 'PARTENAIRES', label: 'Partenaires' },
  { value: 'RESULTATS', label: 'Résultats' },
  { value: 'CONSEILS', label: 'Conseils' },
  { value: 'TRI', label: 'Tri & Recyclage' },
]

const categoryColors: Record<string, string> = {
  ACTUALITE: 'bg-blue-500',
  EVENEMENT: 'bg-purple-500',
  PARTENAIRES: 'bg-secondary',
  RESULTATS: 'bg-green-500',
  CONSEILS: 'bg-primary',
  TRI: 'bg-eco-dark',
}

export default function ActualitesPage() {
  // Featured article
  const featuredArticle = articles.find((a) => a.isFeatured)
  const otherArticles = articles.filter((a) => a.id !== featuredArticle?.id)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-white border-b">
        <div className="container-custom py-12">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Blog
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Actualités
            </h1>
            <p className="text-xl text-gray-600">
              Suivez les dernières nouvelles de Cliiink Réunion : événements, 
              résultats du tri, nouveaux partenaires et conseils pour mieux recycler.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white border-b sticky top-20 z-20">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={cat.value === 'ALL' ? 'default' : 'outline'}
                size="sm"
                className="whitespace-nowrap"
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <div className="container-custom py-12">
        {/* Featured Article */}
        {featuredArticle && (
          <section className="mb-16">
            <Link href={`/actualites/${featuredArticle.slug}`} className="group">
              <Card hover className="overflow-hidden">
                <div className="grid md:grid-cols-2">
                  {/* Image */}
                  <div className="relative aspect-[16/10] md:aspect-auto bg-gradient-to-br from-primary/20 to-eco-dark/20 flex items-center justify-center">
                    <span className="text-8xl">📰</span>
                    <div className="absolute top-4 left-4">
                      <Badge className={categoryColors[featuredArticle.category]}>
                        {getCategoryLabel(featuredArticle.category)}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary">À la une</Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-8 flex flex-col justify-center">
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(featuredArticle.publishedAt)}
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                      {featuredArticle.title}
                    </h2>

                    <p className="text-gray-600 text-lg mb-6">
                      {featuredArticle.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredArticle.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center text-primary font-semibold">
                      Lire l&apos;article
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </section>
        )}

        {/* Articles Grid */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Tous les articles
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherArticles.map((article) => (
              <Link
                key={article.id}
                href={`/actualites/${article.slug}`}
                className="group"
              >
                <Card hover className="overflow-hidden h-full">
                  {/* Image */}
                  <div className="relative aspect-[16/10] bg-gradient-to-br from-primary/10 to-eco-dark/10 flex items-center justify-center">
                    <span className="text-6xl">📄</span>
                    <div className="absolute top-3 left-3">
                      <Badge className={categoryColors[article.category]}>
                        {getCategoryLabel(article.category)}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(article.publishedAt)}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 line-clamp-3 mb-4">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center text-primary font-medium">
                      Lire la suite
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Load more */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Charger plus d&apos;articles
          </Button>
        </div>
      </div>
    </div>
  )
}
