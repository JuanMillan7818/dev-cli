# 🚀 Dev Assistant CLI

Un CLI interactivo diseñado para mejorar la productividad del desarrollador, ofreciendo herramientas útiles, personalización visual y una experiencia tipo aplicación directamente en la terminal.

---

# 📌 1. Objetivo del proyecto

Crear una herramienta CLI moderna que:

- Sea visualmente atractiva (no el típico CLI plano)
- Ofrezca interacción tipo aplicación (menús, navegación)
- Permita personalización (tema, usuario, preferencias)
- Incluya funcionalidades útiles para desarrolladores
- Sea fácilmente extensible

---

# 🎯 2. Alcance (MVP)

## Funcionalidades principales

### 🏠 Menú principal

- Navegación interactiva
- Opciones:
  - Crear proyecto
  - Ver servicios
  - Notas rápidas
  - Utilidades
  - Configuración
  - Salir

---

### 🛠️ Crear proyecto

- Selección de tipo de proyecto
- Simulación o creación básica de estructura
- Feedback visual con loaders

---

### 📝 Notas rápidas

- Crear nota
- Listar notas
- Eliminar nota
- Persistencia en archivo local

---

### 🧰 Utilidades

#### 🔄 Conversión de archivos

- JSON → XML
- XML → JSON

Flujo:

- Solicita ruta
- Detecta archivos automáticamente
- Convierte y guarda en `/conversions`
- Muestra resumen final

---

### ⚙️ Configuración

- Nombre de usuario
- Tema (dark/light)
- Animaciones ON/OFF
- Color principal

---

### ❓ Comando `--help`

- Comandos disponibles
- Salida estilizada

---

# 🎨 3. Experiencia de usuario (UX)

## Objetivos UX

- Interfaz limpia
- Feedback inmediato
- Animaciones suaves
- Sensación tipo app

---

## 🎭 Sistema de ASCII (🔥 clave visual)

### 📂 Estructura

```bash
/assets/ascii/
  ├── logo.txt
  ├── welcome.txt
  ├── success.txt
  ├── error.txt
```

---

### 📥 Carga de ASCII

Los archivos ASCII se cargan dinámicamente desde el sistema de archivos.

---

### 🎨 Uso de colores

Se combinará ASCII con estilos usando:

- Chalk

Ejemplo conceptual:

- Logo en color primario
- Errores en rojo
- Éxitos en verde

---

### 🧠 ASCII dinámico

Uso de:

- Figlet

Para generar títulos dinámicos como:

- Nombre del CLI
- Mensajes personalizados con el usuario

---

### 🎯 Uso estratégico

El ASCII se usará en:

- Pantalla inicial
- Mensajes importantes (éxito/error)
- Transiciones clave

---

# 🎮 4. Easter Eggs (🔥 diferencial)

El CLI incluirá comandos ocultos para sorprender al usuario.

---

## 🧪 Ejemplo: Modo Matrix

```bash
dev-cli matrix
```

Salida esperada:

```bash
010101010101010101
> Access granted...
```

---

## ☕ Ejemplo: Coffee break

```bash
dev-cli coffee
```

Salida:

```bash
☕ Preparando café...
✔ Listo, sigue programando 🚀
```

---

## 🎯 Objetivo

- Hacer la experiencia memorable
- Mostrar creatividad
- Diferenciar el proyecto de otros CLI

---

# ⚙️ 5. Tecnologías

## Runtime

- Node.js

## Librerías principales

- Inquirer → prompts interactivos
- Chalk → estilos
- Ora → loaders
- Figlet → ASCII dinámico
- Commander → comandos CLI

## Conversión

- xml2js → XML → JSON
- js2xmlparser o xmlbuilder → JSON → XML

---

# 🧱 6. Arquitectura

```bash
dev-cli/
├── assets/
│   └── ascii/          # 🔥 ASCII personalizado
├── bin/
├── src/
│   ├── commands/
│   ├── ui/
│   │   ├── ascii.js    # 🔥 loader de ASCII
│   │   ├── theme.js
│   │   └── menu.js
│   ├── services/
│   │   └── converter.js
│   ├── utils/
│   └── data/
├── conversions/
├── package.json
```

---

# 💾 7. Persistencia

## Config

```bash
~/.dev-cli/config.json
```

## Notas

```bash
~/.dev-cli/notes.json
```

---

# 🧩 8. Comandos

```bash
dev-cli
dev-cli create
dev-cli config
dev-cli notes
dev-cli utilities
dev-cli matrix      # Easter egg
dev-cli coffee      # Easter egg
dev-cli --help
```

---

# 🎯 9. Características destacadas

- CLI tipo aplicación
- Sistema de personalización
- Conversión de archivos real
- ASCII dinámico + personalizado
- Easter eggs creativos
- Arquitectura modular

---

# 🚀 10. Roadmap

- Soporte para CSV / YAML
- Plugins
- Integración con APIs
- Más easter eggs 😄

---

# 🧪 11. Instalación

```bash
npm install
npm link
dev-cli
```

---

# 👨‍💻 12. Autor

- Nombre: [Tu nombre]

---

# 📄 13. Notas finales

Este proyecto demuestra:

- Diseño de CLI avanzado
- UX en terminal
- Manejo de archivos
- Creatividad aplicada
- Arquitectura escalable

---
