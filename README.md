# DAIKO Électroménager Chatbot

Un chatbot moderne et élégant pour le site web DAIKO Électroménager, conçu avec les couleurs de la marque DAIKO et structuré de manière modulaire pour une maintenance facile.
![DAIKO Chatbot Screenshot](image.png)

## 🎨 Caractéristiques

- **Design moderne** avec les couleurs de la marque DAIKO (rouge/orange)
- **Interface en français** adaptée au marché marocain
- **Structure modulaire** pour une maintenance facile
- **Responsive** - fonctionne sur tous les appareils
- **Quick Actions** - boutons d'action rapide pour les besoins courants
- **Cartes produits** - affichage des produits avec images et prix
- **Mode hors ligne** - réponses de secours si l'API n'est pas disponible

## 📁 Structure du Projet

```
CHATBOT_EC/
├── index.html          # Structure HTML principale
├── css/
│   └── style.css       # Styles avec couleurs DAIKO
└── js/
    ├── config.js       # Configuration du chatbot
    ├── utils.js        # Fonctions utilitaires
    ├── api.js          # Gestion des appels API
    └── main.js         # Logique principale du chatbot
```

## 🚀 Installation

1. Clonez ou téléchargez ce projet
2. Ouvrez `index.html` dans un navigateur web
3. Le chatbot est prêt à l'emploi !

## ⚙️ Configuration

Tous les paramètres sont dans `js/config.js` :

### Couleurs DAIKO
Les couleurs sont définies dans `css/style.css` :
- **Rouge primaire** : `#E30613` (DAIKO Red)
- **Orange secondaire** : `#FF6B35`
- **Orange accent** : `#FF8C42`

### Configuration API
Modifiez l'URL de l'API dans `js/config.js` :
```javascript
api: {
    baseUrl: 'http://localhost:3000',
    endpoint: '/chat',
    timeout: 10000
}
```

### Messages personnalisés
Modifiez les messages dans `js/config.js` :
- Titre et sous-titre du chatbot
- Message de bienvenue
- Réponses de secours

## 🎯 Utilisation

### Intégration dans votre site

Pour intégrer le chatbot dans votre site DAIKO :

1. Copiez tous les fichiers dans votre projet
2. Ajoutez ce code avant la balise `</body>` de votre site :
```html
<!-- Chatbot DAIKO -->
<link rel="stylesheet" href="path/to/css/style.css">
<script src="path/to/js/config.js"></script>
<script src="path/to/js/utils.js"></script>
<script src="path/to/js/api.js"></script>
<script src="path/to/js/main.js"></script>
```

3. Le bouton de chat apparaîtra automatiquement en bas à droite

### Personnalisation

#### Couleurs
Modifiez les variables CSS dans `css/style.css` :
```css
:root {
    --daiko-primary: #E30613;      /* Couleur principale */
    --daiko-secondary: #FF6B35;    /* Couleur secondaire */
}
```

#### Quick Actions
Ajoutez ou modifiez les actions rapides dans `js/config.js` :
```javascript
quickActions: [
    {
        action: 'products',
        icon: 'fas fa-box',
        text: 'Voir les produits',
        message: 'Affichez-moi vos produits'
    }
]
```

## 📡 API Backend

Le chatbot attend une API backend qui répond à :
- **URL** : `http://localhost:3000/chat`
- **Méthode** : POST
- **Body** : `{ "message": "Votre message" }`
- **Réponse** : 
```json
{
    "reply": "Réponse du bot",
    "products": [
        {
            "id": "123",
            "name": "Nom du produit",
            "price": "1999 MAD",
            "image": "url-de-l-image",
            "rating": "4.5"
        }
    ]
}
```

## 🌐 Mode Hors Ligne

Si l'API n'est pas disponible, le chatbot utilise des réponses de secours intelligentes basées sur les mots-clés dans le message de l'utilisateur.

## 📱 Responsive

Le chatbot est entièrement responsive et s'adapte automatiquement aux écrans mobiles et tablettes.

## 🔧 Technologies Utilisées

- HTML5
- CSS3 (Variables CSS, Flexbox, Animations)
- JavaScript (ES6+, Classes, Async/Await)
- Font Awesome Icons
- Google Fonts (Inter)

## 📝 Notes

- Les couleurs sont configurées pour correspondre à la marque DAIKO
- Tous les textes sont en français pour le marché marocain
- Le chatbot fonctionne même sans connexion API (mode hors ligne)
- Facilement personnalisable via les fichiers de configuration

## 📧 Support

Pour toute question ou problème, veuillez contacter l'équipe de développement DAIKO.

---

**Développé pour DAIKO Électroménager** 🇲🇦

