import { Ahorcado } from "../domain/Ahorcado";
import { vidasIniciales } from "../domain/niveles";
import { elegirPalabra } from "../domain/palabras";
import { mountApp } from "./main";

const params = new URLSearchParams(window.location.search);
const word = params.get("word");
const lives = params.get("lives");
const level = params.get("level");
const elegida = word === null ? elegirPalabra(params.get("category")) : { categoria: undefined, palabra: word };
const vidas = vidasIniciales(lives === null ? undefined : Number(lives), level);

const root = document.getElementById("app");
if (root) {
  mountApp(root, new Ahorcado(elegida.palabra, vidas), elegida.categoria);
};
