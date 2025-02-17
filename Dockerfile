FROM node:20-alpine

WORKDIR /app

# Installation des dépendances système de base
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    libc6-compat

# Installation des dépendances du projet
COPY package*.json ./
RUN npm install

# Copie des fichiers de l'application
COPY . .

# Using .env variables
COPY .env.prod .

# Linting
RUN npm run lint

# Génération du client Prisma uniquement (pas besoin de db push car MongoDB Atlas)
RUN npx prisma generate

# Build de l'application Next.js
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]