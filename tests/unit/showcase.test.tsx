import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ImgHTMLAttributes } from "react";
import { describe, expect, it, vi } from "vitest";
import { Showcase } from "@/components/showcase/Showcase";
import { parseProducts } from "@/lib/products";
import fixture from "../fixtures/produtos.json";

// next/image depende do loader do Next; no teste basta um <img>.
vi.mock("next/image", () => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  default: ({ priority, ...props }: ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean }) => (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img {...props} />
  ),
}));

const products = parseProducts(fixture);

describe("<Showcase>", () => {
  it("lista os produtos do JSON com preço, parcelas e frete", () => {
    render(<Showcase title="Produtos relacionados" products={products} />);
    const cards = screen.getAllByRole("article");
    expect(cards).toHaveLength(10);
    const first = within(cards[0]!);
    expect(first.getByText("R$ 150,00")).toBeInTheDocument();
    expect(first.getByText("ou 2x de R$ 75,00 sem juros")).toBeInTheDocument();
    expect(first.getByText("Frete grátis")).toBeInTheDocument();
  });

  it("abre o modal com as informações do produto clicado e fecha", async () => {
    const user = userEvent.setup();
    render(<Showcase title="Produtos relacionados" products={products} />);

    await user.click(screen.getByRole("button", { name: "IPHONE 13 MINI 1" }));
    const dialog = screen.getByRole("dialog", { name: "IPHONE 13 MINI 1" });
    expect(within(dialog).getByText("R$ 90,00")).toBeInTheDocument();
    expect(within(dialog).getByRole("img", { name: "IPHONE 13 MINI 1" })).toBeInTheDocument();

    await user.click(within(dialog).getByRole("button", { name: "Fechar" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("o botão Comprar do card também abre o modal, e a quantidade vai para o aviso", async () => {
    const user = userEvent.setup();
    render(<Showcase title="Produtos relacionados" products={products} />);

    await user.click(screen.getAllByRole("button", { name: "Comprar" })[2]!);
    const dialog = screen.getByRole("dialog", { name: "Iphone 11 PRO MAX BRANCO 2" });
    await user.click(within(dialog).getByRole("button", { name: "Aumentar quantidade" }));
    await user.click(within(dialog).getByRole("button", { name: "Aumentar quantidade" }));
    await user.click(within(dialog).getByRole("button", { name: "Comprar" }));
    expect(within(dialog).getByRole("status")).toHaveTextContent("3 unidades adicionadas ao carrinho.");
  });

  it("abas filtram por categoria e respondem às setas do teclado", async () => {
    const user = userEvent.setup();
    render(<Showcase title="Produtos relacionados" products={products} />);

    const celular = screen.getByRole("tab", { name: "Celular" });
    expect(celular).toHaveAttribute("aria-selected", "true");

    celular.focus();
    await user.keyboard("{ArrowRight}");
    const acessorios = screen.getByRole("tab", { name: "Acessórios" });
    expect(acessorios).toHaveFocus();
    expect(acessorios).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Nenhum produto em acessórios no momento.");

    await user.keyboard("{End}");
    expect(screen.getByRole("tab", { name: "Ver todos" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getAllByRole("article")).toHaveLength(10);
  });

  it("avisa quando a API falhou", () => {
    render(<Showcase title="Produtos relacionados" products={[]} available={false} />);
    expect(screen.getByRole("alert")).toHaveTextContent("Não foi possível carregar os produtos");
  });
});
