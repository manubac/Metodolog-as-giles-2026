# Notas del proyecto — Ahorcado

## Alcance

El [Story Map](https://drive.google.com/file/d/1PYRT9SoFQSe_cJJjBrpAronQfxIzxui8/view) completo incluye
actividades (registrar usuario, ver puntaje persistente, publicar en redes) que requieren backend y base
de datos. La Guía ATDD del TP es explícita: **todo en memoria, en TypeScript, sin REST ni DB**. Por eso el
alcance de esta entrega se recorta a la actividad **"jugar"**, empezando por `HU-JUG-01`. El resto del mapa
queda documentado como visión de producto, fuera del alcance evaluado.

## Trazabilidad: Historia → Criterios de Aceptación → AT → UT

### HU-JUG-01 — completar palabra
**Como** jugador **quiero** iniciar el juego visualizando la palabra oculta y las vidas **para** poder
comenzar a adivinar letras.

AT: [`features/completar-palabra.feature`](features/completar-palabra.feature)

| CA | Criterio | Estado | AT | UTs |
|----|----------|--------|----|----|
| CA-1 | Iniciar con palabra "GATO" → `_ _ _ _` y 6 vidas | ✅ Done | `@CA-1` | "se inicializa con la palabra enmascarada...", "arranca con 6 vidas" |
| CA-2 | Acertar letra → se revela sin perder vidas | ✅ Done | `@CA-2` | "revela la letra adivinada cuando está presente..." (el "no pierde vidas" lo cubren el AT + el UT de CA-1 "arranca con 6 vidas", ya que el camino de acierto nunca descuenta) |
| CA-3 | Fallar letra → pierde una vida | ✅ Done | `@CA-3` | "descuenta una vida al adivinar una letra ausente" (quedó verde sin commit de UI propio: el cableado genérico de CA-2 ya alcanzaba) |
| CA-4 | Completar todas las letras → "GANASTE" | ✅ Done | `@CA-4` | "gana la partida cuando se revelan todas las letras" |
| CA-5 | Agotar las 6 vidas → "PERDISTE" + palabra revelada | ⬜ Pendiente | — | — |
| CA-6 | Letra repetida → no penaliza, informa | ⬜ Pendiente | — | — |
| CA-7 | Entrada inválida / partida terminada → no rompe | ⬜ Pendiente | — | — |

Mecanismo de trazabilidad elegido: tag `@HU-JUG-01` en la Característica (heredado por todos sus
escenarios) + tag `@CA-n` por escenario, más esta tabla.

## Proceso y rotación de autoría

- La identidad de git se configura **local al repo** (no `--global`), cambiando `user.name`/`user.email`
  según quién está al teclado en cada test.
- Integrantes activos:
  - Manuel Bacolla — `manubacolla@hotmail.com`
  - Nicolás Piccoli — `nicopiccoli07@gmail.com`
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

**Próximo paso:** CA-5 — Perder. Criterio: dado que el jugador agota las 6 vidas sin completar la palabra,
se muestra "PERDISTE" junto con la palabra revelada. Seguir el ciclo de la Guía ATDD (§5): AT en rojo →
enumerar UTs → loop interno → cablear UI → mirar la app funcionando → commit.
