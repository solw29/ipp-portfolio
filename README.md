# 정유진 · SW Developer Portfolio

Graphite Cyan 다크 테마를 기본으로 사용하는 반응형 정적 포트폴리오입니다. Vite + TypeScript로 구성하며 React, 백엔드, DB 없이 5개 페이지의 본문을 빌드 시 HTML로 생성합니다.

## 실행

Node.js 22.12 이상 또는 24 LTS 환경에서:

```sh
npm ci
npm run dev
```

다른 터미널에서 검증·프로덕션 실행:

```sh
npm run build
npm run preview
```

`dist/` 전체를 정적 호스팅에 업로드합니다. `/projects/scopion/`, `/projects/shopping-qa/`, `/projects/anomaly-detection/`, `/projects/housing-price/`마다 `index.html`이 있어 SPA 재작성 없이 상세 주소로 직접 접근할 수 있습니다. 폴더의 index.html을 제공하는 정적 호스트를 사용하세요.

GitHub Pages처럼 하위 경로에 배포할 경우:

```sh
PORTFOLIO_BASE=/ipp-portfolio/ npm run build
```

배포는 자동 실행하지 않습니다. 도메인 확정 전에는 임의의 canonical URL이나 배포 링크를 넣지 않았습니다.

## 콘텐츠 수정

- `src/data.ts`: 프로필, 프로젝트별 역할·진행 상태·검증 결과·한계, 기술 분류
- `src/render.ts`: 홈과 상세 페이지의 컴포넌트 함수 및 페이지별 메타데이터
- `src/style.css`: 반응형 스타일, 키보드 포커스, 인쇄, 동작 줄이기 설정
- `src/main.ts`: 모바일 메뉴, 현재 섹션 표시, 테마 선택
- `src/cursor.ts`: SVG 화살표, Catmull–Rom 경로의 Canvas 꽃잎 트레일, 클릭 리플
- `src/evidence.ts`: 실제 포스터·영상과 개인 실험 결과 표/다운로드 렌더링
- `scripts/generate.mjs`: HTML 정적 생성

개발 서버 실행 중 data/render를 바꾼 경우 서버를 재시작해 정적 HTML을 다시 생성하세요. CSS·브라우저 스크립트는 Vite가 즉시 갱신합니다. 생성된 `index.html` 및 `projects/`는 Git에서 제외되며 빌드 때 다시 만듭니다.

## 이미지·실제 링크 추가

ACK 포스터와 SCOPION 시연 영상은 제공받은 실제 자료입니다. 제공되지 않은 복원 예시나 PR 화면은 만들지 않았습니다. 실제 파일을 `public/images/`에 저장하고 프로젝트의 선택적 `image` 필드를 추가하면 상세 페이지에 나타납니다. 하위 경로 배포에도 연결되도록 `src`는 `../../images/파일명.webp` 형식을 사용합니다.

```ts
image: {
  src: '../../images/scopion.webp',
  alt: '실제 화면에 대한 설명',
  caption: '화면의 기능과 검증 맥락'
},
links: [{ label: '프로젝트 GitHub', url: '실제 공개 URL' }]
```

`links`는 실제 링크가 있는 경우에만 추가합니다. 이력서와 블로그 메뉴는 자료가 준비되기 전까지 표시하지 않습니다. 제공받은 GitHub·이름·전화번호 및 최종 확인된 Gmail 주소를 반영했습니다. 영문 이름은 사용자 최종 지정인 Chung Yujin을 사용합니다. 제공된 원본 포스터는 변경하지 않았습니다. 전화번호는 공개 페이지에 노출되므로 공개 범위를 바꾸려면 `src/data.ts`의 연락처 및 표시 여부를 수정하세요.

## 자료와 확인 사항

사용자 요청 및 첨부한 노션 내보내기 PDF를 사실 근거로 사용했습니다. 노션 URL과 참고 사이트는 작업 당시 네트워크 정책에 의해 403으로 차단되어 원본 웹 화면은 확인하지 못했습니다.

추가로 받으면 좋은 자료:

- 각 프로젝트의 실제 화면·포스터·결과 도표와 공개 가능한 설명
- 각 프로젝트의 GitHub 또는 데모 URL
- 이메일은 `minteugene59@gmail.com`으로 확인·수정 완료
- 노션 공개 공유 주소 또는 최신 HTML 내보내기
- 선택 사항: 이력서 PDF, 프로필 사진, 실제 블로그 URL, 영문 이름의 선호 표기
- 최종 배포 호스트·도메인

진행 중인 연구 결과와 완료한 결과를 분리했으며, 개인 PyTorch 예비실험을 팀 TensorFlow 결과에 합치지 않았습니다. MySQL·Linux는 구체적인 사용 근거 확인 전 핵심 기술 목록에 포함하지 않았습니다.

## 현재 검증 결과

- `npm run build`: TypeScript 검사 및 5개 페이지 정적 빌드 통과
- Chromium/Playwright: 홈과 상세 4개 직접 접속, 메타데이터와 내부 링크 검사 통과
- 320·390·768·1024·1440px 화면에서 가로 넘침 없음
- 모바일 메뉴 열기·이동 후 닫기, 동작 줄이기 설정 검사 통과
- 브라우저 콘솔 및 페이지 오류 0건
- JavaScript를 꺼도 상세 본문 표시 확인
- 외부 GitHub·이메일·전화 링크는 제공받은 주소로 연결하며, 실제 메일 수신·전화 연결 여부는 검사하지 않았습니다.


## 커서와 테마

기본은 Graphite Cyan 다크 테마이며, 상단 테마 버튼으로 밝은 테마를 선택할 수 있습니다. 선택은 localStorage에 보관하고 저장소가 차단된 환경에서도 기본 테마는 동작합니다.

커서는 off-white 내부·Cyan 외곽선의 30×38px SVG 화살표 하나입니다. SVG의 (3, 2) 끝점과 실제 포인터 좌표를 맞추며 hover 확대도 그 끝점을 중심으로 합니다. 상시 링이나 Spotlight는 없습니다. Canvas에는 최근 최대 48개 좌표만 유지하고 Catmull–Rom spline 위에 폭과 길이가 다른 그라데이션 타원형 꽃잎을 겹칩니다. 트레일 수명은 580ms, 클릭 점/리플은 430ms이며 흔적이 사라지면 requestAnimationFrame을 중단합니다. Canvas DPR은 최대 1.5로 제한했습니다.

fine pointer + hover + 마우스 환경에서만 활성화하며 reduced-motion 변경도 실시간으로 반영합니다. 텍스트 본문, 입력·편집 영역, 선택된 텍스트와 영상의 네이티브 컨트롤에서는 기본 커서로 복귀합니다. 선택 영역은 지속해서 유지되고 이벤트 기본 동작을 막지 않습니다. blur·스크롤·탭 비활성화·포인터 이탈 때 흔적을 지웁니다. 프레임마다 DOM을 추가하지 않습니다. 커서 자체 구현은 이번 디자인 개편에서 변경하지 않았습니다.

## 실제 자료와 개인 실험 재현

- `public/results/anomaly/`: 원본 CSV 4개, 제공 ZIP, 원본 README, 독립 SVG/PNG 결과 그래프
- `src/experiment-results.json`: CSV에서 생성한 빌드용 데이터(브라우저에서 CSV 파싱 불필요)
- `public/media/scopion-demo.mp4`: 사용자 제공 시연, autoplay 없음, metadata만 사전 로드
- `public/media/capstone-poster.png`, `public/documents/ack-2026-poster.pdf`: 실제 ACK 포스터와 원본 PDF

CSV 업데이트 후에는 다음을 실행합니다. 검증·데이터 변환은 Python 표준 라이브러리만 사용하며 그래프 재생성에만 Matplotlib이 필요합니다. 일반 웹 빌드에는 Python이 필요하지 않습니다.

```sh
python scripts/verify-results.py
python scripts/prepare-results.py
python scripts/plot-results.py
npm run build
```

합성 이상은 kind=all의 시드별 값으로 평균과 표본 SD를 확인합니다. TEP는 `fault=mean` 요약 행을 제외한 20개 fault를 시드별 평균하고 3개 시드 간 표본 SD를 계산합니다. 모든 표시값은 제공 CSV에서 파생합니다. 결측률 20%와 calibration 명목 FPR 1% 조건은 사용자 설명·원본 README를 근거로 표기했습니다.

계획한 5개 시드 중 3개(11·22·33) 결과이며 팀 TensorFlow 성능을 포함하지 않습니다. 업무 분배 PDF는 계획 자료이므로 예정 업무를 완료했다고 표시하거나 다른 팀원의 역할을 본인의 성과로 추가하지 않았습니다. 복원 예시의 원신호·결측 위치·복원 시계열 및 실제 PR 검토 화면은 아직 제공되지 않아 표시하지 않습니다.

## 이번 변경의 브라우저 검증

Chromium/Playwright에서 SVG 화살표·Canvas 리플/트레일, 프레임별 DOM 수 유지, 유휴 시 RAF 중단, 텍스트·textarea 기본 커서, 실행 중 reduced-motion 변경, 터치 비활성화, 테마 저장을 검사했습니다. 320/390/768/1024/1440px에서 홈·결과 상세·시연 페이지의 가로 넘침이 없으며, 4개 상세 페이지와 실제 PDF·영상·CSV/ZIP 링크가 정상 응답합니다. SCOPION 영상 메타데이터(90.8초), 표시 수치, 모바일 메뉴도 확인했고 브라우저 오류는 0건입니다. `python scripts/verify-results.py`도 통과했습니다.


## Editorial 디자인 개편

- `src/ui.ts`: 헤더·푸터·연락처·공통 배지·기존 커서 마크업
- `src/home.ts`: 이름 중심 Hero, 코드 형식 프로필 패널, 소개·기술·Bento 갤러리·타임라인
- `src/project-page.ts`: 실제 역할·검증 범위를 유지한 상세 페이지, 목차와 이전/다음 이동
- `src/render.ts`: 정적 문서 및 메타데이터 구성
- `src/main.ts`: 메뉴·현재 섹션·필터 FLIP 애니메이션·포인터 반응 테두리·한 번만 나타나는 스크롤 Reveal·복사 피드백

Space Grotesk와 JetBrains Mono는 npm 패키지에서 직접 번들링하므로 외부 폰트 CDN을 호출하지 않습니다. 본문은 Pretendard/Noto Sans KR/시스템 폰트 폴백을 사용합니다. 선택한 테마는 `portfolio-theme-editorial` 키에 저장하며 이전 밝은 기본 테마 설정과 분리했습니다.

프로젝트 필터는 실제 콘텐츠가 있는 All / AI·ML / Data / Web만 제공합니다. Backend·Deployment 숙련도나 GitHub 활동 수치를 만들어 넣지 않았고, 이력서 파일이 없어 Resume 버튼도 표시하지 않았습니다. 각 자료는 실제 시연·포스터·실험 그래프이며 주택 프로젝트는 구현 방법을 표현한 다이어그램입니다.

Reveal은 IntersectionObserver로 한 번만 실행하고 빠른 스크롤 및 키보드 포커스 이동에도 콘텐츠를 표시합니다. JS 비활성화 시 모든 정적 콘텐츠가 보이며, 비활성 필터 버튼은 표시하지 않습니다. reduced-motion에서는 Reveal·FLIP·페이지 전환 효과를 생략합니다. 페이지 이동은 지원 브라우저의 CSS View Transitions를 사용하며 나머지 브라우저에서는 일반 문서 이동을 유지합니다.

개편 검증: 프로덕션 빌드, 5개 페이지 × 320/390/640/768/1024/1440px, 4개 필터, 실제 자료 링크, 이메일 복사, 테마 저장, Scroll Spy, 모바일 메뉴·Escape·키보드 첫 링크/본문 포커스, reduced-motion, JS 없는 정적 본문을 확인했습니다. 콘솔 오류와 페이지 가로 넘침은 없었습니다. 로컬 모바일 Lighthouse 측정은 성능·접근성·권장사항·SEO 각 100점입니다(실제 배포 환경의 점수를 보장하는 수치는 아닙니다). `src/cursor.ts` 해시를 비교해 기존 커서 구현이 유지됨을 확인했습니다.

## Vercel 배포

영문 이름은 Chung Yujin, 로고는 CY.로 수정했습니다. `vercel.json`에 Vite 빌드 명령, `dist` 출력 폴더와 상세 페이지 URL 옵션을 설정했습니다.

Vercel 계정으로 인증한 로컬 터미널에서 이 프로젝트 폴더를 연 뒤 실행합니다.

```sh
npm ci
npx vercel login
npx vercel deploy --prod
```

현재 클라우드에서 배포를 시도했으나 Vercel API/사이트 접속이 네트워크 정책의 CONNECT 403으로 차단됐습니다. 기존 Vercel 인증은 없고, CLI 임시 배포도 이 시도에서는 제공되지 않았습니다. 실제 배포 URL은 아직 생성되지 않았습니다. 이 환경에서 재개하려면 인터넷 허용 목록에 `api.vercel.com`, `vercel.com`, `auth.vercel.com`을 추가하고, 이후 생성되는 사이트를 검증하기 위한 `*.vercel.app` 접근을 허용해야 합니다. 인증 정보는 채팅에 적지 말고 Vercel 로그인 또는 환경 설정의 안전한 자격 증명 기능을 사용하세요.
