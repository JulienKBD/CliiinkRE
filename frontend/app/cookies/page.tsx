import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de Cookies | Cliiink Réunion',
  description: 'Informations sur l\'utilisation des cookies sur le site Cliiink Réunion.',
}

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            Politique de Cookies
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-xl shadow-sm p-8 md:p-12 prose prose-lg max-w-none">
            <p className="lead">
              Cette politique de cookies explique ce que sont les cookies, comment nous 
              les utilisons sur le site Cliiink Réunion, et quels sont vos choix concernant 
              leur utilisation.
            </p>

            <h2>1. Qu&apos;est-ce qu&apos;un cookie ?</h2>
            <p>
              Un cookie est un petit fichier texte stocké sur votre ordinateur ou appareil 
              mobile lorsque vous visitez un site web. Les cookies sont largement utilisés 
              pour faire fonctionner les sites web, les rendre plus efficaces, et fournir 
              des informations aux propriétaires du site.
            </p>

            <h2>2. Types de cookies utilisés</h2>
            
            <h3>2.1 Cookies strictement nécessaires</h3>
            <p>
              Ces cookies sont indispensables au fonctionnement du site. Ils vous permettent 
              de naviguer sur le site et d&apos;utiliser ses fonctionnalités essentielles.
            </p>
            <table className="w-full">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Durée</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>session_id</td>
                  <td>Session</td>
                  <td>Maintient votre session de navigation</td>
                </tr>
                <tr>
                  <td>cookie_consent</td>
                  <td>1 an</td>
                  <td>Enregistre vos préférences de cookies</td>
                </tr>
              </tbody>
            </table>

            <h3>2.2 Cookies de performance et analytiques</h3>
            <p>
              Ces cookies nous aident à comprendre comment les visiteurs interagissent 
              avec notre site en collectant et en rapportant des informations de manière 
              anonyme.
            </p>
            <table className="w-full">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Durée</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>_ga</td>
                  <td>2 ans</td>
                  <td>Google Analytics - Distingue les utilisateurs</td>
                </tr>
                <tr>
                  <td>_gid</td>
                  <td>24 heures</td>
                  <td>Google Analytics - Distingue les utilisateurs</td>
                </tr>
                <tr>
                  <td>_gat</td>
                  <td>1 minute</td>
                  <td>Google Analytics - Limite le taux de requêtes</td>
                </tr>
              </tbody>
            </table>

            <h3>2.3 Cookies de fonctionnalité</h3>
            <p>
              Ces cookies permettent au site de se souvenir des choix que vous faites 
              (comme votre langue préférée) et de fournir des fonctionnalités améliorées 
              et plus personnalisées.
            </p>
            <table className="w-full">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Durée</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>theme</td>
                  <td>1 an</td>
                  <td>Préférences d&apos;affichage</td>
                </tr>
                <tr>
                  <td>map_preferences</td>
                  <td>30 jours</td>
                  <td>Préférences de la carte (zoom, centre)</td>
                </tr>
              </tbody>
            </table>

            <h3>2.4 Cookies tiers</h3>
            <p>
              Notre site peut utiliser des services tiers qui placent leurs propres cookies :
            </p>
            <ul>
              <li><strong>OpenStreetMap :</strong> Pour l&apos;affichage de la carte interactive</li>
              <li><strong>Google Analytics :</strong> Pour l&apos;analyse du trafic (si activé)</li>
              <li><strong>reCAPTCHA :</strong> Pour la protection anti-spam des formulaires</li>
            </ul>

            <h2>3. Gestion des cookies</h2>
            <p>
              Vous pouvez gérer vos préférences de cookies de plusieurs manières :
            </p>

            <h3>3.1 Via notre bannière de cookies</h3>
            <p>
              Lors de votre première visite, une bannière vous permet de choisir quels 
              types de cookies accepter ou refuser.
            </p>

            <h3>3.2 Via les paramètres de votre navigateur</h3>
            <p>
              La plupart des navigateurs vous permettent de gérer vos préférences de cookies. 
              Voici comment procéder pour les navigateurs les plus courants :
            </p>
            <ul>
              <li>
                <strong>Google Chrome :</strong> Paramètres → Confidentialité et sécurité → 
                Cookies et autres données des sites
              </li>
              <li>
                <strong>Firefox :</strong> Options → Vie privée et sécurité → Cookies et 
                données de sites
              </li>
              <li>
                <strong>Safari :</strong> Préférences → Confidentialité → Gérer les données 
                de sites web
              </li>
              <li>
                <strong>Microsoft Edge :</strong> Paramètres → Cookies et autorisations de site
              </li>
            </ul>

            <h3>3.3 Désactivation des cookies analytiques</h3>
            <p>
              Vous pouvez désactiver Google Analytics en installant le{' '}
              <a 
                href="https://tools.google.com/dlpage/gaoptout" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                module complémentaire de désactivation Google Analytics
              </a>.
            </p>

            <h2>4. Conséquences de la désactivation des cookies</h2>
            <p>
              Si vous choisissez de désactiver certains cookies, certaines fonctionnalités 
              du site pourraient ne pas fonctionner correctement :
            </p>
            <ul>
              <li>La carte interactive pourrait ne pas s&apos;afficher correctement</li>
              <li>Vos préférences ne seront pas sauvegardées entre les visites</li>
              <li>Les formulaires pourraient être plus vulnérables au spam</li>
            </ul>

            <h2>5. Mises à jour de cette politique</h2>
            <p>
              Nous pouvons mettre à jour cette politique de cookies de temps à autre. 
              Nous vous encourageons à consulter cette page régulièrement pour rester 
              informé de notre utilisation des cookies.
            </p>

            <h2>6. Contact</h2>
            <p>
              Si vous avez des questions concernant notre utilisation des cookies, 
              vous pouvez nous contacter :
            </p>
            <ul>
              <li>
                Par email :{' '}
                <a href="mailto:contact@cliiink-reunion.re" className="text-primary hover:underline">
                  contact@cliiink-reunion.re
                </a>
              </li>
              <li>Par téléphone : 0262 XX XX XX</li>
            </ul>

            <p className="text-sm text-gray-500 mt-8">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
