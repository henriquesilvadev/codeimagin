# Cypress Cloud Setup

Para visualizar os testes E2E online no Cypress Cloud, siga estes passos:

## 1. Criar conta no Cypress Cloud

1. Acesse [https://cloud.cypress.io/](https://cloud.cypress.io/)
2. Faça login com GitHub, Google ou email
3. Crie uma nova organização (se necessário)

## 2. Criar projeto

1. No dashboard, clique em "Create new project"
2. Nome do projeto: **CodeImag.in**
3. Copie o **Project ID** gerado

## 3. Configurar o projeto local

O `projectId` já está configurado no `cypress.config.js` como `'codeimagin'`.

Se o Cypress Cloud gerar um ID diferente, atualize em `cypress.config.js`:

```javascript
projectId: 'pzc5fm'
```

## 4. Obter Record Key

1. No projeto do Cypress Cloud, vá em **Project Settings**
2. Copie a **Record Key**
3. Adicione ao arquivo `.env` (criar se não existir):

```
CYPRESS_RECORD_KEY=deb148d6-5262-480c-ade3-63e1f3ebf727
```

**IMPORTANTE**: Adicione `.env` ao `.gitignore` para não commitar a chave!

## 5. Rodar testes com gravação

Execute o comando:

```bash
npx cypress run --record --key sua-record-key-aqui
```

Ou adicione ao `package.json`:

```json
"cypress:cloud": "cypress run --record"
```

E execute:

```bash
npm run cypress:cloud
```

## 6. Visualizar resultados

Após executar os testes, acesse o dashboard do Cypress Cloud para ver:

- ✅ Vídeos das execuções
- ✅ Screenshots de falhas
- ✅ Logs detalhados
- ✅ Histórico de execuções
- ✅ Análise de performance

## 7. Adicionar link no navbar

O link já está configurado para apontar para o vídeo local. Para apontar para o Cypress Cloud, atualize em `index.html`:

```html
<a href="https://cloud.cypress.io/projects/seu-project-id" target="_blank" class="navbar-link">
  Ver Testes E2E
</a>
```

## Alternativa: Badge no README

Adicione um badge do Cypress Cloud no README.md:

```markdown
[![Cypress Cloud](https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/simple/seu-project-id&style=flat&logo=cypress)](https://cloud.cypress.io/projects/seu-project-id)
```
