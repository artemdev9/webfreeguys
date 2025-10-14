/**
 * Simple Cookie Consent Management
 * Compliant with Russian data protection laws
 */

class CookieConsent {
    constructor() {
        this.cookieName = 'cookie_consent';
        this.cookieExpiry = 365; // days
        this.consent = this.getConsent();
        
        this.init();
    }

    init() {
        // Show banner if no consent has been given
        if (!this.consent) {
            this.showBanner();
        }

        this.bindEvents();
    }

    bindEvents() {
        // Banner buttons
        document.getElementById('cookie-accept')?.addEventListener('click', () => {
            this.accept();
        });

        document.getElementById('cookie-leave')?.addEventListener('click', () => {
            this.leave();
        });
    }

    getConsent() {
        const cookie = this.getCookie(this.cookieName);
        return cookie === 'accepted';
    }

    setConsent(accepted) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + this.cookieExpiry);
        
        const cookieValue = accepted ? 'accepted' : 'rejected';
        document.cookie = `${this.cookieName}=${cookieValue}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
        
        this.consent = accepted;
    }

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    showBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.style.display = 'block';
            // Add animation class after a short delay
            setTimeout(() => {
                banner.classList.add('cs-cookie-banner-show');
            }, 100);
        }
    }

    hideBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.classList.remove('cs-cookie-banner-show');
            setTimeout(() => {
                banner.style.display = 'none';
            }, 300);
        }
    }

    accept() {
        this.setConsent(true);
        this.hideBanner();
    }

    leave() {
        // Redirect to a simple "goodbye" page or close the window
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.close();
        }
    }

    // Public method to reset consent
    resetConsent() {
        document.cookie = `${this.cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        this.consent = null;
        location.reload();
    }
}

// Initialize cookie consent when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cookieConsent = new CookieConsent();
});

// Add CSS for cookie banner
const cookieStyles = `
<style>
.cs-cookie-banner {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #1a1a1a;
    color: #ffffff;
    padding: 20px;
    z-index: 10000;
    transform: translateY(100%);
    transition: transform 0.3s ease-in-out;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.cs-cookie-banner-show {
    transform: translateY(0);
}

.cs-cookie-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
}

.cs-cookie-text {
    flex: 1;
    min-width: 300px;
}

.cs-cookie-title {
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 8px 0;
    color: #ffffff;
}

.cs-cookie-description {
    font-size: 14px;
    line-height: 1.5;
    margin: 0;
    color: #cccccc;
}

.cs-cookie-link {
    color: #4a9eff;
    text-decoration: underline;
}

.cs-cookie-link:hover {
    color: #6bb6ff;
}

.cs-cookie-buttons {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.cs-cookie-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
}

.cs-cookie-btn-primary {
    background: #4a9eff;
    color: #ffffff;
}

.cs-cookie-btn-primary:hover {
    background: #3a8eef;
}

.cs-cookie-btn-secondary {
    background: transparent;
    color: #ffffff;
    border: 1px solid #666666;
}

.cs-cookie-btn-secondary:hover {
    background: #333333;
    border-color: #888888;
}

@media (max-width: 768px) {
    .cs-cookie-content {
        flex-direction: column;
        align-items: stretch;
        text-align: center;
    }
    
    .cs-cookie-buttons {
        justify-content: center;
    }
}
</style>
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', cookieStyles);
