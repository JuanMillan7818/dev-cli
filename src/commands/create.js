import { select, input, confirm } from "@inquirer/prompts";
import ora from "ora";
import child_process from "child_process";
import { getThemeOptions, inquirerSpanishTheme } from "../ui/theme.js";
import { printDynamicAscii, printStaticAscii } from "../ui/ascii.js";
import { generateProject } from "../services/generator.js";
import path from "path";

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

  let projectSubType = null;
  if (projectType === "React") {
    projectSubType = await select({
      message: "¿Qué lenguaje deseas usar?",
      choices: [
        { name: "TypeScript", value: "TypeScript" },
        { name: "JavaScript", value: "JavaScript" },
      ],
      theme: inquirerSpanishTheme,
    });
  }

  const projectName = await input({
    message: "Nombre del proyecto:",
    default: "mi-proyecto",
    theme: inquirerSpanishTheme,
  });

  console.log("");
  if (projectType === "React") {
    printStaticAscii("react", "primary");
  } else if (projectType === "Express API") {
    printDynamicAscii("EXPRESS", "primary");
  } else if (projectType === "Node CLI") {
    printDynamicAscii("NODE CLI", "primary");
  }
  console.log("");

  const spinner = ora({
    text: `Preparando directorio para ${projectName}...`,
    color: "cyan",
  }).start();

  try {
    // Delay para simular el avance de un paso
    await new Promise((resolve) => setTimeout(resolve, 600));
    spinner.succeed(theme.success("Directorio base preparado."));

    spinner.start(`Generando plantillas de ${projectType}...`);
    await generateProject(projectType, projectSubType, projectName);

    // Retardo visual para la generación
    await new Promise((resolve) => setTimeout(resolve, 600));
    spinner.succeed(theme.success("Archivos de plantilla generados."));

    spinner.start("Configurando entorno...");
    await new Promise((resolve) => setTimeout(resolve, 600));
    spinner.succeed(theme.success("Entorno configurado correctamente."));

    spinner.succeed(
      theme.success(`¡Proyecto ${projectName} creado exitosamente!`),
    );

    console.log("");
    const openVsCode = await confirm({
      message: "🚀 ¿Abrir en VS Code?",
      default: true,
      theme: inquirerSpanishTheme,
    });

    if (openVsCode) {
      const targetDir = path.join("projects", projectName);
      child_process.exec(`code ${targetDir}`);
    }
  } catch (error) {
    console.log(error);
    spinner.fail(theme.error(`Error al crear el proyecto: ${error.message}`));
  }
};
