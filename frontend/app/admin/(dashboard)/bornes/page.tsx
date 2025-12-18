import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Plus, Edit, Trash2, MapPin, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '../../../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card'
import { Badge } from '../../../../components/ui/badge'

type Borne = {
  id: string
  name: string
  address: string
  city: string
  zipCode: string
  isActive: boolean
  createdAt: Date
}

async function getBornes(): Promise<Borne[]> {
  return await prisma.borne.findMany({
    orderBy: { name: 'asc' },
    select: {
      id: true,
      name: true,
      address: true,
      city: true,
      zipCode: true,
      isActive: true,
      createdAt: true,
    },
  })
}

export default async function BornesPage() {
  const bornes = await getBornes()
  const activeCount = bornes.filter(b => b.isActive).length
  const inactiveCount = bornes.filter(b => !b.isActive).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bornes</h1>
          <p className="text-gray-600 mt-1">
            Gérez les bornes de collecte Cliiink
          </p>
        </div>
        <Link href="/admin/bornes/nouveau">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter une borne
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{bornes.length}</p>
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
                <p className="text-sm text-gray-600">Actives</p>
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
                <p className="text-sm text-gray-600">Inactives</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des bornes</CardTitle>
        </CardHeader>
        <CardContent>
          {bornes.length === 0 ? (
            <div className="text-center py-12">
              <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">Aucune borne enregistrée</p>
              <Link href="/admin/bornes/nouveau">
                <Button className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter une borne
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Nom</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Adresse</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Commune</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Statut</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bornes.map((borne) => (
                    <tr key={borne.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <p className="font-medium text-gray-900">{borne.name}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-gray-600">{borne.address}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-gray-600">{borne.city} {borne.zipCode}</p>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={borne.isActive ? 'default' : 'secondary'}>
                          {borne.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/bornes/${borne.id}`}>
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
