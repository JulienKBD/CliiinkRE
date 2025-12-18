import { prisma } from '@/lib/prisma'
import { 
  MapPin, 
  Users, 
  FileText, 
  MessageSquare,
  Recycle,
  TrendingUp,
  Award
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import Link from 'next/link'

type RecentMessage = {
  id: string
  name: string
  email: string
  type: string
  createdAt: Date
  isRead: boolean
}

type Statistics = {
  id: string
  year: number
  month: number
  totalGlassCollected: number
  totalPoints: number
  totalUsers: number
  totalPartners: number
  createdAt: Date
} | null

async function getStats(): Promise<{
  bornesCount: number
  partnersCount: number
  articlesCount: number
  messagesCount: number
  unreadMessagesCount: number
  recentMessages: RecentMessage[]
  stats: Statistics
}> {
  const [
    bornesCount,
    partnersCount,
    articlesCount,
    messagesCount,
    unreadMessagesCount,
    recentMessages,
    stats,
  ] = await Promise.all([
    prisma.borne.count(),
    prisma.partner.count(),
    prisma.article.count({ where: { isPublished: true } }),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),
    prisma.contactMessage.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        type: true,
        createdAt: true,
        isRead: true,
      },
    }),
    prisma.statistics.findFirst({
      orderBy: { createdAt: 'desc' },
    }),
  ])

  return {
    bornesCount,
    partnersCount,
    articlesCount,
    messagesCount,
    unreadMessagesCount,
    recentMessages,
    stats,
  }
}

export default async function AdminDashboard() {
  const {
    bornesCount,
    partnersCount,
    articlesCount,
    messagesCount,
    unreadMessagesCount,
    recentMessages,
    stats,
  } = await getStats()

  const quickStats = [
    {
      name: 'Bornes',
      value: bornesCount,
      icon: MapPin,
      href: '/admin/bornes',
      color: 'bg-blue-500',
    },
    {
      name: 'Partenaires',
      value: partnersCount,
      icon: Users,
      href: '/admin/partenaires',
      color: 'bg-green-500',
    },
    {
      name: 'Actualités',
      value: articlesCount,
      icon: FileText,
      href: '/admin/actualites',
      color: 'bg-purple-500',
    },
    {
      name: 'Messages',
      value: messagesCount,
      icon: MessageSquare,
      href: '/admin/messages',
      color: 'bg-orange-500',
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined,
    },
  ]

  const impactStats = [
    {
      name: 'Verre collecté',
      value: `${stats?.totalGlassCollected?.toLocaleString('fr-FR') || '0'} tonnes`,
      icon: Recycle,
      color: 'text-primary',
    },
    {
      name: 'Points distribués',
      value: stats?.totalPoints?.toLocaleString('fr-FR') || '0',
      icon: Award,
      color: 'text-yellow-600',
    },
    {
      name: 'Utilisateurs',
      value: stats?.totalUsers?.toLocaleString('fr-FR') || '0',
      icon: Users,
      color: 'text-green-600',
    },
    {
      name: 'Partenaires actifs',
      value: stats?.totalPartners?.toLocaleString('fr-FR') || '0',
      icon: TrendingUp,
      color: 'text-blue-600',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-600 mt-1">
          Vue d&apos;ensemble de votre espace d&apos;administration
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat) => (
          <Link key={stat.name} href={stat.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                {stat.badge && (
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                      {stat.badge} non lu{stat.badge > 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Impact stats */}
      <Card>
        <CardHeader>
          <CardTitle>Impact environnemental</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat) => (
              <div key={stat.name} className="text-center">
                <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent messages and quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent messages */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Messages récents</CardTitle>
            <Link
              href="/admin/messages"
              className="text-sm text-primary hover:underline"
            >
              Voir tout
            </Link>
          </CardHeader>
          <CardContent>
            {recentMessages.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Aucun message</p>
            ) : (
              <div className="space-y-4">
                {recentMessages.map((message) => (
                  <div
                    key={message.id}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50"
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 ${message.isRead ? 'bg-gray-300' : 'bg-primary'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900 truncate">
                          {message.name}
                        </p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          message.type === 'COMMERCANT' 
                            ? 'bg-purple-100 text-purple-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {message.type === 'COMMERCANT' ? 'Commerçant' : 'Particulier'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{message.email}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(message.createdAt).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick actions */}
        <Card>
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/admin/bornes/nouveau"
                className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <MapPin className="h-8 w-8 text-primary mb-2" />
                <span className="text-sm font-medium text-gray-700">Ajouter une borne</span>
              </Link>
              <Link
                href="/admin/partenaires/nouveau"
                className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Users className="h-8 w-8 text-primary mb-2" />
                <span className="text-sm font-medium text-gray-700">Ajouter un partenaire</span>
              </Link>
              <Link
                href="/admin/actualites/nouveau"
                className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FileText className="h-8 w-8 text-primary mb-2" />
                <span className="text-sm font-medium text-gray-700">Nouvel article</span>
              </Link>
              <Link
                href="/admin/parametres"
                className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <TrendingUp className="h-8 w-8 text-primary mb-2" />
                <span className="text-sm font-medium text-gray-700">Mettre à jour stats</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
