import logUpdate from "log-update";
import chalk from "chalk";

export const startMatrix = () => {
  return new Promise((resolve) => {
    // Esconder cursor
    process.stdout.write("\x1b[?25l");

    // Restamos 1 a las columnas para evitar el salto de línea automático de Windows que rompe log-update
    const columns = (process.stdout.columns || 80) - 1;
    // Reservamos 2 líneas al final para imprimir el texto persistente y evitar scroll infinito con log-update
    const rows = (process.stdout.rows || 24) - 2;
    const chars =
      "01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()";

    // Mapa de brillo para difuminar. 0 es apagado, 15 es máximo brillo.
    let brightness = Array(rows)
      .fill(0)
      .map(() => Array(columns).fill(0));
    let screenPixels = Array(rows)
      .fill(0)
      .map(() => Array(columns).fill(" "));

    // Las gotas inician por encima de la pantalla con alturas aleatorias
    let drops = Array(columns)
      .fill(0)
      .map(() => Math.floor(Math.random() * -rows));

    const getColor = (b) => {
      // 15 = blanco brillante, 14-8 verde claro, 7-1 verde oscuro, 0 negro
      if (b >= 15) return "\x1b[37m"; // Blanco
      if (b >= 8) return "\x1b[92m"; // Verde brillante
      if (b >= 1) return "\x1b[32m"; // Verde oscuro
      return "\x1b[0m"; // Reset (negro)
    };

    // Limpia la pantalla y la prepara
    process.stdout.write("\x1b[2J\x1b[H");

    const draw = () => {
      let output = "";

      for (let i = 0; i < columns; i++) {
        const y = drops[i];

        if (y >= 0 && y < rows) {
          brightness[y][i] = 15; // Activamos el máximo brillo (blanco) en la punta
          screenPixels[y][i] = chars[Math.floor(Math.random() * chars.length)]; // Nueva letra
        }

        // Si la gota ya bajó todo, chance aleatoria de volver a empezar para darle naturalidad
        if (y > rows && Math.random() > 0.95) {
          drops[i] = 0; // Vuelve arriba
        }

        // Avance de la gravedad
        drops[i]++;
      }

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
          if (brightness[r][c] > 0) {
            // Glitch aleatorio al estilo Matrix
            if (Math.random() > 0.95) {
              screenPixels[r][c] =
                chars[Math.floor(Math.random() * chars.length)];
            }
            output +=
              getColor(brightness[r][c]) + screenPixels[r][c] + "\x1b[0m";
            brightness[r][c]--; // Reduce el brillo un paso (efecto difuminado)
          } else {
            output += " ";
          }
        }
        if (r < rows - 1) output += "\n";
      }

      // log-update mantiene el texto actualizado sin parpadeos y le agregamos la cabecera persistente
      logUpdate(
        `${output}\n\n${chalk.bgGreen.black(
          " 💻 Presiona 'q' o ESC para salir de la Matrix ",
        )}`,
      );
    };

    // 50ms para 20FPS fluidos
    const interval = setInterval(draw, 50);

    const onData = (data) => {
      const str = data.toString();
      if (str.includes("q") || str.includes("\x1b") || str.includes("\u0003")) {
        clearInterval(interval);
        // Limpiamos pantalla de log-update, retornamos el cursor visible y restauramos consola
        logUpdate.clear();
        process.stdout.write("\x1b[2J\x1b[H\x1b[?25h\x1b[0m");

        process.stdin.removeListener("data", onData);
        if (process.stdin.isTTY) {
          process.stdin.setRawMode(false);
        }
        process.stdin.pause();
        resolve();
      }
    };

    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
    }
    process.stdin.resume();
    process.stdin.on("data", onData);
  });
};
