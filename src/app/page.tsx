import { Brands } from "@/components/home/Brands";
import { DepartmentNav } from "@/components/home/DepartmentNav";
import { HeroBanner } from "@/components/home/HeroBanner";
import { Partners } from "@/components/home/Partners";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Showcase } from "@/components/showcase/Showcase";
import { fetchProducts } from "@/lib/products";
import { productListJsonLd, serializeJsonLd } from "@/lib/seo";

// Uma busca só (o fetch do Next deduplica e guarda em cache por 1 h); as três vitrines usam o mesmo resultado.
export default async function HomePage() {
  const { ok, products } = await fetchProducts();

  return (
    <>
      <Header />
      <main id="conteudo">
        <HeroBanner />
        <DepartmentNav />
        <div id="vitrine">
          <Showcase title="Produtos relacionados" products={products} available={ok} priority />
        </div>
        <Partners id="parceiros-1" />
        <Showcase title="Produtos relacionados" products={products} available={ok} variant="link" />
        <Partners id="parceiros-2" />
        <Brands />
        <Showcase title="Produtos relacionados" products={products} available={ok} variant="link" />
      </main>
      <Footer />
      {ok && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(productListJsonLd(products)) }}
        />
      )}
    </>
  );
}
