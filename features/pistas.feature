# language: es
@HU-08
Característica: Pistas
  Como jugador
  quiero pedir una pista a cambio de una vida
  para destrabarme cuando no se me ocurre ninguna letra

  @CA-18
  Esquema del escenario: Pedir una pista revela una letra y descuenta una vida
    Dado una partida con la palabra "GATO" y <vidas> vidas
    Cuando el jugador pide una pista
    Entonces se ve la palabra "G _ _ _"
    Y se ven <restantes> vidas

    Ejemplos:
      | vidas | restantes |
      | 6     | 5         |
      | 3     | 2         |


  @CA-19
  Escenario: No se puede pedir una pista con una sola vida
    Dado una partida con la palabra "GATO" y 1 vidas
    Cuando el jugador pide una pista
    Entonces se ve el mensaje "No te quedan vidas para pedir una pista"
    Y se ven 1 vidas
    Y se ve la palabra "_ _ _ _"


  @CA-20
  Escenario: Pedir una pista tras ganar no descuenta vidas
    Dado una partida con la palabra "GATO"
    Cuando el jugador adivina la letra "G"
    Y el jugador adivina la letra "A"
    Y el jugador adivina la letra "T"
    Y el jugador adivina la letra "O"
    Y el jugador pide una pista
    Entonces se ven 6 vidas
    Y se ve el mensaje "GANASTE"

  @CA-20
  Escenario: Pedir una pista tras perder no descuenta vidas
    Dado una partida con la palabra "GATO" y 1 vidas
    Cuando el jugador adivina la letra "E"
    Y el jugador pide una pista
    Entonces se ven 0 vidas
    Y se ve el mensaje "PERDISTE"
    Y se ve la palabra "G A T O"


  @CA-23
  Escenario: La pista no revela la última letra oculta
    Dado una partida con la palabra "GATO"
    Cuando el jugador adivina la letra "G"
    Y el jugador adivina la letra "A"
    Y el jugador adivina la letra "T"
    Y el jugador pide una pista
    Entonces se ve el mensaje "La última letra la tenés que adivinar vos"
    Y se ve la palabra "G A T _"
    Y se ven 6 vidas
