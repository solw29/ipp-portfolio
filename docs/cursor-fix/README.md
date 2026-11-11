# Cursor fix: reproduction and verification

## Confirmed defects in the previous implementation

The cursor code at main commit `80c2636` was executed in Chromium against the static page: the arrow appeared over the background, disappeared over h1, and disappeared on scroll without further pointer movement. This reproduces the code-level defect locally; it does not establish which commit the public deployment currently serves.

- `nativeAt()` classified normal headings/paragraphs as native-only and called a full reset.
- Scroll discarded arrow visibility, pointer position context, trail and ripple together.
- Both JS and CSS gated the enhancement on the primary fine/hover pointer, excluding some hybrid input configurations.
- Cursor initialization ran after unrelated UI initialization.

## Changes

- `src/cursor.ts`: separate arrow visibility, hard reset and trail cleanup; normal text keeps the custom arrow; actual selection and editable/native controls retain the native cursor. Use any-pointer/any-hover capability and actual mouse events. Touch events still disable the enhancement. Scroll clears viewport-local traces while preserving and re-evaluating the anchored arrow.
- `src/style.css`: remove the conflicting primary coarse/hover CSS exclusion; visibility follows JS actual input state. Reduced Motion remains a hard CSS fallback.
- `src/main.ts`: initialize the cursor before unrelated components.
- `scripts/generate.mjs`: embed `build-revision` metadata using VERCEL_GIT_COMMIT_SHA (or local Git HEAD). This allows a live response to be compared against the deployed Git commit.
- UI/render inspection confirmed the canvas/SVG markup already exists; no replacement markup was needed.

## Executed Chromium tests

Production `npm run build` passed. Playwright checked actual SVG visibility and nontransparent Canvas pixels, not just source code:

1. Hero background and normal h1/description: arrow visible.
2. Navigation, skill and project hover: arrow visible.
3. Stationary pointer after scrolling: arrow remains visible.
4. Project detail heading: arrow visible.
5. Fast and slow movement: nonempty rendered Canvas.
6. Stop for 750ms: Canvas empty; arrow still visible.
7. Click after idle: Canvas becomes nonempty for the ripple, then clears.
8. Real DOM text selection hides the arrow; clearing selection restores it.
9. Textarea input works and retains native cursor behavior.
10. Emulated primary coarse/no-hover with any-pointer fine/any-hover hover: mouse arrow visible.
11. Reduced Motion: arrow hidden, Canvas clear.
12. Touch context: custom arrow disabled.
13. No page JavaScript errors.

[Trail screenshot](trail.png) · [Ripple screenshot](ripple.png) · [Chromium recording](https://github.com/solw29/ipp-portfolio/actions/workflows/live-browser-test.yml)

## Live deployment limitation

Both curl and Chromium attempted https://ipp-portfolio-hazel.vercel.app/. This cloud environment's outbound policy returned CONNECT 403 / ERR_TUNNEL_CONNECTION_FAILED. GitHub deployment API access was also Forbidden. Therefore the production DOM, production JS errors, deployed SHA, deployment completion and public behavior remain unverified. No claim is made that production is fixed merely because the local build passes.

After the fix is deployed, run in the production browser console:

```js
document.querySelector('meta[name="build-revision"]')?.content
```

Compare it to the fix commit in GitHub and the Vercel deployment Source commit. To allow this agent to perform live verification, permit `ipp-portfolio-hazel.vercel.app` in the cloud environment's Internet settings.

과거 브라우저 녹화는 공개 연락처 정책 변경에 따라 최신 실사이트 Actions 영상으로 대체했습니다. 원본 프로젝트 시연 자료는 유지합니다.
