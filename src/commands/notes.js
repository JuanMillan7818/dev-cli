import { select, input } from '@inquirer/prompts';
import { getNotes, addNote, deleteNote } from '../data/notes.js';
import { getThemeOptions, inquirerSpanishTheme } from '../ui/theme.js';

export const notesMenu = async () => {
  const theme = getThemeOptions();
  let backToMenu = false;

  while (!backToMenu) {
    console.log(theme.title('\n--- 📝 Notas Rápidas ---\n'));
    
    const action = await select({
      message: '¿Qué deseas hacer?',
      choices: [
        { name: 'Ver notas', value: 'Ver notas' },
        { name: 'Crear nota', value: 'Crear nota' },
        { name: 'Eliminar nota', value: 'Eliminar nota' },
        { name: 'Volver', value: 'Volver' }
      ],
      theme: inquirerSpanishTheme,
    });

    switch (action) {
      case 'Ver notas': {
        const notes = getNotes();
        if (notes.length === 0) {
          console.log(theme.warning('No hay notas guardadas.'));
        } else {
          notes.forEach((n, i) => {
            console.log(theme.primary(`\n[${i + 1}] ${n.title}`));
            console.log(theme.text(n.content));
            console.log(theme.text(`Fecha: ${new Date(n.date).toLocaleString()}`));
          });
        }
        break;
      }
      case 'Crear nota': {
        const title = await input({ message: 'Título:', theme: inquirerSpanishTheme });
        const content = await input({ message: 'Contenido:', theme: inquirerSpanishTheme });
        addNote(title, content);
        console.log(theme.success('Nota guardada con éxito.'));
        break;
      }
      case 'Eliminar nota': {
        const allNotes = getNotes();
        if (allNotes.length === 0) {
          console.log(theme.warning('No hay notas para eliminar.'));
          break;
        }
        const noteId = await select({
          message: 'Selecciona la nota a eliminar:',
          choices: allNotes.map(n => ({ name: n.title, value: n.id })),
          theme: inquirerSpanishTheme,
        });
        deleteNote(noteId);
        console.log(theme.success('Nota eliminada.'));
        break;
      }
      case 'Volver':
        backToMenu = true;
        break;
    }
  }

  return 'volver';
};
