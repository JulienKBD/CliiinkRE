import type { Metadata } from 'next'
import MapPageClient from './MapPageClient'

export const metadata: Metadata = {
  title: 'Carte des bornes',
  description: 'Trouvez la borne Cliiink la plus proche de chez vous à La Réunion. Carte interactive avec localisation en temps réel et disponibilité des bornes.',
  openGraph: {
    title: 'Carte des bornes | Cliiink Réunion',
    description: 'Trouvez la borne Cliiink la plus proche de chez vous à La Réunion.',
  },
}

export default function CartePage() {
  return <MapPageClient />
}
