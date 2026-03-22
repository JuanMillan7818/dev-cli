import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import figlet from 'figlet';
import { getThemeOptions } from './theme.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASCII_DIR = path.join(__dirname, '..', '..', 'assets', 'ascii');

export const printStaticAscii = (filename, colorKey = 'primary') => {
  const filePath = path.join(ASCII_DIR, filename);
  const theme = getThemeOptions();
  const colorFn = theme[colorKey] || theme.primary;

  if (fs.existsSync(filePath)) {
    const text = fs.readFileSync(filePath, 'utf-8');
    console.log(colorFn(text));
  } else {
    // Fallback to dynamic if file doesn't exist
    printDynamicAscii(filename.replace('.txt', '').toUpperCase(), colorKey);
  }
};

export const printDynamicAscii = (text, colorKey = 'primary') => {
  const theme = getThemeOptions();
  const colorFn = theme[colorKey] || theme.primary;
  
  const ascii = figlet.textSync(text, { font: 'Standard' });
  console.log(colorFn(ascii));
};

export const clearScreen = () => {
  console.clear();
};
