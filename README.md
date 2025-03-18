# Next Recipes

Une application web de recettes construite avec Next.js, permettant aux utilisateurs de gérer et partager leurs recettes préférées ainsi que d'orgnaniser leur plan de recettes.

## Fonctionnalités

- 🔐 **Authentification** via Clerk
- 🎨 **Thème personnalisable**
- 📝 **Blog** avec système d'articles
- 📅 **Planificateur de recettes** pour organiser les repas
- 💬 **Commentaires** sur les recettes / blog
- ⚡ **CRUD** complet pour les recettes
- 🔍 **Suggestions** de recettes similaires

## Technologies Utilisées

### Frontend

- [Next.js](https://nextjs.org/) - Framework React
- [TypeScript](https://www.typescriptlang.org/) - Typage statique
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [Clerk](https://clerk.dev/) - Authentification
- [React Hot Toast](https://react-hot-toast.com/) - Notifications
- [Headless UI](https://headlessui.dev/) - Composants UI accessibles
- [Lucide Icons](https://lucide.dev/) - Icônes
- [React Swiper](https://swiperjs.com/react) - Carrousels
- [date-fns](https://date-fns.org/) - Manipulation de dates

### Backend

- [Prisma](https://www.prisma.io/) - ORM
- [Zod](https://zod.dev/) - Validation de schémas

## Services

L'application dispose des services suivants :

### Service de Recettes

- Récupération de toutes les recettes
- Récupération d'une recette par slug
- Suggestions de recettes similaires par catégorie

## Installation

```bash
# Cloner le repository
git clone https://github.com/DenZaiyy/next-recipe.git

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local

# Lancer le serveur de développement
npm run dev
```
