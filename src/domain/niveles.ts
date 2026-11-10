const VIDAS_POR_NIVEL: Readonly<Record<string, number>> = { facil: 8, normal: 6, dificil: 4 };

export function vidasDelNivel(nivel: string): number | undefined {
  return VIDAS_POR_NIVEL[nivel];
}
