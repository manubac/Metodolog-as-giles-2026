# language: es
@HU-03
Característica: Desenlace de la partida
  Como jugador
  quiero que el sistema detecte si completé la palabra o me quedé sin vidas
  para saber si gané o perdí la partida

  @CA-4
  Escenario: Ganar la partida
    Dado una partida con la palabra "GATO"
    Cuando el jugador adivina la letra "G"
    Y el jugador adivina la letra "A"
    Y el jugador adivina la letra "T"
    Y el jugador adivina la letra "O"
    Entonces se ve el mensaje "GANASTE"

  @CA-5
  Escenario: Perder la partida
    Dado una partida con la palabra "GATO"
    Cuando el jugador adivina la letra "E"
    Y el jugador adivina la letra "I"
    Y el jugador adivina la letra "U"
    Y el jugador adivina la letra "R"
    Y el jugador adivina la letra "S"
    Y el jugador adivina la letra "N"
    Entonces se ve el mensaje "PERDISTE"
    Y se ve la palabra "G A T O"
