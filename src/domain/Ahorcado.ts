export class Ahorcado {
  private readonly palabra: string;
  private readonly vidas: number = 6;

  constructor(palabra: string) {
    this.palabra = palabra;
  }

  palabraEnmascarada(): string {
    return this.palabra
      .split("")
      .map(() => "_")
      .join(" ");
  }

  vidasRestantes(): number {
    return this.vidas;
  }
}
