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

  it("gana la partida cuando se revelan todas las letras", () => {
    const juego = new Ahorcado("GATO");

    juego.adivinar("G");
    juego.adivinar("A");
    juego.adivinar("T");
    juego.adivinar("O");

    expect(juego.gano()).toBe(true);
  });
    it("pierde la partida cuando se agotan las vidas", () => {
    const juego = new Ahorcado("GATO");

    for (const letra of ["E", "I", "U", "R", "S", "N"]) {
      juego.adivinar(letra);
    }

    expect(juego.perdio()).toBe(true);
  });
    it("al perder, revela la palabra completa", () => {
    const juego = new Ahorcado("GATO");

    for (const letra of ["E", "I", "U", "R", "S", "N"]) {
      juego.adivinar(letra);
    }

    expect(juego.palabraEnmascarada()).toBe("G A T O");
  });
    it("no descuenta otra vida al repetir una letra fallada", () => {
      const juego = new Ahorcado("GATO");

      juego.adivinar("E");
      juego.adivinar("E");

    expect(juego.vidasRestantes()).toBe(5);
  });
});
