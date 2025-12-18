import { Smartphone, MapPin, Gift, ArrowRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Smartphone,
    title: 'Téléchargez l\'app',
    description: 'Créez votre compte Cliiink gratuitement en quelques secondes sur l\'application mobile.',
    color: 'bg-primary',
  },
  {
    number: '02',
    icon: MapPin,
    title: 'Déposez vos bouteilles',
    description: 'Trouvez une borne près de chez vous et déposez vos bouteilles en verre. Chaque dépôt est récompensé !',
    color: 'bg-eco-dark',
  },
  {
    number: '03',
    icon: Gift,
    title: 'Profitez des récompenses',
    description: 'Échangez vos points contre des réductions et cadeaux chez nos partenaires commerçants.',
    color: 'bg-secondary',
  },
]

export default function HowItWorks() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Comment ça marche ?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Trois étapes simples pour{' '}
            <span className="text-primary">gagner des récompenses</span>
          </h2>
          <p className="text-lg text-gray-600">
            Rejoignez les milliers de Réunionnais qui font un geste pour la planète 
            tout en profitant d&apos;avantages exclusifs.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection line - Desktop only */}
          <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary via-eco-dark to-secondary" />

          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                {/* Step number badge */}
                <div className={`absolute -top-4 left-8 ${step.color} text-white text-sm font-bold px-4 py-1 rounded-full`}>
                  Étape {step.number}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-24 -right-4 z-10">
                    <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-12 text-center">
          <p className="text-gray-500">
            <span className="font-semibold text-primary">100%</span> gratuit • 
            <span className="font-semibold text-primary"> Sans engagement</span> • 
            <span className="font-semibold text-primary"> Écologique</span>
          </p>
        </div>
      </div>
    </section>
  )
}
