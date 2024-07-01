# Aplicação Full-Stack com Docker Compose

Este projeto é uma aplicação full-stack que utiliza Docker Compose para facilitar o desenvolvimento e a implantação. O backend é construído com NodeJS e o frontend com React e NextJS.

## Pré-requisitos

* Docker
* Docker Compose
* Node.js e npm (ou yarn)

## Como Rodar

### Backend

1. Abra o terminal na raiz do projeto.
2. Execute o comando:

```bash
docker-compose up
```

Isso irá construir e iniciar os contêineres do backend.

### Frontend

1. Abra um novo terminal na raiz do projeto.
2. Acesse a pasta `web`:

```bash
cd web
```

3. Instale as dependências:

```bash
npm i
```

1. Inicie o servidor de desenvolvimento do frontend:

```bash
npm run dev
```

ou

```bash
yarn dev
```

A aplicação frontend estará disponível em `http://localhost:3000`
