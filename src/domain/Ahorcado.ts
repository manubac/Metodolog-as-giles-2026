export class Ahorcado {
  private readonly palabra: string;
  private vidas = 6;
  private readonly letrasAdivinadas = new Set<string>();
  private readonly letrasIntentadas = new Set<string>();

  constructor(palabra: string) {
    this.palabra = palabra;
  }

      adivinar(letra: string): void {
      if (/\d/.test(letra)) throw new Error("Ingresá una sola letra");    
    if (this.yaIntentada(letra)) return;
    this.letrasIntentadas.add(letra);
    if (this.palabra.includes(letra)) {
      this.letrasAdivinadas.add(letra);
    } else {
      this.vidas -= 1;
    }
  }

  yaIntentada(letra: string): boolean {
    return this.letrasIntentadas.has(letra);
  }
  perdio(): boolean {
    return this.vidas === 0;
  }
  gano(): boolean {
    return this.palabra.split("").every((letra) => this.letrasAdivinadas.has(letra));
  }

  palabraEnmascarada(): string {
    return this.palabra
      .split("")
      .map((letra) => (this.perdio() || this.letrasAdivinadas.has(letra) ? letra : "_"))
      .join(" ");
  }

  vidasRestantes(): number {
    return this.vidas;
  }
}
