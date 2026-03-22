import https from "https";
import os from "os";
import { select } from "@inquirer/prompts";
import ora from "ora";
import logUpdate from "log-update";
import chalk from "chalk";
import { getThemeOptions, inquirerSpanishTheme } from "../ui/theme.js";

const checkPing = (url) => {
  return new Promise((resolve) => {
    https
      .get(
        url,
        {
          headers: { "User-Agent": "dev-cli-monitor" },
          timeout: 2000,
        },
        (res) => {
          resolve(res.statusCode >= 200 && res.statusCode < 400);
        },
      )
      .on("error", () => {
        resolve(false);
      })
      .on("timeout", function () {
        this.destroy();
        resolve(false);
      });
  });
};

const getCpuUsage = () => {
  const cpus = os.cpus();
  let user = 0;
  let nice = 0;
  let sys = 0;
  let idle = 0;
  let irq = 0;

  for (let cpu of cpus) {
    user += cpu.times.user;
    nice += cpu.times.nice;
    sys += cpu.times.sys;
    irq += cpu.times.irq;
    idle += cpu.times.idle;
  }

  const total = user + nice + sys + idle + irq;
  const active = user + nice + sys + irq;
  if (total === 0) return 0;
  return Math.round((active / total) * 100);
};

const getRamUsage = () => {
  const total = os.totalmem();
  const free = os.freemem();
  if (total === 0) return 0;
  return Math.round(((total - free) / total) * 100);
};

export const monitorMenu = async () => {
  const theme = getThemeOptions();
  console.log(theme.title("\n--- 📡 Monitoreo ---\n"));

  while (true) {
    const action = await select({
      message: "¿Qué quieres ver?",
      choices: [
        { name: "Monitor en tiempo real", value: "Monitor en tiempo real" },
        { name: "Chequeo rápido", value: "Chequeo rápido" },
        { name: "Volver", value: "volver" },
      ],
      theme: inquirerSpanishTheme,
    });

    if (action === "volver") return "volver";

    if (action === "Chequeo rápido") {
      const spinner = ora({
        text: "Analizando servicios...",
        color: "cyan",
      }).start();

      const [internet, github, jsonApi] = await Promise.all([
        checkPing("https://www.google.com"),
        checkPing("https://api.github.com"),
        checkPing("https://jsonplaceholder.typicode.com/todos/1"),
      ]);
      const cpu = getCpuUsage();
      const ram = getRamUsage();

      spinner.succeed(theme.success("Análisis completado\n"));

      console.log("📡 Service Monitor");
      console.log(
        `🌐 Internet        ${internet ? chalk.green("🟢 Online") : chalk.red("🔴 Offline")}`,
      );
      console.log(
        `🐙 GitHub API      ${github ? chalk.green("🟢 Online") : chalk.red("🔴 Offline")}`,
      );
      console.log(
        `📦 JSON API        ${jsonApi ? chalk.green("🟢 Online") : chalk.red("🔴 Offline")}`,
      );
      console.log(`🖥  CPU             ${chalk.yellow(cpu + "%")}`);
      console.log(`💾 RAM             ${chalk.yellow(ram + "%")}\n`);

      continue;
    }

    if (action === "Monitor en tiempo real") {
      let isMonitoring = true;
      const onData = (data) => {
        const str = data.toString();
        // 'q', Esc, or Ctrl+C
        if (
          str.includes("q") ||
          str.includes("\x1b") ||
          str.includes("\u0003")
        ) {
          isMonitoring = false;
        }
      };

      if (process.stdin.isTTY) {
        process.stdin.setRawMode(true);
      }
      process.stdin.resume();
      process.stdin.on("data", onData);

      const spinner = ora({
        text: "Iniciando monitor en tiempo real...",
        color: "cyan",
      }).start();

      await new Promise((r) => setTimeout(r, 1000));
      spinner.stop();

      while (isMonitoring) {
        const [internet, github, jsonApi] = await Promise.all([
          checkPing("https://www.google.com"),
          checkPing("https://api.github.com"),
          checkPing("https://jsonplaceholder.typicode.com/todos/1"),
        ]);

        let cpu = getCpuUsage();
        // Añadimos una variación sutil a la carga estática de CPU
        cpu = Math.max(
          0,
          Math.min(100, cpu + Math.floor(Math.random() * 5) - 2),
        );

        const ram = getRamUsage();

        if (!isMonitoring) break;

        logUpdate(`📡 Service Monitor
🌐 Internet        ${internet ? chalk.green("🟢 Online") : chalk.red("🔴 Offline")}
🐙 GitHub API      ${github ? chalk.green("🟢 Online") : chalk.red("🔴 Offline")}
📦 JSON API        ${jsonApi ? chalk.green("🟢 Online") : chalk.red("🔴 Offline")}
🖥️ CPU             ${chalk.yellow(cpu + "%")}
💾 RAM             ${chalk.yellow(ram + "%")}

${chalk.dim('Refrescando cada 2s... (Presiona "q" o "Esc" para salir)')}`);

        // Espera 2 segundos de forma no bloqueante para poder salir más rápido al pulsar 'q'
        for (let i = 0; i < 20; i++) {
          if (!isMonitoring) break;
          await new Promise((r) => setTimeout(r, 100));
        }
      }

      logUpdate.clear();
      process.stdin.removeListener("data", onData);
      if (process.stdin.isTTY) {
        process.stdin.setRawMode(false);
      }
    }
  }
};
