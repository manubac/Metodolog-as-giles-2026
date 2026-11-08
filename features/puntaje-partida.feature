# language: es
@HU-07
Característica: Puntaje de la partida
  Como jugador
  quiero ver el puntaje de mi partida
  para saber qué tan bien jugué

  @CA-15
  Escenario: La partida arranca con puntaje 0
    Dado una partida con la palabra "GATO"
    Entonces se ve el puntaje 0

  @CA-16
  Escenario: Ganar sin errores da 10 puntos por cada vida
    Dado una partida con la palabra "GATO"
    Cuando el jugador adivina la letra "G"
    Y el jugador adivina la letra "A"
    Y el jugador adivina la letra "T"
    Y el jugador adivina la letra "O"
    Entonces se ve el mensaje "GANASTE"
    Y se ve el puntaje 60

  @CA-16
  Escenario: Ganar con errores da 10 puntos por cada vida que quedó
    Dado una partida con la palabra "GATO"
    Cuando el jugador adivina la letra "E"
    Y el jugador adivina la letra "I"
    Y el jugador adivina la letra "G"
    Y el jugador adivina la letra "A"
    Y el jugador adivina la letra "T"
    Y el jugador adivina la letra "O"
    Entonces se ve el mensaje "GANASTE"
    Y se ve el puntaje 40

  @CA-17
  Escenario: Perder la partida deja el puntaje en 0
    Dado una partida con la palabra "GATO"
    Cuando el jugador adivina la letra "G"
    Y el jugador adivina la letra "E"
    Y el jugador adivina la letra "I"
    Y el jugador adivina la letra "U"
    Y el jugador adivina la letra "R"
    Y el jugador adivina la letra "S"
    Y el jugador adivina la letra "N"
    Entonces se ve el mensaje "PERDISTE"
    Y se ve el puntaje 0 