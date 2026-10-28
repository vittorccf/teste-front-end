import { expect, test } from "@playwright/test";

test.describe("vitrine", () => {
  test("HTML do servidor já traz os produtos, h1 único e JSON-LD (SEO)", async ({ request }) => {
    const html = await (await request.get("/")).text();
    expect(html).toContain('lang="pt-BR"');
    expect(html).toContain("Iphone 11 PRO MAX BRANCO 1");
    expect(html.match(/<h1[\s>]/g)).toHaveLength(1);
    expect(html).toContain('"@type":"ItemList"');
    expect(html).toContain('<link rel="canonical"');
  });

  test("clicar no produto abre o modal com os dados do JSON; Esc fecha e devolve o foco", async ({ page }) => {
    await page.goto("/");
    const showcase = page.locator("#vitrine");
    const trigger = showcase.getByRole("button", { name: "IPHONE 13 MINI 1" });
    await trigger.click();

    const dialog = page.getByRole("dialog", { name: "IPHONE 13 MINI 1" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText("R$ 90,00")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("clicar no fundo escurecido fecha o modal", async ({ page }) => {
    await page.goto("/");
    await page.locator("#vitrine").getByRole("button", { name: "Comprar" }).first().click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await page.mouse.click(5, 5);
    await expect(dialog).toBeHidden();
  });

  test("layout desktop: 4 cards de 304x500 nas posições do Figma e seta avança", async ({ page, isMobile }) => {
    test.skip(isMobile, "medidas do layout de 1440 px");
    await page.goto("/");
    const cards = page.locator("#vitrine article");
    const box = await cards.first().boundingBox();
    expect(Math.round(box!.width)).toBe(304);
    expect(Math.round(box!.height)).toBe(500);
    // Figma: primeiro card em x=85, quarto termina em x=1355.
    expect(Math.round(box!.x)).toBe(85);
    const fourth = await cards.nth(3).boundingBox();
    expect(Math.round(fourth!.x + fourth!.width)).toBe(1355);

    const track = page.locator("#vitrine ul").first();
    const next = page.locator("#vitrine").getByRole("button", { name: /Próximos produtos/ });
    await next.click();
    // Avança uma página inteira: 4 cards de 304 + 4 vãos de 18.
    await expect.poll(() => track.evaluate((el) => Math.round(el.scrollLeft))).toBe(4 * (304 + 18));
  });

  test("mobile: sem rolagem horizontal na página", async ({ page }) => {
    await page.goto("/");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
