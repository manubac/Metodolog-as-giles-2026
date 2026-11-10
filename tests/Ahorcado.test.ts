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
    it("indica si una letra ya fue intentada", () => {
    const juego = new Ahorcado("GATO");

    expect(juego.yaIntentada("E")).toBe(false);
    juego.adivinar("E");
    expect(juego.yaIntentada("E")).toBe(true);
  });
  it("no descuenta vidas por debajo de 0 si se sigue adivinando tras perder", () => {
    const juego = new Ahorcado("GATO");

    for (const letra of ["E", "I", "U", "R", "S", "N"]) {
      juego.adivinar(letra);
    }
    juego.adivinar("Z");

    expect(juego.vidasRestantes()).toBe(0);
    expect(juego.perdio()).toBe(true);
  });

  it("no descuenta vidas si se intenta adivinar una letra ausente tras haber ganado", () => {
    const juego = new Ahorcado("GATO");

    for (const letra of ["G", "A", "T", "O"]) {
      juego.adivinar(letra);
    }
    juego.adivinar("Z");

    expect(juego.vidasRestantes()).toBe(6);
    expect(juego.gano()).toBe(true);
  });

  it("rechaza un carácter que no es letra sin descontar vidas", () => {
    const juego = new Ahorcado("GATO");

    expect(() => juego.adivinar("1")).toThrow("Ingresá una sola letra");
    expect(juego.vidasRestantes()).toBe(6);
  });

  it("rechaza una entrada de más de una letra", () => {
    const juego = new Ahorcado("GATO");

    expect(() => juego.adivinar("AB")).toThrow("Ingresá una sola letra");
  });

  it("arranca con la cantidad de vidas indicada", () => {
    const juego = new Ahorcado("GATO", 8);

    expect(juego.vidasRestantes()).toBe(8);
  });

  it("un valor de vidas menor que 1 usa 6 vidas", () => {
    const juego = new Ahorcado("GATO", 0);

    expect(juego.vidasRestantes()).toBe(6);
  });

  it("un valor de vidas que no es un número usa 6 vidas", () => {
    const juego = new Ahorcado("GATO", Number.NaN);

    expect(juego.vidasRestantes()).toBe(6);
  });

  it("un valor de vidas no entero usa 6 vidas", () => {
    const juego = new Ahorcado("GATO", 2.5);

    expect(juego.vidasRestantes()).toBe(6);
  });
    it("arranca con puntaje 0", () => {
    const juego = new Ahorcado("GATO");

    expect(juego.puntaje()).toBe(0);
     });
     
    it("al ganar sin errores el puntaje es 10 por cada vida", () => {
    const juego = new Ahorcado("GATO");

    for (const letra of ["G", "A", "T", "O"]) {
      juego.adivinar(letra);
    }

    expect(juego.puntaje()).toBe(60);
  });
    it("al ganar con errores el puntaje es 10 por cada vida que quedó", () => {
    const juego = new Ahorcado("GATO");

    for (const letra of ["E", "I", "G", "A", "T", "O"]) {
      juego.adivinar(letra);
    }

    expect(juego.puntaje()).toBe(40);
  });
  it("al perder la partida el puntaje es 0", () => {
  const juego = new Ahorcado("GATO");

  for (const letra of ["E", "I", "U", "R", "S", "N"]) {
    juego.adivinar(letra);
  }

  expect(juego.perdio()).toBe(true);
  expect(juego.puntaje()).toBe(0);
});
  });

it("trata una letra minúscula como su mayúscula", () => {
    const juego = new Ahorcado("GATO");

    juego.adivinar("a");

    expect(juego.palabraEnmascarada()).toBe("_ A _ _");
    expect(juego.vidasRestantes()).toBe(6);
  });

  it("reconoce como ya intentada una letra sin importar mayúsculas o minúsculas", () => {
    const juego = new Ahorcado("GATO");

    juego.adivinar("E");

    expect(juego.yaIntentada("e")).toBe(true);
  });

  it("pedir pista revela la primera letra oculta", () => {
    const juego = new Ahorcado("GATO");

    juego.pedirPista();

    expect(juego.palabraEnmascarada()).toBe("G _ _ _");
  });

  it("la pista revela la primera letra que sigue oculta, salteando las ya reveladas", () => {
    const juego = new Ahorcado("GATO");

    juego.adivinar("G");
    juego.adivinar("A");
    juego.pedirPista();

    expect(juego.palabraEnmascarada()).toBe("G A T _");
  });

  it("pedir pista descuenta una vida", () => {
    const juego = new Ahorcado("GATO");

    juego.pedirPista();

    expect(juego.vidasRestantes()).toBe(5);
  });

  it("no da pista si queda una sola vida", () => {
    const juego = new Ahorcado("GATO", 1);

    expect(() => juego.pedirPista()).toThrow("No te quedan vidas para pedir una pista");
    expect(juego.vidasRestantes()).toBe(1);
    expect(juego.palabraEnmascarada()).toBe("_ _ _ _");
  });

  it("no descuenta vidas al pedir pista tras ganar", () => {
    const juego = new Ahorcado("GATO");

    for (const letra of ["G", "A", "T", "O"]) {
      juego.adivinar(letra);
    }
    juego.pedirPista();

    expect(juego.vidasRestantes()).toBe(6);
    expect(juego.gano()).toBe(true);
  });


  it("no descuenta vidas al pedir pista tras perder", () => {
    const juego = new Ahorcado("GATO", 1);

    juego.adivinar("E");
    juego.pedirPista();

    expect(juego.vidasRestantes()).toBe(0);
    expect(juego.perdio()).toBe(true);
  });


  it("no da pista si queda una sola letra oculta", () => {
    const juego = new Ahorcado("GATO");

    for (const letra of ["G", "A", "T"]) {
      juego.adivinar(letra);
    }

    expect(() => juego.pedirPista()).toThrow("La última letra la tenés que adivinar vos");
    expect(juego.palabraEnmascarada()).toBe("G A T _");
    expect(juego.vidasRestantes()).toBe(6);
  });

  it("acepta la Ñ como letra", () => {
    const juego = new Ahorcado("ÑANDU");

    juego.adivinar("Ñ");

    expect(juego.palabraEnmascarada()).toBe("Ñ _ _ _ _");
  });
