# 🚀 Dev Assistant CLI (dev-cli)

Dev Assistant CLI es una herramienta de línea de comandos interactiva diseñada para mejorar tu flujo de trabajo de desarrollo. Ofrece una experiencia amigable "tipo aplicación" directamente en la terminal, automatizando tareas cotidianas como la creación de proyectos completos, el monitoreo del sistema en tiempo real, gestión de notas rápidas y conversiones de datos.

---

## 🌟 Características Principales

### 🎮 Menú Interactivo y Navegación

Interfaz amigable construida con el poderoso bloque de `@inquirer/prompts` para navegar con cursores sin necesidad de recordar banderas ni subcomandos complejos.

### 🏗️ Generador de Proyectos Base (Scaffold)

Menú interactivo y auto-configuración de entorno con animaciones tipo `ora`. Seleccionas una tecnología y obtienes al instante una base limpia:

- **React + TypeScript** (Vite preconfigurado).
- **React + JavaScript** (Vite preconfigurado).
- **Express API** (Cors, Dotenv y enrutamiento inicial).
- **Node CLI** (Commander, Inquirer y Chalk listos para usar).
  _*(Las plantillas se autogeneran de forma aislada en la carpeta `projects/` y la CLI te ofrece autoabrir VS Code de inmediato).*_

### 📡 Live Monitor del Sistema

Dashboard dinámico libre de parpadeos impulsado por `log-update` que muestra la analítica general:

- Chequeo ping a la disponibilidad de **Internet**, **GitHub API**, y **JSON API**.
- Porcentajes aproximados de consumo de **CPU** y exactos de **RAM** integrados.
- Auto refresco interactivo en pantalla cada `2s` constante sin llenar el registro de logs antiguos.

### 🧰 Utilidades para Desarrolladores

- **Conversor**: Transformación bidireccional limpia entre binarios `JSON ↔ XML` usando herramientas robustas detrás de escena.
- **ASCII**: Generador al vuelo de banners y letreros grandes mediante _Figlet_.

### 📝 Notas Rápidas & Configuración

- Gestor local que graba en los archivos tu configuración personalizada: Nombre para el mensaje de bienvenida y bloc de apuntes ligeros sin salir de la consola.

### 🕹️ Easter Eggs Interactivos

¿Cansado de programar? Escribe los comandos ocultos visuales:

- **Matrix Mode**: Una fiel simulación gráfica de la lluvia digital de \`Matrix\` (`dev-cli matrix`). Refactorizada usando efectos difuminados ANSI y un control impecable del frame para evitar saltos.
- **Coffee Break**: Temporizador visual ASCII para tomar un respiro.

---

## 📦 Tecnologías Utilizadas

Este CLI exprime el ecosistema moderno de NodeJS:

- **[Commander]**: Motor de parseo para banderas e inicialización por terminal.
- **[@inquirer/prompts]**: Selectores estilo dropdown, input boxes y confirmaciones.
- **[Chalk] / [Ora]**: Tinte del log de interfaz y animaciones circulares precisas.
- **[Log-Update]**: Renderizado de sobreescritura (Overwriting stdout buffers), fundamental para Matrix y el System Monitor.
- **[Figlet]**: Transformación dinámica a texto de código terminal grande (ascii art) a voluntad.
- **[xml2js] / [xmlbuilder]**: Parsers nativos en el pipeline de las utilities de conversión de datos.

---

## 📂 Estructura del Código

```text
DEV-CLI/
├── bin/
│   └── index.js             # Punto principal de montaje para `dev-cli`
├── assets/
│   └── ascii/               # Repositorio de ASCII artesano y estático
├── src/
│   ├── commands/            # Módulos de orquestación transaccional
│   │   ├── create.js        # Algoritmo interactivo de creación de proyectos
│   │   ├── monitor.js       # Live Dashboard con setIntervals limpios
│   │   ├── notes.js         # Manipulación de la consola para apuntes
│   │   ├── utilities.js     # Bloque de convertidores de la dev app
│   │   ├── config.js        # Manejador del login visual inicial
│   │   └── easterEggs.js    # Invocaciones ocultas (Matrix/Coffee)
│   ├── services/
│   │   ├── generator.js     # Constructor nativo `fs` que escribe las plantillas (React, API)
│   │   └── converter.js     # Motor que parsea JSON ↔ XML
│   ├── data/                # Pseudo-database (Archivos de texto en crudo json)
│   └── ui/
│       ├── menu.js          # El corazón y bucle infinito del CLI Interactivo
│       ├── theme.js         # Colección de colores (paleta Chalk extendida)
│       ├── ascii.js         # Injector de componentes Figlet / Files
│       └── matrix.js        # Core de arrays matemáticos para el difuminado ANSI
├── projects/                # Salida automática de los comandos CREATE
└── conversions/             # Salida automática de los comandos UTILITIES
```

---

## 🛠️ Instalación y Uso

Se recomienda un motor mínimo de **Node.js v16+**.

Clonar e instalar las dependencias:

```bash
npm install
```

Para simular una app nativa en tu OS de forma global (te dejará invocar `dev-cli` en cualquier pestaña sin usar node):

```bash
npm link
```

### Comandos de Atajo CLI

Si has `linkeado` el proyecto, puedes saltar directo a la acción:

- `dev-cli` _(ó dev-cli start)_: Lanza el **Menú Interactivo Central**.
- `dev-cli create`: Va directo al generador de plantillas base de librerías.
- `dev-cli monitor`: Lanza directo el visualizador de RAM, CPU y ping.
- `dev-cli utilities`: Abre el flujo para transformar un archivo local de json o xml.
- `dev-cli notes`: Abre directo tus notas.
- `dev-cli config`: Edita tu nombre de dev-cli en vivo.
- `dev-cli matrix`: Inicia la lluvia digital `Matrix` (Efecto difuminado interactivo).
- `dev-cli coffee`: Despliega el spinner `Coffee break`.

---

✨ _Construido para hacer más dinámico, vistoso y ágil el workflow del programador desde su terminal._
