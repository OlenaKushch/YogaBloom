# Yoga Bloom

Landing page for a yoga studio — a responsive single-page site built with HTML, CSS, and Vanilla JavaScript.

## Live demo

[https://olenakushch.github.io/YogaBloom/](https://olenakushch.github.io/YogaBloom/)

## Stack

- HTML5 (partials via `vite-plugin-html-inject`)
- CSS3 (mobile-first, CSS custom properties)
- Vanilla JavaScript (ES modules)
- [Vite](https://vitejs.dev/) — dev server & build tool
- GitHub Pages — deployment

## Sections

- Hero
- Yoga Classes
- Team
- Gallery
- About Us
- Testimonials
- Pricing Plans (with signup modal)

## Local setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build & preview

```bash
npm run build
npm run preview
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run format` | Format source files with Prettier |
| `npm run lint:js` | Lint JavaScript |
| `npm run lint:css` | Lint CSS |
| `npm run generate:placeholders` | Create minimal placeholder images |

## Project structure

```
src/
├── css/           # Styles per section
├── js/            # menu, modal, forms
├── img/           # Images & SVG sprite
├── partials/      # HTML sections
└── index.html     # Entry point
```

## Notes

Replace placeholder images in `src/img/` with final design assets before production use.
