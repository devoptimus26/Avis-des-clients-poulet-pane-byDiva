# 🍽️ Avis des Clients - Restaurant

Une application web simple et élégante pour collecter, modérer et afficher les avis des clients de votre restaurant.

## ✨ Fonctionnalités

- ⭐ **Formulaire d'évaluation** : Les clients peuvent évaluer leur expérience sur 5 étoiles
- 📝 **Commentaires** : Espace pour partager des détails sur leur expérience
- 👤 **Informations clients** : Collecte du nom et email
- 🎯 **Affichage des avis** : Section dédiée pour afficher tous les avis approuvés
- 🔐 **Panneau d'administration** : Interface de modération sécurisée
- ✅ **Modération** : Approuver, rejeter ou supprimer les avis
- 🔍 **Filtrage** : Filtrer les avis par note (1-5 étoiles)
- 💾 **Stockage local** : Les données sont sauvegardées dans le navigateur

## 🚀 Installation

1. Clonez ce dépôt :
```bash
git clone https://github.com/devoptimus26/Avis-des-clients-restaurant.git
cd Avis-des-clients-restaurant
```

2. Ouvrez `index.html` dans votre navigateur web

C'est tout ! L'application fonctionne sans serveur.

## 📖 Utilisation

### Pour les clients :
1. Remplissez le formulaire avec vos informations
2. Sélectionnez votre note (1-5 étoiles)
3. Écrivez votre commentaire
4. Cliquez sur "Soumettre mon avis"

### Pour l'administrateur :
1. Allez à la section "Panneau d'Administration" en bas
2. Entrez le mot de passe
3. Gérez les avis en attente :
   - ✓ Approuver : Publier l'avis
   - ✗ Rejeter : Refuser l'avis
   - 🗑️ Supprimer : Supprimer un avis approuvé

## 🔧 Configuration

### Changer le mot de passe admin

Ouvrez `app.js` et modifiez cette ligne :
```javascript
const ADMIN_PASSWORD = 'votre_mot_de_passe'; // À changer !
```

Remplacez `'votre_mot_de_passe'` par un mot de passe sécurisé de votre choix.

## 💾 Données

Les données sont stockées dans le **localStorage** de votre navigateur. Cela signifie :
- ✅ Aucun serveur nécessaire
- ✅ Données privées (locale)
- ⚠️ Les données seront perdues si vous videz le cache du navigateur
- ⚠️ Les données ne sont pas sauvegardées entre les appareils

## 📊 Export et Import

L'application supporte l'export et l'import des données en JSON. Vous pouvez utiliser les fonctions dans la console :

```javascript
// Exporter les données
exportData();

// Importer des données
importData(fileInput.files[0]);
```

## 🎨 Personnalisation

### Modifier les couleurs
Ouvrez `styles.css` et modifiez les gradients :
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Modifier le texte
Ouvrez `index.html` et modifiez les textes selon vos besoins.

### Ajouter un logo
Ajoutez une balise image dans le header HTML :
```html
<img src="your-logo.png" alt="Logo" class="logo">
```

## 📱 Responsive

L'application est entièrement responsive et fonctionne sur :
- 💻 Ordinateurs de bureau
- 📱 Tablettes
- 📞 Smartphones

## 🔒 Sécurité

- Les mots de passe sont stockés en clair (pour une app simple). Pour une utilisation en production, envisagez une solution backend.
- Les commentaires sont échappés pour éviter les injections XSS
- Pas de transmission de données personnelles sur internet

## 🌐 Déployer en ligne

Pour faire fonctionner cette app en ligne, vous pouvez l'héberger sur :

- **GitHub Pages** (gratuit)
- **Vercel**
- **Netlify**
- **Firebase Hosting**

### Déployer sur GitHub Pages :

1. Allez dans les paramètres du dépôt
2. Allez à "Pages"
3. Sélectionnez "main" comme branche
4. L'app sera disponible à : `https://devoptimus26.github.io/Avis-des-clients-restaurant`

## 📝 Licence

Ce projet est sous licence MIT. Libre d'utilisation et de modification.

## 💡 Améliorations futures

- Intégration avec une base de données (Firebase, MongoDB, etc.)
- Envoi d'emails de notification
- Système de notation globale moyenne
- Export en PDF
- Intégration Google Maps
- Authentification 2FA pour l'admin
- API backend pour la synchronisation multi-appareil

## 🤝 Support

Si vous avez des questions ou besoin d'aide, n'hésitez pas à ouvrir une issue sur GitHub.

---

**Bon appétit et merci pour vos avis ! 🍽️**
