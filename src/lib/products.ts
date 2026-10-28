import { z } from "zod";

export const PRODUCTS_URL = "https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json";

const productsResponseSchema = z.object({
  success: z.boolean(),
  products: z.array(
    z.object({
      productName: z.string().min(1),
      descriptionShort: z.string(),
      photo: z.url(),
      // Inteiro em centavos: 14990 é R$ 149,90.
      price: z.number().int().nonnegative(),
    }),
  ),
});

export type Product = {
  id: string;
  name: string;
  description: string;
  photo: string;
  priceInCents: number;
};

export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Valida o JSON da Econverse e converte para o modelo da vitrine. Lança erro se o formato mudar. */
export function parseProducts(json: unknown): Product[] {
  const data = productsResponseSchema.parse(json);
  if (!data.success) throw new Error("A API de produtos respondeu success=false");

  return data.products.map((item, index) => ({
    // O JSON não tem id; o índice desfaz empate entre nomes iguais.
    id: `${slugify(item.productName)}-${index}`,
    name: item.productName,
    description: item.descriptionShort,
    photo: item.photo,
    priceInCents: item.price,
  }));
}

export type ProductsResult = { ok: true; products: Product[] } | { ok: false; products: [] };

/** Busca no servidor (sem CORS no navegador, HTML já chega com os produtos para SEO) e revalida a cada hora. */
export async function fetchProducts(): Promise<ProductsResult> {
  try {
    const response = await fetch(PRODUCTS_URL, { next: { revalidate: 3600 } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return { ok: true, products: parseProducts(await response.json()) };
  } catch (error) {
    console.error("[vitrine] falha ao carregar produtos:", error);
    return { ok: false, products: [] };
  }
}
