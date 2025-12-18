"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { MapPin, ArrowRight, Navigation } from 'lucide-react'
import { Button } from '../ui/button'
import { getBorneStatusLabel } from '../../lib/utils'
import { getBornes, type Borne } from '../../lib/api'
import type L from 'leaflet'

// Dynamic import for Leaflet to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
)

// Reunion Island center coordinates
const REUNION_CENTER: [number, number] = [-21.1151, 55.5364]

export default function MiniMap() {
  const [isMounted, setIsMounted] = useState(false)
  const [leafletIcon, setLeafletIcon] = useState<L.DivIcon | null>(null)
  const [bornes, setBornes] = useState<Borne[]>([])
  const [bornesCount, setBornesCount] = useState(0)
  const [citiesCount, setCitiesCount] = useState(0)

  useEffect(() => {
    // Add Leaflet CSS via link element
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY='
    link.crossOrigin = ''
    document.head.appendChild(link)

    // Create icon only on client side
    import('leaflet').then((L) => {
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="background-color: #78d8a3; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -10],
      })
      setLeafletIcon(icon)
    })
    setIsMounted(true)

    // Fetch bornes from API
    getBornes({ isActive: true })
      .then((data) => {
        setBornes(data)
        setBornesCount(data.length)
        // Count unique cities
        const cities = new Set(data.map(b => b.city))
        setCitiesCount(cities.size)
      })
      .catch((err) => {
        console.error('Error fetching bornes:', err)
      })

    return () => {
      document.head.removeChild(link)
    }
  }, [])

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Carte des bornes
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trouvez la borne la plus proche
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Nos bornes de tri connectées sont réparties sur toute l&apos;île. 
              Localisez facilement celle qui est proche de vous et commencez 
              à cumuler des points dès aujourd&apos;hui.
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-eco-light rounded-xl p-4">
                <p className="text-3xl font-bold text-primary">{bornesCount || '-'}</p>
                <p className="text-sm text-gray-600">Bornes disponibles</p>
              </div>
              <div className="bg-reward-light rounded-xl p-4">
                <p className="text-3xl font-bold text-secondary">{citiesCount || '-'}</p>
                <p className="text-sm text-gray-600">Villes couvertes</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="/carte">
                  <MapPin className="h-5 w-5 mr-2" />
                  Voir la carte complète
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/carte">
                  <Navigation className="h-5 w-5 mr-2" />
                  Me localiser
                </Link>
              </Button>
            </div>

            {/* Borne list preview */}
            <div className="mt-8 space-y-3">
              <p className="text-sm text-gray-500 font-medium">Quelques bornes à proximité :</p>
              {bornes.slice(0, 3).map((borne) => {
                const status = getBorneStatusLabel(borne.status)
                return (
                  <div
                    key={borne.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{borne.name}</p>
                        <p className="text-xs text-gray-500">{borne.address}, {borne.city}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className={`w-2 h-2 rounded-full ${status.color} mr-2`} />
                      <span className="text-xs text-gray-500">{status.label}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Map */}
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
            {isMounted ? (
              <MapContainer
                center={REUNION_CENTER}
                zoom={10}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {leafletIcon && bornes.map((borne) => (
                  <Marker
                    key={borne.id}
                    position={[borne.latitude, borne.longitude]}
                    icon={leafletIcon}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-bold text-gray-900">{borne.name}</h3>
                        <p className="text-sm text-gray-500">{borne.address}</p>
                        <p className="text-sm text-gray-500">{borne.city}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            ) : (
              <div className="h-full w-full bg-gray-200 animate-pulse flex items-center justify-center">
                <p className="text-gray-500">Chargement de la carte...</p>
              </div>
            )}

            {/* Overlay CTA */}
            <div className="absolute bottom-4 left-4 right-4 z-[1000]">
              <Link
                href="/carte"
                className="flex items-center justify-between bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Voir toutes les bornes</p>
                    <p className="text-sm text-gray-500">Carte interactive complète</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-primary" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
