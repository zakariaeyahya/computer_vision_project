# Smart Travel Guide - Mobile App (React Native)

Application mobile pour planifier des voyages intelligents et durables au Maroc.

## 🚀 Démarrage rapide

### Prérequis
- Node.js (v18 ou supérieur)
- npm ou yarn
- Expo CLI installé globalement : `npm install -g expo-cli`
- Expo Go app sur votre téléphone (iOS ou Android)

### Installation

1. Installer les dépendances :
```bash
cd mobile
npm install
```

2. Lancer l'application en mode développement :
```bash
npm start
```

3. Scanner le QR code avec :
   - **iOS** : Camera app
   - **Android** : Expo Go app

### Scripts disponibles

- `npm start` - Démarre le serveur Expo
- `npm run android` - Lance sur émulateur/appareil Android
- `npm run ios` - Lance sur émulateur/appareil iOS (Mac uniquement)
- `npm run web` - Lance dans le navigateur
- `npm run lint` - Vérifie le code avec ESLint
- `npm run type-check` - Vérifie les types TypeScript

## 📱 Structure du projet

```
mobile/
├── src/
│   ├── components/      # Composants réutilisables
│   ├── screens/         # Écrans de l'app
│   ├── navigation/      # Configuration React Navigation
│   ├── types/           # Types TypeScript
│   ├── styles/          # Styles globaux et thème
│   ├── utils/           # Fonctions utilitaires
│   ├── services/        # Services API
│   ├── context/         # Context providers
│   ├── hooks/           # Custom hooks
│   └── App.tsx          # Point d'entrée
├── assets/              # Images, fonts, icons
├── app.json             # Configuration Expo
├── babel.config.js      # Configuration Babel
└── package.json         # Dépendances
```

## 🎨 Technologies

- **React Native** - Framework mobile
- **Expo** - Plateforme de développement
- **TypeScript** - Typage statique
- **React Navigation** - Navigation
- **React Native Paper** - UI Components (optionnel)

## 📄 Pages

1. **Accueil** - Hero + Destinations populaires
2. **Commencer un voyage** - Formulaire de planification
3. **Itinéraire** - Programme jour par jour
4. **Mes voyages** - Liste des voyages sauvegardés
5. **Profil** - Informations utilisateur

## 🔗 Backend

Le backend Django REST API est dans le dossier `../backend/`
