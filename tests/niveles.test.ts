import { describe, it, expect } from "vitest";
import { vidasDelNivel, vidasIniciales } from "../src/domain/niveles";

describe("vidasDelNivel", () => {
  it("el nivel fácil da 8 vidas", () => {
    expect(vidasDelNivel("facil")).toBe(8);
  });

  it("el nivel difícil da 4 vidas", () => {
    expect(vidasDelNivel("dificil")).toBe(4);
  });

  it("el nivel normal da 6 vidas", () => {
    expect(vidasDelNivel("normal")).toBe(6);
  });
});

describe("vidasIniciales", () => {
  it("si se indican vidas, ganan sobre el nivel", () => {
    expect(vidasIniciales(3, "facil")).toBe(3);
  });
});
