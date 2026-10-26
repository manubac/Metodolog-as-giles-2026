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
| HU-04    | CA-6 Letra repetida → no penaliza e informa `"Ya intentaste la letra <letra>"` | ✅ Done      | `@CA-6` | "no descuenta otra vida al repetir una letra fallada", "indica si una letra ya fue intentada"                                                                                 |
| HU-04    | CA-7 Entrada inválida (no letra) → no penaliza e informa                       | ⬜ Pendiente | —       | —                                                                                                                                                                             |
| HU-03    | CA-8 Intentar jugar con partida terminada → ignora intento (vidas ≥ 0)         | ⬜ Pendiente | —       | —                                                                                                                                                                             |

### HU-01 — Inicio de partida · ✅ Done

**Como** jugador **quiero** iniciar el juego visualizando la palabra oculta y las vidas iniciales **para**
poder comenzar a adivinar letras.
AT: [`features/inicio-partida.feature`](features/inicio-partida.feature) — CA-1.

### HU-02 — Jugabilidad y gestión de intentos · ✅ Done

**Como** jugador **quiero** adivinar letras intentando adivinar la palabra secreta **para** ir descubriendo
las letras ocultas o arriesgar mis vidas si fallo.
AT: [`features/adivinar-letras.feature`](features/adivinar-letras.feature) — CA-2, CA-3.

### HU-03 — Desenlace de la partida · 🔄 En progreso

**Como** jugador **quiero** que el sistema detecte si completé la palabra o me quedé sin vidas **para** saber
si gané o perdí la partida.
AT: [`features/desenlace-partida.feature`](features/desenlace-partida.feature) — CA-4 (✅), CA-5 (✅), CA-8 (⬜ pendiente: ignorar intentos una vez terminada la partida, evitando que las vidas bajen de 0).

### HU-04 — Validación de entrada · 🔄 En progreso

**Como** jugador **quiero** que el sistema valide mis ingresos de teclado **para** no perder vidas por
errores o por letras que ya intenté.
AT: [`features/letra-repetida.feature`](features/letra-repetida.feature) — CA-6 (✅), CA-7 (⬜ pendiente: entrada que no es una letra válida).

## Proceso y rotación de autoría

- La identidad de git se configura **local al repo** (no `--global`), cambiando `user.name`/`user.email`
  según quién está al teclado en cada test.
- Integrantes activos:
  - Manuel Bacolla — `manubacolla@hotmail.com`
  - Nicolás Piccoli — `nicopiccoli07@gmail.com`
  - Diaz Iñaki — `inakidiaz2808@gmail.com`
  - Joaquin Zubiri-PC — `joaquinzubiri00@gmail.com`
- Rotación: el piso es ≥3 commits `RED:` propios por persona (actualmente Joaquín debe tomar los próximos ciclos `RED:` → `GREEN:` para cumplir el piso).
- Convención de commits (según Guía ATDD §3 y feedback de la cátedra):
  - `RED:` (test en rojo) / `GREEN:` (código mínimo que lo pasa) / `REFACTOR:` (opcional).
  - **Hacer todos los commits localmente (`RED:` y `GREEN:`), pero hacer `git push` recién cuando el AT cierre en `GREEN:`** (nunca pushear con un `RED:` o con el AT todavía roto como tope de `main`, para no romper el pipeline de CI; si hace falta subir a mitad de un AT por cambio de máquina/turno, usar una rama y mergear a `main` en verde).

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

**Próximo paso:** completar CA-7 (entrada inválida) y CA-8 (partida terminada / vidas no negativas) con Joaquín al teclado para sumar sus commits `RED:`/`GREEN:`, trabajando en una rama y mergeando a `main` con el AT en verde. Luego, encarar las 4 features de Aprobación Directa (Guía ATDD §9).
