"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { Calendar, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Tag } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Card, CardContent } from '../../../components/ui/card'
import { formatDate, getCategoryLabel } from '../../../lib/utils'
import { getArticleBySlug, getArticles, type Article } from '../../../lib/api'

export default function ArticlePage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [article, setArticle] = useState<Article | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return

    setIsLoading(true)
    setError(null)

    // Fetch article
    getArticleBySlug(slug)
      .then((data) => {
        setArticle(data)
        // Fetch related articles (same category)
        return getArticles({ category: data.category, limit: 3 })
      })
      .then((related) => {
        setRelatedArticles(related.filter((a) => a.slug !== slug))
      })
      .catch((err) => {
        console.error('Error fetching article:', err)
        setError('Article non trouvé')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [slug])

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    if (!content) return null
    return content
      .split('\n')
      .map((line, index) => {
        // Headers
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-3xl font-bold text-gray-900 mb-4 mt-8">{line.slice(2)}</h1>
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-bold text-gray-800 mb-3 mt-6">{line.slice(3)}</h2>
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-semibold text-gray-800 mb-2 mt-4">{line.slice(4)}</h3>
        }
        // Lists
        if (line.startsWith('- ')) {
          return <li key={index} className="text-gray-600 ml-4">{line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>
        }
        if (/^\d+\. /.test(line)) {
          return <li key={index} className="text-gray-600 ml-4 list-decimal">{line.replace(/^\d+\. /, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>
        }
        // Blockquote
        if (line.startsWith('> ')) {
          return <blockquote key={index} className="border-l-4 border-primary pl-4 italic text-gray-600 my-4">{line.slice(2)}</blockquote>
        }
        // Italic
        if (line.startsWith('*') && line.endsWith('*')) {
          return <p key={index} className="text-gray-500 italic my-2">{line.slice(1, -1)}</p>
        }
        // Empty line
        if (line.trim() === '') {
          return <br key={index} />
        }
        // Tables (basic)
        if (line.startsWith('|')) {
          return null // Skip table lines for simplicity
        }
        // Regular paragraph
        return <p key={index} className="text-gray-600 leading-relaxed my-2" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>') }} />
      })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Article non trouvé</h1>
        <Button asChild>
          <Link href="/actualites">Retour aux actualités</Link>
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
            href="/actualites"
            className="inline-flex items-center text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux actualités
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <section className="bg-white">
        <div className="container-custom py-12">
          <div className="max-w-3xl mx-auto">
            {/* Category & Date */}
            <div className="flex items-center gap-4 mb-6">
              <Badge className="bg-primary">
                {getCategoryLabel(article.category)}
              </Badge>
              <span className="text-gray-500 flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                {article.publishedAt ? formatDate(new Date(article.publishedAt)) : '-'}
              </span>
              {article.views && (
                <span className="text-gray-400 text-sm">
                  {article.views} vues
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {article.title}
            </h1>

            {/* Excerpt */}
            {article.excerpt && (
              <p className="text-xl text-gray-600 mb-6">
                {article.excerpt}
              </p>
            )}

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {article.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Share */}
            <div className="flex items-center gap-4 pt-6 border-t">
              <span className="text-gray-500 text-sm">Partager :</span>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="bg-gradient-to-br from-primary/20 to-eco-dark/20 py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto flex items-center justify-center">
            {article.imageUrl ? (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <span className="text-9xl">📰</span>
            )}
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div className="prose-content">
                {article.content ? renderContent(article.content) : (
                  <p className="text-gray-600">Contenu de l&apos;article à venir...</p>
                )}
              </div>
            </div>

            {/* Author */}
            <div className="mt-8 bg-white rounded-xl p-6 flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {article.author?.name || article.authorName || 'Équipe Cliiink'}
                </p>
                <p className="text-gray-500 text-sm">Équipe Cliiink Réunion</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Articles similaires
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedArticles.slice(0, 2).map((related) => (
                  <Link key={related.id} href={`/actualites/${related.slug}`}>
                    <Card hover className="p-6">
                      <Badge className="mb-3">
                        {getCategoryLabel(related.category)}
                      </Badge>
                      <h3 className="font-semibold text-gray-900 hover:text-primary transition-colors">
                        {related.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-2">
                        {related.publishedAt ? formatDate(new Date(related.publishedAt)) : '-'}
                      </p>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
