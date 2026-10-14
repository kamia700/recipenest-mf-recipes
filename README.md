# RecipeNest — Micro-Frontend Setup

Angular 21 host application (`recipe-nest-shell`) that dynamically loads a
remote micro-frontend (`recipe-nest-mf-recipes`) via Webpack Module Federation
(`@angular-architects/module-federation`).

## Projects

| Project | Role | Port | URL |
|---|---|---|---|
| `recipe-nest-shell` | Host — layout (header/sidebar), routing, remote loader | 4200 | http://localhost:4200 |
| `recipenest-mf-recipes` | Remote — exposes `./Routes` from `src/app/app.routes.ts` | 4201 | http://localhost:4201 |

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
remote's routes (currently a recipe list page) into the shell's layout at
runtime.

Both dev servers run in watch mode — edit source files in either project and
they hot-rebuild automatically. Config file changes (`webpack.config.js`,
`angular.json`) may need a manual restart of `npm start`.

## How it works

Detailed walkthrough (in Russian):
[recipe-nest-shell/docs/module-federation.md](../recipe-nest-shell/docs/module-federation.md).

- `recipe-nest-shell/public/mf.manifest.json` maps the remote name `recipes`
  to `http://localhost:4201/remoteEntry.js`; the shell reads it via
  `initFederation` in `src/main.ts` before bootstrapping.
- `recipe-nest-shell/src/app/app.routes.ts` lazy-loads the remote on the
  `/recipes` route via `loadRemoteChildren('recipes', './Routes', 'routes')`.
- `recipenest-mf-recipes/webpack.config.js` exposes `src/app/app.routes.ts`
  as `./Routes`. Paths there are relative, so the remote owns its own pages
  under `/recipes/*`; the same routes are used when it runs standalone.
- Angular/RxJS/Router are shared as singletons between host and remote
  (`shareAll` in both `webpack.config.js` files) to avoid duplicate framework
  instances.

## Known limitations

- The shell's `mf.manifest.json` only has `localhost` URLs — swap it per
  environment at deploy time.
- `/shopping` has no project or manifest entry yet — the shell shows its
  "module unavailable" fallback there.
- `recipenest-mf-recipes` only has a static recipe list — no real data or
  detail pages yet.

This is a working dev setup for exercising Module Federation, not a
production-hardened reference architecture.
