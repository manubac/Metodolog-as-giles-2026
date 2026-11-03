import { Ahorcado } from "../domain/Ahorcado";
import { mountApp } from "./main";

const params = new URLSearchParams(window.location.search);
const palabra = params.get("word") ?? "GATO";
const lives = params.get("lives");

const root = document.getElementById("app");
if (root) {
  mountApp(root, new Ahorcado(palabra, lives === null ? undefined : Number(lives)));
}
