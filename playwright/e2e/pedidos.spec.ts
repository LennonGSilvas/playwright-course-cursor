import { test, expect } from "@playwright/test";

// AAA - Arrange, Act, Assert
test("Deve consultar um pedido aprovado", async ({ page }) => {
  await page.goto("http://localhost:5174/");

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

  await expect(page.getByText("VLO-XZ233I")).toBeVisible({
    timeout: 10000,
  });

  await expect(page.getByText("APROVADO")).toBeVisible();

  // await expect(page.getByText("VLO-XZ233I")).toContainText("VLO-XZ233I");
  // await expect(page.getByText("APROVADO")).toContainText("APROVADO");
});
