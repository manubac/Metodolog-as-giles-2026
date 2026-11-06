# language: es
@HU-09
Característica: Categoría de la palabra
  Como jugador
  quiero que la palabra secreta salga de una categoría
  para tener una pista sobre qué palabra estoy adivinando

  @CA-21
  Esquema del escenario: Iniciar con una categoría muestra la categoría y una palabra de ella
    Dado una partida de la categoría "<categoría>"
    Entonces se ve la categoría "<categoría>"
    Y se ve la palabra "<enmascarada>"

    Ejemplos:
      | categoría | enmascarada   |
      | animales  | _ _ _ _       |
      | frutas    | _ _ _ _ _ _ _ |

  @CA-22
  Escenario: Una categoría inexistente se ignora y se juega con una palabra de cualquier categoría
    Dado una partida de la categoría "inexistente"
    Entonces se ve la categoría "animales"
    Y se ve la palabra "_ _ _ _"