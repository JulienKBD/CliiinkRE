import { Recycle, Users, MapPin, Trophy } from 'lucide-react'

const stats = [
  {
    icon: Recycle,
    value: '5.2',
    unit: 'tonnes',
    label: 'de verre collecté',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: Users,
    value: '2 847',
    unit: '',
    label: 'utilisateurs inscrits',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
  },
  {
    icon: MapPin,
    value: '8',
    unit: '',
    label: 'bornes actives',
    color: 'text-eco-dark',
    bgColor: 'bg-eco-light',
  },
  {
    icon: Trophy,
    value: '24',
    unit: '',
    label: 'partenaires commerçants',
    color: 'text-reward-dark',
    bgColor: 'bg-reward-light',
  },
]

export default function StatsSection() {
  return (
    <section className="py-12 bg-white relative -mt-8 z-10">
      <div className="container-custom">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
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
