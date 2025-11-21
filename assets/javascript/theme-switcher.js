// Theme Switcher
// Handles theme selection and persistence

(function () {
    'use strict';

    // Available themes (Dark themes only)
    const themes = [
        { id: 'monokai', name: 'Monokai', icon: '🎨' },
        { id: 'dracula', name: 'Dracula', icon: '🧛' },
        { id: 'nord', name: 'Nord', icon: '❄️' },
        { id: 'onedark', name: 'One Dark', icon: '⚛️' },
        { id: 'solarized-dark', name: 'Solarized Dark', icon: '🌙' },
        { id: 'gruvbox', name: 'Gruvbox', icon: '🍂' },
        { id: 'material', name: 'Material', icon: '💎' },
        { id: 'tokyo-night', name: 'Tokyo Night', icon: '🌃' }
    ];

    // Get saved theme or default to monokai
    function getSavedTheme() {
        return localStorage.getItem('theme') || 'monokai';
    }

    // Apply theme
    function applyTheme(themeId) {
        document.documentElement.setAttribute('data-theme', themeId);
        localStorage.setItem('theme', themeId);
        updateActiveButton(themeId);
    }

    // Update active button state
    function updateActiveButton(themeId) {
        const buttons = document.querySelectorAll('.theme-option');
        buttons.forEach(btn => {
            if (btn.dataset.theme === themeId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Create theme switcher UI
    function createThemeSwitcher() {
        const container = document.createElement('div');
        container.className = 'theme-switcher';
        container.innerHTML = `
      <button class="theme-toggle" aria-label="Alternar tema" title="Selecionar tema">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      </button>
      <div class="theme-dropdown">
        <div class="theme-dropdown-header">
          <h3>Selecione um tema</h3>
        </div>
        <div class="theme-options">
          ${themes.map(theme => `
            <button class="theme-option" data-theme="${theme.id}">
              <span class="theme-icon">${theme.icon}</span>
              <span class="theme-name">${theme.name}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;

        document.body.appendChild(container);

        // Toggle dropdown
        const toggleBtn = container.querySelector('.theme-toggle');
        const dropdown = container.querySelector('.theme-dropdown');

        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!container.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });

        // Theme selection
        const themeButtons = container.querySelectorAll('.theme-option');
        themeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const themeId = btn.dataset.theme;
                applyTheme(themeId);
                dropdown.classList.remove('show');
            });
        });
    }

    // Initialize
    function init() {
        // Apply saved theme immediately
        const savedTheme = getSavedTheme();
        applyTheme(savedTheme);

        // Create UI when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', createThemeSwitcher);
        } else {
            createThemeSwitcher();
        }
    }

    init();
})();
