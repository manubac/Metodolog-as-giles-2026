# language: es
@HU-JUG-01
Característica: Completar palabra
  Como jugador
  quiero iniciar el juego visualizando la palabra oculta y las vidas
  para poder comenzar a adivinar letras

  @CA-1
  Escenario: Iniciar partida
    Dado una partida con la palabra "GATO"
    Entonces se ve la palabra "_ _ _ _"
    Y se ven 6 vidas

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
