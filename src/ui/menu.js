import { select, confirm, Separator } from "@inquirer/prompts";
import { printStaticAscii, clearScreen } from "./ascii.js";
import { getThemeOptions, inquirerSpanishTheme } from "./theme.js";
import chalk from "chalk";

// Import commands
import { createProject } from "../commands/create.js";
import { notesMenu } from "../commands/notes.js";
import { utilitiesMenu } from "../commands/utilities.js";
import { configMenu } from "../commands/config.js";
import { monitorMenu } from "../commands/monitor.js";
import { getConfig } from "../data/config.js";

export const showMainMenu = async () => {
  const config = getConfig();
  const theme = getThemeOptions();
  try {
    clearScreen();
    console.log("\n");
    printStaticAscii("logo.txt", "primary");

    console.log(
      theme.info(
        `\n¡Hola, ${config.username}! Bienvenido a Dev Assistant CLI.`,
      ),
    );
    console.log(chalk.dim("Desarrollado con ♥ por Juan Pablo Millan\n"));

    const action = await select({
      message: "¿Qué deseas hacer?",
      choices: [
        { name: "Crear proyecto", value: "Crear proyecto" },
        { name: "Monitoreo", value: "Monitoreo" },
        { name: "Notas rápidas", value: "Notas rápidas" },
        { name: "Utilidades", value: "Utilidades" },
        { name: "Configuración", value: "Configuración" },
        new Separator(),
        { name: "🚪 Salir", value: "Salir" },
      ],
      theme: inquirerSpanishTheme,
    });

    let result;
    switch (action) {
      case "Crear proyecto":
        result = await createProject();
        break;
      case "Monitoreo":
        result = await monitorMenu();
        break;
      case "Notas rápidas":
        result = await notesMenu();
        break;
      case "Utilidades":
        result = await utilitiesMenu();
        break;
      case "Configuración":
        result = await configMenu();
        break;
      case "Salir":
        printStaticAscii("sky.txt", "primary");
        process.exit(0);
    }

    if (result === "volver") {
      return showMainMenu();
    }

    // Volver al menú después de ejecutar una acción, a menos que elija salir
    console.log("\n");
    const cont = await confirm({
      message: "¿Deseas volver al menú principal?",
      default: true,
      theme: inquirerSpanishTheme,
    });

    if (cont) {
      await showMainMenu();
    } else {
      printStaticAscii("sky.txt", "primary");
      process.exit(0);
    }
  } catch (error) {
    // console.log(error);
    printStaticAscii("sky.txt", "primary");
    process.exit(0);
  }
};
