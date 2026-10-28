import { describe, expect, it } from "vitest";
import { categoryOf, filterByCategory } from "@/lib/categories";
import { parseProducts, slugify } from "@/lib/products";
import { productListJsonLd, serializeJsonLd } from "@/lib/seo";
import fixture from "../fixtures/produtos.json";

describe("parseProducts", () => {
  it("converte o JSON real da Econverse", () => {
    const products = parseProducts(fixture);
    expect(products).toHaveLength(10);
    expect(products[0]).toEqual({
      id: "iphone-11-pro-max-branco-1-0",
      name: "Iphone 11 PRO MAX BRANCO 1",
      description: "Iphone 11 PRO MAX BRANCO 1",
      photo: "https://app.econverse.com.br/teste-front-end/junior/tecnologia/fotos-produtos/foto-iphone.png",
      priceInCents: 15000,
    });
  });

  it("gera ids únicos mesmo com nomes repetidos", () => {
    const item = fixture.products[0]!;
    const ids = parseProducts({ success: true, products: [item, item] }).map((p) => p.id);
    expect(new Set(ids).size).toBe(2);
  });

  it("recusa formato inesperado em vez de quebrar a tela depois", () => {
    expect(() => parseProducts({ success: true, products: [{ productName: "X" }] })).toThrow();
    expect(() => parseProducts({ success: false, products: [] })).toThrow(/success=false/);
    expect(() => parseProducts(null)).toThrow();
  });

  it("slugify tira acento e símbolo", () => {
    expect(slugify("Câmera  Ação 4K!")).toBe("camera-acao-4k");
  });
});

describe("categorias", () => {
  const products = parseProducts(fixture);

  it("todos os produtos do JSON são celulares", () => {
    expect(products.every((p) => categoryOf(p) === "celular")).toBe(true);
    expect(filterByCategory(products, "celular")).toHaveLength(10);
    expect(filterByCategory(products, "tablets")).toHaveLength(0);
    expect(filterByCategory(products, "todos")).toHaveLength(10);
  });
});

describe("SEO", () => {
  it("monta ItemList de Product com preço em reais", () => {
    const data = productListJsonLd(parseProducts(fixture));
    expect(data.itemListElement).toHaveLength(10);
    expect(data.itemListElement[0]?.item.offers).toMatchObject({ priceCurrency: "BRL", price: "150.00" });
  });

  it("não deixa o JSON-LD fechar a tag script", () => {
    expect(serializeJsonLd({ name: "</script><script>alert(1)</script>" })).not.toContain("</script>");
  });
});
