import type { Product } from "./products";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const SITE_NAME = "Econverse";
export const SITE_DESCRIPTION =
  "Tecnologia, supermercado, moda e muito mais com frete grátis acima de R$ 200 e parcelamento sem juros.";

/** schema.org ItemList de Product: rich results de preço no Google. */
export function productListJsonLd(products: Product[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Produtos relacionados",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: product.photo,
        sku: product.id,
        offers: {
          "@type": "Offer",
          priceCurrency: "BRL",
          price: (product.priceInCents / 100).toFixed(2),
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/#${product.id}`,
        },
      },
    })),
  };
}

/** JSON dentro de <script>: escapa "<" para um nome de produto nunca fechar a tag. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
