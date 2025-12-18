import { prisma } from '@/lib/prisma'
import { MessageSquare, Mail, Phone, Building2, User, Check, Trash2 } from 'lucide-react'
import { Button } from '../../../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card'
import { Badge } from '../../../../components/ui/badge'

type ContactMessage = {
  id: string
  name: string
  email: string
  phone: string | null
  companyName: string | null
  position: string | null
  message: string
  type: string
  isRead: boolean
  createdAt: Date
}

async function getMessages(): Promise<ContactMessage[]> {
  return await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      companyName: true,
      position: true,
      message: true,
      type: true,
      isRead: true,
      createdAt: true,
    },
  })
}

export default async function MessagesPage() {
  const messages = await getMessages()
  const unreadCount = messages.filter(m => !m.isRead).length
  const particulierCount = messages.filter(m => m.type === 'PARTICULIER').length
  const commercantCount = messages.filter(m => m.type === 'COMMERCANT').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-600 mt-1">
          Consultez et gérez les messages reçus via le formulaire de contact
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{messages.length}</p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Mail className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{unreadCount}</p>
                <p className="text-sm text-gray-600">Non lus</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <User className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{particulierCount}</p>
                <p className="text-sm text-gray-600">Particuliers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Building2 className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{commercantCount}</p>
                <p className="text-sm text-gray-600">Commerçants</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messages list */}
      <Card>
        <CardHeader>
          <CardTitle>Tous les messages</CardTitle>
        </CardHeader>
        <CardContent>
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">Aucun message reçu</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 rounded-lg border ${
                    message.isRead ? 'bg-white' : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      {/* Header */}
                      <div className="flex items-center gap-2 mb-2">
                        {!message.isRead && (
                          <span className="w-2 h-2 bg-primary rounded-full" />
                        )}
                        <Badge variant={message.type === 'COMMERCANT' ? 'default' : 'outline'}>
                          {message.type === 'COMMERCANT' ? (
                            <>
                              <Building2 className="h-3 w-3 mr-1" />
                              Commerçant
                            </>
                          ) : (
                            <>
                              <User className="h-3 w-3 mr-1" />
                              Particulier
                            </>
                          )}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {new Date(message.createdAt).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>

                      {/* Sender info */}
                      <div className="mb-3">
                        {message.companyName && (
                          <p className="font-semibold text-gray-900">{message.companyName}</p>
                        )}
                        <p className="font-medium text-gray-900">
                          {message.name}
                          {message.position && (
                            <span className="font-normal text-gray-500"> - {message.position}</span>
                          )}
                        </p>
                        <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-600">
                          <a href={`mailto:${message.email}`} className="flex items-center gap-1 hover:text-primary">
                            <Mail className="h-4 w-4" />
                            {message.email}
                          </a>
                          {message.phone && (
                            <a href={`tel:${message.phone}`} className="flex items-center gap-1 hover:text-primary">
                              <Phone className="h-4 w-4" />
                              {message.phone}
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Message */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex sm:flex-col gap-2">
                      {!message.isRead && (
                        <Button variant="outline" size="sm">
                          <Check className="h-4 w-4 mr-1" />
                          Marquer lu
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4 mr-1" />
                        Répondre
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Supprimer
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
