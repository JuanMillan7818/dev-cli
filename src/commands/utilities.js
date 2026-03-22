import fs from "fs";
import path from "path";
import { select, input } from "@inquirer/prompts";
import ora from "ora";
import { convertJsonToXml, convertXmlToJson } from "../services/converter.js";
import { getThemeOptions, inquirerSpanishTheme } from "../ui/theme.js";
import { printDynamicAscii } from "../ui/ascii.js";

export const utilitiesMenu = async () => {
  const theme = getThemeOptions();
  console.log(theme.title("\n--- 🧰 Utilidades ---\n"));

  while (true) {
    const action = await select({
      message: "¿Qué utilidad deseas usar?",
      choices: [
        { name: "Conversión JSON ↔ XML", value: "Conversión JSON ↔ XML" },
        { name: "Generar texto ASCII", value: "Generar texto ASCII" },
        { name: "Volver al menú principal", value: "Volver" },
      ],
      theme: inquirerSpanishTheme,
    });

    if (action === "Volver") return "volver";

    if (action === "Generar texto ASCII") {
      const asciiText = await input({
        message: "Escribe el texto a convertir:",
        theme: inquirerSpanishTheme,
      });

      if (asciiText.trim() !== "") {
        console.log("\n");
        printDynamicAscii(asciiText);
        console.log("\n");
      }
      continue;
    }

    if (action === "Conversión JSON ↔ XML") {
      const convType = await select({
        message: "Tipo de conversión:",
        choices: [
          { name: "JSON → XML", value: "JSON → XML" },
          { name: "XML → JSON", value: "XML → JSON" },
          { name: "Volver atrás", value: "Volver" },
        ],
        theme: inquirerSpanishTheme,
      });

      if (convType === "Volver") continue;

      const filePath = await input({
        message: "Ruta del archivo (absoluta o relativa):",
        theme: inquirerSpanishTheme,
      });

      const absolutePath = path.resolve(process.cwd(), filePath);

      if (!fs.existsSync(absolutePath)) {
        console.log(theme.error(`El archivo no existe: ${absolutePath}`));
        continue;
      }

      const outDir = path.join(process.cwd(), "conversions");
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
      }

      const ext = path.extname(absolutePath);
      const basename = path.basename(absolutePath, ext);

      const spinner = ora({ text: "Convirtiendo...", color: "cyan" }).start();

      // Delay para simular procesamiento
      await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        if (convType === "JSON → XML") {
          const outPath = path.join(outDir, `${basename}.xml`);
          convertJsonToXml(absolutePath, outPath);
          spinner.succeed(
            theme.success(`Convertido exitosamente. Guardado en: ${outPath}`),
          );
        } else {
          const outPath = path.join(outDir, `${basename}.json`);
          await convertXmlToJson(absolutePath, outPath);
          spinner.succeed(
            theme.success(`Convertido exitosamente. Guardado en: ${outPath}`),
          );
        }
      } catch (e) {
        spinner.fail(
          theme.error(
            "Fallo en la conversión. Verifica el formato del archivo.",
          ),
        );
        console.log(theme.error(e.message));
      }
    }
  }
};
