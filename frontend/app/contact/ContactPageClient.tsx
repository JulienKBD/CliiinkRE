"use client"

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  User,
  Building,
  CheckCircle,
  AlertCircle,
  Upload,
  X
} from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { Card, CardContent } from '../../components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'

// Validation schemas
const particulierSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
})

const commercantSchema = z.object({
  companyName: z.string().min(2, 'Le nom de l\'entreprise est requis'),
  name: z.string().min(2, 'Le nom de l\'interlocuteur est requis'),
  position: z.string().optional(),
  email: z.string().email('Adresse email invalide'),
  phone: z.string().min(10, 'Numéro de téléphone invalide'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
})

type ParticulierFormData = z.infer<typeof particulierSchema>
type CommercantFormData = z.infer<typeof commercantSchema>

const contactInfo = [
  {
    icon: MapPin,
    title: 'Adresse',
    content: '22 Av. de la Victoire\n97400 Saint-Denis\nLa Réunion',
  },
  {
    icon: Phone,
    title: 'Téléphone',
    content: '0262 00 00 00',
    href: 'tel:+262262000000',
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'contact@cliiink-reunion.re',
    href: 'mailto:contact@cliiink-reunion.re',
  },
  {
    icon: Clock,
    title: 'Horaires',
    content: 'Lun - Ven : 8h30 - 17h30\nSam : 9h - 12h',
  },
]

export default function ContactPageClient() {
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get('type') === 'commercant' ? 'commercant' : 'particulier'
  
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [attachment, setAttachment] = useState<File | null>(null)

  // Particulier form
  const particulierForm = useForm<ParticulierFormData>({
    resolver: zodResolver(particulierSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  // Commerçant form
  const commercantForm = useForm<CommercantFormData>({
    resolver: zodResolver(commercantSchema),
    defaultValues: {
      companyName: '',
      name: '',
      position: '',
      email: '',
      phone: '',
      message: '',
    },
  })

  const handleParticulierSubmit = async (data: ParticulierFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      console.log('Particulier form submitted:', data)
      setSubmitStatus('success')
      particulierForm.reset()
      setAttachment(null)
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCommercantSubmit = async (data: CommercantFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      console.log('Commerçant form submitted:', data)
      setSubmitStatus('success')
      commercantForm.reset()
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Max 5MB
      if (file.size > 5 * 1024 * 1024) {
        alert('Le fichier ne doit pas dépasser 5 Mo')
        return
      }
      setAttachment(file)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-primary text-white">
        <div className="container-custom py-16">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
              Contact
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contactez-nous
            </h1>
            <p className="text-xl text-white/90">
              Une question sur Cliiink ? Besoin d&apos;aide ? Envie de devenir 
              partenaire ? Notre équipe est là pour vous répondre.
            </p>
          </div>
        </div>
      </section>

      <div className="container-custom py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6 md:p-8">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="particulier" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Particulier
                    </TabsTrigger>
                    <TabsTrigger value="commercant" className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Commerçant
                    </TabsTrigger>
                  </TabsList>

                  {/* Success/Error Messages */}
                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-800">Message envoyé !</p>
                        <p className="text-sm text-green-600">
                          Nous vous répondrons dans les plus brefs délais.
                        </p>
                      </div>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-red-800">Erreur d&apos;envoi</p>
                        <p className="text-sm text-red-600">
                          Une erreur est survenue. Veuillez réessayer.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Particulier Form */}
                  <TabsContent value="particulier">
                    <form onSubmit={particulierForm.handleSubmit(handleParticulierSubmit)}>
                      <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <Input
                            label="Nom complet"
                            placeholder="Votre nom"
                            required
                            error={particulierForm.formState.errors.name?.message}
                            {...particulierForm.register('name')}
                          />
                          <Input
                            label="Email"
                            type="email"
                            placeholder="votre@email.re"
                            required
                            error={particulierForm.formState.errors.email?.message}
                            {...particulierForm.register('email')}
                          />
                        </div>

                        <Textarea
                          label="Votre message"
                          placeholder="Décrivez votre demande..."
                          required
                          rows={6}
                          error={particulierForm.formState.errors.message?.message}
                          {...particulierForm.register('message')}
                        />

                        {/* File attachment */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Pièce jointe (optionnel)
                          </label>
                          {attachment ? (
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <div className="flex-1 truncate text-sm text-gray-600">
                                {attachment.name}
                              </div>
                              <button
                                type="button"
                                onClick={() => setAttachment(null)}
                                className="p-1 hover:bg-gray-200 rounded"
                              >
                                <X className="h-4 w-4 text-gray-500" />
                              </button>
                            </div>
                          ) : (
                            <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors">
                              <Upload className="h-5 w-5 text-gray-400" />
                              <span className="text-sm text-gray-500">
                                Cliquez pour ajouter un fichier (max 5 Mo)
                              </span>
                              <input
                                type="file"
                                className="hidden"
                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                onChange={handleFileChange}
                              />
                            </label>
                          )}
                        </div>

                        <Button type="submit" size="lg" loading={isSubmitting} className="w-full md:w-auto">
                          <Send className="h-4 w-4 mr-2" />
                          Envoyer le message
                        </Button>
                      </div>
                    </form>
                  </TabsContent>

                  {/* Commerçant Form */}
                  <TabsContent value="commercant">
                    <div className="mb-6 p-4 bg-secondary/10 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        🤝 Devenez partenaire Cliiink
                      </h3>
                      <p className="text-sm text-gray-600">
                        Rejoignez notre réseau de commerçants partenaires et attirez 
                        de nouveaux clients engagés dans une démarche éco-responsable.
                      </p>
                    </div>

                    <form onSubmit={commercantForm.handleSubmit(handleCommercantSubmit)}>
                      <div className="space-y-6">
                        <Input
                          label="Nom de l'entreprise / commerce"
                          placeholder="Ex: Le Comptoir Créole"
                          required
                          error={commercantForm.formState.errors.companyName?.message}
                          {...commercantForm.register('companyName')}
                        />

                        <div className="grid md:grid-cols-2 gap-6">
                          <Input
                            label="Nom de l'interlocuteur"
                            placeholder="Votre nom"
                            required
                            error={commercantForm.formState.errors.name?.message}
                            {...commercantForm.register('name')}
                          />
                          <Input
                            label="Fonction"
                            placeholder="Ex: Gérant, Responsable..."
                            error={commercantForm.formState.errors.position?.message}
                            {...commercantForm.register('position')}
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <Input
                            label="Email professionnel"
                            type="email"
                            placeholder="contact@entreprise.re"
                            required
                            error={commercantForm.formState.errors.email?.message}
                            {...commercantForm.register('email')}
                          />
                          <Input
                            label="Téléphone"
                            type="tel"
                            placeholder="0262 XX XX XX"
                            required
                            error={commercantForm.formState.errors.phone?.message}
                            {...commercantForm.register('phone')}
                          />
                        </div>

                        <Textarea
                          label="Décrivez votre commerce et votre projet de partenariat"
                          placeholder="Type d'activité, localisation, offre envisagée pour les utilisateurs Cliiink..."
                          required
                          rows={6}
                          error={commercantForm.formState.errors.message?.message}
                          {...commercantForm.register('message')}
                        />

                        <Button type="submit" size="lg" loading={isSubmitting} className="w-full md:w-auto">
                          <Send className="h-4 w-4 mr-2" />
                          Demander un partenariat
                        </Button>
                      </div>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">
                  Coordonnées
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{info.title}</p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-gray-600 hover:text-primary whitespace-pre-line"
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-gray-600 whitespace-pre-line">
                            {info.content}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* FAQ Quick links */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Questions fréquentes
                </h2>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a href="#" className="text-gray-600 hover:text-primary">
                      → Comment fonctionne Cliiink ?
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-primary">
                      → Où trouver une borne ?
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-primary">
                      → Comment utiliser mes points ?
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-primary">
                      → Devenir partenaire commerçant
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Map placeholder */}
            <Card>
              <CardContent className="p-0 overflow-hidden">
                <div className="aspect-video bg-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Saint-Denis</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
