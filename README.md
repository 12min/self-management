# Self Management Dashboard

A React-based project status dashboard with drag-and-drop task management, built with Vite, TypeScript, and Tailwind CSS.

## Features

- ✅ **Task Management**: Organize tasks between "Yesterday's Activity" and "Today's Priorities"
- 🎯 **Drag & Drop**: Move tasks between zones or reorder within zones
- ✏️ **Inline Editing**: Double-click task titles to edit them
- 💾 **Local Storage**: All changes are automatically persisted
- 🗑️ **Clean Lists**: Clear all tasks from a zone with one click
- 🔄 **Reset**: Restore default state anytime
- 📊 **KPI Cards**: Track key metrics at a glance
- 🔗 **ClickUp Integration**: Direct links to ClickUp tasks

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **@dnd-kit** - Drag and drop functionality

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the dashboard.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Dashboard header
│   ├── KPICard.tsx          # KPI metric cards
│   ├── TaskItem.tsx         # Individual task item
│   └── TaskZone.tsx         # Drop zone for tasks
├── hooks/
│   └── useTaskManager.ts    # Task state management hook
├── types.ts                 # TypeScript type definitions
├── App.tsx                  # Main app component
├── main.tsx                 # Entry point
└── index.css                # Global styles
```

## Usage

### Managing Tasks

- **Move tasks**: Drag and drop tasks between "Yesterday" and "Today" zones
- **Edit tasks**: Double-click on a task title to edit it
- **Remove tasks**: Hover over a task and click the "×" button
- **Clear zone**: Click "Clean List" to remove all tasks from a zone
- **Reset**: Click "🔄 Reset to Default" to restore the original state

### Persistence

All changes are automatically saved to browser's localStorage. Your task organization persists across browser sessions.

## License

MIT

## Credits

Based on the original HTML dashboard design from the 12min project status tracking system.
