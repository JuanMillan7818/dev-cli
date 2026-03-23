import { input, select, confirm } from "@inquirer/prompts";
import { getConfig, updateConfig } from "../data/config.js";
import { getThemeOptions, inquirerSpanishTheme } from "../ui/theme.js";

export const configMenu = async () => {
  const theme = getThemeOptions();
  const current = getConfig();

  console.log(theme.title("\n--- ⚙️ Configuración ---\n"));

  const username = await input({
    message: "Nombre de usuario:",
    default: current.username,
    theme: inquirerSpanishTheme,
  });

  const themeSetting = await select({
    message: "Tema CLI:",
    choices: [
      { name: "dark", value: "dark" },
      { name: "light", value: "light" },
    ],
    default: current.theme,
    theme: inquirerSpanishTheme,
  });

  // const animations = await confirm({
  //   message: '¿Activar animaciones (loaders)?',
  //   default: current.animations,
  //   theme: inquirerSpanishTheme,
  // });

  const animations = true;

  const primaryColor = await select({
    message: "Color principal:",
    choices: [
      { name: "cyan", value: "cyan" },
      { name: "green", value: "green" },
      { name: "blue", value: "blue" },
      { name: "magenta", value: "magenta" },
      { name: "yellow", value: "yellow" },
      { name: "red", value: "red" },
    ],
    default: current.primaryColor,
    theme: inquirerSpanishTheme,
  });

  updateConfig({ username, theme: themeSetting, animations, primaryColor });
  console.log(theme.success("\nConfiguración guardada exitosamente."));
};
