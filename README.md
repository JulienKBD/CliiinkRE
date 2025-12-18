# Cliiink Réunion 🌴♻️

Site web vitrine pour **Cliiink Réunion** - Le dispositif de recyclage du verre avec récompenses à La Réunion.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1)

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
- MySQL 8+
- npm ou yarn

### Étapes

1. **Cloner le projet**
```bash
git clone <repository-url>
cd CliiinkRE
```

2. **Installer les dépendances frontend**
```bash
cd frontend
npm install
```

3. **Installer les dépendances backend**
```bash
cd ../backend
npm install
```

4. **Configuration de l'environnement**

Frontend (.env):
```env
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
BACKEND_URL="http://localhost:3001"
```

Backend (.env):
```env
MYSQL_HOST="localhost"
MYSQL_USER="root"
MYSQL_ROOT_PASSWORD="your-password"
MYSQL_DATABASE="cliiink_reunion"
PORT=3001
SECRET="your-jwt-secret"
```

5. **Initialiser la base de données**
```bash
# Exécuter le script SQL dans MySQL
mysql -u root -p < backend/config/db.sql
```

6. **Lancer les serveurs de développement**

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
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
├── backend/
│   ├── config/
│   │   ├── db.js              # Configuration MySQL
│   │   └── db.sql             # Script de création des tables
│   ├── middlewares/           # Middlewares Express
│   ├── routes/                # Routes API
│   │   ├── articles/
│   │   ├── auth/
│   │   ├── bornes/
│   │   ├── contact/
│   │   ├── partners/
│   │   └── stats/
│   ├── server.js              # Point d'entrée serveur
│   └── package.json
├── frontend/
│   ├── app/
│   │   ├── page.tsx           # Page d'accueil
│   │   ├── carte/             # Carte des bornes
│   │   ├── actualites/        # Blog
│   │   ├── partenaires/       # Liste partenaires
│   │   ├── contact/           # Formulaires de contact
│   │   ├── admin/             # Dashboard admin
│   │   └── api/auth/          # NextAuth API routes
│   ├── components/
│   │   ├── ui/                # Composants réutilisables
│   │   ├── layout/            # Header, Footer
│   │   ├── home/              # Sections page d'accueil
│   │   └── providers/         # Providers (Auth)
│   ├── lib/
│   │   ├── api.ts             # Client API backend
│   │   ├── auth.ts            # Configuration NextAuth
│   │   └── utils.ts           # Fonctions utilitaires
│   └── types/
│       └── index.ts           # Types TypeScript
├── public/
└── README.md
```

## 🏗️ Architecture

Le frontend appelle directement le backend via `lib/api.ts` :

```
Frontend (Next.js)  ──► Backend (Express.js) ──► MySQL
     │                        │
     └── NextAuth.js ─────────┘
```

- **Côté client** : Les composants React appellent les fonctions de `lib/api.ts`
- **Authentification** : NextAuth.js communique avec `/api/auth/login` du backend
- **Données** : Toutes les données (bornes, partenaires, articles, etc.) viennent du backend

## 🛠️ Technologies Utilisées

| Technologie | Usage |
|-------------|-------|
| **Next.js 14** | Framework React avec App Router |
| **TypeScript** | Typage statique |
| **Tailwind CSS** | Styling |
| **Express.js** | API Backend |
| **MySQL** | Base de données |
| **NextAuth.js** | Authentification |
| **React Hook Form** | Gestion des formulaires |
| **Zod** | Validation des données |
| **Leaflet** | Carte interactive |
| **Radix UI** | Composants accessibles |
| **Lucide React** | Icônes |

## 📦 Scripts Disponibles

```bash
# Frontend - Développement
cd frontend && npm run dev

# Frontend - Build production
cd frontend && npm run build

# Frontend - Démarrer en production
cd frontend && npm start

# Frontend - Linter
cd frontend && npm run lint

# Backend - Développement
cd backend && npm run dev

# Backend - Production
cd backend && npm start
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
