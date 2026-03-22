import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONFIG_DIR = path.resolve(__dirname, "..", "..", ".dev-cli");
const CONFIG_FILE = path.join(CONFIG_DIR, "config.json");

const DEFAULT_CONFIG = {
  username: "Developer",
  theme: "dark",
  animations: true,
  primaryColor: "cyan",
};

export const initConfig = () => {
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
  }
  if (!fs.existsSync(CONFIG_FILE)) {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(DEFAULT_CONFIG, null, 2));
  }
};

export const getConfig = () => {
  initConfig();
  const data = fs.readFileSync(CONFIG_FILE, "utf-8");
  return JSON.parse(data);
};

export const updateConfig = (newConfig) => {
  initConfig();
  const current = getConfig();
  const merged = { ...current, ...newConfig };
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(merged, null, 2));
  return merged;
};
