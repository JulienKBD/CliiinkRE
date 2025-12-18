import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de Confidentialité | Cliiink Réunion',
  description: 'Politique de confidentialité et protection des données personnelles de Cliiink Réunion.',
}

export default function ConfidentialitePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            Politique de Confidentialité
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-xl shadow-sm p-8 md:p-12 prose prose-lg max-w-none">
            <p className="lead">
              Cliiink Réunion s&apos;engage à protéger votre vie privée. Cette politique 
              de confidentialité explique comment nous collectons, utilisons et protégeons 
              vos données personnelles.
            </p>

            <h2>1. Responsable du traitement</h2>
            <p>
              Le responsable du traitement des données personnelles est :
            </p>
            <address className="not-italic">
              <strong>CLIIINK Réunion</strong><br />
              [Adresse de l&apos;entreprise]<br />
              97400 Saint-Denis, La Réunion<br />
              Email : contact@cliiink-reunion.re
            </address>

            <h2>2. Données collectées</h2>
            <p>
              Nous collectons les données suivantes :
            </p>
            
            <h3>2.1 Données fournies directement par vous</h3>
            <ul>
              <li><strong>Formulaire de contact (Particulier) :</strong> nom, adresse email, message</li>
              <li><strong>Formulaire de contact (Commerçant) :</strong> nom de l&apos;entreprise, nom du contact, 
              fonction, email, téléphone, message</li>
              <li><strong>Compte utilisateur :</strong> nom, email, mot de passe (hashé)</li>
            </ul>

            <h3>2.2 Données collectées automatiquement</h3>
            <ul>
              <li>Adresse IP</li>
              <li>Type de navigateur et de système d&apos;exploitation</li>
              <li>Pages visitées et temps passé sur le site</li>
              <li>Source de la visite (moteur de recherche, lien direct, etc.)</li>
            </ul>

            <h2>3. Finalités du traitement</h2>
            <p>
              Vos données sont utilisées pour :
            </p>
            <ul>
              <li>Répondre à vos demandes de contact</li>
              <li>Gérer les demandes de partenariat</li>
              <li>Améliorer notre site et nos services</li>
              <li>Établir des statistiques de fréquentation</li>
              <li>Vous envoyer des communications si vous y avez consenti</li>
            </ul>

            <h2>4. Base légale du traitement</h2>
            <p>
              Le traitement de vos données repose sur :
            </p>
            <ul>
              <li><strong>Votre consentement :</strong> pour l&apos;envoi de newsletters</li>
              <li><strong>L&apos;exécution d&apos;un contrat :</strong> pour les demandes de partenariat</li>
              <li><strong>L&apos;intérêt légitime :</strong> pour l&apos;amélioration de nos services</li>
              <li><strong>L&apos;obligation légale :</strong> pour certaines données requises par la loi</li>
            </ul>

            <h2>5. Destinataires des données</h2>
            <p>
              Vos données peuvent être transmises à :
            </p>
            <ul>
              <li>Notre équipe interne (service client, partenariats)</li>
              <li>Nos prestataires techniques (hébergement, maintenance)</li>
              <li>Les autorités compétentes en cas d&apos;obligation légale</li>
            </ul>
            <p>
              Nous ne vendons jamais vos données à des tiers.
            </p>

            <h2>6. Durée de conservation</h2>
            <p>
              Vos données sont conservées pendant :
            </p>
            <ul>
              <li><strong>Messages de contact :</strong> 3 ans à compter du dernier contact</li>
              <li><strong>Demandes de partenariat :</strong> 5 ans</li>
              <li><strong>Données de navigation :</strong> 13 mois</li>
              <li><strong>Compte utilisateur :</strong> jusqu&apos;à suppression du compte, puis 3 ans d&apos;archivage</li>
            </ul>

            <h2>7. Vos droits</h2>
            <p>
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul>
              <li><strong>Droit d&apos;accès :</strong> obtenir une copie de vos données</li>
              <li><strong>Droit de rectification :</strong> corriger vos données inexactes</li>
              <li><strong>Droit à l&apos;effacement :</strong> demander la suppression de vos données</li>
              <li><strong>Droit à la limitation :</strong> limiter le traitement de vos données</li>
              <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
              <li><strong>Droit d&apos;opposition :</strong> vous opposer au traitement de vos données</li>
              <li><strong>Droit de retirer votre consentement :</strong> à tout moment</li>
            </ul>
            <p>
              Pour exercer ces droits, contactez-nous à :{' '}
              <a href="mailto:dpo@cliiink-reunion.re" className="text-primary hover:underline">
                dpo@cliiink-reunion.re
              </a>
            </p>

            <h2>8. Sécurité des données</h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles pour 
              protéger vos données :
            </p>
            <ul>
              <li>Chiffrement SSL/TLS des communications</li>
              <li>Hashage des mots de passe</li>
              <li>Accès restreint aux données personnelles</li>
              <li>Sauvegarde régulière des données</li>
              <li>Mise à jour régulière de nos systèmes</li>
            </ul>

            <h2>9. Transfert de données</h2>
            <p>
              Vos données peuvent être transférées vers des pays hors de l&apos;Union Européenne 
              (notamment vers les États-Unis pour notre hébergeur). Dans ce cas, nous nous 
              assurons que des garanties appropriées sont mises en place (clauses contractuelles 
              types, certification, etc.).
            </p>

            <h2>10. Cookies</h2>
            <p>
              Pour plus d&apos;informations sur l&apos;utilisation des cookies, consultez notre{' '}
              <a href="/cookies" className="text-primary hover:underline">
                politique de cookies
              </a>.
            </p>

            <h2>11. Réclamation</h2>
            <p>
              Si vous estimez que le traitement de vos données n&apos;est pas conforme à la 
              réglementation, vous pouvez déposer une réclamation auprès de la CNIL :
            </p>
            <address className="not-italic">
              <strong>CNIL</strong><br />
              3 Place de Fontenoy<br />
              TSA 80715<br />
              75334 Paris Cedex 07<br />
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                www.cnil.fr
              </a>
            </address>

            <h2>12. Modification de la politique</h2>
            <p>
              Nous nous réservons le droit de modifier cette politique de confidentialité. 
              Toute modification sera publiée sur cette page avec une date de mise à jour.
            </p>

            <p className="text-sm text-gray-500 mt-8">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
