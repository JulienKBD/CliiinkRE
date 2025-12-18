import Link from 'next/link'
import { getArticlesAdmin } from '@/lib/api'
import { Plus, Edit, Trash2, FileText, Eye, EyeOff, Star } from 'lucide-react'
import { Button } from '../../../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card'
import { Badge } from '../../../../components/ui/badge'

type Article = {
  id: string
  title: string
  slug: string
  category: string
  isPublished: boolean
  isFeatured: boolean
  publishedAt: string | null
  createdAt: string
  author: {
    name: string | null
  }
}

async function fetchArticles(): Promise<Article[]> {
  try {
    const articles = await getArticlesAdmin()
    return articles.map(a => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      category: a.category,
      isPublished: a.isPublished,
      isFeatured: a.isFeatured,
      publishedAt: a.publishedAt,
      createdAt: a.createdAt,
      author: { name: a.authorName || a.author?.name || null },
    }))
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

const categoryLabels: Record<string, string> = {
  ACTUALITE: 'Actualité',
  ENVIRONNEMENT: 'Environnement',
  PARTENAIRES: 'Partenaires',
  EVENEMENT: 'Événement',
  CONSEILS: 'Conseils',
}

export default async function ActualitesPage() {
  const articles = await fetchArticles()
  const publishedCount = articles.filter(a => a.isPublished).length
  const draftCount = articles.filter(a => !a.isPublished).length
  const featuredCount = articles.filter(a => a.isFeatured).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Actualités</h1>
          <p className="text-gray-600 mt-1">
            Gérez les articles du blog
          </p>
        </div>
        <Link href="/admin/actualites/nouveau">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nouvel article
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{articles.length}</p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{publishedCount}</p>
                <p className="text-sm text-gray-600">Publiés</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <EyeOff className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{draftCount}</p>
                <p className="text-sm text-gray-600">Brouillons</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{featuredCount}</p>
                <p className="text-sm text-gray-600">À la une</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des articles</CardTitle>
        </CardHeader>
        <CardContent>
          {articles.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">Aucun article rédigé</p>
              <Link href="/admin/actualites/nouveau">
                <Button className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvel article
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Titre</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Catégorie</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Auteur</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Statut</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((article) => (
                    <tr key={article.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900 truncate max-w-[250px]">
                            {article.title}
                          </p>
                          {article.isFeatured && (
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline">
                          {categoryLabels[article.category] || article.category}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-gray-600">{article.author?.name || '-'}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-gray-600">
                          {article.publishedAt 
                            ? new Date(article.publishedAt).toLocaleDateString('fr-FR')
                            : new Date(article.createdAt).toLocaleDateString('fr-FR')
                          }
                        </p>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={article.isPublished ? 'default' : 'secondary'}>
                          {article.isPublished ? 'Publié' : 'Brouillon'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/actualites/${article.slug}`} target="_blank">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={`/admin/actualites/${article.id}`}>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
