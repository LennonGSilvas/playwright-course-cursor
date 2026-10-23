import { test, expect } from "@playwright/test";
import { gerarCodigoPedido } from "../support/helpers";

test.describe("Consulta de Pedido", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");

    await expect(
      page.getByTestId("hero-section").getByRole("heading"),
    ).toContainText("Velô Sprint");

    await page.getByRole("link", { name: "Consultar Pedido" }).click();
    await expect(page.getByRole("heading")).toContainText("Consultar Pedido");
  });

  test("Deve consultar um pedido aprovado", async ({ page }) => {
    const order = "VLO-XZ233I";

    await page.getByTestId("search-order-id").fill(order);
    await page.getByRole("button", { name: "Buscar Pedido" }).click();

    const containerPedido = page
      .getByRole("paragraph")
      .filter({ hasText: /^Pedido$/ })
      .locator("..");

    await expect(containerPedido).toContainText(order, { timeout: 10000 });

    await expect(page.getByText("APROVADO")).toBeVisible();
  });

  test("deve exibir mensagem quando o pedido não é encontrado", async ({
    page,
  }) => {
    const order = gerarCodigoPedido();

    await page.getByTestId("search-order-id").fill(order);
    await page.getByRole("button", { name: "Buscar Pedido" }).click();

    await expect(page.locator("#root")).toMatchAriaSnapshot(`
    - img
    - heading "Pedido não encontrado" [level=3]
    - paragraph: Verifique o número do pedido e tente novamente
    `);
  });
});
