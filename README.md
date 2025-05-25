# cypress-web-test

To run use

## Como rodar os testes Cypress

### Instalação

Primeiro, instale as dependências:

```bash
npm install
```

### Executando os testes

Para abrir a interface do Cypress:

```bash
npx cypress open
```

Para executar todos os testes no modo headless:

```bash
npx cypress run
```

Para executar um arquivo de teste específico:

```bash
npx cypress run --spec "cypress/e2e/item-page-interaction.cy.js"
```

### Comandos úteis

- `npx cypress run`: Executa todos os testes no modo headless
- `npx cypress open`: Abre a interface gráfica do Cypress
- `npx cypress run --browser chrome`: Executa os testes no Chrome
- `npx cypress run --headed`: Executa os testes mostrando o navegador