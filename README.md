# Cliiink Réunion 🌴♻️

Site web vitrine pour **Cliiink Réunion** - Le dispositif de recyclage du verre avec récompenses à La Réunion.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748)

## 📋 Fonctionnalités

### Site Public
- 🏠 **Page d'accueil** - Présentation du dispositif, statistiques d'impact, partenaires
- 🗺️ **Carte interactive** - Localisation des bornes Cliiink sur l'île
- 📰 **Actualités** - Blog avec articles sur l'environnement et les événements
- 🤝 **Partenaires** - Liste des commerçants partenaires avec leurs offres
- 📧 **Contact** - Formulaires pour particuliers et commerçants
- 📜 **Pages légales** - Mentions légales, confidentialité, cookies

### Administration
- 📊 **Tableau de bord** - Vue d'ensemble des statistiques
- 📍 **Gestion des bornes** - CRUD complet
- 🏪 **Gestion des partenaires** - CRUD complet
- ✏️ **Gestion des articles** - Éditeur de contenu
- 💬 **Messages** - Consultation des demandes de contact
- ⚙️ **Paramètres** - Configuration du site et statistiques

## 🚀 Installation

### Prérequis
- Node.js 18+ 
- PostgreSQL 14+
- npm ou yarn

### Étapes

1. **Cloner le projet**
```bash
git clone <repository-url>
cd CliiinkRE
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration de l'environnement**
```bash
cp .env.example .env
```

Modifiez le fichier `.env` avec vos valeurs :
```env
DATABASE_URL="postgresql://user:password@localhost:5432/cliiink_reunion"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

4. **Initialiser la base de données**
```bash
# Générer le client Prisma
npx prisma generate

# Créer les tables
npx prisma db push

# Peupler avec les données de démonstration
npx prisma db seed
```

5. **Lancer le serveur de développement**
```bash
npm run dev
```

Le site est accessible sur [http://localhost:3000](http://localhost:3000)

## 🔐 Accès Administration

Après le seed de la base de données, un compte administrateur est créé :

- **URL** : [http://localhost:3000/admin](http://localhost:3000/admin)
- **Email** : `admin@cliiink-reunion.re`
- **Mot de passe** : `Admin123!`

⚠️ **Important** : Changez le mot de passe en production !

## 📁 Structure du Projet

```
CliiinkRE/
├── prisma/
│   ├── schema.prisma      # Schéma de la base de données
│   └── seed.ts            # Données de démonstration
├── src/
│   ├── app/
│   │   ├── (public)/      # Pages publiques
│   │   │   ├── page.tsx              # Accueil
│   │   │   ├── carte/                # Carte des bornes
│   │   │   ├── actualites/           # Blog
│   │   │   ├── partenaires/          # Liste partenaires
│   │   │   ├── contact/              # Formulaires de contact
│   │   │   ├── mentions-legales/
│   │   │   ├── confidentialite/
│   │   │   └── cookies/
│   │   ├── admin/
│   │   │   ├── login/                # Connexion admin
│   │   │   └── (dashboard)/          # Dashboard protégé
│   │   │       ├── page.tsx          # Tableau de bord
│   │   │       ├── bornes/
│   │   │       ├── partenaires/
│   │   │       ├── actualites/
│   │   │       ├── messages/
│   │   │       └── parametres/
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/   # Authentification
│   │   │   ├── contact/              # API contact
│   │   │   ├── bornes/               # API bornes
│   │   │   ├── partenaires/          # API partenaires
│   │   │   ├── actualites/           # API articles
│   │   │   └── stats/                # API statistiques
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                       # Composants réutilisables
│   │   ├── layout/                   # Header, Footer
│   │   ├── home/                     # Sections page d'accueil
│   │   └── providers/                # Providers (Auth)
│   ├── lib/
│   │   ├── prisma.ts                 # Client Prisma
│   │   ├── auth.ts                   # Utilitaires auth
│   │   └── utils.ts                  # Fonctions utilitaires
│   └── types/
│       └── index.ts                  # Types TypeScript
├── public/
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## 🛠️ Technologies Utilisées

| Technologie | Usage |
|-------------|-------|
| **Next.js 14** | Framework React avec App Router |
| **TypeScript** | Typage statique |
| **Tailwind CSS** | Styling |
| **Prisma** | ORM pour PostgreSQL |
| **NextAuth.js** | Authentification |
| **React Hook Form** | Gestion des formulaires |
| **Zod** | Validation des données |
| **Leaflet** | Carte interactive |
| **Radix UI** | Composants accessibles |
| **Lucide React** | Icônes |

## 📦 Scripts Disponibles

```bash
# Développement
npm run dev

# Build production
npm run build

# Démarrer en production
npm start

# Linter
npm run lint

# Prisma Studio (interface BDD)
npx prisma studio

# Mise à jour schéma BDD
npx prisma db push

# Reset BDD + seed
npx prisma migrate reset
```

## 🎨 Personnalisation

### Palette de Couleurs

Les couleurs sont définies dans `tailwind.config.ts` :

| Couleur | Hex | Usage |
|---------|-----|-------|
| Primary | `#2D8B4E` | Vert Cliiink |
| Primary Dark | `#1e6b3a` | Variante foncée |
| Secondary | `#F59E0B` | Orange accent |

### Variables CSS

Les variables CSS personnalisées sont dans `src/app/globals.css`.

## 🚀 Déploiement

### Vercel (Recommandé)

1. Connectez votre repository GitHub à Vercel
2. Configurez les variables d'environnement
3. Déployez !

### Docker

```bash
docker build -t cliiink-reunion .
docker run -p 3000:3000 cliiink-reunion
```

### Variables d'Environnement Production

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://cliiink-reunion.re"
NEXTAUTH_SECRET="<générez-une-clé-sécurisée>"
RECAPTCHA_SITE_KEY="..."
RECAPTCHA_SECRET_KEY="..."
SMTP_HOST="..."
SMTP_PORT="587"
SMTP_USER="..."
SMTP_PASSWORD="..."
```

## 📝 TODO / Améliorations Futures

- [ ] Éditeur WYSIWYG pour les articles
- [ ] Upload d'images avec stockage cloud
- [ ] Notifications par email
- [ ] Intégration API Cliiink pour stats temps réel
- [ ] PWA avec notifications push
- [ ] Mode sombre
- [ ] Tests unitaires et E2E
- [ ] Internationalisation (créole réunionnais)

## 📄 Licence

Propriétaire - © 2024 Cliiink Réunion

## 🤝 Contact

Pour toute question concernant ce projet :
- Email : contact@cliiink-reunion.re
- Site : [www.cliiink-reunion.re](https://www.cliiink-reunion.re)
