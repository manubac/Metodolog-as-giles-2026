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
