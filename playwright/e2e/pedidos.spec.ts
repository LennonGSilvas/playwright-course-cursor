import { test, expect } from "@playwright/test";

// AAA - Arrange, Act, Assert
test("Deve consultar um pedido aprovado", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  // ARRANGE
  await expect(
    page.getByTestId("hero-section").getByRole("heading"),
  ).toContainText("Velô Sprint");

  await page.getByRole("link", { name: "Consultar Pedido" }).click();
  await expect(page.getByRole("heading")).toContainText("Consultar Pedido");

  // ACT
  await page.getByTestId("search-order-id").fill("VLO-XZ233I");
  await page.getByRole("button", { name: "Buscar Pedido" }).click();

  // ASSERT

  //XPath
  // const orderCode = page.locator(
  //   '//p[text()="Pedido"]/..//p[text()="VLO-XZ233I"]',
  // );

  // await expect(orderCode).toBeVisible({
  //   timeout: 10000,
  // });

  const containerPedido = page
    .getByRole("paragraph")
    .filter({ hasText: /^Pedido$/ })
    .locator("..");

  await expect(containerPedido).toContainText("VLO-XZ233I", { timeout: 10000 });

  await expect(page.getByText("APROVADO")).toBeVisible();
});
