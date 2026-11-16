export function createHangmanFigure(): {
  element: HTMLElement;
  update: (errores: number) => void;
} {
  const container = document.createElement("div");
  container.className = "hangman-visual-container";

  container.innerHTML = `
    <svg viewBox="0 0 240 260" class="hangman-svg" aria-label="Dibujo del Ahorcado">
      <!-- Horca (Gallows) -->
      <!-- Pata diagonal izquierda -->
      <line x1="25" y1="230" x2="65" y2="175" class="hangman-beam" />
      <!-- Pata diagonal derecha -->
      <line x1="105" y1="230" x2="65" y2="175" class="hangman-beam" />
      <!-- Poste vertical -->
      <line x1="65" y1="175" x2="65" y2="35" class="hangman-beam" />
      <!-- Viga superior horizontal -->
      <line x1="65" y1="35" x2="160" y2="35" class="hangman-beam" />
      <!-- Cuerda / gancho vertical -->
      <line x1="160" y1="35" x2="160" y2="65" class="hangman-beam" />

      <!-- Piezas del muñeco (se muestran según errores) -->
      <!-- 1: Cabeza -->
      <circle id="part-head" cx="160" cy="85" r="20" class="hangman-part hangman-head" />
      <!-- 2: Torso -->
      <line id="part-torso" x1="160" y1="105" x2="160" y2="155" class="hangman-part" />
      <!-- 3: Brazo derecho (perspectiva del espectador) -->
      <line id="part-arm-right" x1="160" y1="125" x2="185" y2="145" class="hangman-part" />
      <!-- 4: Brazo izquierdo (perspectiva del espectador) -->
      <line id="part-arm-left" x1="160" y1="125" x2="135" y2="145" class="hangman-part" />
      <!-- 5: Pierna izquierda (perspectiva del espectador) -->
      <line id="part-leg-left" x1="160" y1="155" x2="140" y2="195" class="hangman-part" />
      <!-- 6: Pierna derecha (perspectiva del espectador) -->
      <line id="part-leg-right" x1="160" y1="155" x2="180" y2="195" class="hangman-part" />
    </svg>
  `;

  const parts = [
    container.querySelector("#part-head") as SVGElement,
    container.querySelector("#part-torso") as SVGElement,
    container.querySelector("#part-arm-right") as SVGElement,
    container.querySelector("#part-arm-left") as SVGElement,
    container.querySelector("#part-leg-left") as SVGElement,
    container.querySelector("#part-leg-right") as SVGElement,
  ];

  function update(errores: number): void {
    const etapasVisibles = Math.max(0, Math.min(6, errores));
    parts.forEach((part, index) => {
      if (part) {
        part.style.display = index < etapasVisibles ? "block" : "none";
      }
    });
  }

  // Inicialmente ocultas todas las partes del cuerpo
  update(0);

  return { element: container, update };
}
