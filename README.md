# CodeImag.in - Base de Conhecimento Dev

![Status do Projeto](https://img.shields.io/badge/Status-Em_Desenvolvimento-green)
![Licença](https://img.shields.io/badge/License-MIT-blue)
[![CodeFactor](https://www.codefactor.io/repository/github/henriquesilvadev/codeimagin/badge)](https://www.codefactor.io/repository/github/henriquesilvadev/codeimagin)

> **Sua base de conhecimento dev rápida e intuitiva.**
> Explore documentação, exemplos de código e conceitos fundamentais de diversas linguagens e tecnologias em um só lugar.

---

## 📖 Sobre o Projeto

**CodeImag.in** é uma aplicação web desenvolvida durante a **Imersão Dev com Google Gemini (10ª Edição)** da Alura. O objetivo é fornecer uma interface moderna, responsiva e fácil de usar para que desenvolvedores possam consultar rapidamente informações sobre tecnologias de programação.

O projeto foi construído com foco em:
- **Performance**: Carregamento rápido e otimizado.
- **Acessibilidade**: Navegação intuitiva e suporte a leitores de tela.
- **Experiência do Usuário (UX)**: Design limpo e animações fluidas.
- **PWA (Progressive Web App)**: Pode ser instalado no desktop ou mobile para acesso offline.

## ✨ Funcionalidades

- 🔍 **Busca Inteligente**: Pesquise por linguagens ou tecnologias e receba resultados instantâneos.
- 🏷️ **Tags de Acesso Rápido**: Navegue pelas tecnologias mais populares com um clique.
- 📱 **Totalmente Responsivo**: Layout adaptável para celulares, tablets e desktops.
- ⚡ **PWA**: Instale o app e tenha acesso rápido direto da sua tela inicial.
- 🎨 **Design Premium**: Interface inspirada em ferramentas profissionais, com modo escuro nativo.
- 🧪 **Testes E2E**: Cobertura completa de testes automatizados com Cypress.

## 🧪 Testes E2E

[![Cypress Cloud](https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/simple/pzc5fm&style=flat&logo=cypress)](https://cloud.cypress.io/projects/pzc5fm)

O projeto possui testes end-to-end automatizados com **Cypress**, garantindo a qualidade e funcionamento de todos os recursos:

- ✅ Busca e navegação
- ✅ Code Editor interativo
- ✅ Mapa de criadores
- ✅ Autenticação
- ✅ Responsividade

**Ver testes rodando**: [Cypress Cloud Dashboard](https://cloud.cypress.io/projects/pzc5fm) | [Vídeo local](cypress/videos/codeimagin.cy.js.mp4)

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) **HTML5**: Estrutura semântica e acessível.
- ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) **CSS3**: Estilização moderna, variáveis CSS e animações.
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) **JavaScript (ES6+)**: Lógica de interação, manipulação do DOM e consumo de dados.
- **PWA**: Service Workers e Web App Manifest para experiência nativa.

## 📂 Estrutura do Projeto

```
codeimagin/
├── assets/
│   ├── images/       # Ícones, logos e backgrounds
│   ├── javascript/   # Scripts da aplicação (dados, lógica, chat)
│   ├── movies/       # Vídeos de background (hero)
│   └── stylesheet/   # Arquivos CSS
├── index.html        # Página principal
├── manifest.json     # Configuração do PWA
├── sw.js             # Service Worker
└── README.md         # Documentação do projeto
```

## 🔧 Como Executar

Para rodar o projeto localmente, você pode usar qualquer servidor estático simples.

### Pré-requisitos

- Um navegador moderno (Chrome, Firefox, Edge, Safari).
- (Opcional) Extensão "Live Server" no VS Code ou Python instalado.

### Passo a Passo

1. **Clone o repositório** (ou baixe os arquivos):
   ```bash
   git clone https://github.com/seu-usuario/codeimagin.git
   cd codeimagin
   ```

2. **Abra a pasta no seu editor de código** (ex: VS Code).

3. **Inicie um servidor local**:
   - **Com Python 3**:
     ```bash
     python3 -m http.server 8000
     ```
   - **Com VS Code**: Clique em "Go Live" na barra inferior (requer extensão Live Server).

4. **Acesse no navegador**:
   - Abra `http://localhost:8000` (ou a porta indicada).

## 🤝 Créditos

Este projeto foi desenvolvido por **Henrique Silva** como parte da **Imersão Dev com Google Gemini** da **Alura**.

- **Instrutores**: Gui Lima, Rafaella Ballerini e Luciano Martins.
- **Apoio**: Google Gemini (IA Generativa).

---

<p align="center">
  Feito com 💙 e ☕ por <a href="https://github.com/henriquehsilva" target="_blank">Henrique Silva</a>
</p>
