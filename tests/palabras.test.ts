import { describe, it, expect } from "vitest";
import { elegirPalabra } from "../src/domain/palabras";

const azar = (...valores: number[]) => () => valores.shift() ?? 0;

describe("elegirPalabra", () => {
  it("elige la primera palabra de la categoría cuando el azar da 0", () => {
    expect(elegirPalabra("animales", azar(0))).toEqual({ categoria: "animales", palabra: "GATO" });
  });

  it("elige la última palabra de la categoría cuando el azar se acerca a 1", () => {
    expect(elegirPalabra("frutas", azar(0.99))).toEqual({ categoria: "frutas", palabra: "DURAZNO" });
  });

  it("con una categoría inexistente elige al azar entre todas las categorías", () => {
    expect(elegirPalabra("inexistente", azar(0.99, 0))).toEqual({ categoria: "frutas", palabra: "MANZANA" });
  });

  it("sin categoría elige al azar entre todas las categorías", () => {
    expect(elegirPalabra(null, azar(0, 0.99))).toEqual({ categoria: "animales", palabra: "JIRAFA" });
  });
});