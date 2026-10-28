import type { Product } from "./products";

export type CategoryId = "celular" | "acessorios" | "tablets" | "notebooks" | "tvs" | "todos";

export const SHOWCASE_CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: "celular", label: "Celular" },
  { id: "acessorios", label: "Acessórios" },
  { id: "tablets", label: "Tablets" },
  { id: "notebooks", label: "Notebooks" },
  { id: "tvs", label: "TVs" },
  { id: "todos", label: "Ver todos" },
];

// O JSON não traz categoria: ela sai do nome do produto.
const KEYWORDS: Record<Exclude<CategoryId, "todos">, RegExp> = {
  celular: /\b(iphone|celular|smartphone|galaxy|motorola|xiaomi)\b/i,
  acessorios: /\b(capa|carregador|fone|cabo|pel[ií]cula|airpods?)\b/i,
  tablets: /\b(ipad|tablet)\b/i,
  notebooks: /\b(notebook|macbook|laptop)\b/i,
  tvs: /\b(tv|televis[aã]o|smart ?tv)\b/i,
};

export function categoryOf(product: Product): CategoryId | null {
  for (const [id, pattern] of Object.entries(KEYWORDS)) {
    if (pattern.test(product.name)) return id as CategoryId;
  }
  return null;
}

export function filterByCategory(products: Product[], category: CategoryId): Product[] {
  if (category === "todos") return products;
  return products.filter((product) => categoryOf(product) === category);
}
