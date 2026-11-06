import { Ahorcado } from "../domain/Ahorcado";
import { elegirPalabra } from "../domain/palabras";
import { mountApp } from "./main";

const params = new URLSearchParams(window.location.search);
const word = params.get("word");
const lives = params.get("lives");
const elegida = word === null ? elegirPalabra(params.get("category")) : { categoria: undefined, palabra: word };

const root = document.getElementById("app");
if (root) {
  mountApp(root, new Ahorcado(elegida.palabra, lives === null ? undefined : Number(lives)), elegida.categoria);
};