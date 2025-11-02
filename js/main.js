/**
 * DAIKO Chatbot Main Controller
 * Handles all chatbot interactions and UI updates
 */

class DAIKOChatbot {
    constructor(config) {
        this.config = config;
        this.isWidgetOpen = false;
        this.hasWelcomed = false;
        this.currentScenario = 'emptyChat'; // Default demo scenario - empty chat
        this.demoLoaded = false;
        
        // DOM Elements
        this.elements = {
            chatToggle: document.getElementById('chat-toggle'),
            chatWidget: document.getElementById('chat-widget'),
            chatMessages: document.getElementById('chat-messages'),
            chatInputForm: document.getElementById('chat-input-form'),
            chatInput: document.getElementById('chat-input'),
            closeChatBtn: document.getElementById('close-chat'),
            typingIndicator: null, // Will be created in init()
            notificationBadge: document.querySelector('.notification-badge'),
            sendBtn: document.getElementById('send-btn'),
            quickActionBtns: document.querySelectorAll('.quick-action-btn'),
            langSelector: document.getElementById('lang-selector')
        };

        this.init();
    }

    /**
     * Initialize the chatbot
     */
    init() {
        this.createTypingIndicator();
        this.setupEventListeners();
        this.setupQuickActions();
        this.setupKeyboardShortcuts();
        this.setupAutoResize();
    }

    /**
     * Create typing indicator element
     */
    createTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'typing-indicator';
        indicator.className = 'typing-indicator';
        indicator.innerHTML = '<span></span><span></span><span></span>';
        this.elements.chatMessages.appendChild(indicator);
        this.elements.typingIndicator = indicator;
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Toggle widget
        this.elements.chatToggle.addEventListener('click', () => this.toggleWidget());
        this.elements.closeChatBtn.addEventListener('click', () => this.toggleWidget());

        // Handle form submission
        this.elements.chatInputForm.addEventListener('submit', (e) => this.handleSubmit(e));

        // Handle product card clicks
        window.handleProductClick = (productId) => {
            this.addUserMessage('Je veux acheter ce produit');
            console.log('Product clicked:', productId);
            // Integrate with your cart system here
        };
    }

    /**
     * Setup quick action buttons
     */
    setupQuickActions() {
        this.elements.quickActionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.getAttribute('data-action');
                const lang = this.config.languages.fr; // Always use French
                const quickAction = lang.quickActions.find(qa => qa.action === action);
                
                if (quickAction) {
                    this.elements.chatInput.value = quickAction.message;
                    this.elements.chatInputForm.dispatchEvent(new Event('submit'));
                }
            });
        });
    }

    /**
     * Setup keyboard shortcuts
     */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Close chat with Escape key
            if (e.key === 'Escape' && this.isWidgetOpen && this.config.widget.closeOnEscape) {
                this.toggleWidget();
            }
        });

        // Handle Enter key
        this.elements.chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.elements.chatInputForm.dispatchEvent(new Event('submit'));
            }
        });
    }

    /**
     * Setup auto-resize for input
     */
    setupAutoResize() {
        this.elements.chatInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }

    /**
     * Setup language selector
     */
    setupLanguageSelector() {
        if (!this.elements.langSelector) return;
        
        // Set initial language
        const savedLang = localStorage.getItem('daiko_chatbot_lang') || this.config.currentLanguage;
        this.elements.langSelector.value = savedLang;
        this.changeLanguage(savedLang);
        
        // Listen for language changes
        this.elements.langSelector.addEventListener('change', (e) => {
            this.changeLanguage(e.target.value);
        });
    }

    /**
     * Change language
     */
    changeLanguage(langCode) {
        if (!this.config.languages[langCode]) return;
        
        const lang = this.config.languages[langCode];
        this.config.currentLanguage = langCode;
        
        // Save to localStorage
        localStorage.setItem('daiko_chatbot_lang', langCode);
        
        // Update header
        const headerTitle = document.querySelector('#chat-header .header-text h3');
        const headerSubtitle = document.querySelector('#chat-header .header-text p');
        if (headerTitle) headerTitle.textContent = lang.appearance.title;
        if (headerSubtitle) headerSubtitle.textContent = lang.appearance.subtitle;
        
        // Update placeholder
        if (this.elements.chatInput) {
            this.elements.chatInput.placeholder = lang.appearance.placeholder;
        }
        
        // Update quick actions
        this.updateQuickActions(lang.quickActions);
    }

    /**
     * Update quick action buttons
     */
    updateQuickActions(quickActions) {
        this.elements.quickActionBtns.forEach((btn, index) => {
            if (quickActions[index]) {
                const action = quickActions[index];
                btn.innerHTML = `<i class="${action.icon}"></i> ${action.text}`;
                btn.setAttribute('data-action', action.action);
            }
        });
    }

    /**
     * Toggle widget open/close
     */
    toggleWidget() {
        this.isWidgetOpen = !this.isWidgetOpen;
        
        if (this.isWidgetOpen) {
            this.elements.chatWidget.classList.add('is-open');
            this.elements.notificationBadge.style.display = 'none';
            
            // Change icon to X when widget is open
            const icon = this.elements.chatToggle.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-times';
            }
            
            this.elements.chatInput.focus();
            
            // Load demo scenario on first open
            if (!this.demoLoaded && typeof DemoData !== 'undefined') {
                this.loadDemoScenario(this.currentScenario);
                this.demoLoaded = true;
                this.hasWelcomed = true;
            } else if (!this.hasWelcomed && this.elements.chatMessages.children.length === 1) {
                setTimeout(() => {
                    const lang = this.config.languages.fr; // Always use French
                    const welcomeMsg = lang.appearance.welcomeMessage;
                    this.addBotMessage(welcomeMsg);
                    this.hasWelcomed = true;
                }, 300);
            }
        } else {
            this.elements.chatWidget.classList.remove('is-open');
            
            // Change icon back to chat icon when widget is closed
            const icon = this.elements.chatToggle.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-comment-dots';
            }
        }
    }

    /**
     * Load demo scenario
     */
    loadDemoScenario(scenarioName) {
        if (typeof DemoData === 'undefined') return;
        
        const scenario = DemoData.getLocalizedScenario(scenarioName, 'fr'); // Always use French
        if (!scenario) return;

        // Clear existing messages
        this.elements.chatMessages.innerHTML = '';
        // Recreate typing indicator after clearing
        this.createTypingIndicator();
        this.elements.typingIndicator.style.display = 'none';

        // Load messages with delay for realistic effect
        scenario.forEach((msg, index) => {
            setTimeout(() => {
                if (msg.type === 'user') {
                    this.addDemoMessage('user', msg.message, msg.timestamp);
                } else if (msg.type === 'bot') {
                    this.addDemoMessage('bot', msg.message, msg.timestamp);
                    
                    // Add products if any
                    if (msg.products && Array.isArray(msg.products)) {
                        setTimeout(() => {
                            msg.products.forEach(productId => {
                                const product = DemoData.getProduct(productId);
                                if (product) {
                                    const productCard = ChatbotUtils.createProductCard(product);
                                    this.elements.chatMessages.appendChild(productCard);
                                    this.scrollToBottom();
                                }
                            });
                        }, 300);
                    }
                    
                    // Add order tracking card if any
                    if (msg.orderTracking) {
                        setTimeout(() => {
                            const orderCard = ChatbotUtils.createOrderTrackingCard(msg.orderTracking);
                            this.elements.chatMessages.appendChild(orderCard);
                            this.scrollToBottom();
                        }, 300);
                    }
                }
            }, index * 500); // 500ms delay between messages
        });
    }

    /**
     * Add demo message with custom timestamp
     */
    addDemoMessage(sender, text, timestamp) {
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
        timeDiv.textContent = timestamp ? ChatbotUtils.formatTime(timestamp) : ChatbotUtils.formatTime();

        messageDiv.appendChild(bubbleDiv);
        messageDiv.appendChild(timeDiv);

        this.elements.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    /**
     * Handle form submission
     */
    async handleSubmit(e) {
        e.preventDefault();
        const messageText = this.elements.chatInput.value.trim();
        
        if (!messageText) return;

        // Add user message
        this.addUserMessage(messageText);
        this.elements.chatInput.value = '';
        this.elements.sendBtn.disabled = true;

        // Show typing indicator immediately - force display
        this.showTypingIndicator();
        
        // Always wait minimum 1 second to show animation
        const minDelay = 1000; // 1 second minimum
        const startTime = Date.now();
        
        try {
            // Send message to API (this will fail immediately if no API, which is fine)
            const data = await ChatbotAPI.sendMessage(messageText, this.config);
            
            // Calculate remaining time to ensure minimum 1 second delay
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, minDelay - elapsedTime);
            
            // Wait for remaining time if needed (this ensures animation is visible for at least 1 second)
            if (remainingTime > 0) {
                await new Promise(resolve => setTimeout(resolve, remainingTime));
            }
            
            this.hideTypingIndicator();
            
            // Small delay before showing message for smooth transition
            await new Promise(resolve => setTimeout(resolve, 150));
            
            // Handle product cards
            if (data.products && Array.isArray(data.products)) {
                this.addBotMessage(data.reply || 'Voici quelques produits que vous pourriez aimer :');
                data.products.forEach(product => {
                    const productCard = ChatbotUtils.createProductCard(product);
                    this.elements.chatMessages.appendChild(productCard);
                    this.scrollToBottom();
                });
            } else {
                this.addBotMessage(data.reply || 'Je comprends. Comment puis-je vous aider autrement ?');
            }

        } catch (error) {
            console.error('Error sending message:', error);
            
            // Calculate remaining time to ensure minimum 1 second delay
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, minDelay - elapsedTime);
            
            // Always wait at least 1 second total (including any time already elapsed)
            if (remainingTime > 0) {
                await new Promise(resolve => setTimeout(resolve, remainingTime));
            } else {
                // If somehow we're past 1 second, ensure we still show animation briefly
                await new Promise(resolve => setTimeout(resolve, 200));
            }
            
            this.hideTypingIndicator();
            
            // Small delay before showing message for smooth transition
            await new Promise(resolve => setTimeout(resolve, 150));
            
            // Use fallback response
            const fallbackResponse = ChatbotUtils.getFallbackResponse(messageText, this.config);
            this.addBotMessage(fallbackResponse);
        } finally {
            this.elements.sendBtn.disabled = false;
            this.elements.chatInput.focus();
        }
    }

    /**
     * Add user message to chat
     */
    addUserMessage(text) {
        const messageEl = ChatbotUtils.createMessageElement('user', text);
        this.elements.chatMessages.appendChild(messageEl);
        this.scrollToBottom();
    }

    /**
     * Add bot message to chat
     */
    addBotMessage(text) {
        // Show notification badge if widget is closed
        if (!this.isWidgetOpen && this.config.widget.showNotificationBadge) {
            this.elements.notificationBadge.style.display = 'flex';
        }
        
        const messageEl = ChatbotUtils.createMessageElement('bot', text);
        this.elements.chatMessages.appendChild(messageEl);
        this.scrollToBottom();
    }

    /**
     * Show typing indicator
     */
    showTypingIndicator() {
        // Ensure element exists
        if (!this.elements.typingIndicator) {
            console.error('Typing indicator element not found');
            return;
        }
        
        // Force display using inline style and class
        this.elements.typingIndicator.style.display = 'flex';
        this.elements.typingIndicator.style.visibility = 'visible';
        this.elements.typingIndicator.style.opacity = '1';
        this.elements.typingIndicator.classList.add('show');
        
        // Force a reflow to ensure the browser renders the change
        void this.elements.typingIndicator.offsetHeight;
        
        // Ensure spans exist
        const spans = this.elements.typingIndicator.querySelectorAll('span');
        if (spans.length === 0) {
            console.error('No spans found in typing indicator');
        }
        
        this.scrollToBottom();
    }

    /**
     * Hide typing indicator
     */
    hideTypingIndicator() {
        this.elements.typingIndicator.style.display = 'none';
        this.elements.typingIndicator.style.visibility = 'hidden';
        this.elements.typingIndicator.classList.remove('show');
    }

    /**
     * Scroll to bottom of messages
     */
    scrollToBottom() {
        ChatbotUtils.scrollToBottom(this.elements.chatMessages);
    }

    /**
     * Change demo scenario (for demo purposes)
     */
    changeScenario(scenarioName) {
        this.currentScenario = scenarioName;
        this.demoLoaded = false;
        this.hasWelcomed = false;
        if (this.isWidgetOpen) {
            this.loadDemoScenario(scenarioName);
            this.demoLoaded = true;
            this.hasWelcomed = true;
        }
    }
}

// Demo scenario selector (for demonstration purposes)
window.loadDemoScenario = function(scenarioName) {
    if (window.daikoChatbot) {
        window.daikoChatbot.changeScenario(scenarioName);
        if (!window.daikoChatbot.isWidgetOpen) {
            window.daikoChatbot.toggleWidget();
        }
    }
};

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize chatbot
    window.daikoChatbot = new DAIKOChatbot(ChatbotConfig);
});

// Add smooth scroll behavior
document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    if (chatMessages) {
        chatMessages.style.scrollBehavior = 'smooth';
    }
});

