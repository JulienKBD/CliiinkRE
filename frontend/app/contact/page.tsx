import type { Metadata } from 'next'
import ContactPageClient from './ContactPageClient'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez l\'équipe Cliiink Réunion. Formulaire de contact pour les particuliers et les commerçants souhaitant devenir partenaires.',
  openGraph: {
    title: 'Contact | Cliiink Réunion',
    description: 'Contactez l\'équipe Cliiink Réunion.',
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}
