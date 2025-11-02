/**
 * DAIKO Chatbot Utility Functions
 * Helper functions for message formatting, time formatting, etc.
 */

const ChatbotUtils = {
    /**
     * Format time string
     */
    formatTime(date = new Date()) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },

    /**
     * Create message element with proper formatting
     */
    createMessageElement(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);

        const bubbleDiv = document.createElement('div');
        bubbleDiv.classList.add('message-bubble');
        
        // Handle line breaks
        const lines = text.split('\n');
        lines.forEach((line, index) => {
            if (index > 0) {
                bubbleDiv.appendChild(document.createElement('br'));
            }
            bubbleDiv.appendChild(document.createTextNode(line));
        });

        const timeDiv = document.createElement('div');
        timeDiv.classList.add('message-time');
        timeDiv.textContent = this.formatTime();

        messageDiv.appendChild(bubbleDiv);
        messageDiv.appendChild(timeDiv);

        return messageDiv;
    },

    /**
     * Create product card element
     */
    createProductCard(product) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'bot');

        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        
        // Handle image path - if it's a local file, use relative path
        let imageHtml = '<i class="fas fa-image"></i>';
        if (product.image) {
            // Check if it's a URL or local file
            if (product.image.startsWith('http') || product.image.startsWith('//')) {
                imageHtml = `<img src="${product.image}" alt="${product.name || 'Product'}">`;
            } else {
                // Local file - use relative path
                imageHtml = `<img src="${product.image}" alt="${product.name || 'Product'}" onerror="this.parentElement.innerHTML='<i class=\\'fas fa-image\\'></i>'">`;
            }
        }
        
        // Format price - check if MAD is already included
        let priceText = product.price ? 
            (product.price.includes('MAD') ? product.price : product.price + ' MAD') : 
            'Prix non disponible';
        
        // Show original price if product is on sale
        if (product.originalPrice) {
            const originalPrice = product.originalPrice.includes('MAD') ? product.originalPrice : product.originalPrice + ' MAD';
            priceText = `<span style="text-decoration: line-through; color: #9CA3AF; font-size: 14px; margin-right: 8px;">${originalPrice}</span><span style="color: var(--daiko-primary); font-weight: 700;">${priceText}</span>`;
        }
        
        productCard.innerHTML = `
            <div class="product-image">
                ${imageHtml}
            </div>
            <div class="product-name">${product.name || 'Nom du produit'}</div>
            <div class="product-price">${priceText}</div>
            ${product.rating ? `<div class="product-rating">
                <i class="fas fa-star" style="color: #FBBF24;"></i>
                <span>${product.rating}</span>
            </div>` : ''}
            <button class="product-btn" onclick="window.handleProductClick('${product.id || ''}')">
                <i class="fas fa-shopping-cart"></i> Ajouter au panier
            </button>
        `;

        messageDiv.appendChild(productCard);
        return messageDiv;
    },

    /**
     * Get fallback response based on message content
     */
    getFallbackResponse(message, config) {
        const lowerMessage = message.toLowerCase();
        const fallbacks = config.fallbackResponses;

        if (lowerMessage.includes('product') || lowerMessage.includes('produit') || lowerMessage.includes('article') || lowerMessage.includes('acheter')) {
            return fallbacks.products;
        } else if (lowerMessage.includes('order') || lowerMessage.includes('commande') || lowerMessage.includes('suivre')) {
            return fallbacks.orders;
        } else if (lowerMessage.includes('shipping') || lowerMessage.includes('livraison') || lowerMessage.includes('delivery')) {
            return fallbacks.shipping;
        } else if (lowerMessage.includes('return') || lowerMessage.includes('retour') || lowerMessage.includes('refund')) {
            return fallbacks.returns;
        } else if (lowerMessage.includes('price') || lowerMessage.includes('prix') || lowerMessage.includes('cost')) {
            return fallbacks.price;
        } else {
            return fallbacks.default;
        }
    },

    /**
     * Scroll to bottom of messages container
     */
    scrollToBottom(element) {
        if (element) {
            element.scrollTop = element.scrollHeight;
        }
    },

    /**
     * Debounce function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChatbotUtils;
}

