class Chatbot {
    constructor() {
        // this.apiKey = window.CONFIG?.GEMINI_API_KEY;
        // ⚠️ AVISO IMPORTANTE ⚠️
        // Esta chave está exposta APENAS para fins de DEMONSTRAÇÃO.
        // NÃO usar este padrão em produção. Em sistemas reais, a chave deve ficar
        // em um backend seguro ou função serverless.
        //
        // Esta chave será revogada após a apresentação da demo.
        // Tenta pegar a chave do window.CONFIG (config.js), depois localStorage, senão usa a hardcoded (demo)
        this.apiKey = window.CONFIG?.GEMINI_API_KEY || localStorage.getItem('GEMINI_API_KEY') || 'AIzaSyCeHmdAe3aBmWPMa5JvNgBuLg8tdvvSka8';
        // Usando modelo flash-latest que está disponível na API
        this.apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent';
        this.isOpen = false;
        this.messages = [];

        this.init();
    }

    init() {
        this.injectHTML();
        this.cacheDOM();
        this.bindEvents();
    }

    injectHTML() {
        const chatbotContainer = document.createElement('div');
        chatbotContainer.id = 'chatbot-container';
        chatbotContainer.innerHTML = `
      <button id="chatbot-toggle" aria-label="Abrir chat">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
        </svg>
      </button>
      <div id="chatbot-window" class="hidden">
        <div class="chatbot-header">
          <h3>CodeImag.in Assistant</h3>
          <button id="chatbot-close" aria-label="Fechar chat">×</button>
        </div>
        <div id="chatbot-messages">
          <div class="message bot">
            Olá! Sou seu assistente virtual. Como posso ajudar com seus estudos hoje?
          </div>
        </div>
        <div class="chatbot-input-area">
          <input type="text" id="chatbot-input" placeholder="Digite sua dúvida..." />
          <button id="chatbot-send">Enviar</button>
        </div>
      </div>
    `;
        document.body.appendChild(chatbotContainer);
    }

    cacheDOM() {
        this.toggleBtn = document.getElementById('chatbot-toggle');
        this.window = document.getElementById('chatbot-window');
        this.closeBtn = document.getElementById('chatbot-close');
        this.messagesContainer = document.getElementById('chatbot-messages');
        this.input = document.getElementById('chatbot-input');
        this.sendBtn = document.getElementById('chatbot-send');
    }

    bindEvents() {
        this.toggleBtn.addEventListener('click', () => this.toggle());
        this.closeBtn.addEventListener('click', () => this.toggle());
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.window.classList.toggle('hidden', !this.isOpen);
        this.toggleBtn.classList.toggle('hidden', this.isOpen);
        if (this.isOpen) {
            this.input.focus();
        }
    }

    async sendMessage() {
        const text = this.input.value.trim();
        if (!text) return;

        this.addMessage(text, 'user');
        this.input.value = '';
        this.input.disabled = true;

        // Show typing indicator
        const typingId = this.addTypingIndicator();

        try {
            const response = await this.callGemini(text);
            this.removeMessage(typingId);
            this.addMessage(response, 'bot');
        } catch (error) {
            this.removeMessage(typingId);
            console.error('Gemini API Error:', error);
            this.addMessage(`Erro ao conectar com Gemini: ${error.message}. <br>Verifique o console para mais detalhes.`, 'bot error');
        } finally {
            this.input.disabled = false;
            this.input.focus();
        }
    }

    addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        // Simple markdown parsing for bold and code
        msgDiv.innerHTML = this.parseMarkdown(text);
        this.messagesContainer.appendChild(msgDiv);
        this.scrollToBottom();
        return msgDiv.id = 'msg-' + Date.now();
    }

    addTypingIndicator() {
        const id = 'typing-' + Date.now();
        const msgDiv = document.createElement('div');
        msgDiv.id = id;
        msgDiv.className = 'message bot typing';
        msgDiv.innerHTML = '<span>.</span><span>.</span><span>.</span>';
        this.messagesContainer.appendChild(msgDiv);
        this.scrollToBottom();
        return id;
    }

    removeMessage(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    async callGemini(prompt) {
        if (!this.apiKey || this.apiKey === 'YOUR_API_KEY_HERE') {
            throw new Error('API Key not configured');
        }

        const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    }

    parseMarkdown(text) {
        // Basic parsing: **bold**, `code`
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
});
