import Link from 'next/link'
import { MapPin, Users, ArrowRight } from 'lucide-react'
import { Button } from '../ui/button'

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-95" />
      
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-white space-y-8 animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
              <span className="w-2 h-2 bg-secondary rounded-full mr-2 animate-pulse" />
              <span className="text-sm font-medium">Nouveau à La Réunion</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-balance">
              Triez votre verre,{' '}
              <span className="text-secondary">gagnez</span> des récompenses
            </h1>

            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-xl">
              Avec Cliiink, chaque bouteille déposée vous rapporte des points 
              échangeables chez nos partenaires réunionnais.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" variant="white">
                <Link href="/carte">
                  <MapPin className="h-5 w-5 mr-2" />
                  Je trouve une borne
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                <Link href="/partenaires">
                  <Users className="h-5 w-5 mr-2" />
                  Découvrir les partenaires
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-white/80">
              <div className="flex items-center">
                <span className="text-3xl font-bold text-secondary">8</span>
                <span className="ml-2 text-sm">bornes<br/>actives</span>
              </div>
              <div className="w-px h-10 bg-white/30" />
              <div className="flex items-center">
                <span className="text-3xl font-bold text-secondary">24+</span>
                <span className="ml-2 text-sm">partenaires<br/>commerçants</span>
              </div>
              <div className="w-px h-10 bg-white/30" />
              <div className="flex items-center">
                <span className="text-3xl font-bold text-secondary">5T</span>
                <span className="ml-2 text-sm">de verre<br/>collecté</span>
              </div>
            </div>
          </div>

          {/* Hero Image/Illustration */}
          <div className="relative hidden lg:block animate-fade-in animate-delay-200">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Main card illustration */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl transform rotate-3" />
              <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="bg-primary p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <span className="text-primary font-bold text-xl">C</span>
                      </div>
                      <div className="text-white">
                        <p className="font-bold">Cliiink Réunion</p>
                        <p className="text-sm opacity-80">Votre compte</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 p-6 space-y-6">
                    <div className="text-center py-4">
                      <p className="text-gray-500 text-sm">Vos points</p>
                      <p className="text-5xl font-bold text-primary">1,250</p>
                      <p className="text-sm text-gray-400">points disponibles</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-eco-light rounded-lg">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-3">
                            <MapPin className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Dernier dépôt</p>
                            <p className="text-xs text-gray-500">Saint-Denis Centre</p>
                          </div>
                        </div>
                        <span className="text-primary font-bold">+50 pts</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-reward-light rounded-lg">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center mr-3">
                            <Users className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Récompense utilisée</p>
                            <p className="text-xs text-gray-500">Ti Punch Bar</p>
                          </div>
                        </div>
                        <span className="text-secondary font-bold">-200 pts</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-secondary text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 animate-bounce">
                <span className="text-2xl">🎉</span>
                <span className="font-bold">+50 points!</span>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white px-4 py-3 rounded-xl shadow-lg">
                <p className="text-xs text-gray-500">Verre collecté ce mois</p>
                <p className="text-xl font-bold text-primary">12.5 kg</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/50 animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-xs mb-2">Découvrir</span>
          <ArrowRight className="h-5 w-5 rotate-90" />
        </div>
      </div>
    </section>
  )
}
