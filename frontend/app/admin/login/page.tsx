import type { Metadata } from 'next'
import LoginForm from './LoginForm'

export const metadata: Metadata = {
  title: 'Connexion | Admin Cliiink Réunion',
  description: 'Connectez-vous à l\'interface d\'administration de Cliiink Réunion.',
  robots: 'noindex, nofollow',
}

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
            <span className="text-2xl font-bold text-primary">C</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Cliiink Réunion</h1>
          <p className="text-white/70 mt-2">Interface d&apos;administration</p>
        </div>

        {/* Login Form */}
        <LoginForm />

        {/* Footer */}
        <p className="text-center text-white/50 text-sm mt-8">
          © {new Date().getFullYear()} Cliiink Réunion. Tous droits réservés.
        </p>
      </div>
    </main>
  )
}
