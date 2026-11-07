import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { Given, When, Then } = createBdd();

Given("una partida con la palabra {string}", async ({ page }, palabra: string) => {
  await page.goto(`/?word=${palabra}`);
});

Given("una partida con la palabra {string} y {int} vidas", async ({ page }, palabra: string, vidas: number) => {
  await page.goto(`/?word=${palabra}&lives=${vidas}`);
});

Given("una partida con la palabra {string} y {string} vidas", async ({ page }, palabra: string, valor: string) => {
  await page.goto(`/?word=${palabra}&lives=${valor}`);
});

Given("una partida de la categoría {string}", async ({ page }, categoria: string) => {
  await page.addInitScript(() => {
    Math.random = () => 0;
  });
  await page.goto(`/?category=${categoria}`);
});

When("el jugador adivina la letra {string}", async ({ page }, letra: string) => {
  const input = page.getByRole("textbox");
  await input.fill(letra);
  await input.press("Enter");
});

Then("se ve la palabra {string}", async ({ page }, esperada: string) => {
  await expect(page.getByTestId("word")).toHaveText(esperada);
});

Then("se ven {int} vidas", async ({ page }, vidas: number) => {
  await expect(page.getByTestId("lives")).toHaveText(String(vidas));
});

Then("se ve el mensaje {string}", async ({ page }, mensaje: string) => {
  await expect(page.getByTestId("mensaje")).toHaveText(mensaje);
});

Then("se ve la categoría {string}", async ({ page }, categoria: string) => {
  await expect(page.getByTestId("categoria")).toHaveText(`Categoría: ${categoria}`);
});
Then("se ve el puntaje {int}", async ({ page }, puntaje: number) => {
  await expect(page.getByTestId("score")).toHaveText(`Puntaje: ${puntaje}`);
});