# language: es
@HU-04
Característica: Validación de entrada
  Como jugador
  quiero que el sistema valide mis ingresos de teclado
  para no perder vidas por errores o por letras que ya intenté

  @CA-6
  Esquema del escenario: Repetir una letra no penaliza e informa
    Dado una partida con la palabra "<palabra>"
    Cuando el jugador adivina la letra "<letra>"
    Y el jugador adivina la letra "<letra>"
    Entonces se ve la palabra "<enmascarada>"
    Y se ven <vidas> vidas
    Y se ve el mensaje "Ya intentaste la letra <letra>"

    Ejemplos:
      | palabra | letra | enmascarada | vidas |
      | GATO    | E     | _ _ _ _     | 5     |
      | GATO    | A     | _ A _ _     | 6     |
      | PERRO   | R     | _ _ R R _   | 6     |

 @CA-7
  Esquema del escenario: Una entrada que no es una letra se rechaza sin penalizar
    Dado una partida con la palabra "GATO"
    Cuando el jugador adivina la letra "<entrada>"
    Entonces se ve el mensaje "Ingresá una sola letra"
    Y se ven 6 vidas
    Y se ve la palabra "_ _ _ _"

    Ejemplos:
      | entrada |
      | 1       |
      | ?       |
      | AB      |
      |         |

  @CA-9
  Esquema del escenario: Una letra en minúscula se trata como su mayúscula
    Dado una partida con la palabra "GATO"
    Cuando el jugador adivina la letra "<letra>"
    Entonces se ve la palabra "<enmascarada>"
    Y se ven <vidas> vidas

    Ejemplos:
      | letra | enmascarada | vidas |
      | a     | _ A _ _     | 6     |
      | o     | _ _ _ O     | 6     |

  @CA-9
  Escenario: Repetir una letra con distinta capitalización no penaliza e informa
    Dado una partida con la palabra "GATO"
    Cuando el jugador adivina la letra "E"
    Y el jugador adivina la letra "e"
    Entonces se ve la palabra "_ _ _ _"
    Y se ven 5 vidas
    Y se ve el mensaje "Ya intentaste la letra E"