import type { Ahorcado } from "../domain/Ahorcado";

export function mountApp(root: HTMLElement, juego: Ahorcado): void {
  const word = document.createElement("p");
  word.dataset.testid = "word";

  const lives = document.createElement("p");
  lives.dataset.testid = "lives";

  const mensaje = document.createElement("p");
  mensaje.dataset.testid = "mensaje";

  const input = document.createElement("input");
  input.type = "text";

  function render(): void {
    word.textContent = juego.palabraEnmascarada();
    lives.textContent = String(juego.vidasRestantes());
    if (juego.gano()) {
      mensaje.textContent = "GANASTE";
    } else if (juego.perdio()) {
      mensaje.textContent = "PERDISTE";
    } else {
      mensaje.textContent = "";
    }
  }

  input.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    juego.adivinar(input.value);
    input.value = "";
    render();
  });

  render();
  root.append(word, lives, mensaje, input);
}
