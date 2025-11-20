# Floorplan Studio 🏠

A cozy, local-only 2D floorplan drawing tool built with Next.js, TypeScript, Mantine UI, and react-konva.

## Features

- 🎨 Warm cream-taupe-mauve design studio aesthetic
- 🖼️ Full floorplan editor with walls, doors, furniture, and text
- ⌨️ Comprehensive keyboard shortcuts
- 🔍 Zoom & pan canvas
- 📐 Layers panel for managing objects
- 💾 Local save/load (localStorage)
- 📤 Export to PDF, PNG, JPG, and WebP
- 🎯 Command palette (Ctrl+K) for quick actions
- ♻️ Undo/Redo support

## Setup & Run

### Prerequisites

- Node.js 18+ and npm

### Installation

1. **Clone or download this project**

2. **Install dependencies:**

```bash
npm install
```

3. **Run the development server:**

```bash
npm run dev
```

4. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000)

5. **Start creating floorplans:**

Click "Open Floorplan Tool" or go directly to [http://localhost:3000/tool](http://localhost:3000/tool)

## Keyboard Shortcuts

- **V** - Select/Move tool
- **W** - Wall tool
- **D** - Door tool
- **F** - Furniture tool
- **T** - Text tool
- **Spacebar (hold)** - Pan mode
- **Ctrl/Cmd + Z** - Undo
- **Ctrl/Cmd + Shift + Z** - Redo
- **Delete/Backspace** - Delete selected object
- **Ctrl/Cmd + S** - Save to localStorage
- **Ctrl/Cmd + K** - Open command palette
- **Mouse wheel** - Zoom in/out

## Tech Stack

- **Next.js 14+** (App Router)
- **TypeScript**
- **Mantine v7** (UI components)
- **react-konva** (Canvas rendering)
- **jsPDF** (PDF export)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/
│   ├── accessibility/
│   ├── contact/
│   ├── privacy-policy/
│   ├── terms/
│   ├── tool/              # Main floorplan editor
│   └── layout.tsx
├── components/
│   ├── layout/            # Header, Footer, AppShell
│   └── tool/              # Editor components
├── lib/
│   ├── floorplan/         # Scene types & hooks
│   └── undo/              # Undo/Redo manager
├── utils/                 # Export & ID utilities
└── styles/                # Global CSS

```

## Usage

1. **Select a tool** from the left toolbar or use keyboard shortcuts
2. **Draw on the canvas:**
   - Walls: Click and drag
   - Doors/Furniture/Text: Click to place
3. **Manage objects** in the Layers panel (right side)
4. **Edit properties** in the Properties panel (right side)
5. **Save your work** with Ctrl/Cmd+S
6. **Export** your floorplan using the Export panel

## Privacy & Data

This app is **100% local**. No data is sent to any server. All saves use browser localStorage.

## License

MIT License - Feel free to use and modify for personal or commercial projects.

## Disclaimer

This tool is for diagram-level planning and visualization only. It is **not intended for architectural or construction use**. Always consult licensed professionals for building plans.