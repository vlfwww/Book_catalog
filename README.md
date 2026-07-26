# Book Catalog

A single-page book catalog built with vanilla JavaScript and Vite. The app lets users search books through the Open Library API, browse results, and manage a personal favorites list.

**Main features:**

- Book search by title or author with debounced input
- Author filter for search results
- Favorites list saved in `localStorage`
- Light and dark theme with saved preference
- Responsive layout for desktop and mobile

## Task

https://drive.google.com/file/d/1RBRcuH-_oAvtjem5Xs0c4NXZ8I38aYyH/view

## How to run the app

1. Install dependencies:

```bash
npm install
```

2. Build the application:

```bash
npm run build
```

The production files are generated in the `dist` folder:

- `index.html`
- `index.js`
- `assets/` (SVG icons)

3. Preview the build locally (optional):

```bash
npm run preview
```

## Project structure

- `public/` — static files copied to the build output as-is
- `public/assets/` — SVG icon files
- `src/` — main application entry point (`.js`) and global styles (`.css`)
- `src/components/` — UI components; each subfolder contains a component module (`.js`) and its styles (`.css`)
- `src/services/` — service modules (`.js`) for API requests and favorites storage
- `src/utils/` — helper modules (`.js`)
- `.github/workflows/` — GitHub Actions workflow files (`.yml`) for deployment
