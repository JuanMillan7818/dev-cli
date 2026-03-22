import { getThemeOptions } from "../ui/theme.js";
import { startMatrix } from "../ui/matrix.js";
import ora from "ora";
import { printStaticAscii } from "../ui/ascii.js";

export const matrixMode = async () => {
  const theme = getThemeOptions();
  const spinner = ora(
    theme.success("Iniciando Matrix... (Presiona 'q' o ESC para salir)"),
  ).start();

  await new Promise((r) => setTimeout(r, 1500));
  spinner.stop(); // Evita que se quede atascado antes de los clear-screen

  await startMatrix();

  spinner.succeed(theme.success("\n> La Matrix ha sido desconectada."));
  spinner.info("Bienvenido de vuelta a la realidad.");
};

export const coffeeBreak = async () => {
  const theme = getThemeOptions();
  const spinner = ora(theme.info("☕ Preparando café...")).start();
  printStaticAscii("coffe.txt", "primary");

  await new Promise((r) => setTimeout(r, 2000));
  spinner.stop();
  spinner.succeed(theme.success("¡Listo!, sigue programando 🚀"));
};
