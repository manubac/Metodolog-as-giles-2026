import { describe, it, expect } from "vitest";
import { Ahorcado } from "../src/domain/Ahorcado";

describe("Ahorcado", () => {
  it("se inicializa con la palabra enmascarada, un guión bajo por letra", () => {
    const juego = new Ahorcado("GATO");

    expect(juego.palabraEnmascarada()).toBe("_ _ _ _");
  });

  it("arranca con 6 vidas", () => {
    const juego = new Ahorcado("GATO");

    expect(juego.vidasRestantes()).toBe(6);
  });

  it("revela la letra adivinada cuando está presente en la palabra", () => {
    const juego = new Ahorcado("GATO");

    juego.adivinar("A");

    expect(juego.palabraEnmascarada()).toBe("_ A _ _");
  });

  it("descuenta una vida al adivinar una letra ausente", () => {
    const juego = new Ahorcado("GATO");

    juego.adivinar("E");

    expect(juego.vidasRestantes()).toBe(5);
  });
});
