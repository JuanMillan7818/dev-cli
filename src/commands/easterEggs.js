import { getThemeOptions } from '../ui/theme.js';

export const matrixMode = async () => {
  const theme = getThemeOptions();
  console.log(theme.success('0101010101010101010101010101'));
  console.log(theme.success('1010101010101010101010101010'));
  console.log(theme.success('0110011010101111000101010101'));
  
  await new Promise(r => setTimeout(r, 1000));
  
  console.log(theme.success('> Access granted...'));
  console.log(theme.success('Welcome to the Matrix.'));
};

export const coffeeBreak = async () => {
  const theme = getThemeOptions();
  console.log(theme.info('☕ Preparando café...'));
  
  await new Promise(r => setTimeout(r, 2000));
  
  console.log(theme.success('✔ Listo, sigue programando 🚀'));
};
