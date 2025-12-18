import { getServerSession, type NextAuthOptions, type DefaultSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { loginUser } from '@/lib/api'

// Extend the built-in session types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: 'ADMIN' | 'EDITOR' | 'USER'
    } & DefaultSession['user']
  }

  interface User {
    role: 'ADMIN' | 'EDITOR' | 'USER'
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: 'ADMIN' | 'EDITOR' | 'USER'
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Identifiants',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'admin@cliiink-reunion.re' },
        password: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Veuillez remplir tous les champs')
        }

        try {
          const result = await loginUser(credentials.email, credentials.password)
          
          if (!result.user) {
            throw new Error('Email ou mot de passe incorrect')
          }

          return {
            id: result.user.id,
            email: result.user.email,
            name: result.user.name,
            role: result.user.role,
          }
        } catch {
          throw new Error('Email ou mot de passe incorrect')
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
      }
      return session
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export async function getSession() {
  return await getServerSession(authOptions)
}

export async function getCurrentUser() {
  const session = await getSession()
  return session?.user
}

export async function requireAuth() {
  const user = await getCurrentUser()
  
  if (!user) {
    throw new Error('Unauthorized')
  }
  
  return user
}

export async function requireAdmin() {
  const user = await getCurrentUser()
  
  if (!user || user.role !== 'ADMIN') {
    throw new Error('Forbidden')
  }
  
  return user
}

export async function requireEditor() {
  const user = await getCurrentUser()
  
  if (!user || (user.role !== 'ADMIN' && user.role !== 'EDITOR')) {
    throw new Error('Forbidden')
  }
  
  return user
}
