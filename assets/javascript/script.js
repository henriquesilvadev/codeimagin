/**
 * CodeImag.in Application Logic
 * Refactored for better maintainability and structure.
 */

const CONFIG = {
  API_URL: 'https://base-conhecimento-api-m3db.onrender.com/chat',
  DATA_URL: './assets/data/data.json',
  SELECTORS: {
    SEARCH_BUTTON: '.search-bar button',
    SEARCH_INPUT: '.search-bar input',
    MAIN_CONTENT: 'main',
    LANGUAGE_TAGS: '.language-tags',
    INITIAL_CONTENT: '#initial-content',
  },
  ALIASES: {
    js: 'javascript',
    ts: 'typescript',
    'c#': 'c#',
    'c++': 'c++',
    node: 'node.js',
    nodejs: 'node.js',
    html: 'html5',
    css: 'css3',
  },
};

class CodeImaginApp {
  constructor() {
    this.elements = {
      searchButton: document.querySelector(CONFIG.SELECTORS.SEARCH_BUTTON),
      searchInput: document.querySelector(CONFIG.SELECTORS.SEARCH_INPUT),
      mainContent: document.querySelector(CONFIG.SELECTORS.MAIN_CONTENT),
      languageTagsContainer: document.querySelector(CONFIG.SELECTORS.LANGUAGE_TAGS),
      articleContainer: document.querySelector(CONFIG.SELECTORS.INITIAL_CONTENT),
    };
    this.techData = [];
  }

  async init() {
    this.techData = await this.loadTechData();
    this.loadQuickLinks();
    this.bindEvents();
  }

  normalize(str) {
    return (str || '').toString().trim().toLowerCase();
  }

  async loadTechData() {
    try {
      const res = await fetch(CONFIG.DATA_URL);
      if (!res.ok) {
        console.error('Failed to load data.json:', res.status, res.statusText);
        return [];
      }
      const json = await res.json();
      if (!Array.isArray(json)) {
        console.error('data.json is not an array.');
        return [];
      }
      return json;
    } catch (err) {
      console.error('Error fetching data.json:', err);
      return [];
    }
  }

  findTechByLanguage(language) {
    const langNorm = this.normalize(language);
    if (!langNorm) return null;

    const mappedLang = CONFIG.ALIASES[langNorm] || langNorm;

    return (
      this.techData.find((t) => this.normalize(t.label) === mappedLang) ||
      this.techData.find((t) => this.normalize(t.query) === mappedLang)
    );
  }

  createTagElement(item) {
    const tag = document.createElement('a');
    tag.href = '#';
    tag.className = 'language-tag';
    tag.dataset.query = item.query || item.label;
    tag.title = `Buscar por ${item.label}`;

    const iconWrapper = document.createElement('span');
    iconWrapper.className = 'tag-icon';

    if (item.icon) {
      const img = document.createElement('img');
      img.src = item.icon;
      img.alt = item.alt || `Logo de ${item.label}`;
      img.loading = 'lazy';
      img.decoding = 'async';
      iconWrapper.appendChild(img);
    } else {
      iconWrapper.classList.add('tag-icon--fallback');
      iconWrapper.textContent = item.initials || item.label.slice(0, 3).toUpperCase();
      iconWrapper.setAttribute('aria-hidden', 'true');
    }

    const label = document.createElement('span');
    label.textContent = item.label;

    tag.appendChild(iconWrapper);
    tag.appendChild(label);

    tag.addEventListener('click', (event) => {
      event.preventDefault();
      this.handleSearch(item.query || item.label);
    });

    return tag;
  }

  loadQuickLinks() {
    if (!this.elements.languageTagsContainer) return;

    this.elements.languageTagsContainer.innerHTML = '';
    this.techData.forEach((item) => {
      this.elements.languageTagsContainer.appendChild(this.createTagElement(item));
    });
  }

  getOrCreateArticleContainer() {
    // Always use the existing hero article element
    const heroElement = document.querySelector('#hero');
    if (heroElement) {
      return heroElement;
    }

    // Fallback: create new article if hero doesn't exist
    if (!this.elements.articleContainer || !this.elements.mainContent.contains(this.elements.articleContainer)) {
      this.elements.articleContainer = document.createElement('article');
      this.elements.articleContainer.className = 'content-item hero hero-layout';
      this.elements.articleContainer.id = 'hero';
      this.elements.mainContent.prepend(this.elements.articleContainer);
    }
    return this.elements.articleContainer;
  }

  renderResult({ query, answer, docsUrl, language }) {
    const container = this.getOrCreateArticleContainer();

    const docLinkMarkup = docsUrl
      ? `<p class="doc-link">
           <b>Documentação Oficial:</b>
           <a href="${docsUrl}" target="_blank" rel="noopener noreferrer">
             ${docsUrl}
           </a>
         </p>`
      : '';

    let helloWorldMarkup = '';

    if (language) {
      const tech = this.findTechByLanguage(language);
      const snippetHtml = tech?.snippet_html;

      if (snippetHtml) {
        helloWorldMarkup = `
          <section class="code-example">
            <h3>Exemplo clássico em ${tech.label}</h3>
            <pre class="code-block" data-language="${tech.label}"><code>${snippetHtml}</code></pre>
          </section>
        `;
      }
    }

    container.innerHTML = `
      <div class="hero-copy">
        <a href="/" class="hero-kicker" onclick="location.reload(); return false;">Voltar a Info</a>

        <h2>Resultado para "${query}"</h2>
        <p class="hero-lead">${answer || ''}</p>
        ${docLinkMarkup}
        ${helloWorldMarkup}
      </div>      
      `;
  }

  async handleSearch(predefinedQuery) {
    const query = predefinedQuery || this.elements.searchInput.value.trim();
    if (!query) return;

    this.elements.searchInput.value = `O que é ${query}?`;
    const container = this.getOrCreateArticleContainer();
    container.innerHTML = '<p class="loading">Buscando...</p>';

    try {
      const response = await fetch(CONFIG.API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: `O que é ${query}?` }),
      });

      const data = await response.json();
      const answer = data.answer || '';
      const firstSource = data?.sources?.[0] || null;
      const docsUrl = firstSource?.metadata?.docs_url || null;
      const language = firstSource?.metadata?.language || null;

      this.renderResult({ query, answer, docsUrl, language });
    } catch (error) {
      container.innerHTML = '<p class="error">Houve um erro ao buscar. Tente novamente.</p>';
      console.error('Search error:', error);
    }
  }

  bindEvents() {
    this.elements.searchButton?.addEventListener('click', () => this.handleSearch());

    this.elements.searchInput?.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        this.handleSearch();
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new CodeImaginApp();
  app.init();
});
