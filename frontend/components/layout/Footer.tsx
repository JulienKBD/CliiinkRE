import Link from 'next/link'
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, ExternalLink } from 'lucide-react'

const footerLinks = {
  navigation: [
    { name: 'Accueil', href: '/' },
    { name: 'Carte des bornes', href: '/carte' },
    { name: 'Actualités', href: '/actualites' },
    { name: 'Partenaires', href: '/partenaires' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Mentions légales', href: '/mentions-legales' },
    { name: 'Politique de confidentialité', href: '/confidentialite' },
    { name: 'Gestion des cookies', href: '/cookies' },
  ],
  external: [
    { name: 'Cliiink National', href: 'https://www.cliiink.com' },
    { name: 'Kisalafé', href: 'https://www.kisalafe.re' },
  ],
}

const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com/cliiinkreunion', icon: Facebook },
  { name: 'Instagram', href: 'https://instagram.com/cliiinkreunion', icon: Instagram },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/cliiink', icon: Linkedin },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl">Cliiink</span>
                <span className="text-xs text-gray-400 -mt-1">Réunion</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Cliiink Réunion, le dispositif qui récompense vos gestes de tri. 
              Déposez vos bouteilles en verre, cumulez des points et profitez 
              d&apos;avantages chez nos partenaires locaux.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & External Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Informations</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="font-medium mt-6 mb-3 text-sm">Liens externes</h4>
            <ul className="space-y-2">
              {footerLinks.external.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center"
                  >
                    {link.name}
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  123 Rue de l&apos;Exemple<br />
                  97400 Saint-Denis<br />
                  La Réunion
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a
                  href="tel:+262262000000"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  0262 00 00 00
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:contact@cliiink-reunion.re"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  contact@cliiink-reunion.re
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Cliiink Réunion. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                8 bornes actives
              </span>
              <span>|</span>
              <span>Fait avec 💚 à La Réunion</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
