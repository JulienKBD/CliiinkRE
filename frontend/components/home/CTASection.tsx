import Link from 'next/link'
import { MapPin, Users, ArrowRight, ExternalLink } from 'lucide-react'
import { Button } from '../ui/button'

export default function CTASection() {
  return (
    <section className="section-padding bg-gradient-to-br from-primary via-primary-500 to-eco-dark text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Prêt à rejoindre le mouvement ?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Téléchargez l&apos;application Cliiink, trouvez une borne près de chez vous
            et commencez à gagner des récompenses dès aujourd&apos;hui !
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button asChild size="lg" variant="white">
              <Link href="/carte">
                <MapPin className="h-5 w-5 mr-2" />
                Trouver une borne
              </Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              <Link href="/partenaires">
                <Users className="h-5 w-5 mr-2" />
                Voir les partenaires
              </Link>
            </Button>
          </div>

          {/* External links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8 border-t border-white/20">
            <p className="text-white/70 text-sm">Liens utiles :</p>
            <div className="flex items-center gap-6">
              <a
                href="https://www.cliiink.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-white/80 hover:text-white transition-colors"
              >
                Cliiink National
                <ExternalLink className="h-4 w-4 ml-1" />
              </a>
              <a
                href="https://www.kisalafe.re"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-white/80 hover:text-white transition-colors"
              >
                Kisalafé
                <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            </div>
          </div>

          {/* App download badges placeholder */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
              <p className="text-sm text-white/70 mb-1">Télécharger sur</p>
              <p className="font-bold">App Store</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
              <p className="text-sm text-white/70 mb-1">Disponible sur</p>
              <p className="font-bold">Google Play</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
