# P0 개편 및 로컬 검증 결과

로컬 검증일: 2026-11-16 KST. **아래는 운영 반영 승인 전에 수행한 로컬 검증 기록입니다.** 기존 배포 사이트의 결과와 구분합니다. `local-report.json`의 revision은 기반 커밋이고 `sourceDirty: true`는 미커밋 변경을 검사했음을 뜻합니다.

## 1. 변경 파일

| 파일 | 변경 내용 |
|---|---|
| `src/data.ts` | 신규 2개 프로젝트·검증 근거·한계, 카드용 태그, 분야 필터, 단일 프로젝트 순서와 번호, 중립 설정·학적 정보 |
| `src/home.ts` | 정확한 썸네일 분기·중립 fallback, 동적 필터 개수, 4~6개 배지, 개인/팀 구분, Hero·About·Timeline |
| `src/project-page.ts` | 상세 상단 증빙 링크, Planner Engineering 항목, 공통 데이터 기반 이전/다음 탐색 |
| `src/evidence.ts` | 실제 저장소 제공 TeamSync 영상 재생·다운로드 |
| `src/render.ts` | 학적과 구현 경험에 맞는 홈 SEO 설명 |
| `src/style.css` | 신규 텍스트 썸네일·증빙 링크·기술 배지 줄바꿈·관련 여백만 보완 |
| `vite.config.js` | `allProjects`에서 전체 상세 HTML 진입점 자동 생성 |
| `scripts/test-live.mjs` | 6개 순서·번호·필터·태그·페이지·증빙·새로고침·반응형 검사, 로컬 변경 상태 기록 |
| `public/media/teamsync-dashboard.png` | TeamSync의 실제 대시보드 캡처 원본 복사 |
| `public/media/teamsync-react-demo.mp4` | TeamSync의 실제 대시보드 시연 원본 복사 |
| `README.md` | 6개 프로젝트 구조와 로컬 P0 작업 상태·검증 안내 |
| `docs/p0-revision/*` | 본 보고서, 화면·영상·JSON 검증 자료 |

`src/cursor.ts`, `src/main.ts`, `src/skill-icons.ts`, `src/experiment-results.json`은 기존 커밋과 동일합니다. Skills 데이터와 렌더링 함수, 기존 실제 영상·CSV·차트·포스터·이미지 파일도 변경하지 않았습니다. 새로운 의존성을 추가하지 않았으며 lockfile도 그대로입니다.

## 2. 신규 카드와 상세 구현

### TeamSync AI · `/projects/teamsync-ai/`

Python PR 검사·LLM 리뷰·테스트 생성, 위치 검증과 댓글·Discord 알림, JSON Export → React·TypeScript·Vite 읽기 전용 대시보드 흐름을 기술했습니다. JSON Import, 검색·필터, PR 상세, Evaluation을 실제 저장소 구현 범위로 소개합니다.

평가 조건은 **2026.11.12, gpt-4o-mini, 준비한 소형 합성 사례의 1회 실행**입니다. 실제 PR 12/12 분석, 사전 정의 버그 6/6 지적, 게시 위치 15/15 유효와 함께 **생성 테스트의 구별 성공은 3/6쌍, 수정 버전 오탐 2건**임을 표시합니다. 위치 유효성과 내용 정확성을 구분합니다. 일반 코드 리뷰 정확도·자동 병합 성과로 표현하지 않습니다.

대시보드의 외부 배포 URL은 최신 저장소에 없으며, 정적 배포 설정만 준비돼 있습니다. API·DB 자동 연동은 미구현입니다. 원본 캡처·영상은 익명화된 실제 평가 자료를 로컬에서 탐색한 기록이며 배포 화면이 아닙니다.

확인한 저장소 커밋: `079fbc66f0118630d40b6d36d17af27ffc001808`.

- [실측 평가 보고서](https://github.com/solw29/teamsync-ai/blob/079fbc66f0118630d40b6d36d17af27ffc001808/1107_D6/live-report.md)
- [대시보드 검증 기록](https://github.com/solw29/teamsync-ai/blob/079fbc66f0118630d40b6d36d17af27ffc001808/docs/react-test-report.md)
- [원본 캡처](https://github.com/solw29/teamsync-ai/blob/079fbc66f0118630d40b6d36d17af27ffc001808/docs/images/react-dashboard.png)
- [원본 시연](https://github.com/solw29/teamsync-ai/blob/079fbc66f0118630d40b6d36d17af27ffc001808/docs/react-demo.mp4)

복사본 SHA-256은 원본과 일치합니다. 캡처 `6d1520f4dcc7c5c3fed87b155e4b73e6d12ae0d7c2266157bcda41489b90dcfc`, 영상 `0167c0b3c02ce33f8cd78e06b7eb0a1657b625ca3e05cb05b859811588e533a1`. 영상 길이 33.52초.

### ADHD Planner · Let's Go · `/projects/adhd-planner/`

Vanilla JavaScript UI, Node.js API, OpenAI 일정 추출, 사용자 검수·수정, 체크리스트, 닉네임 로그인·쿠키 세션, 프로필 저장, SQLite/PostgreSQL 어댑터를 소스와 대조했습니다. 로컬 서버와 서버리스 함수의 공통 로직 재사용, `expectedRevision`을 조건으로 하는 UPDATE, 불일치 시 HTTP 409·현재 revision 반환과 UI 안내를 설명합니다.

확인한 커밋: `78e923ca08a32aad284d32261bed40edf4d4fd13`. `lib/authApi.js`, `lib/session.js`, `lib/db/{pg,sqlite}.js`, `api/profile/index.js`, `public/index.html`을 확인했습니다. React 경험으로 소개하지 않습니다. 이번 범위에서는 다른 저장소의 기능을 개발하거나 해당 앱의 API·DB에 데이터를 쓰지 않았습니다.

저장소에 실제 캡처·영상 파일이 없어 **텍스트와 CSS로 만든 업무 흐름 요약**을 썸네일로 사용하며 `NOT A SCREENSHOT`을 명시합니다. 일반 사용자 로그인이 닉네임 기반이라는 한계와 자동 테스트·CI 보강 필요성을 표시합니다. [공개 배포 주소](https://adhd-planner-five.vercel.app/)는 연결했지만 현재 작업 환경의 403 차단으로 운영 상태는 확인하지 못했습니다.

## 3. 최종 순서와 카드 기술 태그

| 번호 | 프로젝트 | 카드 태그 |
|---|---|---|
| /01 | TeamSync AI | Python · GitHub Actions · React · TypeScript · OpenAI API · pytest |
| /02 | ADHD Planner · Let's Go | JavaScript · Node.js · PostgreSQL · SQLite · OpenAI API |
| /03 | SCOPION | TypeScript · Vite · Tailwind CSS · OCR API · Claude API |
| /04 | Shopping QA RAG | Python · PyTorch · Hugging Face · scikit-learn · OpenAI API |
| /05 | Anomaly Detection | Python · PyTorch · TensorFlow · Pandas · NumPy |
| /06 | Housing Price Prediction | Python · LSTM · XGBoost · SHAP |

상세 페이지의 전체 기술 목록은 보존합니다. 카드용 표기만 별도로 두며 Skills 목록을 늘리지 않았습니다.

## 4. 하드코딩·오류 수정

- 주택 썸네일을 반환하던 기본 분기를 제거했습니다. 신규 프로젝트별 썸네일을 지정하고, 미지정 프로젝트는 자기 제목·분류를 표시합니다.
- 필터는 `Project.filters`와 `allProjects`로 계산합니다. 현재 All 06 / AI·ML 05 / Data 03 / Web 03 / Automation·DevTools 01이며 중복 분류가 가능합니다.
- 번호는 배열 순서에서 자동 생성합니다. 같은 데이터가 카드·정적 생성·Vite 입력·이전/다음 탐색을 결정합니다.
- 카드 기술 3개 제한을 없애고 4~6개 핵심 기술 배지를 표시합니다.
- 기존 4개 가정을 제거하고, 명시적 6개 순서와 데이터 기반 필터·태그를 검사하도록 테스트를 수정했습니다.
- 상세 상단에서 GitHub·영상·평가 문서에 접근할 수 있습니다. 외부 링크는 새 창과 `noopener noreferrer`를 적용합니다.
- 시각 검토 중 발견한 모바일 Planner 썸네일 설명 겹침을 정리하고 브라우저 검사를 재실행했습니다.

## 5. 중립 설정과 학적

`contentSettings.application`의 기업명·직무·프로그램 기본값은 모두 `null`, 표시 여부는 `false`입니다. 다른 지원 기업명을 넣지 않았습니다.

학적은 사용자 제공 명칭에 따라 **동덕여자대학교 데이터사이언스 전공 · 컴퓨터학 복수전공 승인 (2027학년도 1학기부터 이수 예정)**으로 통일했습니다. 기존 수강 경험과 공식 복수전공 이수 상태를 구분합니다. About과 SEO는 공통 `profile.major`를 사용합니다. 연락처는 이메일·GitHub만 유지합니다.

TeamSync의 설계 기록은 최초 커밋 2026.11.02, 실측·대시보드 검증은 11.12로 확인했습니다. 폴더의 계획 날짜를 실제 완료일로 사용하지 않았습니다. Planner의 2026.09.19는 최초 소스 커밋 기준이며 개발 시작일·배포일로 확정하지 않습니다. 기존 ACK 11.06 등 날짜와 성과는 보존했습니다.

## 6. 테스트 결과

| 검사 | 결과 |
|---|---|
| `npm ci` | 기본 캐시 경로 오류로 최초 실패. `npm ci --cache /workspace/.cache/npm` 재실행 성공 |
| `npm run check` | 성공 |
| `npm run build` | 성공 · 홈 + 상세 6개 HTML 생성 |
| `npm run check:public` | 성공 · 현재 소스·빌드·문서에 공개 전화번호·tel 링크 없음 |
| 로컬 프로덕션 Chromium | **13개 검사 모두 통과**, 콘솔·페이지·사이트 자원 오류 0건 |
| 상세 경로 | 6개 직접 접속·새로고침·제목·설명·이전/다음 순서 통과 |
| 카드·필터 | 6개 순서·번호·카드 태그·필터 카운트/실제 표시 일치 |
| 반응형 | 320·390·768·1440px 홈·6개 상세 모두 가로 넘침 없음 |
| 접근성·기존 동작 | 메뉴 키보드·포커스·Escape, Reduced Motion, 터치 기본 커서, 이메일 복사 통과 |
| 커서·카드 | 제목·본문·카드·상세에서 표시, Hover 크기 유지·Cyan Glow, 빠른/느린 Trail·정지 Fade·Ripple·스크롤 통과 |
| 증빙 파일 | 내부 링크 18개 응답·파일 경로 정상, 이미지 decode, 실제 시연 2개 재생, 포스터 응답 확인 |
| 외부 GitHub 링크 | 저장소 2개·평가 및 검증 문서 2개 모두 HTTP 200 |
| Vercel 운영 주소 | CONNECT 403 · 환경 차단으로 미검증 |
| `git diff --check` | 성공 |

브라우저 명령:

```sh
npm run preview -- --port 4173 --strictPort
CHROMIUM_PATH=/usr/bin/chromium \
PLAYWRIGHT_BROWSERS_PATH=/workspace/.cache/playwright \
TEST_BASE_URL=http://localhost:4173 \
TEST_OUTPUT_DIR=test-results/p0 npm run test:live
```

`local-report.json`은 로컬 미커밋 변경을 검사한 결과입니다. 연결 차단을 사이트 장애로 단정하거나 로컬 검증을 운영 검증으로 보고하지 않습니다. 기존 GitHub Actions는 같은 `test-live.mjs`를 사용하므로 향후 반영 시 6개 프로젝트를 검사하고 해당 SHA의 배포를 기다리게 됩니다. 이번에는 실행하지 않았습니다.

자료:

- 로컬 데스크톱·모바일 동작 녹화는 검토 후 Git 대상에서 제외했습니다. 운영 검증 영상은 [실사이트 Actions](https://github.com/solw29/ipp-portfolio/actions/workflows/live-browser-test.yml)의 해당 커밋 실행에서 Artifacts로 받습니다. 자동 검사의 판정은 JSON을 기준으로 확인합니다.
- [브라우저 결과 JSON](local-report.json) · [외부 링크 점검 JSON](external-links.json)
- [데스크톱 갤러리](projects-1440.png) · [태블릿 갤러리](projects-768.png) · [모바일 갤러리](projects-390.png)
- [Hero](hero.png) · [TeamSync 상세](teamsync-ai.png) · [Planner 상세](adhd-planner.png)
- [실제 Trail 캡처](cursor-trail.png) · [클릭 Ripple 캡처](click-ripple.png)

갤러리 전체 영역 캡처에서는 고정 헤더가 중간에 겹치지 않도록 캡처 옵션으로만 헤더와 본문 바로가기 링크를 숨겼습니다. 실제 사이트 스타일은 바꾸지 않았습니다. 별도 Hero·상세 캡처에는 정상 헤더가 포함됩니다.

## 7. 미확인·미구현 항목

- 이번 변경의 Vercel 배포 및 운영 실사이트 검증: 수행하지 않음.
- Planner의 현재 API·DB·로그인 운영 상태, 정확한 개발 시작일·배포일: 확인하지 못함.
- TeamSync 대시보드 외부 배포·실시간 API/DB·자동 병합: 원본 저장소에 미구현/미배포로 기록.
- TeamSync 수치는 원본 평가 기록을 대조했으며 이번에 LLM 평가를 다시 실행하지 않음.
- Planner 신규 스크린샷이나 영상을 임의 제작하지 않음. 원본 자료 확보 후 대체 가능.
- 학교 공식 학적 서류를 새로 조회하지 않음. 전공 명칭·승인·예정 시기는 사용자 제공 사실을 사용.

## 8. 후속 P1 제안

1. 운영 반영을 별도 요청받으면 Push·배포 후 동일 SHA의 Actions 결과·영상을 확인합니다.
2. Planner의 실제 시연 자료·개발 기간을 확보하고, 허용된 범위에서 운영 기능을 별도로 검증합니다.
3. TeamSync의 재평가나 외부 대시보드 배포가 완료되면 근거 링크와 상태를 갱신합니다.
4. 프로젝트별 핵심 기술·역할·한계를 유지하면서 본문 접근성·명암과 긴 상태 문구를 지속 점검합니다.

## TeamSync 시연 영상 교체 · 2026-11-16 KST

사용자가 지정한 `teamsync-ai/main/docs/react-demo.mp4`의 최신 원본으로 포트폴리오의 동일 영상 파일을 교체했습니다. 소스 커밋은 `880f277e038aac0716428be8eb292484cb89c7b1`, 길이는 105초, 크기는 5,522,207 bytes이며 H.264 무음 영상입니다. SHA-256: `7225fc4fb27908dd37a83ec26d1ca90736cfd3f4738fcf6205aa8d5da24a01a2`. 위 초기 P0 기록의 33.52초 영상은 이 파일로 대체됐습니다.

PR 댓글·생성 테스트·평가 결과·React 대시보드 흐름에 맞춰 영상 설명을 조정했으며, 재생·다운로드 링크에 버전 값을 붙여 이전 캐시와 구분합니다. 기존 프로젝트 성과와 한계는 유지합니다.
