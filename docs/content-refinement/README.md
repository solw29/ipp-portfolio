# UI/UX and content precision refinement

The existing Graphite Cyan layout, cursor and animation implementation were retained. This update changes content selection, labels, actual skill evidence and presentation; it does not recreate the interaction system.

## Changed files

- `src/data.ts`: experience-led introduction; public/application and phone settings; clearer project names/roles; ongoing dates; curated project and academic skills.
- `src/home.ts`: Hero, About, Skills, project card order, selected-project headings, shorter timeline milestones. Uses existing card classes and filter attributes.
- `src/skill-icons.ts`: build-time local Simple Icons SVG paths, plus consistent code/database fallbacks.
- `src/ui.ts`: concise Contact copy and conditional phone block. Existing email/copy/GitHub/footer/source functionality retained.
- `src/project-page.ts`: technical bilingual labels and clearer Korean section headings; original content and evidence stay in place.
- `src/style.css`: uppercase display name, locally rendered icon alignment, context labels, project/academic grid layout and long-name wrapping. Existing pointer border/glow remains.
- `package.json`, `package-lock.json`: Simple Icons package. SVGs are inlined at static build time, without a runtime CDN or icon library download.
- `README.md` and this report: current settings, source evidence, checks and open factual questions.

`src/main.ts`, `src/cursor.ts` and `src/experiment-results.json` have identical SHA-256 hashes before and after this update. `src/render.ts` and `src/evidence.ts` remain unchanged. No experiment data was recalculated or removed.

## Before / After

| Area | Before | After |
|---|---|---|
| Hero | 데이터를 이해하고, 웹으로 연결합니다. | 데이터를 다루고, 기능을 구현하며, 결과를 검증합니다. |
| Hero identity | WEB DEVELOPMENT / DATA & AI | SW DEVELOPMENT / DATA & AI; display name CHUNG YUJIN. |
| Profile panel | Short abstract approach words | Chung Yujin, Web Development / Data / AI, Understand / Implement / Validate |
| About | Repeated aspirations and slogans | Web/API implementation, OCR review/approval flow, model experiments and team code sharing |
| Skills | Tools for turning ideas real.; ten mixed-experience monograms | Technologies I Work With.; 12 project skills and four academic skills; real local SVGs and concrete context |
| Projects | Built. Tested. Still learning. | Selected Projects.; title → concise task → technologies → personal role → result/status → evidence/detail links |
| Timeline | Learning in motion.; repeated project descriptions | Development Journey.; date, role and concrete milestone |
| Contact | Repeated growth/learning aspirations | 프로젝트와 개발 관련 제안은 이메일 또는 GitHub를 통해 연락해 주세요. |
| Details | 어떤 문제를 다뤘나요? / 제가 직접 맡은 일 | Problem & Motivation / 문제 정의; My Contribution / 담당 역할 및 구현; Architecture & Workflow / 시스템·실험 구조; Results & Evaluation / 결과와 평가; Limitations & Next Steps; Retrospective / 기술적 회고 |

## Skills selection and evidence

| Decision | Technologies | Evidence and scope |
|---|---|---|
| Retained as project skills | Python, TypeScript, PyTorch | Repeated data/model projects, SCOPION web implementation, personal PyTorch experiments and classifier work |
| Retained as project tools | Git, GitHub, Notion | Previously supplied code, task and experiment sharing experience |
| Added to project grid | Vite, Tailwind CSS, HTML/CSS | SCOPION prototype and this repository; each tile identifies its project context |
| Added with limited scope | TensorFlow/Keras | Team code review and small-scale training checks; not presented as the personal PyTorch result or a completed team model |
| Added with project context | Pandas, NumPy | User-supplied manufacturing experiment technology list; contexts restricted to data/numeric processing |
| Moved to Academic Experience | Java, JSP, SQL, Oracle | User-supplied coursework and SQLD study; no professional or unverified project claim |
| Kept in relevant project detail only | Hugging Face Transformers, scikit-learn, XGBoost, SHAP, OCR/Claude/OpenAI APIs | Specialized project implementation; intentionally not expanding every library/API into the core grid |
| Not added | React, FastAPI, AWS, Docker, MySQL, Linux | No specific implementation evidence established for this portfolio request |

Icons retain Simple Icons path geometry and use currentColor to fit the existing palette. HTML/CSS uses the HTML5 symbol; TensorFlow/Keras uses the TensorFlow symbol. Java, JSP, SQL and Oracle use matching generic code/database icons rather than inventing or labeling an unrelated brand mark. Their technology names are visible text. Simple Icons source/license: https://github.com/simple-icons/simple-icons (CC0 package).

## Public/application and phone settings

`contentSettings` in `src/data.ts` controls:

- `application.enabled`: false by default. Public pages omit the company line.
- `application.company` and `role`: previous user-provided company/role. Verify the official recruiting role wording before using the application version.
- `application.program`: null until the official program name is confirmed. No hard-coded “IPP 일학습병행” is emitted.
- `showPhone`: true, retaining the earlier explicit public-contact request. Set false to remove the telephone link/block without removing email/GitHub.

The static renderer was exercised in both modes. Application mode produces the company/role line, while a null program is omitted. Phone disabled removes the telephone link. These test changes were in memory only; public mode remains the committed default.

## Facts retained and remaining verification

| Item | Available source | Decision |
|---|---|---|
| Major names | Earlier explicit user statement: 데이터사이언스 전공, 컴퓨터학 복수전공 | Keep these names; do not substitute 컴퓨터공학. Official academic record was not supplied. |
| ACK 2026 presentation date | Original uploaded portfolio PDF explicitly says “포스터 발표 완료(11/6)” | Keep 2026.11.06. The poster confirms the research and results but is not independent proof of the event date; official event/presentation/submission dates remain to be confirmed. |
| SCOPION | Earlier PDF says July–November, ongoing; current description says prototype development/validation underway | Use 2026.07 — Present rather than implying a confirmed completed end date. Actual completion date remains to be supplied. |
| Manufacturing experiment | User ZIP README, CSVs and original description | Keep 3 completed seeds out of five planned, personal PyTorch vs team TensorFlow separation, AUPRC/MAE/Recall values and limitations. |
| Phone | Earlier reply supplied the number in response to the public-contact question | Keep current explicit preference and make display configurable; no new permission is inferred from silence. |
| Company/program | Previous user target-company statement; no official recruiting notice | Public mode hides it; program is null. Verify official wording before enabling application mode. |

## Executed checks

- `npm run build`: TypeScript + static generation + production bundle passed.
- Chromium/Playwright: 5 widths (320/390/768/1024/1440) × home and four case-study routes, 25 route/layout checks, zero horizontal overflow.
- 12 project / four academic tiles, 12 Simple Icons SVGs, no old monogram text inside SVGs, no runtime external asset requests.
- Hero public mode, exact project titles, AUPRC card comparison target and conditions, technologies before role in project cards.
- Actual hover: equal tile dimensions, cyan shadow and pointer-local highlight; screenshot inspection at desktop/tablet/mobile.
- Filters All 4 / Web 1 / AI 3 / Data 3 with existing FLIP animation exercised.
- Clipboard contents, keyboard menu opening/focus/Escape, reveal and Reduced Motion checks passed.
- Actual mouse movement rendered nontransparent Canvas pixels; 750ms idle cleared the trail; mouse click rendered ripple. Existing cursor visible. Video recorded.
- Manufacturer result table still contains `0.5861 ± 0.0023`; original data JSON hash unchanged.
- Zero page JavaScript errors. No live-site success claimed.

[Hero](hero.png) · [Mobile Hero](hero-mobile.png) · [Full Skills](skills-full.png) · [Tablet](skills-tablet.png) · [Mobile Skills](skills-mobile.png) · [Project cards](projects.png) · [Detailed results](results.png) · [Actual interaction video](interactions.mp4)

## Remaining limitation

The public Vercel URL was tried with curl and Chromium. This environment still blocks it with CONNECT 403 / ERR_TUNNEL_CONNECTION_FAILED. Deployment SHA and production cursor behavior cannot be independently verified here. The screenshots and checks are from the local production build. Public verification requires allowing `ipp-portfolio-hazel.vercel.app` in this cloud environment's network settings.
