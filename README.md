# Bimera Website - Monorepo Platform

Plateforme web officielle de **Bimera Group**, structurée en monorepo comprenant un **frontend** moderne Next.js 14 et un **backend** RESTful Express.js avec Prisma & PostgreSQL.

---

## 🚀 Structure du Monorepo

```
bimera-website/
├── frontend/             # Application Web Next.js 14 (App Router, TailwindCSS, TypeScript)
├── backend/              # API Server Express.js (TypeScript, Prisma ORM, PostgreSQL)
└── docs/                 # Cahier des charges et spécifications techniques
```

---

## 🛠️ Stack Technique

- **Frontend** : Next.js 14 (App Router), TypeScript, TailwindCSS, Lucide React, Support i18n (fr, en, sw), Accessibilité WCAG 2.1 AA.
- **Backend** : Node.js, Express.js, TypeScript, Prisma ORM, PostgreSQL, Helmet, Zod Validation, Supabase Auth / Storage.
- **Sécurité** : Protection CSRF/CORS, Rate Limiting, Authentification avec Support 2FA (TOTP/Email), Back-office sécurisé avec contrôle d'accès basé sur les rôles (RBAC).

---

## ⚡ Démarrage Rapide

### 1. Cloner & Installer les dépendances

```bash
cd frontend && npm install
cd ../backend && npm install
```

### 2. Variables d'Environnement

Configurez les fichiers `.env` dans les dossiers `frontend/` et `backend/` en vous basant sur leurs fichiers `.env.example` respectifs.

### 3. Base de Données Backend (Prisma)

```bash
cd backend
npx prisma db push
npx prisma generate
```

### 4. Lancement des Serveurs de Développement

- **Frontend** (Next.js) : `http://localhost:3000`
  ```bash
  npm run dev:frontend
  ```
- **Backend** (Express) : `http://localhost:5000`
  ```bash
  npm run dev:backend
  ```

---

## 🌐 Fonctionnalités Clés

- **4 Pôles d'Activités** : Agriculture, Élevage, Informatique, Technique/Ingénierie.
- **Contenu Dynamique & Blocks** : Éditeur de blocs pour pages et articles d'actualités.
- **Espace Membre Protégé** : Portail membre `/portail` avec documents et ressources réservées.
- **Back-office Admin** : Tableau de bord complet `/admin` pour la gestion des rôles, des médias, des événements et des sauvegardes.
- **Multilingue (i18n)** : Français (fr), Anglais (en), Swahili (sw).
