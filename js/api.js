/**
 * DAIKO Chatbot API Handler
 * Handles all API communication with the backend
 */

const ChatbotAPI = {
    /**
     * Send message to backend API
     */
    async sendMessage(message, config) {
        const url = `${config.api.baseUrl}${config.api.endpoint}`;
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), config.api.timeout);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;

        } catch (error) {
            clearTimeout(timeoutId);
            
            if (error.name === 'AbortError') {
                throw new Error('Request timeout. Please try again.');
            }
            
            throw error;
        }
    },

    /**
     * Check API availability
     */
    async checkAvailability(config) {
        try {
            const response = await fetch(`${config.api.baseUrl}/health`, {
                method: 'GET',
                signal: AbortSignal.timeout(5000)
            });
            return response.ok;
        } catch (error) {
            return false;
        }
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChatbotAPI;
}

