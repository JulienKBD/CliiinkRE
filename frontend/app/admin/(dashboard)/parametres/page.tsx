'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Save, Loader2, RefreshCw } from 'lucide-react'
import { Button } from '../../../../components/ui/button'
import { Input } from '../../../../components/ui/input'
import { Textarea } from '../../../../components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../../components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/tabs'

const siteConfigSchema = z.object({
  siteName: z.string().min(1, 'Requis'),
  siteDescription: z.string().min(1, 'Requis'),
  contactEmail: z.string().email('Email invalide'),
  contactPhone: z.string().min(10, 'Téléphone invalide'),
  address: z.string().optional(),
  socialFacebook: z.string().url().optional().or(z.literal('')),
  socialInstagram: z.string().url().optional().or(z.literal('')),
  socialLinkedin: z.string().url().optional().or(z.literal('')),
})

const statsSchema = z.object({
  totalBottles: z.number().min(0),
  totalCO2Saved: z.number().min(0),
  totalRewards: z.number().min(0),
  monthlyBottles: z.number().min(0),
  monthlyCO2Saved: z.number().min(0),
})

type SiteConfigData = z.infer<typeof siteConfigSchema>
type StatsData = z.infer<typeof statsSchema>

export default function ParametresPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const siteForm = useForm<SiteConfigData>({
    resolver: zodResolver(siteConfigSchema),
    defaultValues: {
      siteName: 'Cliiink Réunion',
      siteDescription: 'Recyclez vos bouteilles en verre et gagnez des récompenses chez nos partenaires à La Réunion',
      contactEmail: 'contact@cliiink-reunion.re',
      contactPhone: '0262 XX XX XX',
      address: 'Saint-Denis, La Réunion',
      socialFacebook: '',
      socialInstagram: '',
      socialLinkedin: '',
    },
  })

  const statsForm = useForm<StatsData>({
    resolver: zodResolver(statsSchema),
    defaultValues: {
      totalBottles: 1200000,
      totalCO2Saved: 450,
      totalRewards: 25000,
      monthlyBottles: 85000,
      monthlyCO2Saved: 32,
    },
  })

  const onSaveSiteConfig = async (data: SiteConfigData) => {
    setSaving(true)
    setMessage(null)
    
    try {
      // TODO: Implement API call
      console.log('Saving site config:', data)
      await new Promise(resolve => setTimeout(resolve, 1000))
      setMessage({ type: 'success', text: 'Configuration sauvegardée avec succès' })
    } catch {
      setMessage({ type: 'error', text: 'Erreur lors de la sauvegarde' })
    } finally {
      setSaving(false)
    }
  }

  const onSaveStats = async (data: StatsData) => {
    setSaving(true)
    setMessage(null)
    
    try {
      // TODO: Implement API call
      console.log('Saving stats:', data)
      await new Promise(resolve => setTimeout(resolve, 1000))
      setMessage({ type: 'success', text: 'Statistiques mises à jour avec succès' })
    } catch {
      setMessage({ type: 'error', text: 'Erreur lors de la mise à jour' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-600 mt-1">
          Configurez les paramètres généraux du site
        </p>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="stats">Statistiques</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="mt-6">
          <form onSubmit={siteForm.handleSubmit(onSaveSiteConfig)}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Site Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Informations du site</CardTitle>
                  <CardDescription>
                    Informations générales affichées sur le site
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom du site
                    </label>
                    <Input {...siteForm.register('siteName')} />
                    {siteForm.formState.errors.siteName && (
                      <p className="text-sm text-red-500 mt-1">
                        {siteForm.formState.errors.siteName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <Textarea {...siteForm.register('siteDescription')} rows={3} />
                    {siteForm.formState.errors.siteDescription && (
                      <p className="text-sm text-red-500 mt-1">
                        {siteForm.formState.errors.siteDescription.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact</CardTitle>
                  <CardDescription>
                    Informations de contact affichées sur le site
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email de contact
                    </label>
                    <Input {...siteForm.register('contactEmail')} type="email" />
                    {siteForm.formState.errors.contactEmail && (
                      <p className="text-sm text-red-500 mt-1">
                        {siteForm.formState.errors.contactEmail.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Téléphone
                    </label>
                    <Input {...siteForm.register('contactPhone')} />
                    {siteForm.formState.errors.contactPhone && (
                      <p className="text-sm text-red-500 mt-1">
                        {siteForm.formState.errors.contactPhone.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Adresse
                    </label>
                    <Input {...siteForm.register('address')} />
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Réseaux sociaux</CardTitle>
                  <CardDescription>
                    Liens vers vos profils sur les réseaux sociaux
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Facebook
                      </label>
                      <Input {...siteForm.register('socialFacebook')} placeholder="https://facebook.com/..." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Instagram
                      </label>
                      <Input {...siteForm.register('socialInstagram')} placeholder="https://instagram.com/..." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        LinkedIn
                      </label>
                      <Input {...siteForm.register('socialLinkedin')} placeholder="https://linkedin.com/..." />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 flex justify-end">
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Enregistrer
              </Button>
            </div>
          </form>
        </TabsContent>

        {/* Statistics Settings */}
        <TabsContent value="stats" className="mt-6">
          <form onSubmit={statsForm.handleSubmit(onSaveStats)}>
            <Card>
              <CardHeader>
                <CardTitle>Statistiques d&apos;impact</CardTitle>
                <CardDescription>
                  Mettez à jour les statistiques affichées sur la page d&apos;accueil
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total bouteilles recyclées
                    </label>
                    <Input
                      {...statsForm.register('totalBottles', { valueAsNumber: true })}
                      type="number"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CO₂ économisé (tonnes)
                    </label>
                    <Input
                      {...statsForm.register('totalCO2Saved', { valueAsNumber: true })}
                      type="number"
                      min="0"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Récompenses distribuées
                    </label>
                    <Input
                      {...statsForm.register('totalRewards', { valueAsNumber: true })}
                      type="number"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bouteilles ce mois
                    </label>
                    <Input
                      {...statsForm.register('monthlyBottles', { valueAsNumber: true })}
                      type="number"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CO₂ ce mois (tonnes)
                    </label>
                    <Input
                      {...statsForm.register('monthlyCO2Saved', { valueAsNumber: true })}
                      type="number"
                      min="0"
                      step="0.1"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <Button type="submit" disabled={saving}>
                    {saving ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Mettre à jour
                  </Button>
                  <Button type="button" variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Calculer automatiquement
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </TabsContent>

        {/* SEO Settings */}
        <TabsContent value="seo" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO & Référencement</CardTitle>
              <CardDescription>
                Paramètres pour améliorer le référencement naturel
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre par défaut
                </label>
                <Input defaultValue="Cliiink Réunion - Recyclez vos bouteilles et gagnez des récompenses" />
                <p className="text-sm text-gray-500 mt-1">
                  Titre affiché dans les résultats de recherche
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta description
                </label>
                <Textarea
                  defaultValue="Découvrez Cliiink à La Réunion : recyclez vos bouteilles en verre dans nos bornes connectées et gagnez des récompenses chez nos partenaires locaux."
                  rows={3}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Description affichée dans les résultats de recherche (max 160 caractères)
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mots-clés
                </label>
                <Input
                  defaultValue="cliiink, recyclage, bouteilles, verre, réunion, récompenses, écologie"
                />
              </div>
              <div className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Enregistrer SEO
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
