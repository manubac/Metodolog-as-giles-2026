import type { Ahorcado } from "../domain/Ahorcado";

export function mountApp(root: HTMLElement, juego: Ahorcado): void {
  const word = document.createElement("p");
  word.dataset.testid = "word";
  word.textContent = juego.palabraEnmascarada();

  const lives = document.createElement("p");
  lives.dataset.testid = "lives";
  lives.textContent = String(juego.vidasRestantes());

  root.append(word, lives);
}
