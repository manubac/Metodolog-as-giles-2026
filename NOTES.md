# Notas del proyecto — Ahorcado

## Alcance

El [Story Map](https://drive.google.com/file/d/1PYRT9SoFQSe_cJJjBrpAronQfxIzxui8/view) completo incluye
actividades (registrar usuario, ver puntaje persistente, publicar en redes) que requieren backend y base
de datos. La Guía ATDD del TP es explícita: **todo en memoria, en TypeScript, sin REST ni DB**. Por eso el
alcance de esta entrega se recorta a la actividad **"jugar"**, empezando por `HU-JUG-01`. El resto del mapa
queda documentado como visión de producto, fuera del alcance evaluado.

## Trazabilidad: Historia → Criterios de Aceptación → AT → UT

Mecanismo elegido: **una `Característica` por historia**, con el tag `@HU-nn` en la Característica (lo
heredan todos sus escenarios) y un tag `@CA-n` por escenario, más esta matriz.

| Historia | Criterio                                                | Estado       | AT      | UTs                                                                                                                                                                           |
| -------- | ------------------------------------------------------- | ------------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| HU-01    | CA-1 Iniciar con "GATO" → `_ _ _ _` y 6 vidas           | ✅ Done      | `@CA-1` | "se inicializa con la palabra enmascarada...", "arranca con 6 vidas"                                                                                                          |
| HU-02    | CA-2 Acertar letra → se revela sin perder vidas         | ✅ Done      | `@CA-2` | "revela la letra adivinada cuando está presente..." (el "no pierde vidas" lo cubren el AT + el UT de CA-1 "arranca con 6 vidas", ya que el camino de acierto nunca descuenta) |
| HU-02    | CA-3 Fallar letra → pierde una vida                     | ✅ Done      | `@CA-3` | "descuenta una vida al adivinar una letra ausente" (quedó verde sin commit de UI propio: el cableado genérico de CA-2 ya alcanzaba)                                           |
| HU-03    | CA-4 Completar todas las letras → "GANASTE"             | ✅ Done      | `@CA-4` | "gana la partida cuando se revelan todas las letras"                                                                                                                          |
| HU-03    | CA-5 Agotar las 6 vidas → "PERDISTE" + palabra revelada | ✅ Done      | `@CA-5` | "pierde la partida cuando se agotan las vidas", "al perder, revela la palabra completa"                                                                                       |
| HU-04    | CA-6 Letra repetida → no penaliza, informa              | ⬜ Pendiente | —       | —                                                                                                                                                                             |
| HU-04    | CA-7 Entrada inválida / partida terminada → no rompe    | ⬜ Pendiente | —       | —                                                                                                                                                                             |

### HU-01 — Inicio de partida · ✅ Done

**Como** jugador **quiero** iniciar el juego visualizando la palabra oculta y las vidas iniciales **para**
poder comenzar a adivinar letras.
AT: [`features/inicio-partida.feature`](features/inicio-partida.feature) — CA-1.

### HU-02 — Jugabilidad y gestión de intentos · ✅ Done

**Como** jugador **quiero** adivinar letras intentando adivinar la palabra secreta **para** ir descubriendo
las letras ocultas o arriesgar mis vidas si fallo.
AT: [`features/adivinar-letras.feature`](features/adivinar-letras.feature) — CA-2, CA-3.

### HU-03 — Desenlace de la partida · ✅ Done

**Como** jugador **quiero** que el sistema detecte si completé la palabra o me quedé sin vidas **para** saber
si gané o perdí la partida.
AT: [`features/desenlace-partida.feature`](features/desenlace-partida.feature) — CA-4, CA-5.

### HU-04 — Validación de entrada · ⬜ Pendiente (borrador)

**Como** jugador **quiero** que el sistema valide mis ingresos de teclado **para** evitar penalizaciones por
errores o letras ya intentadas.
Antes de abrir su `.feature`: CA-7 mezcla dos comportamientos (entrada inválida / partida terminada) y hay
que partirlo, y a cada criterio le falta un ejemplo concreto con el texto exacto que se ve.

## Proceso y rotación de autoría

- La identidad de git se configura **local al repo** (no `--global`), cambiando `user.name`/`user.email`
  según quién está al teclado en cada test.
- Integrantes activos:
  - Manuel Bacolla — `manubacolla@hotmail.com`
  - Nicolás Piccoli — `nicopiccoli07@gmail.com`
  - Iñaki Diaz — `inakidiaz2808@gmail.com`
  - Joaquin Zubiri — `joaquinzubiri00@gmail.com`
- Patrón usado hasta ahora: el AT (loop externo) lo abre Manuel, los UTs de dominio (loop interno) los abre
  Nicolás. Se puede/debe variar a medida que se sumen más integrantes — el piso es ≥3 commits `RED:`
  propios por persona, repartidos a lo largo del proyecto, no todos juntos al final.
- Convención de commits: `RED:` (test en rojo) / `GREEN:` (código mínimo que lo pasa) / `REFACTOR:`
  (opcional). Se pushea **solo cuando el tope de la rama está en verde** — nunca se deja un `RED:` como
  último commit en `origin/main`.

## Cómo retomar en otra sesión o máquina

```bash
git pull
npm install
npx playwright install chromium
git config user.name "Nombre Apellido"
git config user.email "email@..."
npm test      # unit tests del dominio
npm run at    # acceptance tests (levanta la app y corre Playwright)
```

**Próximo paso:** pipeline de CI (GitHub Actions): build + unit tests + coverage ≥90% sobre `src/domain/`
que corte. Después, refinar HU-04 (criterios con ejemplos) y arrancar CA-6 siguiendo el ciclo de la Guía
ATDD (§5).
