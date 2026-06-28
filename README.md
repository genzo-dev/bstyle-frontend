# BstyleFrontend

O BStyle é um projeto em desenvolvimento para marketplace de um brechó.

## Tecnologias

<table>
  <tr>
    <td align="center">
      <a href="https://angular.dev/" title="Angular">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg" width="42px;" alt="Logo Angular"/><br>
        <sub>
        </sub>
      </a>
          <b>Angular</b>
    </td>
    <td align="center">
      <a href="https://www.typescriptlang.org/" title="TypeScript">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" width="42px;" alt="Logo TypeScript"/><br>
        <sub>
        </sub>
      </a>
          <b>TypeScript</b>
    </td>
    <td align="center">
      <a href="https://tailwindcss.com/" title="TailwindCSS">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" width="42px;" alt="Logo TailwindCSS"/><br>
        <sub>
        </sub>
      </a>
          <b>TailwindCSS</b>
    </td>
    <td align="center">
      <a href="https://zod.dev/" title="Zod">
        <img src="./public/zod_logo.png" width="42px;" alt="Logo Zod"/><br>
        <sub>
        </sub>
      </a>
          <b>Zod</b>
    </td>
  </tr>
</table>

## Como rodar o projeto

> [!IMPORTANT]
> Requisitos:
>
> - Node ≥ v20
> - npm ≥ v11.8
> - Angular CLI

Primeiramente rode o backend do sistema a partir das instruções desse repositório: [BStyle Backend](https://github.com/RogerioNeto07/BStyle)

### 1. Instale as dependências

```sh

npm install

```

### 2. Copie as variáveis de ambiente

```sh

cp environment-example.ts environment.ts

```

### 3. Rode o projeto

Modo desenvolvimento

```sh

ng serve

```

Modo build

```sh

npm run build

```

> O projeto estará disponível na http://localhost:4200

## Estrutura de pastas

```sh

.
├── angular.json
├── environment-example.ts # Exemplo das variáveis de ambiente
├── node_modules # Dependências instaladas via npm
├── package.json
├── package-lock.json
├── public # Arquivos públicos estáticos
│   └── favicon.ico
├── README.md # Este arquivo
├── src/
│   ├── app/
│   │   ├── components/ # Componentes reutilizáveis da interface (UI)
│   │   ├── interceptors/ # Interceptadores HTTP (ex: autenticação)
│   │   │   └── auth.interceptor.ts
│   │   ├── pages/ # Páginas da aplicação (nível de rota)
│   │   ├── schemas/ # Validação e estrutura de dados (Zod)
│   │   ├── services/ # Lógica de negócio e comunicação com APIs
│   │   ├── types/ # Tipagens e contratos de dados com o backend
│   │   └── utils/ # Funções utilitárias e helpers
│   ├── index.html
│   ├── main.server.ts
│   ├── main.ts
│   ├── server.ts
│   └── styles.css
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.spec.json

```

## Autores

<table align="center">
  <tr>
    <td align="center">
      <img src="https://github.com/genzo-dev.png" width="160"/><br>
      <strong>Gabriel Enzo (genzo-dev)</strong><br>
      <sub>Fullstack web developer</sub>
    </td>
    <td align="center">
      <img src="https://github.com/RogerioNeto07.png" width="160"/><br>
      <strong>Rogério Neto</strong><br>
      <sub>Backend developer</sub>
    </td>
  </tr>
</table>

<!-- This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.3.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page. -->
