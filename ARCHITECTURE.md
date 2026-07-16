# bstyle-frontend — Arquitetura

## Stack

| Categoria | Tecnologia |
|---|---|
| Framework | Angular 21 (standalone components) |
| SSR | Angular SSR via Express (porta 4000) |
| Estilização | Tailwind CSS v4 + PostCSS |
| Validação | Zod v4 |
| Testes | Vitest |
| Build | Angular CLI + Vite |

---

## 1. Estilização

**Tailwind CSS v4** via PostCSS é o único mecanismo de estilização. O arquivo `src/styles.css` importa o Tailwind com `@import "tailwindcss"`. Todos os componentes usam classes utilitárias inline nos templates HTML — não há CSS modules, CSS-in-JS, SASS ou arquivos de estilo customizados (os arquivos `.css` dos componentes existem mas estão vazios).

Estilos condicionais são aplicados com `[ngClass]` nos templates. O componente `app-button` usa um método `getClasses()` que retorna strings de classes Tailwind baseadas na propriedade `variant` (`primary`, `secondary`, `danger`, `ghost`). O `SpinLoader` é um spinner puramente Tailwind usando `animate-spin`.

---

## 2. Autenticação

**HTTP Basic Authentication** puro — sem refresh tokens, JWT ou OAuth.

**Fluxo:**
1. Usuário envia login + senha → o componente `Login` codifica como `btoa(login:senha)` e armazena em `localStorage` na chave `auth`
2. Um **interceptor funcional** (`auth.interceptor.ts`) anexa o header `Authorization: Basic <token>` em toda requisição HTTP, exceto em rotas públicas como `/auth/registrar`
3. Em resposta **401**, o interceptor remove o token do `localStorage` e redireciona para `/login`
4. O `AuthService` mantém o estado global do usuário via `signal<User | null>`, com métodos `loadUser()`, `logout()` e `isLogged()`
5. **AuthGuard** (`CanActivateFn`) verifica `auth.isLogged()` (i.e., `!!localStorage.getItem('auth')`) para proteger rotas como `/user/:slug`, `/meus-produtos`, `/produtos/cadastrar`

**Logout:** Remove a chave `auth` do `localStorage`, seta o signal do usuário para `null` e redireciona para `/login`.

**Tipo `User`:** `id`, `login`, `nome`, `telefone`, `cidade`, `estado`, `rua`, `numero`, `fotoPerfilUrl`.

---

## 3. Formulários e Validação

**Angular Reactive Forms + Zod v4** com validação em duas fases:
1. O formulário é criado com `FormBuilder` e defaults vazios (ex: `login: [""]`), **sem validators do Angular** — `form.valid` é sempre `true`
2. No `handleSubmit()`, os dados brutos são validados via **Zod schema** (`schema.parse()`) dentro de um try/catch. Se um `ZodError` é lançado, a função `getZodErrorMessages()` extrai mensagens de erro legíveis

**Input masks:** Funções customizadas `formatPhone()` e `cleanPhone()` em `utils/masks/phone-mask.ts`, aplicadas via `onInput` no `InputComponent` quando `mask="phone"`.

**Submissão:** Todos os formulários usam **`FormData`**, permitindo enviar texto e arquivos simultaneamente.

---

## 4. Imagens

Todas as imagens são servidas pelo backend Java/Spring em `http://localhost:8080/uploads/`.

**Upload:** Arquivos capturados via `input[type=file]` e anexados a um `FormData` como `foto` (perfil) ou `fotos` (produto).

**Preview antes do envio:** `FileReader.readAsDataURL()` gera uma URL `data:` armazenada em uma propriedade de classe para exibição imediata.

**Exibição:** URLs montadas como `` `${environment.apiUrl}/uploads/${fotoNome}` ``. Um placeholder `assets/placeholder.jpg` é usado quando não há foto.

**Não há** otimização de imagem, CDN ou biblioteca de processamento de imagens.

---

## 5. Reatividade e Estado

**Nenhuma biblioteca externa de estado** (sem NgRx, SignalStore, Akita, etc.). O projeto usa:

| Mecanismo | Onde é usado |
|---|---|
| **Angular Signals** (`signal()`, `computed()`) | Estado global do usuário no `AuthService`; estado local em alguns componentes (`openProfileMenu`, `title`) |
| **Propriedades de classe mutáveis** | Maioria dos componentes: arrays de produtos, booleans de loading/editing, mensagens de erro, arquivos selecionados |
| **RxJS + `ChangeDetectorRef.detectChanges()`** | Serviços HTTP retornam `Observable`; componentes usam `subscribe()` ou `firstValueFrom()` e chamam `cdr.detectChanges()` manualmente |
| **`NgZone.run()`** | `AuthService.setUser()` e `AuthService.logout()` garantem que a change detection capture atualizações de signals feitas em callbacks de promises |

O projeto está em **transição** entre o padrão antigo (`ChangeDetectorRef`) e o novo (`Signals`).
