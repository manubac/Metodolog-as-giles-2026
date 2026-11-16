import type { Ahorcado } from "../domain/Ahorcado";
import { createHangmanFigure } from "./hangmanFigure";

export function mountApp(root: HTMLElement, juego: Ahorcado, categoria?: string): void {
  const vidasIniciales = juego.vidasRestantes();

  const card = document.createElement("div");
  card.className = "game-card";

  const header = document.createElement("header");
  header.className = "game-header";

  if (categoria !== undefined) {
    const categoriaEl = document.createElement("span");
    categoriaEl.dataset.testid = "categoria";
    categoriaEl.className = "badge-categoria";
    categoriaEl.textContent = `Categoría: ${categoria}`;
    header.appendChild(categoriaEl);
  }

  const statsGroup = document.createElement("div");
  statsGroup.className = "stats-group";

  const livesItem = document.createElement("div");
  livesItem.className = "stat-item";
  const heartsSpan = document.createElement("span");
  heartsSpan.className = "stat-icon";
  heartsSpan.textContent = "❤️";
  const livesLabel = document.createElement("span");
  livesLabel.textContent = "Vidas: ";
  const lives = document.createElement("span");
  lives.dataset.testid = "lives";
  lives.className = "lives-count";
  livesItem.append(heartsSpan, livesLabel, lives);

  const scoreItem = document.createElement("div");
  scoreItem.className = "stat-item";
  const scoreIcon = document.createElement("span");
  scoreIcon.className = "stat-icon";
  scoreIcon.textContent = "⭐";
  const score = document.createElement("span");
  score.dataset.testid = "score";
  score.className = "score-count";
  scoreItem.append(scoreIcon, score);

  statsGroup.append(livesItem, scoreItem);
  header.appendChild(statsGroup);

  const hangman = createHangmanFigure();

  const wordContainer = document.createElement("div");
  wordContainer.className = "word-container";
  const word = document.createElement("p");
  word.dataset.testid = "word";
  word.className = "word-display";
  wordContainer.appendChild(word);

  const mensaje = document.createElement("p");
  mensaje.dataset.testid = "mensaje";
  mensaje.className = "mensaje-box";

  const inputSection = document.createElement("div");
  inputSection.className = "input-section";

  const inputRow = document.createElement("div");
  inputRow.className = "input-row";

  const input = document.createElement("input");
  input.type = "text";
  input.className = "letter-input";
  input.placeholder = "Ingresá una letra...";
  input.autofocus = true;

  const btnAdivinar = document.createElement("button");
  btnAdivinar.type = "button";
  btnAdivinar.className = "btn-adivinar";
  btnAdivinar.textContent = "Intentar";

  const btnPista = document.createElement("button");
  btnPista.type = "button";
  btnPista.className = "btn-pista";
  btnPista.textContent = "Pista";

  inputRow.append(input, btnAdivinar, btnPista);
  inputSection.appendChild(inputRow);

  const keyboardContainer = document.createElement("div");
  keyboardContainer.className = "keyboard-container";
  const letrasTeclado = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
  const keyButtons = new Map<string, HTMLButtonElement>();

  letrasTeclado.forEach((letra) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "key-button";
    btn.textContent = letra;
    btn.addEventListener("click", () => {
      jugarLetra(letra);
    });
    keyboardContainer.appendChild(btn);
    keyButtons.set(letra, btn);
  });
  inputSection.appendChild(keyboardContainer);

  const restartContainer = document.createElement("div");
  restartContainer.className = "restart-container";
  const btnRestart = document.createElement("button");
  btnRestart.type = "button";
  btnRestart.className = "btn-restart";
  btnRestart.textContent = "🔄 Nueva Partida";
  btnRestart.addEventListener("click", () => {
    window.location.reload();
  });
  restartContainer.appendChild(btnRestart);

  const selectorNivel = crearSelector("Nivel:", [
    ["Fácil", "facil"],
    ["Normal", "normal"],
    ["Difícil", "dificil"],
  ], (nivel) => {
    // Elegir nivel en pantalla descarta ?lives=: si no, por CA-14 las vidas ganarían y el click no haría nada.
    reiniciarCon({ level: nivel, lives: null });
  });

  card.append(
    header,
    hangman.element,
    wordContainer,
    mensaje,
    inputSection,
    selectorNivel,
    restartContainer
  );

  root.replaceChildren(card);

  let aviso = "";

  function render(): void {
    word.textContent = juego.palabraEnmascarada();
    const vidasRestantes = juego.vidasRestantes();
    lives.textContent = String(vidasRestantes);
    score.textContent = `Puntaje: ${juego.puntaje()}`;

    // Cálculo proporcional de errores sobre vidas iniciales
    const errores = vidasIniciales - vidasRestantes;
    let etapaMuñeco = 0;
    if (juego.perdio()) {
      etapaMuñeco = 6;
    } else if (vidasIniciales > 0 && errores > 0) {
      etapaMuñeco = Math.min(5, Math.floor((errores / vidasIniciales) * 6));
    }
    hangman.update(etapaMuñeco);

    mensaje.className = "mensaje-box";
    if (juego.gano()) {
      mensaje.textContent = "GANASTE";
      mensaje.classList.add("mensaje-ganaste");
    } else if (juego.perdio()) {
      mensaje.textContent = "PERDISTE";
      mensaje.classList.add("mensaje-perdiste");
    } else {
      mensaje.textContent = aviso;
      if (aviso) {
        mensaje.classList.add("mensaje-aviso");
      }
    }

    keyButtons.forEach((btn, letra) => {
      if (juego.yaIntentada(letra)) {
        btn.disabled = true;
      } else {
        btn.disabled = false;
      }
    });
  }

  function jugarLetra(letra: string): void {
    aviso = juego.yaIntentada(letra) ? `Ya intentaste la letra ${letra.toUpperCase()}` : "";
    try {
      juego.adivinar(letra);
    } catch (error) {
      aviso = (error as Error).message;
    }
    input.value = "";
    render();
    input.focus();
  }

  input.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    jugarLetra(input.value);
  });

  btnAdivinar.addEventListener("click", () => {
    jugarLetra(input.value);
  });

  btnPista.addEventListener("click", () => {
    aviso = "";
    try {
      juego.pedirPista();
    } catch (error) {
      aviso = (error as Error).message;
    }
    render();
  });

  render();
}

function crearSelector(
  titulo: string,
  opciones: ReadonlyArray<readonly [string, string]>,
  alElegir: (valor: string) => void,
): HTMLElement {
  const contenedor = document.createElement("div");
  contenedor.className = "selector-row";
  const etiqueta = document.createElement("span");
  etiqueta.className = "selector-label";
  etiqueta.textContent = titulo;
  contenedor.appendChild(etiqueta);
  for (const [texto, valor] of opciones) {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "btn-selector";
    boton.textContent = texto;
    boton.addEventListener("click", () => alElegir(valor));
    contenedor.appendChild(boton);
  }
  return contenedor;
}

function reiniciarCon(cambios: Record<string, string | null>): void {
  const params = new URLSearchParams(window.location.search);
  for (const [clave, valor] of Object.entries(cambios)) {
    if (valor === null) params.delete(clave);
    else params.set(clave, valor);
  }
  window.location.search = params.toString();
}
