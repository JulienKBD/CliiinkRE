import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions Légales | Cliiink Réunion',
  description: 'Mentions légales du site Cliiink Réunion - Informations juridiques et légales.',
}

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            Mentions Légales
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-xl shadow-sm p-8 md:p-12 prose prose-lg max-w-none">
            <h2>1. Éditeur du site</h2>
            <p>
              Le site <strong>Cliiink Réunion</strong> est édité par :
            </p>
            <address className="not-italic">
              <strong>CLIIINK Réunion</strong><br />
              Adresse : [Adresse de l&apos;entreprise]<br />
              97400 Saint-Denis, La Réunion<br />
              France
            </address>
            <ul>
              <li><strong>Téléphone :</strong> 0262 XX XX XX</li>
              <li><strong>Email :</strong> contact@cliiink-reunion.re</li>
              <li><strong>SIRET :</strong> [Numéro SIRET]</li>
              <li><strong>Directeur de la publication :</strong> [Nom du directeur]</li>
            </ul>

            <h2>2. Hébergement</h2>
            <p>
              Le site est hébergé par :
            </p>
            <address className="not-italic">
              <strong>Vercel Inc.</strong><br />
              440 N Barranca Ave #4133<br />
              Covina, CA 91723<br />
              États-Unis
            </address>

            <h2>3. Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus présents sur le site Cliiink Réunion (textes, images, 
              graphismes, logo, icônes, sons, logiciels, etc.) sont protégés par le droit 
              d&apos;auteur et le droit de la propriété intellectuelle.
            </p>
            <p>
              Toute reproduction, représentation, modification, publication, adaptation de tout 
              ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, 
              est interdite, sauf autorisation écrite préalable de Cliiink Réunion.
            </p>
            <p>
              Toute exploitation non autorisée du site ou de l&apos;un quelconque des éléments 
              qu&apos;il contient sera considérée comme constitutive d&apos;une contrefaçon et 
              poursuivie conformément aux dispositions des articles L.335-2 et suivants du 
              Code de Propriété Intellectuelle.
            </p>

            <h2>4. Marques</h2>
            <p>
              Les marques et logos reproduits sur le site sont déposés par les sociétés qui 
              en sont propriétaires. Toute reproduction est strictement interdite.
            </p>

            <h2>5. Limitation de responsabilité</h2>
            <p>
              Cliiink Réunion ne pourra être tenu responsable des dommages directs et indirects 
              causés au matériel de l&apos;utilisateur, lors de l&apos;accès au site, et résultant 
              soit de l&apos;utilisation d&apos;un matériel ne répondant pas aux spécifications 
              indiquées, soit de l&apos;apparition d&apos;un bug ou d&apos;une incompatibilité.
            </p>
            <p>
              Cliiink Réunion ne pourra également être tenu responsable des dommages indirects 
              consécutifs à l&apos;utilisation du site.
            </p>
            <p>
              Des espaces interactifs (possibilité de poser des questions dans l&apos;espace contact) 
              sont à la disposition des utilisateurs. Cliiink Réunion se réserve le droit de 
              supprimer, sans mise en demeure préalable, tout contenu déposé dans cet espace 
              qui contreviendrait à la législation applicable en France.
            </p>

            <h2>6. Liens hypertextes</h2>
            <p>
              Le site peut contenir des liens hypertextes vers d&apos;autres sites internet. 
              Cliiink Réunion n&apos;exerce aucun contrôle sur ces sites et décline toute 
              responsabilité quant à leur contenu.
            </p>

            <h2>7. Cookies</h2>
            <p>
              Le site utilise des cookies pour améliorer l&apos;expérience utilisateur et 
              analyser le trafic. Pour en savoir plus, consultez notre{' '}
              <a href="/cookies" className="text-primary hover:underline">
                politique de cookies
              </a>.
            </p>

            <h2>8. Droit applicable</h2>
            <p>
              Les présentes mentions légales sont régies par la loi française. En cas de litige, 
              les tribunaux français seront seuls compétents.
            </p>

            <h2>9. Contact</h2>
            <p>
              Pour toute question concernant ces mentions légales, vous pouvez nous contacter :
            </p>
            <ul>
              <li>Par email : <a href="mailto:contact@cliiink-reunion.re" className="text-primary hover:underline">contact@cliiink-reunion.re</a></li>
              <li>Par téléphone : 0262 XX XX XX</li>
              <li>Par courrier : CLIIINK Réunion, [Adresse], 97400 Saint-Denis</li>
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
