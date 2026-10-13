# language: es
@HU-01
Característica: Inicio de partida
  Como jugador
  quiero iniciar el juego visualizando la palabra oculta y las vidas iniciales
  para poder comenzar a adivinar letras

  @CA-1
  Escenario: Iniciar partida
    Dado una partida con la palabra "GATO"
    Entonces se ve la palabra "_ _ _ _"
    Y se ven 6 vidas
