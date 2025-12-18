"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowRight, Tag, Search } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { formatDate, getCategoryLabel } from '../../lib/utils'
import { getArticles, type Article } from '../../lib/api'

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
  const [articles, setArticles] = useState<Article[]>([])
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const params = selectedCategory !== 'ALL' ? { category: selectedCategory } : undefined
    getArticles(params)
      .then((data) => {
        setArticles(data)
      })
      .catch((err) => {
        console.error('Error fetching articles:', err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [selectedCategory])

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
                variant={cat.value === selectedCategory ? 'default' : 'outline'}
                size="sm"
                className="whitespace-nowrap"
                onClick={() => setSelectedCategory(cat.value)}
              >
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
            {/* Featured Article */}
            {featuredArticle && (
              <section className="mb-16">
                <Link href={`/actualites/${featuredArticle.slug}`} className="group">
                  <Card hover className="overflow-hidden">
                    <div className="grid md:grid-cols-2">
                      {/* Image */}
                      <div className="relative aspect-[16/10] md:aspect-auto bg-gradient-to-br from-primary/20 to-eco-dark/20 flex items-center justify-center">
                        {featuredArticle.imageUrl ? (
                          <Image
                            src={featuredArticle.imageUrl}
                            alt={featuredArticle.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <span className="text-8xl">📰</span>
                        )}
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
                          {featuredArticle.publishedAt ? formatDate(new Date(featuredArticle.publishedAt)) : '-'}
                        </div>

                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                          {featuredArticle.title}
                        </h2>

                        <p className="text-gray-600 text-lg mb-6">
                          {featuredArticle.excerpt}
                        </p>

                        {featuredArticle.tags && featuredArticle.tags.length > 0 && (
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
                        )}

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
                {selectedCategory === 'ALL' ? 'Tous les articles' : getCategoryLabel(selectedCategory)}
              </h2>

              {otherArticles.length === 0 ? (
                <p className="text-center text-gray-500 py-12">Aucun article trouvé</p>
              ) : (
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
                          {article.imageUrl ? (
                            <Image
                              src={article.imageUrl}
                              alt={article.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <span className="text-6xl">📄</span>
                          )}
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
                            {article.publishedAt ? formatDate(new Date(article.publishedAt)) : '-'}
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
              )}
            </section>
          </>
        )}
      </div>
    </div>
  )
}
