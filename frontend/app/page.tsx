import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Gift, Recycle, ArrowRight, ChevronRight, ExternalLink } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import HeroSection from '../components/home/HeroSection'
import HowItWorks from '../components/home/HowItWorks'
import StatsSection from '../components/home/StatsSection'
import ArticlesPreview from '../components/home/ArticlesPreview'
import PartnersSlider from '../components/home/PartnersSlider'
import MiniMap from '../components/home/MiniMap'
import CTASection from '../components/home/CTASection'

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Mini Map Section */}
      <MiniMap />

      {/* Articles Preview Section */}
      <ArticlesPreview />

      {/* Partners Slider Section */}
      <PartnersSlider />

      {/* CTA Section */}
      <CTASection />
    </>
  )
}
