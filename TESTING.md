# 🧪 Testing Documentation

Este documento descreve a estratégia de testes do **CodeImag.in**, incluindo configuração, execução e integração contínua.

---

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Tecnologias de Teste](#tecnologias-de-teste)
- [Cobertura de Testes](#cobertura-de-testes)
- [Executando os Testes](#executando-os-testes)
- [Integração Contínua](#integração-contínua)
- [Cypress Cloud](#cypress-cloud)

---

## 🎯 Visão Geral

O projeto utiliza **testes End-to-End (E2E)** automatizados para garantir que todas as funcionalidades principais funcionem corretamente em ambiente de produção. Os testes simulam interações reais de usuários e validam o comportamento esperado da aplicação.

[![Cypress Cloud](https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/simple/pzc5fm&style=flat&logo=cypress)](https://cloud.cypress.io/projects/pzc5fm)

---

## 🛠️ Tecnologias de Teste

### Cypress

**Cypress** é o framework principal para testes E2E, oferecendo:

- ✅ Testes rápidos e confiáveis
- ✅ Interface visual para debugging
- ✅ Gravação automática de vídeos e screenshots
- ✅ Integração com CI/CD
- ✅ Suporte a testes em produção

**Versão utilizada**: `^13.17.0`

---

## 📊 Cobertura de Testes

Os testes cobrem as seguintes funcionalidades críticas:

### ✅ Navegação e Interface
- Carregamento correto da página inicial
- Navegação entre seções (Hero, About, Map)
- Responsividade em diferentes resoluções
- Funcionamento do menu mobile

### ✅ Busca e Filtros
- Busca por linguagens de programação
- Exibição de resultados corretos
- Filtros por tags
- Limpeza de resultados

### ✅ Code Editor
- Abertura do editor interativo
- Execução de código
- Syntax highlighting
- Troca de linguagens

### ✅ Mapa de Criadores
- Carregamento do Google Maps
- Exibição de marcadores
- Busca no mapa
- Modais de informação

### ✅ DevFest Map
- Toggle entre criadores e DevFests
- Exibição de eventos 2025/2026
- Links para páginas de eventos
- Imagens dos eventos

### ✅ Autenticação
- Login com Google
- Logout
- Persistência de sessão

---

## 🚀 Executando os Testes

### Pré-requisitos

```bash
npm install
```

### Modo Interativo (Desenvolvimento)

Abre a interface visual do Cypress para executar e debugar testes:

```bash
npm run cypress:open
```

### Modo Headless (CI/CD)

Executa todos os testes em modo headless (sem interface):

```bash
npm run cypress:run
```

### Executar Testes Específicos

```bash
npx cypress run --spec "cypress/e2e/codeimagin.cy.js"
```

### Executar em Navegador Específico

```bash
npx cypress run --browser chrome
npx cypress run --browser firefox
npx cypress run --browser edge
```

---

## 🔄 Integração Contínua

Os testes são executados automaticamente em **Cypress Cloud** sempre que há mudanças no repositório.

### Configuração do CI/CD

O projeto está configurado para executar testes contra a **URL de produção**:

```javascript
// cypress.config.js
baseUrl: 'https://codeimag.in'
```

### Variáveis de Ambiente

A chave de gravação do Cypress Cloud é armazenada em `.env`:

```bash
CYPRESS_RECORD_KEY=your-record-key-here
```

> ⚠️ **Importante**: O arquivo `.env` está no `.gitignore` e não deve ser commitado.

---

## ☁️ Cypress Cloud

### Dashboard

Acesse o dashboard completo dos testes:

🔗 **[Cypress Cloud Dashboard](https://cloud.cypress.io/projects/pzc5fm)**

### Recursos Disponíveis

- 📹 **Gravações de Vídeo**: Veja cada execução de teste
- 📸 **Screenshots**: Capturas automáticas em caso de falhas
- 📊 **Métricas**: Tempo de execução, taxa de sucesso, flakiness
- 🔍 **Debug**: Logs detalhados de cada comando
- 📈 **Histórico**: Acompanhe a evolução dos testes ao longo do tempo

### Exemplo de Execução

🎬 **[Assista aos Testes Rodando em Produção](https://cloud.cypress.io/projects/pzc5fm/runs/11/overview/241a5ba0-2675-4d39-a1ee-56073d81104b/video?roarHideRunsWithDiffGroupsAndTags=1&utm_source=Dashboard&utm_medium=Share+URL&utm_campaign=Video)**

---

## 📁 Estrutura de Testes

```
cypress/
├── e2e/
│   └── codeimagin.cy.js    # Testes principais da aplicação
├── fixtures/               # Dados de teste mockados
├── support/
│   ├── commands.js         # Comandos customizados
│   └── e2e.js             # Configurações globais
└── videos/                 # Gravações das execuções
```

---

## 🔧 Configuração Avançada

### Timeouts

Os testes estão configurados com timeouts apropriados para produção:

```javascript
// cypress.config.js
defaultCommandTimeout: 10000,
pageLoadTimeout: 60000
```

### Retry Strategy

Testes podem ser reexecutados automaticamente em caso de falha:

```javascript
retries: {
  runMode: 2,    // 2 tentativas em modo headless
  openMode: 0    // 0 tentativas em modo interativo
}
```

---

## 📝 Escrevendo Novos Testes

### Exemplo Básico

```javascript
describe('Nova Funcionalidade', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('deve fazer algo específico', () => {
    cy.get('[data-testid="elemento"]').should('be.visible');
    cy.get('[data-testid="botao"]').click();
    cy.url().should('include', '/resultado');
  });
});
```

### Boas Práticas

1. ✅ Use `data-testid` para seletores estáveis
2. ✅ Evite depender de classes CSS ou IDs
3. ✅ Mantenha testes independentes entre si
4. ✅ Use `beforeEach` para setup comum
5. ✅ Adicione asserções claras e específicas

---

## 🐛 Debugging

### Modo Interativo

Use `cy.pause()` para pausar a execução:

```javascript
cy.get('.elemento').click();
cy.pause(); // Pausa aqui
cy.get('.resultado').should('exist');
```

### Logs Detalhados

Ative logs detalhados:

```bash
DEBUG=cypress:* npm run cypress:run
```

---

## 📞 Suporte

Para dúvidas ou problemas com os testes:

1. Consulte a [documentação oficial do Cypress](https://docs.cypress.io)
2. Verifique os logs no [Cypress Cloud](https://cloud.cypress.io/projects/pzc5fm)
3. Abra uma issue no repositório

---

**Última atualização**: Novembro 2025
