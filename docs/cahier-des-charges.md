# Cahier des Charges - Plateforme Bimera Group

## 1. Objectifs du Projet
Le projet **Bimera Website** est la vitrine numérique et la plateforme de gestion centralisée du groupe Bimera. Il vise à promouvoir les 4 secteurs d'activités principaux :
1. **Agriculture** (Cultures durables, agronomie, distribution)
2. **Élevage** (Élevage responsable, produits laitiers & aviculture)
3. **Informatique** (Solutions matérielles & software, conseil IT, transformation digitale)
4. **Services Techniques** (Génie civil, ingénierie, maintenance industrielle)

## 2. Exigences Fonctionnelles

### 2.1 Front-office Public
- **Accueil** : Hero dynamique, présentation des 4 activités, chiffres clés, derniers articles & événements.
- **À Propos** : Vision, mission, historique du groupe, équipe dirigeante.
- **Pages Activités** : Sections dédiées détaillant chaque secteur avec cas clients et galeries d'images.
- **Médias & Actualités** : Blog avec catégories, galerie média avec lightbox, calendrier des événements.
- **Infos Pratiques & Contact** : Formulaire de contact sécurisé (reCAPTCHA v3), géolocalisation, FAQ.

### 2.2 Espace Membre Protégé (/portail)
- Connexion sécurisée via Supabase Auth avec support 2FA.
- Accès aux documents internes, actualités réservées et espace profil.

### 2.3 Back-office Administration (/admin)
- **Tableau de Bord** : Indicateurs de performance (visites, messages, utilisateurs actifs).
- **Gestionnaire de Contenu par Blocs** : Création/modification des pages et articles via un éditeur modulaire (Titres, Paragraphes, Images, Citations, Boutons).
- **Gestionnaire de Médias** : Téléversement et organisation des images/fichiers (Uploadthing/Supabase Storage).
- **Gestion des Rôles & Utilisateurs** : Administrateur, Éditeur, Membre, Visiteur.
- **Sauvegardes & SEO** : Configuration des métadonnées open graph, sitemap dynamique et déclenchement des sauvegardes de base de données.

## 3. Normes Techniques et Accessibilité (WCAG 2.1 AA)
- HTML5 sémantique (`<main>`, `<nav>`, `<article>`, `<header>`, `<footer>`).
- Attributs ARIA pour l'accessibilité (`aria-label`, `aria-expanded`, `role="..."`).
- Contraste des couleurs répondant aux normes WCAG AA (ratio minimal 4.5:1).
- Navigation intégrale au clavier et lien "Aller au contenu principal" (Skip link).
- Architecture multilingue i18n (Français, Anglais, Swahili).

## 4. Modèle de Données Backend (Prisma)
- **User** / **Role** : Gestion RBAC et identités.
- **Page** / **Block** : Système CMS modulaire.
- **Article** / **Event** / **Media** : Gestion du contenu dynamique.
- **ContactMessage** : Stockage et traitement des demandes d'information.
- **BackupLog** : Traçabilité des sauvegardes système.
