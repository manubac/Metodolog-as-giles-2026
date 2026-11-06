// Los AT dependen del orden: la primera categoría es "animales" y su primera palabra es "GATO".
export const PALABRAS: Readonly<Record<string, readonly string[]>> = {
  animales: ["GATO", "PERRO", "CABALLO", "ELEFANTE", "JIRAFA"],
  frutas: ["MANZANA", "BANANA", "NARANJA", "FRUTILLA", "DURAZNO"],
};

export type PalabraElegida = { categoria: string; palabra: string };

function elegirDe<T>(lista: readonly T[], random: () => number): T {
  return lista[Math.floor(random() * lista.length)];
}

export function elegirPalabra(categoria: string | null, random: () => number = Math.random): PalabraElegida {
  const nombre =
    categoria !== null && Object.hasOwn(PALABRAS, categoria)
      ? categoria
      : elegirDe(Object.keys(PALABRAS), random);
  return { categoria: nombre, palabra: elegirDe(PALABRAS[nombre], random) };
}