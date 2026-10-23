import { test, expect } from "@playwright/test";

//Test data

// AAA - Arrange, Act, Assert
test("Deve consultar um pedido aprovado", async ({ page }) => {
  const order = "VLO-XZ233I";

  await page.goto("http://localhost:5173/");

  // ARRANGE
  await expect(
    page.getByTestId("hero-section").getByRole("heading"),
  ).toContainText("Velô Sprint");

  await page.getByRole("link", { name: "Consultar Pedido" }).click();
  await expect(page.getByRole("heading")).toContainText("Consultar Pedido");

  // ACT
  await page.getByTestId("search-order-id").fill(order);
  await page.getByRole("button", { name: "Buscar Pedido" }).click();

  // ASSERT
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
  const order = "VLO-ABC123";

  await page.goto("http://localhost:5173/");
  await expect(
    page.getByTestId("hero-section").getByRole("heading"),
  ).toContainText("Velô Sprint");

  await page.getByRole("link", { name: "Consultar Pedido" }).click();
  await expect(page.getByRole("heading")).toContainText("Consultar Pedido");

  await page.getByTestId("search-order-id").fill(order);
  await page.getByRole("button", { name: "Buscar Pedido" }).click();

  // const title = page.getByRole("heading", { name: "Pedido não encontrado" });
  // await expect(title).toBeVisible();

  // const message = page.locator("p", {
  //   hasText: "Verifique o número do pedido",
  // });

  // await expect(message).toBeVisible();

  await expect(page.locator("#root")).toMatchAriaSnapshot(`
    - img
    - heading "Pedido não encontrado" [level=3]
    - paragraph: Verifique o número do pedido e tente novamente
    `);
});
