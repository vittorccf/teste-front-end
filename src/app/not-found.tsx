import Link from "next/link";
export default function NotFound() {
  return (
    <main id="conteudo" style={{ padding: "96px 16px", textAlign: "center" }}>
      <h1>Página não encontrada</h1>
      <p style={{ marginTop: 16 }}>
        <Link href="/" style={{ textDecoration: "underline" }}>
          Voltar para a loja
        </Link>
      </p>
    </main>
  );
}
