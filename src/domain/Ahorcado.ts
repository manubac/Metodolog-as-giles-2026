export class Ahorcado {
  private readonly palabra: string;
  private readonly vidas: number = 6;
  private readonly letrasAdivinadas = new Set<string>();

  constructor(palabra: string) {
    this.palabra = palabra;
  }

  adivinar(letra: string): void {
    this.letrasAdivinadas.add(letra);
  }

  palabraEnmascarada(): string {
    return this.palabra
      .split("")
      .map((letra) => (this.letrasAdivinadas.has(letra) ? letra : "_"))
      .join(" ");
  }

  vidasRestantes(): number {
    return this.vidas;
  }
}
