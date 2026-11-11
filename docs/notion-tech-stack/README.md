# Skills restored to the supplied Notion inventory

The uploaded original portfolio PDF's Tool & Skill table was read and compared with the explicit user-specified inventory. The exact inventory is restored, with capitalization normalized to the requested labels. No technology is added or removed based on an inferred proficiency level.

| Category | Individual cards |
|---|---|
| Languages | Python, C, Java, TypeScript |
| Web | JSP, Vite, Tailwind CSS |
| DB | Oracle, MySQL |
| AI & Data | PyTorch, TensorFlow, Hugging Face Transformers |
| Development Tools | Linux, Git, GitHub |

**Five categories, 15 cards.** SQL is only the DB subtitle “SQL 기반 데이터 조회 및 관리”, not a duplicate technology card. Notion, Pandas, NumPy, HTML/CSS and Keras were removed from the Skills grid; actual project detail technologies remain unchanged. No advanced DB operations or professional experience is inferred from this list. The section describes project and learning usage collectively, not all-project proficiency.

## UI

- Label: `02 / TECH STACK`
- Heading: `Tools & Technologies.`
- Description: `프로젝트와 학습 과정에서 사용한 기술을 분야별로 정리했습니다.`
- Desktop: Languages / Web / DB / AI & Data side-by-side. Development Tools is nested under AI & Data, not spread beneath all categories.
- Tablet: two category columns and two tiles per row. Mobile: one category column and two tiles per row.
- Equal tile height per breakpoint; readable wrapping for Hugging Face Transformers.
- Existing cyan borders, mouse-local masked glow, lift, icon scale and reveal behavior are reused.

## Icons and the requested fallback

- Simple Icons package: Python, C, TypeScript, Vite, Tailwind CSS, PyTorch, TensorFlow, Hugging Face Transformers, MySQL, Linux, Git, GitHub.
- Verified Devicon SVGs: Java and Oracle, stored in `src/icons/`. Shapes retain their proportions; fill becomes currentColor. Oracle's empty viewport space is cropped to make its wide wordmark legible without stretching it.
- **JSP uses the requested generic star.** No independent JSP brand icon was found in the inspected verified icon sets; it is not replaced with another technology's logo.
- All SVGs are included at build time, with no icon CDN requirement. Visible technology names remain available to screen readers; decorative SVGs do not duplicate them.

Devicon source:
- https://github.com/devicons/devicon/blob/master/icons/java/java-plain.svg
- https://github.com/devicons/devicon/blob/master/icons/oracle/oracle-original.svg
- MIT license included at `src/icons/devicon-LICENSE.txt`.

## Changed files

`src/data.ts` (Skills data only), `src/home.ts` (Skills renderer/import only), `src/skill-icons.ts`, `src/assets.d.ts`, `src/icons/*`, and Skills-scoped additions to `src/style.css`. README and this report document the current inventory.

The entire profile/project data prefix of `src/data.ts` was compared with the pre-change copy and is identical. SHA-256 comparisons also confirmed no changes to `src/cursor.ts`, `src/main.ts`, `src/ui.ts`, `src/project-page.ts`, `src/evidence.ts`, or `src/render.ts`.

## Actual checks

- Production build and TypeScript checks passed (`npm run build`).
- Chromium + Playwright asserted all five group labels and every one of the 15 technology names, with no extra cards or SQL duplicate.
- Icon counts: 12 Simple Icons + two Devicon SVGs + one JSP star.
- Measured desktop heading x-coordinates and Tools placement below AI & Data.
- Checked 320/390/768/1024/1440px: no page overflow or clipped text; equal tile heights within 0.1px subpixel measurement tolerance.
- Hover checked in the browser: no size change, visible cyan glow, updated mouse-local CSS coordinates. Native subpixel transform rounding is not treated as a layout shift.
- Existing project filters, custom arrow and Reduced Motion checks passed; zero page JS errors.
- Static section screenshots hide sticky header/cursor overlays only during export to avoid full-section screenshot stitching artifacts. The interaction video retains the real UI.

[Desktop](desktop.png) · [Tablet](tablet.png) · [Mobile](mobile.png) · [Browser interaction video](https://github.com/solw29/ipp-portfolio/actions/workflows/live-browser-test.yml)

These checks use the local production build. Live Vercel verification is not claimed; the cloud environment has previously blocked that hostname.

과거 브라우저 녹화는 공개 연락처 정책 변경에 따라 최신 실사이트 Actions 영상으로 대체했습니다. 원본 프로젝트 시연 자료는 유지합니다.
