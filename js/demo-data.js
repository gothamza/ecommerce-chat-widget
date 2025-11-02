/**
 * DAIKO Chatbot Demo Data
 * Pre-configured chat scenarios and product data for demonstration
 */

const DemoData = {
    // Demo products with real DAIKO products
    products: {
        smartTV: {
            id: 'led32r7298k',
            name: 'LED 32" FHD Smart TV - Récepteur Intégré',
            price: '2 499 MAD',
            rating: '4.5',
            image: 'LED32R7298K_b4a56356-bf07-4a4a-9a9f-521ef721c4d3_600x_crop_center.png',
            description: 'Téléviseur LED 32 pouces Full HD avec Smart TV et récepteur intégré',
            category: 'Smart TV'
        },
        refrigerator: {
            id: 'fmin-5057ek',
            name: 'Réfrigérateur 4 portes NO FROST 415L Moteur Inverter',
            price: '9 999 MAD',
            rating: '4.8',
            image: 'Réfrigérateur 4 portes NO FROST.png',
            description: 'Réfrigérateur 415L avec technologie No Frost, Moteur Inverter, classe énergétique A++',
            category: 'Réfrigérateurs',
            model: 'FMIN-5057EK',
            volume: '415 L',
            energyClass: 'A++',
            refrigerant: 'R600a/55g',
            features: ['Moteur Inverter', 'No Frost', '4 portes']
        },
        gasStove: {
            id: 'cag8064dk',
            name: 'Cuisinière à gaz 90 cm 5 Brûleurs',
            price: '4 299 MAD',
            originalPrice: '5 000 MAD',
            rating: '4.6',
            image: 'Cuisinière à gaz 90 cm 5 Brûleurs.png',
            description: 'Cuisinière à gaz 90x60 cm avec 5 brûleurs, compartiment à bouteille et couvercle en verre',
            category: 'Cuisinières',
            model: 'CAG8064DK',
            features: ['5 brûleurs', 'Compartiment à bouteille', 'Couvercle en verre']
        },
        microwave: {
            id: 'fme-2563gedk',
            name: 'Micro-ondes Gril encastrable – 25L Écran d\'affichage LED',
            price: '2 199 MAD',
            originalPrice: '2 600 MAD',
            rating: '4.7',
            image: 'Micro-ondes Gril encastrable – 25L Écran d\'affichage LED.png',
            description: 'Micro-ondes encastrable 25L avec fonction grill, écran LED, décongélation et four à double vitrage',
            category: 'Micro-ondes',
            model: 'FME-2563GEDK',
            capacity: '25 L',
            power: '1250 W',
            features: ['Encastrable', 'Fonction grill', 'Écran LED', 'Décongélation', 'Four à double vitrage']
        },
        washingMachine: {
            id: 'wash7kg',
            name: 'Lave-linge DAIKO 7kg Front Load',
            price: '2 899 MAD',
            rating: '4.6',
            image: null,
            description: 'Lave-linge frontal 7kg avec plusieurs programmes de lavage et mode économie d\'énergie',
            category: 'Lave-linge'
        },
        airConditioner: {
            id: 'ac12000',
            name: 'Climatiseur DAIKO 12 000 BTU',
            price: '4 499 MAD',
            rating: '4.8',
            image: null,
            description: 'Climatiseur split 12 000 BTU, idéal pour les pièces jusqu\'à 25m²',
            category: 'Climatisation'
        }
    },

    // Pre-configured chat scenarios
    scenarios: {
        // Scenario 1: Product Discovery
        productDiscovery: [
            {
                type: 'bot',
                message: 'Bonjour ! 👋 Bienvenue sur DAIKO Électroménager. Je suis là pour vous aider à trouver des produits, suivre vos commandes ou répondre à vos questions. Comment puis-je vous aider aujourd\'hui ?',
                timestamp: new Date(Date.now() - 60000 * 5) // 5 minutes ago
            },
            {
                type: 'user',
                message: 'Je cherche une télévision Smart TV',
                timestamp: new Date(Date.now() - 60000 * 4)
            },
            {
                type: 'bot',
                message: 'Excellente question ! Je vous recommande notre LED 32" FHD Smart TV avec récepteur intégré. C\'est l\'un de nos meilleurs produits avec une excellente note !',
                timestamp: new Date(Date.now() - 60000 * 3),
                products: ['smartTV']
            },
            {
                type: 'user',
                message: 'Pouvez-vous me donner plus de détails ?',
                timestamp: new Date(Date.now() - 60000 * 2)
            },
            {
                type: 'bot',
                message: 'Bien sûr ! Cette Smart TV offre :\n\n✨ Écran LED 32 pouces Full HD\n📺 Smart TV avec applications intégrées\n📡 Récepteur satellite intégré\n⚡ Économie d\'énergie\n⭐ Note de 4.5/5\n\nPrix : 2 499 MAD\n\nSouhaitez-vous ajouter ce produit à votre panier ?',
                timestamp: new Date(Date.now() - 60000 * 1)
            }
        ],

        // Scenario 2: Order Tracking
        orderTracking: [
            {
                type: 'bot',
                message: 'Bonjour ! 👋 Bienvenue sur DAIKO Électroménager. Je suis là pour vous aider à trouver des produits, suivre vos commandes ou répondre à vos questions. Comment puis-je vous aider aujourd\'hui ?',
                timestamp: new Date(Date.now() - 60000 * 5)
            },
            {
                type: 'user',
                message: 'Je veux suivre ma commande',
                timestamp: new Date(Date.now() - 60000 * 4)
            },
            {
                type: 'bot',
                message: 'Bien sûr ! Pour vérifier le statut de votre commande, j\'aurai besoin de votre numéro de commande. Vous pouvez le trouver dans votre email de confirmation.',
                timestamp: new Date(Date.now() - 60000 * 3)
            },
            {
                type: 'user',
                message: 'C\'est le numéro DA-2024-12345',
                timestamp: new Date(Date.now() - 60000 * 2)
            },
            {
                type: 'bot',
                message: 'Parfait ! Votre commande #DA-2024-12345 est actuellement en cours de traitement.\n\n📦 Statut : En préparation\n🚚 Livraison prévue : 5 novembre 2024\n📍 Adresse : Casablanca, Maroc\n\nVous recevrez un SMS avec le numéro de suivi dès que votre commande sera expédiée.',
                timestamp: new Date(Date.now() - 60000 * 1)
            }
        ],

        // Scenario 3: Product Comparison
        productComparison: [
            {
                type: 'bot',
                message: 'Bonjour ! 👋 Bienvenue sur DAIKO Électroménager. Je suis là pour vous aider à trouver des produits, suivre vos commandes ou répondre à vos questions. Comment puis-je vous aider aujourd\'hui ?',
                timestamp: new Date(Date.now() - 60000 * 5)
            },
            {
                type: 'user',
                message: 'Je hésite entre un climatiseur 12 000 BTU et 18 000 BTU',
                timestamp: new Date(Date.now() - 60000 * 4)
            },
            {
                type: 'bot',
                message: 'Excellente question ! Voici les différences principales :\n\n❄️ Climatiseur 12 000 BTU :\n• Adapté pour pièces jusqu\'à 25m²\n• Prix : 4 499 MAD\n• Idéal pour chambres et salons moyens\n\n❄️ Climatiseur 18 000 BTU :\n• Adapté pour pièces jusqu\'à 40m²\n• Prix : 6 999 MAD\n• Idéal pour grands salons et espaces ouverts\n\n💡 Conseil : Considérez la taille de votre pièce pour faire le meilleur choix !',
                timestamp: new Date(Date.now() - 60000 * 3)
            },
            {
                type: 'user',
                message: 'Ma pièce fait environ 30m²',
                timestamp: new Date(Date.now() - 60000 * 2)
            },
            {
                type: 'bot',
                message: 'Pour une pièce de 30m², je vous recommande le modèle 18 000 BTU. Il sera plus efficace et offrira un meilleur confort, surtout en été. Voulez-vous que je vous montre les détails de ce produit ?',
                timestamp: new Date(Date.now() - 60000 * 1)
            }
        ],

        // Scenario 4: Shipping Information
        shippingInfo: [
            {
                type: 'bot',
                message: 'Bonjour ! 👋 Bienvenue sur DAIKO Électroménager. Je suis là pour vous aider à trouver des produits, suivre vos commandes ou répondre à vos questions. Comment puis-je vous aider aujourd\'hui ?',
                timestamp: new Date(Date.now() - 60000 * 5)
            },
            {
                type: 'user',
                message: 'Quelles sont vos options de livraison ?',
                timestamp: new Date(Date.now() - 60000 * 4)
            },
            {
                type: 'bot',
                message: 'Nous proposons plusieurs options de livraison :\n\n🚚 Livraison Standard : 3-5 jours ouvrables (GRATUITE)\n⚡ Livraison Express : 1-2 jours ouvrables (49 MAD)\n🏃 Livraison Prioritaire : 24h (99 MAD)\n\n💡 Livraison GRATUITE pour les commandes de plus de 500 MAD !\n\nToutes nos livraisons incluent l\'installation et la garantie.',
                timestamp: new Date(Date.now() - 60000 * 3)
            },
            {
                type: 'user',
                message: 'Livrez-vous à Rabat ?',
                timestamp: new Date(Date.now() - 60000 * 2)
            },
            {
                type: 'bot',
                message: 'Oui, absolument ! Nous livrons partout au Maroc, y compris Rabat. Pour Rabat, la livraison standard prend généralement 2-3 jours ouvrables. Souhaitez-vous passer une commande ?',
                timestamp: new Date(Date.now() - 60000 * 1)
            }
        ],

        // Scenario 5: Returns & Support
        returnsSupport: [
            {
                type: 'bot',
                message: 'Bonjour ! 👋 Bienvenue sur DAIKO Électroménager. Je suis là pour vous aider à trouver des produits, suivre vos commandes ou répondre à vos questions. Comment puis-je vous aider aujourd\'hui ?',
                timestamp: new Date(Date.now() - 60000 * 5)
            },
            {
                type: 'user',
                message: 'J\'ai reçu un produit endommagé, comment faire un retour ?',
                timestamp: new Date(Date.now() - 60000 * 4)
            },
            {
                type: 'bot',
                message: 'Je suis désolé d\'apprendre que vous avez reçu un produit endommagé. Nous allons résoudre cela rapidement !\n\nPour initier un retour ou un échange :\n\n1️⃣ Fournissez votre numéro de commande\n2️⃣ Décrivez le problème\n3️⃣ Nous organiserons la collecte\n\nNous acceptons les retours dans les 30 jours suivant l\'achat.',
                timestamp: new Date(Date.now() - 60000 * 3)
            },
            {
                type: 'user',
                message: 'Mon numéro de commande est DA-2024-67890',
                timestamp: new Date(Date.now() - 60000 * 2)
            },
            {
                type: 'bot',
                message: 'Parfait ! J\'ai initié le processus de retour pour votre commande #DA-2024-67890.\n\n✅ Retour approuvé\n📧 Vous recevrez un email avec les instructions de retour\n🚚 Collecte prévue : Demain entre 9h et 18h\n\nUn remboursement ou un échange sera effectué dès réception du produit. Y a-t-il autre chose dont vous avez besoin ?',
                timestamp: new Date(Date.now() - 60000 * 1)
            }
        ],

        // Scenario 6: Multiple Products Recommendation
        multipleProducts: [
            {
                type: 'bot',
                message: 'Bonjour ! 👋 Bienvenue sur DAIKO Électroménager. Je suis là pour vous aider à trouver des produits, suivre vos commandes ou répondre à vos questions. Comment puis-je vous aider aujourd\'hui ?',
                timestamp: new Date(Date.now() - 60000 * 5)
            },
            {
                type: 'user',
                message: 'Je cherche des produits pour équiper ma cuisine',
                timestamp: new Date(Date.now() - 60000 * 4)
            },
            {
                type: 'bot',
                message: 'Excellente idée ! Voici une sélection de nos meilleurs produits pour équiper votre cuisine :',
                timestamp: new Date(Date.now() - 60000 * 3),
                products: ['refrigerator', 'gasStove', 'microwave']
            },
            {
                type: 'user',
                message: 'Je suis intéressé par le réfrigérateur',
                timestamp: new Date(Date.now() - 60000 * 2)
            },
            {
                type: 'bot',
                message: 'Excellent choix ! Le Réfrigérateur DAIKO 4 portes NO FROST 415L est un produit premium :\n\n✨ Capacité : 415L\n❄️ Technologie No Frost\n⚡ Classe énergétique A++\n🔄 Moteur Inverter\n📦 4 portes\n⭐ Note : 4.8/5\n💰 Prix : 9 999 MAD\n\nModèle : FMIN-5057EK\n\nIl est parfait pour les grandes familles et offre une excellente conservation des aliments avec une consommation d\'énergie optimisée. Voulez-vous l\'ajouter à votre panier ?',
                timestamp: new Date(Date.now() - 60000 * 1)
            }
        ]
    },

    // Get scenario by name
    getScenario(scenarioName) {
        return this.scenarios[scenarioName] || this.scenarios.productDiscovery;
    },

    // Get product by ID
    getProduct(productId) {
        return this.products[productId] || null;
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DemoData;
}

