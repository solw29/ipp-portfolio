# Card, technology grid and cursor refinement

## Scope and changed files

- `src/home.ts`: four category groups now contain ten independent technology tiles. Each tile has a lightweight inline SVG monogram and a technology name. These noninteractive tiles do not impersonate buttons. Existing filters, Bento cards and all actual project imagery remain in place.
- `src/style.css`: approximately 2px cyan technology border with stronger exterior glow; the cursor-local light is masked to the border rather than washing out the interior. Project glow is intentionally weaker. Card results/tags and whitespace were refined; dimensions do not change on hover.
- `src/cursor.ts`: the existing spline, arrow, 580ms fade and ripple lifecycle remain. Larger directional petals have three translucent layers, cached into an offscreen Canvas once and drawn as stamps. No per-frame DOM creation or repeated blur/gradient generation. Ripple code is unchanged.
- `src/data.ts`: numbers and the shared project order now read SCOPION 01 → anomaly preservation 02 → shopping QA 03 → housing 04. The same order drives detailed previous/next navigation. A typed optional `visuals` collection supports real screenshots, charts and diagrams.
- `src/project-page.ts`: every back link goes to the project gallery, including SCOPION. Uses the evidence gallery helper.
- `src/evidence.ts`: renders supplied `visuals` with alt text, caption, intrinsic dimensions, lazy loading and a full-size source link. No assets means no placeholder. Existing image data remains compatible.
- `src/ui.ts`: View Source links to this repository; footer lists TypeScript, Vite, CSS and Canvas 2D.

`src/main.ts` is unchanged: pointer tracking, FLIP filters, reveals, section tracking, menu and theme handlers are reused.

## Actual browser checks

Chromium + Playwright against the production build:

- Ten tiles in four groups; no invented technologies, skill ratings or clickable controls.
- Measured card width/height before and after hover: equal. Masked border, cyan glow and pointer-local CSS coordinates confirmed.
- Gallery filter counts All 4 / AI 3 / Data 3 / Web 1; FLIP animation exercised.
- Static card numbers `/01 /02 /03 /04` match the default gallery order; filtered views retain those project identities.
- 320, 390, 768, 1024 and 1440px × home and four detailed routes: 25 successful route/layout checks, no horizontal overflow.
- SCOPION back link resolves to `../../#projects`.
- Real moving mouse input produces nontransparent Canvas pixels; fast movement, fade to an empty Canvas after idle and click ripple all verified. Custom arrow stays visible after trail fade.
- Reveal, mobile menu, Reduced Motion and View Source checks passed; zero page JS errors.
- Visual inspection of desktop/tablet/mobile screenshots and moving interaction recording.

Performance investigation: the first multilayer implementation performed blur on every stamp, measuring roughly 132ms median rAF interval in this headless environment. Caching the layered stamp reduced the same movement benchmark to 16.7ms median. This is a local measurement, not a universal frame-rate guarantee. The bounded point history, DPR cap and idle animation shutdown remain.

## Evidence

- [Before: category cards](before-skills.png)
- [After: individual technology cards and glow](after-skills.png)
- [Project hierarchy and Bento layout](after-projects.png)
- [Tablet](tablet.png) · [Mobile](mobile.png)
- [Layered trail](trail.png)
- [Actual Chromium interaction recording](interactions.mp4)

## Adding real visuals later

Set the optional `visuals` array on a project in `src/data.ts`. Each item has `kind` (`screenshot`, `chart`, or `diagram`), `src` (a real local asset path relative to the detailed page), `alt`, `caption`, `width`, and `height`. Only supplied assets render. No missing team experiment results, PR screenshots or reconstruction examples were generated.

## Limitations

Validation is against the local production build. The public Vercel endpoint has been blocked by this cloud environment's outbound policy, so production deployment completion and live behavior are not claimed here. Original media and research results remain unchanged.
