import { describe, it, expect } from "vitest";
import { Ahorcado } from "../src/domain/Ahorcado";

describe("Ahorcado", () => {
  it("se inicializa con la palabra enmascarada, un guión bajo por letra", () => {
    const juego = new Ahorcado("GATO");

    expect(juego.palabraEnmascarada()).toBe("_ _ _ _");
  });
});
