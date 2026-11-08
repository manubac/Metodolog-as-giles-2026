export class Ahorcado {
  private readonly palabra: string;
  private vidas: number;
  private readonly letrasAdivinadas = new Set<string>();
  private readonly letrasIntentadas = new Set<string>();

  constructor(palabra: string, vidas = 6) {
    this.palabra = palabra;
    this.vidas = !Number.isInteger(vidas) || vidas < 1 ? 6 : vidas;
  }

  adivinar(entrada: string): void {
    if (this.perdio() || this.gano()) return;
    const letra = entrada.toUpperCase();
    if (!/^[A-Za-z]$/.test(letra)) throw new Error("Ingresá una sola letra");
    if (this.yaIntentada(letra)) return;
    this.letrasIntentadas.add(letra);
    if (this.palabra.includes(letra)) {
      this.letrasAdivinadas.add(letra);
    } else {
      this.vidas -= 1;
    }
  }


  yaIntentada(letra: string): boolean {
    return this.letrasIntentadas.has(letra.toUpperCase());
  }
  perdio(): boolean {
    return this.vidas === 0;
  }
  gano(): boolean {
    return this.primeraLetraOculta() === undefined;
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

  pedirPista(): void {
    const oculta = this.primeraLetraOculta();
    if (oculta) this.letrasAdivinadas.add(oculta);
  }

  puntaje(): number {
    return this.gano() ? this.vidas * 10 : 0;
  }

  private primeraLetraOculta(): string | undefined {
    return this.palabra.split("").find((letra) => !this.letrasAdivinadas.has(letra));
  }
}
