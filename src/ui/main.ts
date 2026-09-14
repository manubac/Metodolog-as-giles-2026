import type { Ahorcado } from "../domain/Ahorcado";

export function mountApp(root: HTMLElement, juego: Ahorcado): void {
  const word = document.createElement("p");
  word.dataset.testid = "word";

  const lives = document.createElement("p");
  lives.dataset.testid = "lives";

  const input = document.createElement("input");
  input.type = "text";

  function render(): void {
    word.textContent = juego.palabraEnmascarada();
    lives.textContent = String(juego.vidasRestantes());
  }

  input.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    juego.adivinar(input.value);
    input.value = "";
    render();
  });

  render();
  root.append(word, lives, input);
}
