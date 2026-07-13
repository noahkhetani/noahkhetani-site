# noahkhetani.com

live at [noahkhetani-site.onrender.com](https://noahkhetani-site.onrender.com)

my personal site, designed and built from scratch. building the tools i wish
already existed.

## stack

- react 19 + typescript + vite
- tailwind v4 - design tokens live in [src/index.css](src/index.css)
- framer motion for reveals + page transitions
- gsap + scrolltrigger for the scroll timeline
- lenis for smooth scroll (off for `prefers-reduced-motion`)
- canvas 2d for the hero particle field + the konami ember burst (no three.js)

## dev

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + prod build to dist/
```

## editing content

all the copy + data is in `src/data/`, so u don't have to touch components:

| file | what's in it |
| --- | --- |
| `src/data/site.ts` | name, roles, links, email, nav sections |
| `src/data/projects.ts` | every project - copy, stack, arch layers, challenges, roadmap |
| `src/data/skills.ts` | skill groups |
| `src/data/timeline.ts` | milestones |

the project preview "screenshots" are drawn in code in
[src/components/ProjectVisual.tsx](src/components/ProjectVisual.tsx). swap it for
an `<img>` per project if u ever want real ones.

## hidden stuff

- `⌘K` / `Ctrl+K` - command palette
- terminal mode (from the palette) - `help`, `ls`, `open forge`, `neofetch`, `sudo`...
- konami code - ember storm
- click the logo 5x fast
- open the dev console

## layout

```
src/
  data/          all the content (edit here)
  lib/           hooks + lenis scroll helper
  components/
    ui/          Button, Reveal, TiltCard, Magnetic, badges
    layout/      Nav, Footer, Preloader, CommandPalette, TerminalMode
    background/  ParticleField (canvas)
    ArchDiagram  interactive svg arch diagrams
  sections/      Hero, Projects, About, Architecture, Skills, Timeline, GitHub, Philosophy, Contact
  pages/         Home, ProjectPage (case studies at /projects/:slug)
```
