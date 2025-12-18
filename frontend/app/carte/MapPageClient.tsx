"use client"

import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { MapPin, Navigation, X, List, Map, ChevronRight, Loader2 } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select'
import { Badge } from '../../components/ui/badge'
import { getBorneStatusLabel } from '../../lib/utils'
import { getBornes, type Borne } from '../../lib/api'
import type L from 'leaflet'

// Dynamic imports for Leaflet components
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

const REUNION_CENTER: [number, number] = [-21.1151, 55.5364]

const cities = ['Toutes les villes', 'Saint-Denis', 'Saint-Pierre', 'Saint-Paul', 'Le Port', 'Saint-Louis', 'Sainte-Marie', 'Saint-André']
const statuses = [
  { value: 'ALL', label: 'Tous les états' },
  { value: 'ACTIVE', label: 'Disponibles' },
  { value: 'MAINTENANCE', label: 'En maintenance' },
  { value: 'FULL', label: 'Pleines' },
]

export default function MapPageClient() {
  const [isMounted, setIsMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [bornes, setBornes] = useState<Borne[]>([])
  const [filteredBornes, setFilteredBornes] = useState<Borne[]>([])
  const [selectedBorne, setSelectedBorne] = useState<Borne | null>(null)
  const [cityFilter, setCityFilter] = useState('Toutes les villes')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [showList, setShowList] = useState(false)
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const [mapCenter, setMapCenter] = useState<[number, number]>(REUNION_CENTER)
  const [mapZoom, setMapZoom] = useState(10)
  const [icons, setIcons] = useState<{
    default: L.DivIcon | null
    maintenance: L.DivIcon | null
    full: L.DivIcon | null
    user: L.DivIcon | null
  }>({ default: null, maintenance: null, full: null, user: null })

  useEffect(() => {
    // Add Leaflet CSS via link element
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY='
    link.crossOrigin = ''
    document.head.appendChild(link)

    // Create icons only on client side
    import('leaflet').then((L) => {
      const createIcon = (color: string) => {
        return L.divIcon({
          className: 'custom-marker',
          html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
          popupAnchor: [0, -12],
        })
      }
      setIcons({
        default: createIcon('#78d8a3'),
        maintenance: createIcon('#f59e0b'),
        full: createIcon('#ef4444'),
        user: createIcon('#3b82f6'),
      })
    })
    setIsMounted(true)

    // Fetch bornes from API
    getBornes({ isActive: true })
      .then((data) => {
        setBornes(data)
        setFilteredBornes(data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching bornes:', err)
        setError('Impossible de charger les bornes')
        setIsLoading(false)
      })

    return () => {
      document.head.removeChild(link)
    }
  }, [])

  // Helper function to get marker icon based on status
  const getMarkerIcon = (status: string) => {
    switch (status) {
      case 'MAINTENANCE':
        return icons.maintenance
      case 'FULL':
        return icons.full
      default:
        return icons.default
    }
  }

  // Filter bornes
  useEffect(() => {
    let filtered = [...bornes]

    if (cityFilter !== 'Toutes les villes') {
      filtered = filtered.filter((b) => b.city === cityFilter)
    }

    if (statusFilter !== 'ALL') {
      filtered = filtered.filter((b) => b.status === statusFilter)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (b) =>
          b.name.toLowerCase().includes(query) ||
          b.address.toLowerCase().includes(query) ||
          b.city.toLowerCase().includes(query)
      )
    }

    setFilteredBornes(filtered)
  }, [bornes, cityFilter, statusFilter, searchQuery])

  // Get user location
  const getUserLocation = useCallback(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation([latitude, longitude])
          setMapCenter([latitude, longitude])
          setMapZoom(13)
        },
        (error) => {
          console.error('Error getting location:', error)
          alert('Impossible de récupérer votre position. Vérifiez vos paramètres de localisation.')
        }
      )
    } else {
      alert('La géolocalisation n\'est pas supportée par votre navigateur.')
    }
  }, [])

  const handleBorneClick = (borne: Borne) => {
    setSelectedBorne(borne)
    setMapCenter([borne.latitude, borne.longitude])
    setMapZoom(15)
    setShowList(false)
  }

  const clearFilters = () => {
    setCityFilter('Toutes les villes')
    setStatusFilter('ALL')
    setSearchQuery('')
  }

  const activeFiltersCount = [
    cityFilter !== 'Toutes les villes',
    statusFilter !== 'ALL',
    searchQuery !== '',
  ].filter(Boolean).length

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b sticky top-16 z-30">
        <div className="container-custom py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Title */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Carte des bornes</h1>
              <p className="text-gray-500 text-sm">
                {filteredBornes.length} borne{filteredBornes.length > 1 ? 's' : ''} trouvée{filteredBornes.length > 1 ? 's' : ''}
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 pl-10"
                />
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>

              {/* City Filter */}
              <Select value={cityFilter} onValueChange={setCityFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Ville" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="État" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Clear filters */}
              {activeFiltersCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-1" />
                  Effacer ({activeFiltersCount})
                </Button>
              )}

              {/* Location button */}
              <Button onClick={getUserLocation} variant="outline">
                <Navigation className="h-4 w-4 mr-2" />
                Me localiser
              </Button>

              {/* Toggle list/map on mobile */}
              <Button
                variant="outline"
                className="lg:hidden"
                onClick={() => setShowList(!showList)}
              >
                {showList ? (
                  <>
                    <Map className="h-4 w-4 mr-2" />
                    Carte
                  </>
                ) : (
                  <>
                    <List className="h-4 w-4 mr-2" />
                    Liste
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Sidebar - Borne List */}
          <div className={`lg:block ${showList ? 'block' : 'hidden'}`}>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="font-semibold text-gray-900">Liste des bornes</h2>
              </div>
              <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
                {filteredBornes.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Aucune borne trouvée</p>
                    <p className="text-sm mt-2">Essayez de modifier vos filtres</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {filteredBornes.map((borne) => {
                      const status = getBorneStatusLabel(borne.status)
                      const isSelected = selectedBorne?.id === borne.id
                      return (
                        <button
                          key={borne.id}
                          onClick={() => handleBorneClick(borne)}
                          className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                            isSelected ? 'bg-primary/5 border-l-4 border-primary' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900">{borne.name}</h3>
                              <p className="text-sm text-gray-500 mt-1">
                                {borne.address}
                              </p>
                              <p className="text-sm text-gray-400">{borne.city}</p>
                            </div>
                            <div className="flex flex-col items-end ml-4">
                              <Badge
                                variant={
                                  borne.status === 'ACTIVE'
                                    ? 'success'
                                    : borne.status === 'MAINTENANCE'
                                    ? 'warning'
                                    : 'danger'
                                }
                              >
                                {status.label}
                              </Badge>
                              <ChevronRight className="h-4 w-4 text-gray-400 mt-2" />
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Map */}
          <div className={`lg:col-span-2 ${showList ? 'hidden lg:block' : 'block'}`}>
            <div className="bg-white rounded-xl shadow-md overflow-hidden h-[calc(100vh-300px)] min-h-[500px]">
              {isMounted ? (
                <MapContainer
                  center={mapCenter}
                  zoom={mapZoom}
                  style={{ height: '100%', width: '100%' }}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  {/* User location marker */}
                  {userLocation && icons.user && (
                    <Marker position={userLocation} icon={icons.user}>
                      <Popup>
                        <div className="p-2">
                          <p className="font-semibold">Votre position</p>
                        </div>
                      </Popup>
                    </Marker>
                  )}

                  {/* Borne markers */}
                  {filteredBornes.map((borne) => {
                    const status = getBorneStatusLabel(borne.status)
                    const icon = getMarkerIcon(borne.status)
                    if (!icon) return null
                    return (
                      <Marker
                        key={borne.id}
                        position={[borne.latitude, borne.longitude]}
                        icon={icon}
                        eventHandlers={{
                          click: () => setSelectedBorne(borne),
                        }}
                      >
                        <Popup>
                          <div className="p-2 min-w-[200px]">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-bold text-gray-900">{borne.name}</h3>
                              <span
                                className={`w-3 h-3 rounded-full ${status.color}`}
                                title={status.label}
                              />
                            </div>
                            <p className="text-sm text-gray-600">{borne.address}</p>
                            <p className="text-sm text-gray-500">{borne.city} {borne.zipCode}</p>
                            {borne.description && (
                              <p className="text-sm text-gray-400 mt-2 italic">
                                {borne.description}
                              </p>
                            )}
                            <div className="mt-3 pt-3 border-t">
                              <Badge
                                variant={
                                  borne.status === 'ACTIVE'
                                    ? 'success'
                                    : borne.status === 'MAINTENANCE'
                                    ? 'warning'
                                    : 'danger'
                                }
                              >
                                {status.label}
                              </Badge>
                            </div>
                            <a
                              href={`https://www.google.com/maps/dir/?api=1&destination=${borne.latitude},${borne.longitude}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block mt-3 text-sm text-primary hover:underline"
                            >
                              Itinéraire Google Maps →
                            </a>
                          </div>
                        </Popup>
                      </Marker>
                    )
                  })}
                </MapContainer>
              ) : (
                <div className="h-full w-full bg-gray-200 animate-pulse flex items-center justify-center">
                  <div className="text-center">
                    <div className="spinner mx-auto mb-4"></div>
                    <p className="text-gray-500">Chargement de la carte...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Selected borne detail (mobile) */}
            {selectedBorne && (
              <div className="lg:hidden mt-4 bg-white rounded-xl shadow-md p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900">{selectedBorne.name}</h3>
                    <p className="text-sm text-gray-600">{selectedBorne.address}</p>
                    <p className="text-sm text-gray-500">{selectedBorne.city}</p>
                  </div>
                  <button
                    onClick={() => setSelectedBorne(null)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <X className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
                {selectedBorne.description && (
                  <p className="text-sm text-gray-400 mt-2">{selectedBorne.description}</p>
                )}
                <div className="mt-4 flex items-center gap-3">
                  <Badge
                    variant={
                      selectedBorne.status === 'ACTIVE'
                        ? 'success'
                        : selectedBorne.status === 'MAINTENANCE'
                        ? 'warning'
                        : 'danger'
                    }
                  >
                    {getBorneStatusLabel(selectedBorne.status).label}
                  </Badge>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${selectedBorne.latitude},${selectedBorne.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    Itinéraire →
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
