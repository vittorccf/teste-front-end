# Decisões

## Layout: página "Home" do Figma, não o PNG

O PNG da vitrine linkado no enunciado é rosa; no Figma ele corresponde à página **Antigo**. A página **Home** (editada
em 28/11/2024) é a versão atual, em azul e amarelo, com outro banner, rodapé e modal. Segui a Home porque o enunciado
manda desenvolver "conforme o layout" do Figma. Trocar de volta é questão de tokens (`_tokens.scss`) e assets.

## Valores e assets pela API do Figma

Medidas, cores, fontes, sombras e espaçamentos saíram da árvore de nós do arquivo (API REST), não de conta-gotas em
imagem. Os assets foram exportados pelo endpoint de imagens: fotos em 2x (convertidas para JPEG otimizado: o banner
caiu de 1,7 MB para 131 KB), ícones das categorias em PNG 2x, logo e ícones em SVG. Os SVGs de interface viraram
componentes React (`figma-icons.tsx`) com as cores trocadas por `currentColor`, para o hover funcionar pelo CSS.

## Next.js em vez de React puro (Vite)

O enunciado pede React e TypeScript e dá ponto extra para SEO. Com Next.js a página sai **renderizada no servidor**:
o HTML já chega com nomes, preços e o JSON-LD dos produtos, que é o que o buscador lê.

- **Prós:** SEO de verdade (sem depender do Google executar JS), `next/image` (tamanhos responsivos, WebP/AVIF,
  lazy load), `next/font` (Poppins hospedada junto, sem salto de layout), ISR (o JSON é buscado no máximo 1 vez por
  hora, a página é estática).
- **Contras:** mais peças que um Vite + React. Mitigado: só uma página, sem rotas de API.

## Busca do JSON no servidor

`fetchProducts()` roda no servidor e passa os produtos para a vitrine (componente cliente).

- O navegador não depende de CORS do domínio da Econverse.
- O JSON é **validado com zod** na entrada: se o formato mudar, a página mostra "não foi possível carregar" em vez de
  quebrar no meio de um card.
- Preço chega em **centavos** (`14990` = R$ 149,90); o modelo interno se chama `priceInCents` para ninguém dividir
  duas vezes.

## Sass: SCSS Modules + tokens

Cada componente tem seu `.module.scss` (classe com escopo, sem colisão). Cores, fontes e medidas ficam em
`_tokens.scss`; breakpoints, botão, foco e afins em `_mixins.scss`. Os dois entram com `@use "tokens"` graças ao
`sassOptions.loadPaths` do `next.config.ts`.

## Sem biblioteca de UI (nem de carrossel ou modal)

- **Modal:** `<dialog>` com `showModal()`. O navegador já faz foco preso, `Esc`, fundo inerte e devolução do foco; o
  componente só sincroniza o estado do React. Clique no fundo fecha.
- **Carrossel:** `scroll-snap` em CSS. No celular é arrastar com o dedo; no desktop as setas avançam uma "página" de
  4 cards e ficam desabilitadas nas pontas.
- **Abas:** padrão WAI-ARIA (`tablist`/`tab`/`tabpanel`, setas, Home, End).
- **Ícones:** SVG inline.

## Card inteiro clicável

O nome do produto é um `<button>` com `::after` cobrindo o card ("stretched link"): clicar em qualquer ponto abre o
modal, e para teclado e leitor de tela cada card tem um alvo só, com o nome do produto. O botão Comprar fica por cima
e também abre o modal.

## Dados que o JSON não tem

- **Preço "de":** derivado (10% acima, terminando em ,90) em `listPriceInCents`. Só para reproduzir o layout; num
  produto real viria da API.
- **Categoria:** derivada do nome (`src/lib/categories.ts`). Aba sem produto mostra mensagem em vez de vazio.
- **id:** slug do nome + posição.

## Testes

- **Vitest + Testing Library:** regras puras (preço, parcelas, parsing, categorias, JSON-LD) e a vitrine como o
  usuário usa (papéis e nomes acessíveis, não classes CSS).
- **Playwright:** build de produção em 1440 px e em celular. Confere o que só o navegador de verdade mostra: `<dialog>`
  real, `Esc`, clique fora, foco devolvido, tamanho do card igual ao layout, rolagem do carrossel, ausência de
  rolagem horizontal no celular.
