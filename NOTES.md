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
| HU-04    | CA-7 Entrada inválida (no letra) → no penaliza e informa `"Ingresá una sola letra"` | ✅ Done | `@CA-7` | "rechaza un carácter que no es letra sin descontar vidas", "rechaza una entrada de más de una letra"                                                                          |
| HU-03    | CA-8 Seguir intentando sin vidas → no hay vidas negativas (quedan en 0)        | ✅ Done      | `@CA-8` | "no descuenta vidas por debajo de 0 si se sigue adivinando tras perder", "no descuenta vidas si se intenta adivinar una letra ausente tras haber ganado"                      |

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
AT: [`features/desenlace-partida.feature`](features/desenlace-partida.feature) — CA-4, CA-5, CA-8.

### HU-04 — Validación de entrada · ✅ Done

**Como** jugador **quiero** que el sistema valide mis ingresos de teclado **para** no perder vidas por
errores o por letras que ya intenté.
AT: [`features/letra-repetida.feature`](features/letra-repetida.feature) — CA-6, CA-7.

## Proceso y rotación de autoría

- La identidad de git se configura **local al repo** (no `--global`), cambiando `user.name`/`user.email`
  según quién está al teclado en cada test.
- Integrantes activos:
  - Manuel Bacolla — `manubacolla@hotmail.com`
  - Nicolás Piccoli — `nicopiccoli07@gmail.com`
  - Diaz Iñaki — `inakidiaz2808@gmail.com`
  - Joaquin Zubiri-PC — `joaquinzubiri00@gmail.com`
- Rotación: los integrantes van rotando turnos en los ciclos de AT y UT (respetando el piso de ≥3 commits `RED:` propios por persona a lo largo del proyecto).
- Convención de commits (según Guía ATDD §3):
  - `RED:` (test en rojo) / `GREEN:` (código mínimo que lo pasa) / `REFACTOR:` (opcional).
  - **Hacer todos los commits localmente (`RED:` y `GREEN:`), pero hacer `git push` recién cuando el AT cierre en `GREEN:`** (nunca pushear con un `RED:` o con el AT todavía roto como tope de `main`, para no romper el pipeline de CI).

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
