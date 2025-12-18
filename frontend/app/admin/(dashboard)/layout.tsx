import { redirect } from 'next/navigation'
import { getSession } from '../../../lib/auth'
import AdminLayoutClient from './AdminLayoutClient'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  // Redirect to login if not authenticated
  if (!session) {
    redirect('/admin/login')
  }

  // Check if user has admin or editor role
  if (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR') {
    redirect('/')
  }

  return (
    <AdminLayoutClient user={session.user}>
      {children}
    </AdminLayoutClient>
  )
}
