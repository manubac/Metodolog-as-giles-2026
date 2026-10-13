# language: es
@HU-02
Característica: Jugabilidad y gestión de intentos
  Como jugador
  quiero adivinar letras intentando adivinar la palabra secreta
  para ir descubriendo las letras ocultas o arriesgar mis vidas si fallo

  @CA-2
  Escenario: Acertar letra
    Dado una partida con la palabra "GATO"
    Cuando el jugador adivina la letra "A"
    Entonces se ve la palabra "_ A _ _"
    Y se ven 6 vidas

  @CA-3
  Escenario: Fallar letra
    Dado una partida con la palabra "GATO"
    Cuando el jugador adivina la letra "E"
    Entonces se ve la palabra "_ _ _ _"
    Y se ven 5 vidas
