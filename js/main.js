/**
 * DAIKO Chatbot Main Controller
 * Handles all chatbot interactions and UI updates
 */

class DAIKOChatbot {
    constructor(config) {
        this.config = config;
        this.isWidgetOpen = false;
        this.hasWelcomed = false;
        this.currentScenario = 'productDiscovery'; // Default demo scenario
        this.demoLoaded = false;
        
        // DOM Elements
        this.elements = {
            chatToggle: document.getElementById('chat-toggle'),
            chatWidget: document.getElementById('chat-widget'),
            chatMessages: document.getElementById('chat-messages'),
            chatInputForm: document.getElementById('chat-input-form'),
            chatInput: document.getElementById('chat-input'),
            closeChatBtn: document.getElementById('close-chat'),
            typingIndicator: document.getElementById('typing-indicator'),
            notificationBadge: document.querySelector('.notification-badge'),
            sendBtn: document.getElementById('send-btn'),
            quickActionBtns: document.querySelectorAll('.quick-action-btn')
        };

        this.init();
    }

    /**
     * Initialize the chatbot
     */
    init() {
        this.setupEventListeners();
        this.setupQuickActions();
        this.setupKeyboardShortcuts();
        this.setupAutoResize();
        
        // Set welcome message if configured
        if (this.config.appearance.welcomeMessage) {
            // Will be shown when widget opens
        }
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
                const quickAction = this.config.quickActions.find(qa => qa.action === action);
                
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
     * Toggle widget open/close
     */
    toggleWidget() {
        this.isWidgetOpen = !this.isWidgetOpen;
        
        if (this.isWidgetOpen) {
            this.elements.chatWidget.classList.add('is-open');
            this.elements.chatToggle.style.display = 'none';
            this.elements.notificationBadge.style.display = 'none';
            this.elements.chatInput.focus();
            
            // Load demo scenario on first open
            if (!this.demoLoaded && typeof DemoData !== 'undefined') {
                this.loadDemoScenario(this.currentScenario);
                this.demoLoaded = true;
                this.hasWelcomed = true;
            } else if (!this.hasWelcomed && this.elements.chatMessages.children.length === 1) {
                setTimeout(() => {
                    this.addBotMessage(this.config.appearance.welcomeMessage);
                    this.hasWelcomed = true;
                }, 300);
            }
        } else {
            this.elements.chatWidget.classList.remove('is-open');
            this.elements.chatToggle.style.display = 'flex';
        }
    }

    /**
     * Load demo scenario
     */
    loadDemoScenario(scenarioName) {
        if (typeof DemoData === 'undefined') return;
        
        const scenario = DemoData.getScenario(scenarioName);
        if (!scenario) return;

        // Clear existing messages (except typing indicator)
        const typingIndicator = this.elements.typingIndicator;
        this.elements.chatMessages.innerHTML = '';
        this.elements.chatMessages.appendChild(typingIndicator);
        typingIndicator.style.display = 'none';

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

        // Show typing indicator
        this.showTypingIndicator();
        
        try {
            // Send message to API
            const data = await ChatbotAPI.sendMessage(messageText, this.config);
            
            this.hideTypingIndicator();
            
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
            this.hideTypingIndicator();
            
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
        this.elements.typingIndicator.style.display = 'block';
        this.scrollToBottom();
    }

    /**
     * Hide typing indicator
     */
    hideTypingIndicator() {
        this.elements.typingIndicator.style.display = 'none';
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
        if (this.isWidgetOpen) {
            this.loadDemoScenario(scenarioName);
            this.demoLoaded = true;
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
    // Update header with config values
    const headerTitle = document.querySelector('#chat-header .header-text h3');
    const headerSubtitle = document.querySelector('#chat-header .header-text p');
    const avatar = document.querySelector('#chat-header .avatar i');
    
    if (headerTitle) headerTitle.textContent = ChatbotConfig.appearance.title;
    if (headerSubtitle) headerSubtitle.textContent = ChatbotConfig.appearance.subtitle;
    if (avatar) avatar.className = ChatbotConfig.appearance.avatar;

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

