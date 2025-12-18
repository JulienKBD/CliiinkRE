"use client"

import { useEffect, useState } from 'react'
import { Recycle, Users, MapPin, Trophy } from 'lucide-react'
import { getStats } from '../../lib/api'

interface StatsData {
  totalGlassCollected: number
  totalUsers: number
  totalBornes: number
  totalPartners: number
}

export default function StatsSection() {
  const [stats, setStats] = useState<StatsData>({
    totalGlassCollected: 0,
    totalUsers: 0,
    totalBornes: 0,
    totalPartners: 0,
  })

  useEffect(() => {
    getStats()
      .then((data) => {
        setStats({
          totalGlassCollected: data.totalGlassCollected || 0,
          totalUsers: data.totalUsers || 0,
          totalBornes: data.totalBornes || 0,
          totalPartners: data.totalPartners || 0,
        })
      })
      .catch((err) => {
        console.error('Error fetching stats:', err)
      })
  }, [])

  const statsDisplay = [
    {
      icon: Recycle,
      value: stats.totalGlassCollected > 0 ? (stats.totalGlassCollected / 1000).toFixed(1) : '-',
      unit: 'tonnes',
      label: 'de verre collecté',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: Users,
      value: stats.totalUsers > 0 ? stats.totalUsers.toLocaleString('fr-FR') : '-',
      unit: '',
      label: 'utilisateurs inscrits',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      icon: MapPin,
      value: stats.totalBornes > 0 ? stats.totalBornes.toString() : '-',
      unit: '',
      label: 'bornes actives',
      color: 'text-eco-dark',
      bgColor: 'bg-eco-light',
    },
    {
      icon: Trophy,
      value: stats.totalPartners > 0 ? stats.totalPartners.toString() : '-',
      unit: '',
      label: 'partenaires commerçants',
      color: 'text-reward-dark',
      bgColor: 'bg-reward-light',
    },
  ]

  return (
    <section className="py-12 bg-white relative -mt-8 z-10">
      <div className="container-custom">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsDisplay.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`w-14 h-14 ${stat.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`h-7 w-7 ${stat.color}`} />
                </div>
                <div className="space-y-1">
                  <p className={`text-3xl md:text-4xl font-bold ${stat.color}`}>
                    {stat.value}
                    {stat.unit && <span className="text-lg ml-1">{stat.unit}</span>}
                  </p>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
