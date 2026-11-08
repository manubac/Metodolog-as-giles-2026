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

| Historia | Criterio                                                                                                             | Estado  | AT                      | UTs                                                                                                                                                                                                                                       |
| -------- | -------------------------------------------------------------------------------------------------------------------- | ------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| HU-01    | CA-1 Iniciar con "GATO" → `_ _ _ _` y 6 vidas                                                                        | ✅ Done | `@CA-1`                 | "se inicializa con la palabra enmascarada...", "arranca con 6 vidas"                                                                                                                                                                      |
| HU-02    | CA-2 Acertar letra → se revela sin perder vidas                                                                      | ✅ Done | `@CA-2`                 | "revela la letra adivinada cuando está presente..." (el "no pierde vidas" lo cubren el AT + el UT de CA-1 "arranca con 6 vidas", ya que el camino de acierto nunca descuenta)                                                             |
| HU-02    | CA-3 Fallar letra → pierde una vida                                                                                  | ✅ Done | `@CA-3`                 | "descuenta una vida al adivinar una letra ausente" (quedó verde sin commit de UI propio: el cableado genérico de CA-2 ya alcanzaba)                                                                                                       |
| HU-03    | CA-4 Completar todas las letras → "GANASTE"                                                                          | ✅ Done | `@CA-4`                 | "gana la partida cuando se revelan todas las letras"                                                                                                                                                                                      |
| HU-03    | CA-5 Agotar las 6 vidas → "PERDISTE" + palabra revelada                                                              | ✅ Done | `@CA-5`                 | "pierde la partida cuando se agotan las vidas", "al perder, revela la palabra completa"                                                                                                                                                   |
| HU-04    | CA-6 Letra repetida → no penaliza e informa `"Ya intentaste la letra <letra>"`                                       | ✅ Done | `@CA-6`                 | "no descuenta otra vida al repetir una letra fallada", "indica si una letra ya fue intentada"                                                                                                                                             |
| HU-04    | CA-7 Entrada inválida (no letra) → no penaliza e informa `"Ingresá una sola letra"`                                  | ✅ Done | `@CA-7`                 | "rechaza un carácter que no es letra sin descontar vidas", "rechaza una entrada de más de una letra"                                                                                                                                      |
| HU-03    | CA-8 Seguir intentando con la partida terminada (perdida o ganada) → no cambian las vidas ni el estado               | ✅ Done | `@CA-8` (2 escenarios)  | "no descuenta vidas por debajo de 0 si se sigue adivinando tras perder", "no descuenta vidas si se intenta adivinar una letra ausente tras haber ganado" (este último se escribió antes que su AT: ver "Lecciones y desvíos del proceso") |
| HU-04    | CA-9 Letra en minúscula → se trata como su mayúscula (también al detectar repetidas)                                 | ✅ Done | `@CA-9` (2 escenarios)  | "trata una letra minúscula como su mayúscula", "reconoce como ya intentada una letra sin importar mayúsculas o minúsculas"                                                                                                                |
| HU-05    | CA-11 Iniciar con `?lives=N` → se ven N vidas (ejemplos: 8 y 3; sin `lives` quedan 6)                                | ✅ Done | `@CA-11`                | "arranca con la cantidad de vidas indicada"                                                                                                                                                                                               |
| HU-05    | CA-12 Valor inválido de `lives` (no es entero o es menor que 1; ejemplos: `0`, `abc`, `2.5`) → se usan 6 vidas       | ✅ Done | `@CA-12`                | "un valor de vidas menor que 1 usa 6 vidas", "un valor de vidas que no es un número usa 6 vidas", "un valor de vidas no entero usa 6 vidas"                                                                                               |
| HU-07    | CA-15 Iniciar partida → se ve el puntaje 0                                                                           | ✅ Done | `@CA-15`                | "arranca con puntaje 0"                                                                                                                                                                                                                   |
| HU-07    | CA-16 Ganar → 10 puntos por cada vida restante (sin errores: 60; con 2 errores: 40)                                  | ✅ Done | `@CA-16` (2 escenarios) | "al ganar sin errores el puntaje es 10 por cada vida", "al ganar con errores el puntaje es 10 por cada vida que quedó"                                                                                                                    |
| HU-07    | CA-17 Perder → el puntaje queda en 0                                                                                 | ✅ Done | `@CA-17`                | "al perder la partida el puntaje es 0"                                                                                                                                                                                                    |
| HU-08    | CA-18 Pedir pista → revela la primera letra oculta (todas sus apariciones) y descuenta 1 vida (ejemplos: 6→5, 3→2)   | ✅ Done | `@CA-18`                | "pedir pista revela la primera letra oculta", "la pista revela la primera letra que sigue oculta, salteando las ya reveladas", "pedir pista descuenta una vida"                                                                           |
| HU-08    | CA-19 Pedir pista con 1 vida → no se da e informa `"No te quedan vidas para pedir una pista"`                        | ✅ Done | `@CA-19`                | "no da pista si queda una sola vida"                                                                                                                                                                                                      |
| HU-08    | CA-20 Pedir pista con la partida terminada (ganada o perdida) → no cambian las vidas ni el estado                    | ✅ Done | `@CA-20` (2 escenarios) | "no descuenta vidas al pedir pista tras ganar", "no descuenta vidas al pedir pista tras perder"                                                                                                                                           |
| HU-09    | CA-21 Iniciar con `?category=X` → se ve la categoría y la palabra sale de esa categoría (ejemplos: animales, frutas) | ✅ Done | `@CA-21`                | "elige la primera palabra de la categoría cuando el azar da 0", "elige la última palabra de la categoría cuando el azar se acerca a 1"                                                                                                    |
| HU-09    | CA-22 Categoría inexistente (o sin categoría ni `word`) → se elige al azar entre todas las categorías                | ✅ Done | `@CA-22`                | "con una categoría inexistente elige al azar entre todas las categorías", "sin categoría elige al azar entre todas las categorías"                                                                                                        |
| HU-08    | CA-23 Pedir pista con una sola letra oculta → no se da e informa `"La última letra la tenés que adivinar vos"`       | ✅ Done | `@CA-23`                | "no da pista si queda una sola letra oculta"                                                                                                                                                                                              |

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
AT: [`features/letra-repetida.feature`](features/letra-repetida.feature) — CA-6, CA-7, CA-9.

### HU-05 — Vidas configurables · ✅ Done

**Como** jugador **quiero** empezar la partida con una cantidad de vidas distinta de 6 **para** hacerla más
fácil o más exigente según cómo quiera jugar.
AT: [`features/vidas-configurables.feature`](features/vidas-configurables.feature) — CA-11, CA-12.
Seam: `?lives=N` en la URL, igual que `?word=`. `index.ts` solo lee y convierte el parámetro; el valor por
defecto (6) vive en `Ahorcado`, igual que la validación de valores inválidos (CA-12).

### HU-07 — Puntaje de la partida · ✅ Done

**Como** jugador **quiero** ver el puntaje de mi partida **para** saber qué tan bien jugué.
AT: [`features/puntaje-partida.feature`](features/puntaje-partida.feature) — CA-15, CA-16, CA-17.
Seam: el puntaje se calcula en `Ahorcado.puntaje()`: 10 puntos por cada vida restante si el jugador gana, y 0
si pierde o la partida sigue en curso. `main.ts` solo muestra el resultado. Como cada pista (HU-08) cuesta una
vida, pedir pistas baja el puntaje sin necesidad de una regla extra.

### HU-08 — Pistas · ✅ Done

**Como** jugador **quiero** pedir una pista a cambio de una vida **para** destrabarme cuando no se me ocurre
ninguna letra. En el story map: `HU-JUG-02`.
AT: [`features/pistas.feature`](features/pistas.feature) — CA-18, CA-19, CA-20, CA-23.
CA-23 queda fuera del rango reservado (CA-18 a CA-20) porque CA-21 y CA-22 ya los usó HU-09. Surgió al
probar la app: con pistas ilimitadas se podía ganar sin adivinar ninguna letra. Los GREEN de AT de CA-20 y
CA-23 son commits vacíos porque la UI ya cubría el caso (igual que CA-3).

### HU-09 — Categoría de la palabra · ✅ Done

**Como** jugador **quiero** que la palabra secreta salga de una categoría **para** tener una pista sobre
qué palabra estoy adivinando.
AT: [`features/categoria-palabra.feature`](features/categoria-palabra.feature) — CA-21, CA-22.
Seam: `?category=` en la URL. El azar se inyecta en `elegirPalabra(categoria, random)` (UT con azar
controlado); en el AT se fija `Math.random = () => 0` en el navegador, y por eso el orden de las listas en
`palabras.ts` es parte del contrato. `?word=` sigue ganando sobre `?category=`.

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

## Lecciones y desvíos del proceso

- **CA-8 "tras ganar" sin AT previo.** El UT "no descuenta vidas si se intenta adivinar una letra ausente
  tras haber ganado" y la guarda `|| this.gano()` (`2d76af0` / `218ab51`) se escribieron sin un escenario
  en rojo que los pidiera. El AT se agregó después y ya pasó en verde, por eso se commiteó como `TEST:`
  y no como `RED:`. Lo correcto hubiera sido escribir primero el escenario en rojo y recién ahí el `RED:`
  del UT. **Regla desde ahora: ningún UT sin un AT rojo que lo origine.** Si al programar aparece un caso
  nuevo, primero va el escenario.
- **Fake sin limpiar.** El `/\d/` que quedó del fake de CA-7 era código muerto (la regex `/^[A-Za-z]$/`
  ya rechaza los dígitos con el mismo mensaje). Se sacó en un `REFACTOR:`. **Regla desde ahora: después de
  cada `GREEN:` que generaliza, revisar si quedó algo del fake y limpiarlo en un `REFACTOR:` propio, con los
  tests en verde.**
- **Partida terminada vs. entrada inválida (decisión).** Con la partida terminada (ganada o perdida),
  `adivinar` ignora cualquier entrada, incluso una inválida como `"1"`, sin tirar error. Para el
  jugador no cambia nada, porque la UI muestra GANASTE / PERDISTE de todas formas.
- **Integración.** Usar `git pull --rebase` en vez de merge. El merge `b5e09e2` cambió el orden
  guarda/validación sin que ningún test lo pidiera.

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
