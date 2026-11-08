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
