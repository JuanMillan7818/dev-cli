import { select, input } from "@inquirer/prompts";
import ora from "ora";
import { getThemeOptions, inquirerSpanishTheme } from "../ui/theme.js";
import { printStaticAscii } from "../ui/ascii.js";

export const createProject = async () => {
  const theme = getThemeOptions();
  console.log(theme.info("\n--- 🛠️ Crear nuevo proyecto ---\n"));

  const projectType = await select({
    message: "¿Qué tipo de proyecto deseas crear?",
    choices: [
      { name: "React", value: "React" },
      { name: "Node CLI", value: "Node CLI" },
      { name: "Express API", value: "Express API" },
      { name: "Volver al menú", value: "Volver" },
    ],
    theme: inquirerSpanishTheme,
  });

  if (projectType === "Volver") return "volver";

  const projectName = await input({
    message: "Nombre del proyecto:",
    default: "mi-proyecto",
    theme: inquirerSpanishTheme,
  });

  const spinner = ora({
    text: `Creando proyecto ${projectName} (${projectType})...`,
    color: "cyan",
  }).start();

  // mock process
  await new Promise((resolve) => setTimeout(resolve, 2000));

  spinner.succeed(
    theme.success(`Proyecto ${projectName} creado exitosamente.`),
  );
  printStaticAscii("success.txt", "success");
};
