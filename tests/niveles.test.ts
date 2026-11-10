import { describe, it, expect } from "vitest";
import { vidasDelNivel } from "../src/domain/niveles";

describe("vidasDelNivel", () => {
  it("el nivel fácil da 8 vidas", () => {
    expect(vidasDelNivel("facil")).toBe(8);
  });
});
