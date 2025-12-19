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
    <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        {/* Section Header - Centered */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <MapPin className="inline h-4 w-4 mr-1.5 -mt-0.5" />
            Carte des bornes
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Trouvez la borne la plus proche
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nos bornes de tri connectées sont réparties sur toute l&apos;île.
          </p>
        </div>

        {/* Main Content - Map first on larger screens */}
        <div className="grid lg:grid-cols-5 gap-8 items-stretch">
          {/* Map - Takes more space */}
          <div className="lg:col-span-3 relative h-[400px] lg:h-[450px] rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1">
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

            {/* Stats overlay on map */}
            <div className="absolute top-4 left-4 z-[1000] flex gap-2">
              <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
                <p className="text-xl font-bold text-primary">{bornesCount || '-'}</p>
                <p className="text-xs text-gray-600">Bornes</p>
              </div>
              <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
                <p className="text-xl font-bold text-secondary">{citiesCount || '-'}</p>
                <p className="text-xs text-gray-600">Villes</p>
              </div>
            </div>

            {/* Overlay CTA */}
            <div className="absolute bottom-4 left-4 right-4 z-[1000]">
              <Link
                href="/carte"
                className="flex items-center justify-between bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg hover:shadow-xl hover:bg-white transition-all"
              >
                <div className="flex items-center">
                  <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center mr-3">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Voir toutes les bornes</p>
                    <p className="text-xs text-gray-500">Carte interactive complète</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-primary" />
              </Link>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="lg:col-span-2 order-1 lg:order-2 flex flex-col">
            {/* CTA Buttons - Compact */}
            <div className="flex gap-3 mb-6">
              <Button asChild className="flex-1">
                <Link href="/carte">
                  <MapPin className="h-4 w-4 mr-2" />
                  Carte complète
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link href="/carte">
                  <Navigation className="h-4 w-4 mr-2" />
                  Me localiser
                </Link>
              </Button>
            </div>

            {/* Borne list preview */}
            <div className="flex-1">
              <p className="text-sm text-gray-500 font-medium mb-3">Quelques bornes disponibles :</p>
              <div className="space-y-2">
                {bornes.slice(0, 4).map((borne) => {
                  const status = getBorneStatusLabel(borne.status)
                  return (
                    <Link
                      key={borne.id}
                      href="/carte"
                      className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg hover:border-primary/30 hover:shadow-sm transition-all group"
                    >
                      <div className="flex items-center min-w-0 flex-1">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                          <MapPin className="h-4 w-4 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 text-sm truncate">{borne.name}</p>
                          <p className="text-xs text-gray-500 truncate">{borne.city}</p>
                        </div>
                      </div>
                      <div className="flex items-center ml-2 flex-shrink-0">
                        <span className={`w-2 h-2 rounded-full ${status.color}`} />
                        <ArrowRight className="h-4 w-4 text-gray-300 ml-2 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
