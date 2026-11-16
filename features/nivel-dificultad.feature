# language: es
@HU-06
Característica: Nivel de dificultad
  Como jugador
  quiero elegir la dificultad por nombre (fácil, normal o difícil)
  para jugar a mi medida sin tener que saber cuántas vidas corresponden a cada una

  @CA-13
  Esquema del escenario: El nivel elegido define las vidas iniciales
    Dado una partida con la palabra "GATO" en nivel "<nivel>"
    Entonces se ven <vidas> vidas
    Y se ve la palabra "_ _ _ _"

    Ejemplos:
      | nivel   | vidas |
      | facil   | 8     |
      | normal  | 6     |
      | dificil | 4     |

  @CA-14
  Esquema del escenario: Si se indican vidas y nivel, ganan las vidas
    Dado una partida con la palabra "GATO", <vidas> vidas y nivel "<nivel>"
    Entonces se ven <vidas> vidas
    Y se ve la palabra "_ _ _ _"

    Ejemplos:
      | vidas | nivel   |
      | 3     | facil   |
      | 8     | dificil |

  @CA-24
  Esquema del escenario: Elegir el nivel desde la pantalla reinicia la partida con sus vidas
    Dado una partida con la palabra "GATO"
    Cuando el jugador elige el nivel "<nivel>"
    Entonces se ven <vidas> vidas
    Y se ve la palabra "_ _ _ _"

    Ejemplos:
      | nivel   | vidas |
      | Fácil   | 8     |
      | Difícil | 4     |
