"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, MapPin, Newspaper, Users, Mail, ExternalLink } from 'lucide-react'
import { Button } from '../ui/button'
import { cn } from '../../lib/utils'

const navigation = [
  { name: 'Accueil', href: '/', icon: null },
  { name: 'Carte des bornes', href: '/carte', icon: MapPin },
  { name: 'Actualités', href: '/actualites', icon: Newspaper },
  { name: 'Partenaires', href: '/partenaires', icon: Users },
  { name: 'Contact', href: '/contact', icon: Mail },
]

const externalLinks = [
  { name: 'Cliiink', href: 'https://www.cliiink.com', icon: ExternalLink },
  { name: 'Kisalafé', href: 'https://www.kisalafe.re', icon: ExternalLink },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300",
        isScrolled
          ? "bg-white shadow-md"
          : "bg-white/95 backdrop-blur-sm"
      )}
    >
      <div className="container-custom h-full">
        <nav className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-primary">Cliiink</span>
              <span className="text-xs text-gray-500 -mt-1">Réunion</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                  isActive(item.href)
                    ? "bg-primary/10 text-primary"
                    : "text-gray-600 hover:text-primary hover:bg-gray-100"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              {externalLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-1"
                >
                  {link.name}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ))}
            </div>
            <Button asChild>
              <Link href="/carte">
                <MapPin className="h-4 w-4 mr-2" />
                Trouver une borne
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300",
            isOpen ? "max-h-[500px] mt-4" : "max-h-0"
          )}
        >
          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200",
                  isActive(item.href)
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-200"
                )}
              >
                {item.icon && <item.icon className="h-5 w-5 mr-3" />}
                {item.name}
              </Link>
            ))}
            
            <div className="border-t pt-4 mt-4">
              <p className="text-xs text-gray-500 mb-2 px-4">Liens externes</p>
              {externalLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-3 rounded-lg text-sm text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  {link.name}
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              ))}
            </div>

            <div className="pt-2">
              <Button asChild className="w-full">
                <Link href="/carte">
                  <MapPin className="h-4 w-4 mr-2" />
                  Trouver une borne
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
