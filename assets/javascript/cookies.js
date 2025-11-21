class CookieConsent {
    constructor() {
        this.consentKey = 'cookie_consent';
        this.consentValue = localStorage.getItem(this.consentKey);
    }

    init() {
        if (!this.consentValue) {
            this.injectUI();
        }
    }

    injectUI() {
        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.innerHTML = `
      <div class="cookie-content">
        <p>
          Nós utilizamos cookies para melhorar sua experiência e analisar o tráfego, 
          seguindo as diretrizes da <strong>LGPD</strong>. 
          Você aceita o uso de cookies?
        </p>
        <div class="cookie-actions">
          <button id="cookie-decline" class="cookie-btn decline">Não aceitar</button>
          <button id="cookie-accept" class="cookie-btn accept">Aceitar</button>
        </div>
      </div>
    `;
        document.body.appendChild(banner);

        document.getElementById('cookie-accept').addEventListener('click', () => this.handleAccept());
        document.getElementById('cookie-decline').addEventListener('click', () => this.handleDecline());
    }

    handleAccept() {
        localStorage.setItem(this.consentKey, 'accepted');
        this.hideBanner();
    }

    handleDecline() {
        localStorage.setItem(this.consentKey, 'declined');
        this.hideBanner();
    }

    hideBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.classList.add('hidden');
            setTimeout(() => banner.remove(), 500); // Wait for animation
        }
    }

    hasConsent() {
        return localStorage.getItem(this.consentKey) === 'accepted';
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    const cookieConsent = new CookieConsent();
    cookieConsent.init();
    // Expose globally if needed for other scripts to check consent
    window.cookieConsent = cookieConsent;
});
