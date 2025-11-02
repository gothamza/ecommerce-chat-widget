/**
 * DAIKO Chatbot Configuration
 * Update these settings to match your needs
 */

const ChatbotConfig = {
    // API Configuration
    api: {
        baseUrl: 'http://localhost:3000',
        endpoint: '/chat',
        timeout: 10000, // 10 seconds
    },

    // Multilingual Support
    languages: {
        fr: {
            name: 'Français',
            flag: '🇫🇷',
            code: 'fr',
            appearance: {
                title: 'DAIKO Assistant',
                subtitle: 'Répond généralement instantanément',
                welcomeMessage: 'Bonjour ! 👋 Bienvenue sur DAIKO Électroménager. Je suis là pour vous aider à trouver des produits, suivre vos commandes ou répondre à vos questions. Comment puis-je vous aider aujourd\'hui ?',
                placeholder: 'Posez-moi une question...'
            },
            quickActions: [
                {
                    action: 'products',
                    icon: 'fas fa-box',
                    text: 'Voir les produits',
                    message: 'Affichez-moi vos produits'
                },
                {
                    action: 'orders',
                    icon: 'fas fa-shopping-bag',
                    text: 'Mes commandes',
                    message: 'Vérifier le statut de ma commande'
                },
                {
                    action: 'shipping',
                    icon: 'fas fa-truck',
                    text: 'Livraison',
                    message: 'Quelles sont vos options de livraison ?'
                },
                {
                    action: 'support',
                    icon: 'fas fa-headset',
                    text: 'Support',
                    message: 'J\'ai besoin d\'aide'
                }
            ]
        },
        en: {
            name: 'English',
            flag: '🇬🇧',
            code: 'en',
            appearance: {
                title: 'DAIKO Assistant',
                subtitle: 'Usually replies instantly',
                welcomeMessage: 'Hello! 👋 Welcome to DAIKO Électroménager. I\'m here to help you find products, track orders, or answer any questions. How can I assist you today?',
                placeholder: 'Ask me a question...'
            },
            quickActions: [
                {
                    action: 'products',
                    icon: 'fas fa-box',
                    text: 'Browse Products',
                    message: 'Show me your products'
                },
                {
                    action: 'orders',
                    icon: 'fas fa-shopping-bag',
                    text: 'My Orders',
                    message: 'Check my order status'
                },
                {
                    action: 'shipping',
                    icon: 'fas fa-truck',
                    text: 'Shipping',
                    message: 'What are your shipping options?'
                },
                {
                    action: 'support',
                    icon: 'fas fa-headset',
                    text: 'Support',
                    message: 'I need help'
                }
            ]
        }
    },

    // Current language (default: French)
    currentLanguage: 'fr',

    // Fallback Responses (for offline mode) - French only for now
    fallbackResponses: {
        products: "Je serais ravi de vous aider à trouver des produits ! Voici quelques articles populaires :\n\n✨ Réfrigérateur DAIKO - 12 999 MAD\n💻 Lave-linge DAIKO - 8 999 MAD\n⌚ Four à micro-ondes DAIKO - 1 299 MAD\n\nSouhaitez-vous plus de détails sur l'un de ces produits ?",
        orders: "Pour vérifier le statut de votre commande, j'aurai besoin de votre numéro de commande. Vous pouvez le trouver dans votre email de confirmation. Sinon, vous pouvez consulter votre tableau de bord.",
        shipping: "Nous proposons plusieurs options de livraison :\n\n🚚 Livraison standard : 5-7 jours ouvrables (Gratuite)\n⚡ Livraison express : 2-3 jours ouvrables (49 MAD)\n🏃 Livraison express : Disponible dans certaines zones (99 MAD)\n\nLivraison gratuite pour les commandes de plus de 500 MAD !",
        returns: "Nous acceptons les retours dans les 30 jours suivant l'achat. Les articles doivent être non utilisés et dans leur emballage d'origine. Souhaitez-vous que je vous aide à initier un retour ?",
        price: "Je serais ravi de vous aider avec les informations sur les prix ! Pouvez-vous me dire quel produit vous intéresse ?",
        default: "Je suis là pour vous aider ! Je peux vous assister avec :\n\n• Trouver des produits\n• Suivre les commandes\n• Informations de livraison\n• Retours et remboursements\n• Recommandations de produits\n\nQue souhaitez-vous savoir ?"
    },

    // Widget Settings
    widget: {
        position: 'bottom-right',
        offset: {
            bottom: 25,
            right: 25
        },
        showNotificationBadge: true,
        autoOpen: false,
        closeOnEscape: true
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChatbotConfig;
}
