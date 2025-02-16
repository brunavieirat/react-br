
---

# Projeto React com MSW Mock Service Worker

## Descrição

Este projeto React utiliza o MSW para simular chamadas de API durante o desenvolvimento. MSW (Mock Service Worker) é uma biblioteca que permite simular o comportamento de um servidor para testes e desenvolvimento de front-end sem a necessidade de um backend real.

## Pré-requisitos

Antes de começar, certifique-se de ter o Node.js e npm (ou yarn) instalados em sua máquina.

- Node.js (v14.x ou superior)
- npm (geralmente vem com o Node.js) ou yarn

## Instalação

1. Clone o repositório NA BRANCH DEVELOP:

   ```bash
   git clone [https://github.com/seu-usuario/seu-projeto.git](https://github.com/brunavieirat/react-br/tree/develop)
   cd react-br
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

## Como Rodar o Projeto

Para rodar o projeto na branch `develop` com MSW:

```bash
npm run start:develop
```

Isso iniciará o servidor de desenvolvimento e sua aplicação React estará disponível em [http://localhost:3000](http://localhost:5173).

## Utilizando o MSW

O MSW está configurado para interceptar chamadas de API e fornecer respostas mockadas. Você pode configurar seus mocks em `src/mocks/handlers.js`.

Para mais informações sobre como configurar e usar o MSW, consulte a [documentação oficial do MSW](https://mswjs.io/docs/).

## Scripts Disponíveis

No diretório do projeto, você pode rodar os seguintes scripts:

- `npm start:develop` ou `yarn start:develop`: Inicia o servidor de desenvolvimento na branch `develop`.
- `npm test`: Executa os testes unitários.
