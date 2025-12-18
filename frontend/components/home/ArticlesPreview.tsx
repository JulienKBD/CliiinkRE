"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar, Tag } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { formatDate, getCategoryLabel } from '../../lib/utils'
import { getArticles, type Article } from '../../lib/api'

export default function ArticlesPreview() {
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    getArticles({ limit: 3 })
      .then((data) => {
        setArticles(data)
      })
      .catch((err) => {
        console.error('Error fetching articles:', err)
      })
  }, [])

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Actualités
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Les dernières nouvelles
            </h2>
          </div>
          <Button asChild variant="ghost" className="mt-4 md:mt-0">
            <Link href="/actualites">
              Voir toutes les actualités
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/actualites/${article.slug}`}
              className="group"
            >
              <Card hover className="overflow-hidden h-full">
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  {article.imageUrl ? (
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-eco-dark/20 flex items-center justify-center">
                      <span className="text-6xl">📰</span>
                    </div>
                  )}
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <Badge variant="default">
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
                  
                  <p className="text-gray-600 line-clamp-2">
                    {article.excerpt}
                  </p>

                  <div className="mt-4 flex items-center text-primary font-medium">
                    Lire la suite
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
