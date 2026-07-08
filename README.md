# new-todo

A TODO management web app built with React and Tailwind CSS. Todos are managed as a card grid, tracked through a status lifecycle (in progress / completed / cancelled), and synced to a Google Sheet via a Google Apps Script web app.

## Features

- **Empty state / card grid**: shows a centered input when there are no todos, and a responsive card grid (4 columns desktop / 2 tablet / 1 mobile) once there's at least one.
- **Adding todos**: use the centered input when the list is empty, or the bottom-right FAB → modal once it isn't. Submitted via the add button or Shift+Enter; empty input is ignored.
- **Status management**: move todos through in-progress → completed → cancelled with icon buttons (complete/cancel/delete), recording completion and cancellation timestamps (cancelling keeps the earlier completion timestamp).
- **Icons + tooltips**: every action button (complete/cancel/delete/sort/filter/show-all/FAB) is a Lucide icon with a hover tooltip naming it.
- **Auto-hide old items**: completed/cancelled todos older than 24 hours are hidden by default; a top-right "show all" toggle reveals them again.
- **Sort / filter**: sort by newest, oldest, or title; filter by all/in-progress/completed/cancelled.
- **Edit modal**: clicking a card lets you edit its title, due date, completion state (checkbox), and location. Entering a location geocodes it via Nominatim and shows it on an OpenStreetMap (Leaflet) map.
- **Google Sheets sync**: todos are saved to and loaded from a Google Sheet through a Google Apps Script web app, with a localStorage cache for instant reloads. A top banner shows sync-in-progress and failure states (falling back to the previous state on error).

## Tech stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- shadcn/ui (Radix-based) + lucide-react icons
- react-leaflet + OpenStreetMap
- Google Apps Script (backend, `apps-script/Code.gs`)

## Getting started

```bash
npm install
npm run dev
```

### Environment variables

To connect to the Google Apps Script web app, create a `.env` file at the project root with the deployed web app URL (see `.env.example`):

```
VITE_APPS_SCRIPT_URL=https://script.google.com/.../exec
```

Without it, the app shows a load-failure notice on startup and falls back to running off the localStorage cache only.

### Deploying the Apps Script backend

The backend source and deployment guide live in `apps-script/`. See [apps-script/README.md](apps-script/README.md) for the full steps.

## Scripts

- `npm run dev`: start the dev server
- `npm run build`: type-check then build for production
- `npm run lint`: run ESLint
- `npm run preview`: preview the production build

## Project structure

```
src/
  components/
    todo/            # todo UI (card, grid, modals, toolbar, etc.)
    ui/               # shadcn/ui components
  hooks/useTodos.ts   # todo state, Apps Script sync, and caching
  lib/                # sort/filter, 24h staleness check, geocoding, API, cache, formatting
  types/todo.ts       # Todo data model
apps-script/
  Code.gs             # Google Sheets backend (doGet/doPost)
  appsscript.json      # web app manifest
```
