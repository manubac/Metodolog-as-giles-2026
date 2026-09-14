export class Ahorcado {
  private readonly palabra: string;
  private vidas = 6;
  private readonly letrasAdivinadas = new Set<string>();

  constructor(palabra: string) {
    this.palabra = palabra;
  }

  adivinar(letra: string): void {
    if (this.palabra.includes(letra)) {
      this.letrasAdivinadas.add(letra);
    } else {
      this.vidas -= 1;
    }
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
