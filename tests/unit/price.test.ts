import { describe, expect, it } from "vitest";
import { formatBRL, installmentLabel, installmentValue, listPriceInCents } from "@/lib/price";

describe("preço", () => {
  it("formata centavos em reais no padrão brasileiro", () => {
    expect(formatBRL(2890)).toBe("R$ 28,90");
    expect(formatBRL(149990)).toBe("R$ 1.499,90");
    expect(formatBRL(0)).toBe("R$ 0,00");
  });

  it("parcela em 2x sem juros arredondando para cima (nunca cobra menos que o total)", () => {
    expect(installmentValue(9990)).toBe(4995);
    expect(installmentValue(4551)).toBe(2276);
    expect(installmentLabel(9990)).toBe("ou 2x de R$ 49,95 sem juros");
  });

  it("preço de é maior que o preço por e termina em ,90", () => {
    for (const cents of [520, 4550, 15000, 149990]) {
      const list = listPriceInCents(cents);
      expect(list).toBeGreaterThan(cents);
      expect(list % 100).toBe(90);
    }
  });
});
