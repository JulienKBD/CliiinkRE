import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Plus, Edit, Trash2, Users, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '../../../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card'
import { Badge } from '../../../../components/ui/badge'

type Partner = {
  id: string
  name: string
  slug: string
  category: string
  city: string
  discount: string | null
  isActive: boolean
  createdAt: Date
}

async function getPartners(): Promise<Partner[]> {
  return await prisma.partner.findMany({
    orderBy: { name: 'asc' },
    select: {
      id: true,
      name: true,
      slug: true,
      category: true,
      city: true,
      discount: true,
      isActive: true,
      createdAt: true,
    },
  })
}

const categoryLabels: Record<string, string> = {
  RESTAURANT: 'Restaurant',
  BAR: 'Bar',
  CAFE: 'Café',
  BOUTIQUE: 'Boutique',
  SUPERMARCHE: 'Supermarché',
  LOISIRS: 'Loisirs',
  BEAUTE: 'Beauté',
  SERVICES: 'Services',
  AUTRE: 'Autre',
}

export default async function PartenairesPage() {
  const partners = await getPartners()
  const activeCount = partners.filter(p => p.isActive).length
  const inactiveCount = partners.filter(p => !p.isActive).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Partenaires</h1>
          <p className="text-gray-600 mt-1">
            Gérez les commerçants partenaires
          </p>
        </div>
        <Link href="/admin/partenaires/nouveau">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un partenaire
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{partners.length}</p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeCount}</p>
                <p className="text-sm text-gray-600">Actifs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <XCircle className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{inactiveCount}</p>
                <p className="text-sm text-gray-600">Inactifs</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des partenaires</CardTitle>
        </CardHeader>
        <CardContent>
          {partners.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">Aucun partenaire enregistré</p>
              <Link href="/admin/partenaires/nouveau">
                <Button className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un partenaire
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Nom</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Catégorie</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Commune</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Récompense</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Statut</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {partners.map((partner) => (
                    <tr key={partner.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <p className="font-medium text-gray-900">{partner.name}</p>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline">
                          {categoryLabels[partner.category] || partner.category}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-gray-600">{partner.city || '-'}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-gray-600 truncate max-w-[200px]">{partner.discount || '-'}</p>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={partner.isActive ? 'default' : 'secondary'}>
                          {partner.isActive ? 'Actif' : 'Inactif'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/partenaires/${partner.id}`}>
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
