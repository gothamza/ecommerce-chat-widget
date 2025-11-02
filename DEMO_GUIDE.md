# DAIKO Chatbot - Guide de Démonstration

## 🎯 Vue d'ensemble

Le chatbot DAIKO inclut maintenant un système de démonstration complet avec **6 scénarios pré-configurés** qui montrent différentes capacités du chatbot.

## 📱 Comment utiliser la démo

### 1. Ouvrir le chatbot
- Cliquez sur le bouton de chat en bas à droite
- Le chatbot s'ouvre automatiquement avec le scénario "Découverte de Produits"

### 2. Changer de scénario
- Utilisez le panneau "Scénarios de Démo" en haut à gauche
- Cliquez sur n'importe quel scénario pour voir une conversation pré-chargée
- Le chatbot se réinitialise avec le nouveau scénario

## 🎬 Scénarios disponibles

### 1. 🔍 Découverte de Produits
**Scénario** : Un client cherche une Smart TV
- Découverte de produit avec carte produit interactive
- Affichage de l'image réelle du produit LED 32" Smart TV
- Détails du produit et recommandations

**Cas d'usage** : Aide les clients à trouver des produits spécifiques

### 2. 📦 Suivi de Commande
**Scénario** : Un client veut suivre sa commande
- Demande du numéro de commande
- Affichage du statut en temps réel
- Informations de livraison

**Cas d'usage** : Réduit les appels au support pour le suivi des commandes

### 3. ⚖️ Comparaison de Produits
**Scénario** : Un client hésite entre deux modèles de climatiseurs
- Comparaison détaillée des caractéristiques
- Recommandations personnalisées basées sur les besoins
- Aide à la décision

**Cas d'usage** : Aide les clients indécis à choisir le bon produit

### 4. 🚚 Informations Livraison
**Scénario** : Un client demande des informations sur la livraison
- Options de livraison disponibles
- Délais et tarifs
- Zones de livraison

**Cas d'usage** : Répond aux questions fréquentes sur la livraison

### 5. 🔄 Retours & Support
**Scénario** : Un client a reçu un produit endommagé
- Processus de retour initié
- Instructions claires
- Rassurance et suivi

**Cas d'usage** : Gère les retours et problèmes de manière efficace

### 6. 🛍️ Recommandations Multiples
**Scénario** : Un client cherche des produits pour équiper sa cuisine
- Affichage de plusieurs produits en même temps
- Cartes produits avec images
- Recommandations personnalisées

**Cas d'usage** : Permet la découverte de plusieurs produits simultanément

## 🖼️ Images Produits

Le chatbot utilise l'image réelle du produit **LED 32" FHD Smart TV** qui se trouve dans :
- `LED32R7298K_b4a56356-bf07-4a4a-9a9f-521ef721c4d3_600x_crop_center.png`

Pour ajouter d'autres images produits :
1. Placez les images dans le dossier racine du projet
2. Mettez à jour `js/demo-data.js` avec les noms de fichiers
3. Les images s'afficheront automatiquement dans les cartes produits

## 💻 Structure Technique

### Fichiers créés/modifiés

1. **js/demo-data.js** - Nouveau fichier
   - Contient tous les scénarios de démo
   - Données des produits
   - Fonctions pour récupérer les scénarios

2. **js/main.js** - Modifié
   - Ajout de `loadDemoScenario()` pour charger les scénarios
   - Ajout de `addDemoMessage()` pour les messages avec timestamps
   - Chargement automatique du scénario par défaut

3. **js/utils.js** - Modifié
   - Amélioration de `createProductCard()` pour gérer les images locales
   - Gestion automatique du format de prix (MAD)

4. **index.html** - Modifié
   - Ajout du sélecteur de scénarios
   - Inclusion de `demo-data.js`

5. **css/style.css** - Modifié
   - Styles pour le sélecteur de scénarios
   - Responsive design

## 🎨 Personnalisation

### Ajouter un nouveau scénario

1. Ouvrez `js/demo-data.js`
2. Ajoutez un nouveau scénario dans `scenarios` :
```javascript
monNouveauScenario: [
    {
        type: 'bot',
        message: 'Message du bot',
        timestamp: new Date(Date.now() - 60000 * 5)
    },
    {
        type: 'user',
        message: 'Message de l\'utilisateur',
        timestamp: new Date(Date.now() - 60000 * 4)
    }
]
```

3. Ajoutez un bouton dans `index.html` pour charger ce scénario

### Ajouter un nouveau produit

1. Ajoutez l'image du produit dans le dossier racine
2. Ajoutez les données dans `js/demo-data.js` → `products` :
```javascript
monProduit: {
    id: 'unique-id',
    name: 'Nom du produit',
    price: '999 MAD',
    rating: '4.5',
    image: 'nom-du-fichier.png',
    description: 'Description du produit',
    category: 'Catégorie'
}
```

## 🚀 Prochaines étapes

Pour passer en production :
1. Retirez le sélecteur de scénarios (`index.html`)
2. Désactivez le chargement automatique des démos dans `js/main.js`
3. Connectez le chatbot à votre API backend réelle
4. Mettez à jour les produits avec vos vraies données

## 📝 Notes

- Les timestamps dans les scénarios sont simulés (5 minutes dans le passé)
- Les messages s'affichent avec un délai de 500ms pour un effet réaliste
- Les cartes produits sont interactives et peuvent être intégrées à votre système de panier
- Le chatbot fonctionne toujours même sans API backend (mode fallback)

---

**Développé pour DAIKO Électroménager** 🇲🇦

