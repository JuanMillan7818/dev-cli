import chalk from "chalk";
import { getConfig } from "../data/config.js";

// Helper to get adjusted colors based on theme
const getAdjustedColors = (isLight) => ({
  cyan: isLight ? chalk.hex("#0d7f7f") : chalk.cyanBright,
  red: isLight ? chalk.hex("#cc0000") : chalk.redBright,
  green: isLight ? chalk.hex("#008000") : chalk.greenBright,
  yellow: isLight ? chalk.hex("#a37a00") : chalk.yellowBright,
  blue: isLight ? chalk.hex("#0044cc") : chalk.blueBright,
  magenta: isLight ? chalk.hex("#800080") : chalk.magentaBright,
});

export const getThemeOptions = () => {
  const config = getConfig();
  const isLight = config.theme === "light";
  const colors = getAdjustedColors(isLight);

  const primary = colors[config.primaryColor] || colors.cyan;

  return {
    primary,
    success: colors.green,
    error: colors.red,
    warning: colors.yellow,
    info: colors.blue,
    text: isLight ? chalk.black : chalk.white,
    title: isLight ? chalk.black.bold.underline : chalk.white.bold.underline,
  };
};

const getColorTheme = () => {
  const config = getConfig();
  const isLight = config.theme === "light";
  const colors = getAdjustedColors(isLight);
  return colors[config.primaryColor] || colors.cyan;
};

export const inquirerSpanishTheme = {
  helpMode: "always",
  get icon() {
    return { cursor: getColorTheme()("❯") };
  },
  get style() {
    const config = getConfig();
    const isLight = config.theme === "light";
    const primary = getColorTheme();

    return {
      // Color contrast inversion for the prompt messages
      message: (text) => isLight ? chalk.black.bold(text) : chalk.white.bold(text),
      highlight: (text) => primary(text),
      
      keysHelpTip: (keys) => {
        return keys
          .map(([key, action]) => {
            if (action === "navigate") action = "navegar";
            if (action === "select") action = "seleccionar";
            if (action === "confirm") action = "confirmar";
            if (action === "cancel") action = "cancelar";
            
            const keyColor = isLight ? chalk.black.bold(key) : chalk.bold(key);
            const actionColor = isLight ? chalk.hex("#555555")(action) : chalk.dim(action);
            
            return `${keyColor} ${actionColor}`;
          })
          .join(isLight ? chalk.hex("#777777")(" • ") : chalk.dim(" • "));
      },
    };
  },
};
