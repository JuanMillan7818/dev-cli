import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const NOTES_DIR = path.resolve(__dirname, "..", "..", ".dev-cli");
const NOTES_FILE = path.join(NOTES_DIR, "notes.json");

const initNotes = () => {
  if (!fs.existsSync(NOTES_DIR)) {
    fs.mkdirSync(NOTES_DIR, { recursive: true });
  }
  if (!fs.existsSync(NOTES_FILE)) {
    fs.writeFileSync(NOTES_FILE, JSON.stringify([], null, 2));
  }
};

export const getNotes = () => {
  initNotes();
  const data = fs.readFileSync(NOTES_FILE, "utf-8");
  return JSON.parse(data);
};

export const addNote = (title, content) => {
  const notes = getNotes();
  const newNote = {
    id: Date.now().toString(),
    title,
    content,
    date: new Date().toISOString(),
  };
  notes.push(newNote);
  fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2));
  return newNote;
};

export const deleteNote = (id) => {
  const notes = getNotes();
  const filtered = notes.filter((n) => n.id !== id);
  fs.writeFileSync(NOTES_FILE, JSON.stringify(filtered, null, 2));
};
