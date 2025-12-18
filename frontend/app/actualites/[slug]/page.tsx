import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Tag } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Card, CardContent } from '../../../components/ui/card'
import { formatDate, getCategoryLabel } from '../../../lib/utils'

// Sample data - will be replaced with database calls
const articlesData: Record<string, any> = {
  'lancement-cliiink-reunion': {
    id: '1',
    title: 'Lancement de Cliiink à La Réunion !',
    slug: 'lancement-cliiink-reunion',
    excerpt: 'Le dispositif Cliiink arrive enfin sur notre île. Découvrez comment gagner des récompenses en triant vos bouteilles en verre.',
    content: `
# Cliiink débarque à La Réunion !

Nous sommes fiers d'annoncer le lancement officiel du dispositif **Cliiink** sur l'île de La Réunion.

## Comment ça marche ?

1. **Téléchargez l'application** Cliiink sur votre smartphone
2. **Déposez vos bouteilles en verre** dans une borne connectée
3. **Cumulez des points** à chaque dépôt
4. **Profitez de récompenses** chez nos partenaires

## Les premières bornes

Dès aujourd'hui, **8 bornes** sont disponibles dans les principales villes de l'île :
- Saint-Denis (2 bornes)
- Saint-Pierre
- Saint-Paul
- Le Port
- Saint-Louis
- Sainte-Marie
- Saint-André

## Un geste écologique récompensé

Chaque bouteille compte ! En moyenne, un foyer réunionnais consomme plus de **100 bouteilles en verre par an**. Avec Cliiink, ce geste de tri devient doublement gagnant : pour la planète et pour votre portefeuille.

### Les chiffres clés

| Statistique | Valeur |
|-------------|--------|
| Bornes actives | 8 |
| Partenaires | 24 |
| Points par bouteille | 10 |

## Téléchargez l'application

L'application Cliiink est disponible gratuitement sur iOS et Android. Créez votre compte en quelques secondes et commencez à cumuler des points dès aujourd'hui !

> "Avec Cliiink, chaque geste compte. Ensemble, faisons de La Réunion un modèle d'économie circulaire." - L'équipe Cliiink Réunion

*Rejoignez le mouvement et commencez à cumuler des points dès aujourd'hui !*
    `,
    category: 'ACTUALITE',
    tags: ['lancement', 'cliiink', 'réunion', 'tri'],
    publishedAt: new Date('2024-11-15'),
    views: 1250,
    author: { name: 'Équipe Cliiink' },
  },
  'partenaires-commercants-recompenses': {
    id: '2',
    title: 'Nos partenaires commerçants vous récompensent',
    slug: 'partenaires-commercants-recompenses',
    excerpt: 'Plus de 20 commerçants locaux vous offrent des réductions exclusives grâce à vos points Cliiink.',
    content: `
# Découvrez nos partenaires

Les commerçants réunionnais s'engagent avec Cliiink pour récompenser vos gestes éco-responsables.

## Des avantages exclusifs

Restaurants, bars, boutiques, supermarchés... Nos partenaires vous proposent :

- **Réductions** sur vos achats (de 5% à 20%)
- **Cadeaux** et produits offerts
- **Expériences** uniques (spa, loisirs...)

## Comment utiliser vos points ?

1. Consultez la liste des partenaires sur notre site ou l'application
2. Choisissez l'offre qui vous plaît
3. Présentez votre QR code en caisse
4. Profitez de votre récompense !

## Nos partenaires phares

### Le Comptoir Créole
Restaurant traditionnel au cœur de Saint-Denis. -10% sur l'addition avec 100 points.

### Ti Punch Bar
Le meilleur rhum arrangé de l'île ! 1 Ti Punch offert pour 200 points.

### Spa Lagon Bleu
Détente et bien-être à Saint-Gilles. -20% sur le premier soin.

## Rejoignez notre réseau

Vous êtes commerçant et souhaitez rejoindre l'aventure Cliiink ? [Contactez-nous](/contact) pour en savoir plus sur les conditions de partenariat.
    `,
    category: 'PARTENAIRES',
    tags: ['partenaires', 'récompenses', 'commerçants'],
    publishedAt: new Date('2024-11-20'),
    views: 856,
    author: { name: 'Équipe Cliiink' },
  },
  '10-conseils-bien-trier-verre': {
    id: '3',
    title: '10 conseils pour bien trier le verre',
    slug: '10-conseils-bien-trier-verre',
    excerpt: 'Adoptez les bons réflexes pour un tri efficace et maximisez vos points Cliiink.',
    content: `
# 10 conseils pour bien trier le verre

Le tri du verre, c'est simple ! Suivez ces conseils pour devenir un pro du recyclage.

## ✅ Ce qui va dans la borne

1. **Bouteilles** de vin, bière, jus de fruits
2. **Pots** de confiture, moutarde
3. **Bocaux** en verre
4. **Flacons** de parfum (vidés)

## ❌ Ce qu'il faut éviter

5. **Vaisselle** en verre (assiettes, verres à boire)
6. **Miroirs** et vitres
7. **Ampoules** (déchetterie)
8. **Céramique** et porcelaine

## 💡 Astuces bonus

9. **Inutile de rincer** : un simple égouttage suffit
10. **Retirez les bouchons** en métal ou plastique

## Le saviez-vous ?

Le verre est recyclable **à l'infini** ! Une bouteille recyclée peut redevenir une bouteille en seulement 30 jours.

### Impact environnemental

Recycler 1 tonne de verre permet d'économiser :
- 660 kg de sable
- 100 kg de calcaire
- 1 200 kg de CO2

*Avec Cliiink, chaque geste compte et rapporte !*
    `,
    category: 'CONSEILS',
    tags: ['conseils', 'tri', 'verre', 'recyclage'],
    publishedAt: new Date('2024-11-25'),
    views: 2341,
    author: { name: 'Équipe Cliiink' },
  },
  'resultats-premier-mois-5-tonnes': {
    id: '4',
    title: 'Résultats du premier mois : 5 tonnes de verre collectées !',
    slug: 'resultats-premier-mois-5-tonnes',
    excerpt: 'Un mois après le lancement, les Réunionnais ont déjà adopté le réflexe Cliiink.',
    content: `
# Bilan du premier mois

Un mois après le lancement, les chiffres sont encourageants !

## Les résultats en chiffres

- **5 tonnes** de verre collectées
- **2 500** utilisateurs inscrits
- **15 000** dépôts réalisés
- **750 000** points distribués

## Les champions du tri

Saint-Denis arrive en tête avec **40%** des dépôts, suivi de Saint-Pierre (25%) et Saint-Paul (15%).

### Classement par ville

| Ville | Dépôts | Part |
|-------|--------|------|
| Saint-Denis | 6 000 | 40% |
| Saint-Pierre | 3 750 | 25% |
| Saint-Paul | 2 250 | 15% |
| Autres | 3 000 | 20% |

## Objectifs pour les prochains mois

- Installer **10 nouvelles bornes** d'ici mars 2025
- Atteindre **10 000 utilisateurs**
- Collecter **50 tonnes** de verre en 6 mois

## Merci !

Un grand merci à tous les participants et à nos partenaires pour leur engagement. Ensemble, faisons de La Réunion un modèle d'économie circulaire !
    `,
    category: 'RESULTATS',
    tags: ['résultats', 'statistiques', 'bilan'],
    publishedAt: new Date('2024-12-01'),
    views: 1567,
    author: { name: 'Équipe Cliiink' },
  },
}

const relatedArticles = [
  {
    id: '2',
    title: 'Nos partenaires commerçants vous récompensent',
    slug: 'partenaires-commercants-recompenses',
    category: 'PARTENAIRES',
    publishedAt: new Date('2024-11-20'),
  },
  {
    id: '3',
    title: '10 conseils pour bien trier le verre',
    slug: '10-conseils-bien-trier-verre',
    category: 'CONSEILS',
    publishedAt: new Date('2024-11-25'),
  },
]

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = articlesData[params.slug]

  if (!article) {
    return {
      title: 'Article non trouvé',
    }
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | Cliiink Réunion`,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt.toISOString(),
      authors: [article.author.name],
      tags: article.tags,
    },
  }
}

export default function ArticlePage({ params }: PageProps) {
  const article = articlesData[params.slug]

  if (!article) {
    notFound()
  }

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        // Headers
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-3xl font-bold text-gray-900 mb-4 mt-8">{line.slice(2)}</h1>
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-bold text-gray-800 mb-3 mt-6">{line.slice(3)}</h2>
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-semibold text-gray-800 mb-2 mt-4">{line.slice(4)}</h3>
        }
        // Lists
        if (line.startsWith('- ')) {
          return <li key={index} className="text-gray-600 ml-4">{line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>
        }
        if (/^\d+\. /.test(line)) {
          return <li key={index} className="text-gray-600 ml-4 list-decimal">{line.replace(/^\d+\. /, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>
        }
        // Blockquote
        if (line.startsWith('> ')) {
          return <blockquote key={index} className="border-l-4 border-primary pl-4 italic text-gray-600 my-4">{line.slice(2)}</blockquote>
        }
        // Italic
        if (line.startsWith('*') && line.endsWith('*')) {
          return <p key={index} className="text-gray-500 italic my-2">{line.slice(1, -1)}</p>
        }
        // Empty line
        if (line.trim() === '') {
          return <br key={index} />
        }
        // Tables (basic)
        if (line.startsWith('|')) {
          return null // Skip table lines for simplicity
        }
        // Regular paragraph
        return <p key={index} className="text-gray-600 leading-relaxed my-2" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>') }} />
      })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back button */}
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <Link
            href="/actualites"
            className="inline-flex items-center text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux actualités
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <section className="bg-white">
        <div className="container-custom py-12">
          <div className="max-w-3xl mx-auto">
            {/* Category & Date */}
            <div className="flex items-center gap-4 mb-6">
              <Badge className="bg-primary">
                {getCategoryLabel(article.category)}
              </Badge>
              <span className="text-gray-500 flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(article.publishedAt)}
              </span>
              <span className="text-gray-400 text-sm">
                {article.views} vues
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 mb-6">
              {article.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Share */}
            <div className="flex items-center gap-4 pt-6 border-t">
              <span className="text-gray-500 text-sm">Partager :</span>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="bg-gradient-to-br from-primary/20 to-eco-dark/20 py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto flex items-center justify-center">
            <span className="text-9xl">📰</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div className="prose-content">
                {renderContent(article.content)}
              </div>
            </div>

            {/* Author */}
            <div className="mt-8 bg-white rounded-xl p-6 flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{article.author.name}</p>
                <p className="text-gray-500 text-sm">Équipe Cliiink Réunion</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Articles similaires
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedArticles
                .filter((a) => a.slug !== article.slug)
                .slice(0, 2)
                .map((related) => (
                  <Link key={related.id} href={`/actualites/${related.slug}`}>
                    <Card hover className="p-6">
                      <Badge className="mb-3">
                        {getCategoryLabel(related.category)}
                      </Badge>
                      <h3 className="font-semibold text-gray-900 hover:text-primary transition-colors">
                        {related.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-2">
                        {formatDate(related.publishedAt)}
                      </p>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
