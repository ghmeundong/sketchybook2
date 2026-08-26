# Sketchybook2 V2 Handoff

## Current baseline

- Repository: `https://github.com/ghmeundong/sketchybook2.git`
- Working branch: `v2`
- V2 setup commit: `b5bb7f4`
- V1 release history is preserved.
- V1 release tag: `v1.0.0`
- V1 scope: stages 1 through 18.
- Current V2 tests: 38 passing.
- Current V2 production build: passing.

Do not rewrite or delete the V1 history. Keep `v1.0.0` as the archive reference.

## First infrastructure task

V2 backend infrastructure is connected and deployed:

- Worker: `sketchybook2-backend`
- Worker URL: `https://sketchybook2-backend.ghmeundong.workers.dev`
- D1 database: `sketchybook2`
- D1 database ID: `0645a0f9-2208-46d3-a720-daa37365ebb2`
- Google OAuth Client ID: configured in `backend/wrangler.toml`
- CORS: restricted to the V2 GitHub Pages origin, localhost, and Codespaces development origins
- Google login and authenticated progress save/load: verified

Create and connect V2 backend services before changing the frontend data flow.

1. ~~Create a new Cloudflare Worker named `sketchybook2-backend`.~~ Complete.
2. ~~Create a new Cloudflare D1 database for V2, preferably named `sketchybook2`.~~ Complete.
3. ~~Bind the new D1 database to the new Worker.~~ Complete.
4. ~~Create or configure V2 Google OAuth credentials.~~ Complete and verified.
5. ~~Register the V2 GitHub Pages origin and callback URLs in Google OAuth.~~ Login verified.
6. ~~Deploy the Worker and record its URL.~~ Complete.
7. ~~Replace the V1 service identifiers in `backend/wrangler.toml` and `src/services/api.js`.~~ Complete.
8. ~~Restrict Worker CORS to the V2 frontend origin after local development is verified.~~ Complete.

The V1 Worker and V1 D1 database must remain separate. Never point V2 at the V1 database.

## Current V1 references to replace

- `backend/wrangler.toml` Worker name is still `sketchybook-backend`.
- `backend/wrangler.toml` D1 binding still points to the V1 database.
- `backend/wrangler.toml` contains the V1 Google client identifier.
- `src/services/api.js` falls back to the V1 Worker URL on GitHub Pages.
- `.env` contains local Cloudflare and Google settings and is ignored by Git.
- `.env.example` contains sanitized local configuration placeholders.

Do not commit `.env`, API tokens, client secrets, or private keys. Add a sanitized `.env.example` instead. Any credential that has been exposed outside the local machine must be revoked and reissued.

## V2 project setup already completed

- Package name: `sketchybook2`
- Package version: `2.0.0-alpha.0`
- Vite base path: `/sketchybook2/`
- Browser and PWA metadata updated for Sketchybook2.
- PWA `start_url` and `scope` use `/sketchybook2/`.
- V2 direction document: `docs/V2_PLAN.md`

## Product work order

1. Design the new visual language and start screen.
2. Define the chapter and stage data model.
3. Replace the flat stage registry with themed chapter data.
4. Make stage count and progress limits derive from registered data.
5. Build one complete chapter with interlude stages.
6. Validate desktop, mobile, and unfolded foldable layouts.
7. Expand the content beyond 50 stages.

## Git workflow

- Work on `v2` for active development.
- Keep `main` as the integration branch.
- Keep commits small and focused.
- Run `npm test` and `npm run build` before merging major slices.
- Use `v2.0.0-alpha.0` for the first V2 baseline tag after infrastructure is connected.
- Reserve `v2.0.0` for the first production-ready V2 release.

## Useful commands

```powershell
cd C:\Users\GHMEUNDONG\WorkSpace\sketchybook2
npm install
npm test
npm run build
npm run dev
cd backend
npm install
npm run dev
npm run deploy
```

## Handoff starting point

The next coding session should start the V2 UI and chapter data-model work. Rotate any credentials that were exposed during setup before further deployment.
