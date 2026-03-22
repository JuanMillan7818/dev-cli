#!/usr/bin/env node

import { program } from "commander";
import { showMainMenu } from "../src/ui/menu.js";
import { createProject } from "../src/commands/create.js";
import { configMenu } from "../src/commands/config.js";
import { notesMenu } from "../src/commands/notes.js";
import { utilitiesMenu } from "../src/commands/utilities.js";
import { matrixMode, coffeeBreak } from "../src/commands/easterEggs.js";

// Limpia la consola al inicio de cualquier ejecución para dar efecto "full screen"
console.clear();

program.name("dev-cli").description("Dev Assistant CLI").version("1.0.0");

program
  .command("start")
  .description("Iniciar CLI interactivo")
  .action(async () => {
    await showMainMenu();
  });

program
  .command("create")
  .description("Crear nuevo proyecto")
  .action(async () => {
    await createProject();
  });

program
  .command("monitor")
  .description("Monitoreo del sistema")
  .action(async () => {
    await monitorMenu();
  });

program
  .command("config")
  .description("Configuración del CLI")
  .action(async () => {
    await configMenu();
  });

program
  .command("notes")
  .description("Gestionar notas rápidas")
  .action(async () => {
    await notesMenu();
  });

program
  .command("utilities")
  .description("Utilidades (Conversión JSON/XML)")
  .action(async () => {
    await utilitiesMenu();
  });

program
  .command("matrix")
  .description("Easter egg: Matrix")
  .action(async () => {
    await matrixMode();
  });

program
  .command("coffee")
  .description("Easter egg: Coffee")
  .action(async () => {
    await coffeeBreak();
  });

// default (sin comando)
if (!process.argv.slice(2).length) {
  await showMainMenu();
} else {
  program.parse(process.argv);
}
