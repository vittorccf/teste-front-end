# Layout: de onde vem cada medida

## Fonte

O arquivo do Figma do teste (`Teste-Front-End-Jr`) tem três páginas:

| Página | Conteúdo | Uso |
| --- | --- | --- |
| **Home** | frames `Home` (1440 × 4660) e `Popup` (1440 × 834), azul `#3442B5` e amarelo `#F7CA11` | **layout implementado** |
| Antigo | versão anterior, rosa, logos VTEX | só referência |
| Cover | capa | não usado |

O PNG `vitrine-produtos.png` do enunciado ([`referencia/vitrine-produtos.png`](referencia/vitrine-produtos.png)) é a
vitrine da página **Antigo**. Segui a página **Home**, que é a versão atual (editada em 28/11/2024) e o layout que o
enunciado manda seguir. Renders dos frames: [`figma-home.jpg`](referencia/figma-home.jpg),
[`figma-popup.jpg`](referencia/figma-popup.jpg), [`figma-antigo.jpg`](referencia/figma-antigo.jpg).

Os valores foram lidos pela **API REST do Figma** (árvore de nós: posição, tamanho, cor, fonte, sombra, auto layout).
Os assets saíram pelo endpoint de imagens: foto do banner e dos parceiros em 2x (otimizadas para JPEG), ícones das
categorias em PNG 2x, logo e ícones da interface em SVG.

## Página (frame de 1440 px, conteúdo em 1280 a partir de x = 80)

| Bloco | Figma | Onde |
| --- | --- | --- |
| Faixa de vantagens | 32px, Poppins 500 12px `#9F9F9F`, destaque 600 `#3019B2`, vão de 119 | `Header` |
| Linha do logo | 72px, logo 139 × 41, busca 630 × 48 (raio 10, `#F6F5F2`), ícones de 32 com vão de 32 | `Header` |
| Menu | 40px, sombra `0 8 16 rgba(57,48,19,.12)`, 600 12px caixa alta | `Header` |
| Banner | 1440 × 390, degradê preto a 80% nos 966px da esquerda; título 600 48/50, "50% Off" 700 amarelo, botão 206 × 50 | `HeroBanner` |
| Categorias | 39px abaixo do banner; 7 quadrados de 128 (raio 10), vão de 42; ativo branco com texto `#3019B2` | `DepartmentNav` |
| Vitrine | título 700 30/45 `#3442B5` com traços de 360 (`#DEDEDE`); abas 214 × 40; cards 304 × 500 com vão de 18; setas de 32 | `Showcase` |
| Parceiros | 2 × (634 × 350), raio 20, vão de 13; título 700 40/60; botão 145 × 48 | `Partners` |
| Marcas | círculos de 211 com sombra `0 7 20 rgba(0,0,0,.13)`, vão de 42 | `Brands` |
| Newsletter | 162px `#271C47`; título Outfit 600 32; campos 233 × 42; botão 157 × 42 | `Footer` |
| Rodapé | 282px `#F4F4F4`; coluna da marca de 354, divisória, 3 colunas com vão de 100 (Work Sans 14) | `Footer` |

Entre os blocos há sempre **90px** (`$section-gap`).

## Card da vitrine (304 × 500)

| Elemento | Distância do topo do card | Estilo |
| --- | --- | --- |
| Foto | 32 (área de 278 × 228) | |
| Descrição | 269 | Poppins 300 15/23 `#3F3F40`, 2 linhas |
| Preço "de" | 327 | 400 16/24 `#808080`, riscado |
| Preço "por" | 353 | 700 20/30 |
| Parcelas | 385 | 400 12/18 |
| Frete grátis | 410 | 400 12/18 `#3442B5` |
| Botão Comprar | 440 (276 × 44, raio 4) | 700 14 caixa alta, branco sobre `#3442B5` |

Raio 10, sombra `0 3 19 rgba(0,0,0,.22)`. O e2e `layout desktop` confere o tamanho do card e as posições x = 85 e
x = 1355 do primeiro e do quarto card.

## Modal (frame "Popup")

Caixa de 769 × 299, raio 6, fundo da página escurecido (o branco vira `#757575`: preto a 54%).

| Elemento | Figma |
| --- | --- |
| Foto | 247 × 192, a 56px da borda |
| Textos | coluna de 328, 87px depois da foto |
| Nome | Poppins 400 20/20, espaçamento 1px, caixa alta |
| Preço | Poppins 600 20/20, espaçamento 1px, 18px abaixo |
| Descrição | Work Sans 500 10/15 `#9F9F9F`, 32px abaixo |
| "Veja mais detalhes do produto >" | Work Sans 600 11 `#3442B5`, 18px abaixo |
| Quantidade | 110 × 36, borda `#D9D9D9`; "−" cinza, "+" e número `#271C47` |
| Comprar | 188 × 36, raio 6, amarelo, texto `#271C47` 700 14 |
| Fechar | X de 15 × 13, `#707070` |

## Conferência

Medi a posição de cada bloco no navegador (1440 px) e comparei com o Figma: todos ficam a no máximo 2px do valor do
Figma (altura total 4658 × 4660). As diferenças que sobram vêm dos dados reais: o JSON tem nomes de uma linha e
preços diferentes do "lorem ipsum" do layout.
