# RecipeNest — Micro-Frontend Setup

Angular 21 host application (`recipe-nest-shell`) that dynamically loads a
remote micro-frontend (`recipe-nest-mf-recipes`) via Webpack Module Federation
(`@angular-architects/module-federation`).

## Projects

| Project | Role | Port | URL |
|---|---|---|---|
| `recipe-nest-shell` | Host — layout (header/sidebar), routing, remote loader | 4200 | http://localhost:4200 |
| `recipenest-mf-recipes` | Remote — exposes `./Component` from `src/app/app.ts` | 4201 | http://localhost:4201 |

These are two independent repos (own `.git`, `angular.json`, `package.json`) —
there's no single command that starts both.

## Prerequisites

- Node.js + npm (checked with Node v24, npm 11)
- Dependencies already installed in each project (`node_modules/` present).
  If missing: `npm install` inside each project folder.

## Run

Start the remote **first**, then the host, in two separate terminals:

```powershell
# Terminal 1 — remote
cd recipenest-mf-recipes
npm start        # http://localhost:4201, serves remoteEntry.js

# Terminal 2 — host
cd recipe-nest-shell
npm start         # http://localhost:4200
```

Open **http://localhost:4200** — it redirects to `/recipes`, which loads the
remote's `App` component into the shell's layout at runtime.

Both dev servers run in watch mode — edit source files in either project and
they hot-rebuild automatically. Config file changes (`webpack.config.js`,
`angular.json`) may need a manual restart of `npm start`.

## How it works

- `recipe-nest-shell/src/app/app.routes.ts` lazy-loads the remote via
  `loadRemoteModule({ remoteEntry: 'http://localhost:4201/remoteEntry.js', exposedModule: './Component' })`
  on the `/recipes` route.
- `recipenest-mf-recipes/webpack.config.js` exposes its root `App` component
  as `./Component`.
- Angular/RxJS/Router are shared as singletons between host and remote
  (`shareAll` in both `webpack.config.js` files) to avoid duplicate framework
  instances.

## Known limitations

- Remote URLs are hardcoded to `localhost` — no manifest/env-based remote
  discovery for other environments.
- No error/fallback UI if the remote fails to load.
- Shell also declares a `shopping` remote (port 4202) with no corresponding
  project — `/shopping` will fail to load.
- `recipenest-mf-recipes` still ships default Angular CLI placeholder
  content — no real "recipes" feature yet.

This is a working dev setup for exercising Module Federation, not a
production-hardened reference architecture.
