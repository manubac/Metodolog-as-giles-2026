import { describe, it, expect } from "vitest";
import { vidasDelNivel } from "../src/domain/niveles";

describe("vidasDelNivel", () => {
  it("el nivel fácil da 8 vidas", () => {
    expect(vidasDelNivel("facil")).toBe(8);
  });

  it("el nivel difícil da 4 vidas", () => {
    expect(vidasDelNivel("dificil")).toBe(4);
  });
});
