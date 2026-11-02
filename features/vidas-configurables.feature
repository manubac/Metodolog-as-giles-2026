# language: es
@HU-05
Característica: Vidas configurables
  Como jugador
  quiero empezar la partida con una cantidad de vidas distinta de 6
  para hacerla más fácil o más exigente según cómo quiera jugar

  @CA-11
  Esquema del escenario: Iniciar con la cantidad de vidas elegida
    Dado una partida con la palabra "GATO" y <vidas> vidas
    Entonces se ve la palabra "_ _ _ _"
    Y se ven <vidas> vidas

    Ejemplos:
      | vidas |
      | 8     |
      | 3     |
