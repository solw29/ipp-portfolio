export const profile = {
  name: '정유진', englishName: 'Chung Yujin',
  university: '동덕여자대학교', major: '데이터사이언스 전공 · 컴퓨터학 복수전공 승인 (2027학년도 1학기부터 이수 예정)',
  role: 'SW Development / Data & AI', email: 'minteugene59@gmail.com',
  github: 'https://github.com/solw29',
  introduction: '막히는 문제는 원인부터 살펴보고, 배운 것은 팀과 나눕니다. 맡은 역할에 책임을 갖고 함께 결과물을 완성하는 개발자입니다.',
};
// Company-neutral public defaults; optional application copy must be explicitly configured.
export const contentSettings = {
  application: { enabled: false, company: null as string | null, role: null as string | null, program: null as string | null },
};
export const projectFilters = [
  {key:'all',label:'All'}, {key:'ai',label:'AI / ML'}, {key:'data',label:'Data'},
  {key:'web',label:'Web'}, {key:'automation',label:'Automation / DevTools'},
] as const;
export type ProjectCategory = Exclude<typeof projectFilters[number]['key'], 'all'>;
export interface Project {
  slug: string; number?: string; category: string; filters: ProjectCategory[]; title: string; subtitle: string;
  cardTags?: string[];
  engineering?: string[];
  caseStudies?: {title: string; problem: string; solution: string; result: string}[];
  demo?: {src: string; poster?: string; caption: string; description: string};
  period: string; team: string; status: string; ongoing: boolean;
  summary: string; role: string; tags: string[]; outcome: string;
  context: string; responsibilities: string[]; flow: string[];
  results: string[]; limits: string[]; learning: string;
  visuals?: {kind: 'screenshot' | 'chart' | 'diagram'; src: string; alt: string; caption: string; width: number; height: number}[];
  image?: {src: string; alt: string; caption: string};
  links?: {label: string; url: string}[];
}
export const experience: Project = {
  slug: 'scopion', category: 'WEB DEVELOPMENT', filters: ['web'],
  title: 'SCOPION', subtitle: '탄소배출량 관리 플랫폼', period: '2026.07 — Present',
  team: '5인 팀 · AI상상그라운드 상상챌린지', status: '프로토타입 개발 중', ongoing: true,
  summary: '자동차부품 중소기업의 Scope 1·2 배출량 관리를 위한 웹 프로토타입. 고지서에서 추출한 값을 검토하고 승인하는 흐름을 연결했습니다.',
  cardTags: ['TypeScript','Vite','Tailwind CSS','OCR API','Claude API'],
  role: '웹 화면 구현 · 외부 API 연동', tags: ['TypeScript', 'Vite', 'Tailwind CSS', 'OCR API', 'Claude Sonnet API'],
  outcome: '고지서 업로드부터 검토·승인·산정·출력까지 이어지는 화면 구현',
  context: '20개 선발 팀 중 하나로 참여했습니다. 팀은 자동차부품 중소기업의 배출량 관리 흐름을 다루며, 저는 웹 화면과 외부 API 연동을 담당했습니다.',
  responsibilities: ['TypeScript·Vite·Tailwind CSS 기반 웹 프로토타입 구현', 'OCR API로 고지서 값을 추출하고 팀 공통 데이터 스키마에 맞춰 화면과 연결', 'Claude Sonnet API를 이용해 고지서 값과 과거 기록을 설명하는 챗봇형 에이전트 구현', '추출값 검토·수정, 관리자 승인, 배출량 산정, 원청 양식 출력 흐름 연결'],
  flow: ['자료 업로드', 'OCR 값 추출', '검토·수정', '관리자 승인', '배출량 산정', '원청 양식 출력'],
  caseStudies: [
    {title:'OCR 추출값의 검증과 최종 확정 분리',problem:'고지서 OCR 결과를 그대로 계산에 사용하면 오인식된 값이 후속 산정으로 전달될 수 있습니다.',solution:'추출값을 공통 스키마에 연결하고 사용자가 검토·수정한 후 관리자가 승인하는 흐름을 웹 화면으로 구성했습니다. Claude 설명 에이전트는 계산 확정 권한과 분리했습니다.',result:'실제 전기 고지서 2건·합성 가스 고지서 1건에서 입력 및 검증 규칙을 확인했습니다. 실제 운영 정확도는 아직 검증 전입니다.'},
  ],
  results: ['실제 전기 고지서 2건과 합성 가스 고지서로 검증 규칙 확인', '추출 결과를 공통 데이터 스키마에 맞춰 검토 화면으로 연결', '배출계수의 출처 확인 전까지 시연에서는 데모 값으로 명시'],
  limits: ['운영 중인 완성 서비스가 아닌 개발 중인 프로토타입입니다.', '실제 가스 고지서 검증은 진행 중입니다.', '과거 시계열 기록을 활용한 설명 기능을 보강하고 있습니다.'],
  learning: 'API 응답을 보여주는 것에서 끝내지 않고, 사용자가 추출값을 확인하고 수정한 뒤 승인할 수 있도록 데이터와 화면의 흐름을 연결했습니다.',
};
export const projects: Project[] = [
  {
    slug: 'shopping-qa', category: 'RESEARCH · RAG', filters: ['ai','data'], title: '신뢰성 인지 쇼핑 QA RAG', subtitle: '이커머스 상품정보 기반 신뢰성 인지 RAG',
    period: '2026.09 — 2026.11', team: '2인 연구형 캡스톤', status: '투고·포스터 발표 완료', ongoing: false,
    summary: '상품 설명과 리뷰가 상충하거나 근거가 부족할 때, 답변 방식을 조절하는 RAG를 연구했습니다.',
    cardTags: ['Python','PyTorch','Hugging Face','scikit-learn','OpenAI API'],
    links: [{label:'Research Poster',url:'/documents/ack-2026-poster.pdf'}],
    role: '데이터 라벨링 · 근거 상태 분류 · 비교 실험', tags: ['Python', 'PyTorch', 'Hugging Face Transformers', 'scikit-learn', 'OpenAI API'],
    outcome: '분류 오류가 답변 품질의 병목임을 비교 실험으로 확인',
    context: '상품 설명과 사용자 리뷰가 서로 다르거나 질문에 답할 근거가 부족한 상황을 다뤘습니다. 근거 상태를 분류하고 그에 맞춰 답변하도록 하는 접근을 비교했습니다.',
    responsibilities: ['247개 상품의 평가 데이터 600건을 팀원과 공동 라벨링·검증', '상품 단위로 데이터를 분리하고 DeBERTa 기반 근거 상태 분류기 학습 코드 구현·실행', 'OpenAI API 답변 생성 및 RAG 비교 실험 코드 구현·실행', 'AI Judge 예비 평가 결과 정리 및 정답 근거 상태를 입력하는 Oracle 분석'],
    flow: ['상품·리뷰 데이터', '근거 상태 분류', '답변 방식 조절', '비교 평가'],
    results: ['AI Judge 예비 평가에서 LLM 단독·기본 RAG보다 근거 없는 단정이 적었습니다.', '출처 구분 RAG를 전반적으로 넘지는 못했습니다.', '정답 근거 상태를 입력한 결과와 비교하여 분류 오류가 답변 품질의 병목임을 확인했습니다.', 'ACK 2026 논문경진대회 투고 및 11월 6일 포스터 발표 완료'],
    limits: ['AI Judge를 이용한 예비 평가 결과이며 사람 평가는 후속 검증으로 남아 있습니다.', '제안 모델이 모든 비교 모델보다 우수하다고 해석하지 않습니다.'],
    learning: '전체 점수만 보는 대신 근거 상태 분류와 답변 생성 단계를 나누어 비교하면서, 다음 개선이 필요한 지점을 확인했습니다.',
  },
  {
    visuals: [{kind:'diagram',src:'../../media/brits-training-design.png',alt:'제공 도식의 학습 분기 요약: 공통 BRITS 체크포인트에서 Pair-control과 Proposed로 분기하고, 고정 TCN-A 기반 보존 손실은 Proposed에만 추가합니다.',caption:'제공된 BRITS·TCN-A 연구 도식의 학습 비교 부분을 Graphite Cyan으로 재구성한 설명 이미지입니다. 전체 파이프라인이나 팀 최종 성능을 나타내는 결과 화면이 아닙니다.',width:1672,height:941}],
    slug: 'anomaly-detection', category: 'RESEARCH · DEEP LEARNING', filters: ['ai','data'], title: '제조 시계열 이상탐지 연구', subtitle: '딥러닝 제조 이상탐지 프로젝트',
    period: '2026.09 — 2026.11', team: '4인 팀 · 딥러닝 수업', status: 'PyTorch 개인 실험 3개 시드 평가 완료 · TensorFlow 팀 구현 검증 중', ongoing: true,
    summary: '제조 시계열의 결측값을 복원하면서 이상 탐지 신호를 보존하는 BRITS 기반 학습 방법을 연구했습니다. 개인 PyTorch 실험의 3개 시드 평가에서 중첩률 50% 조건의 AUPRC를 Pair-control 대비 약 16.6% 높이고 MAE를 약 9.7% 줄였습니다. 팀 TensorFlow 구현과 데이터 파이프라인 통합·검증은 진행 중입니다.',
    cardTags: ['Python','PyTorch','TensorFlow','Pandas','NumPy'],
    role: '연구 설계 · 개인 PyTorch 실험 · 팀 코드 검토', tags: ['Python', 'PyTorch', 'TensorFlow/Keras', 'Pandas', 'NumPy', 'BRITS'],
    outcome: '개인 PyTorch 3 seeds · Pair-control 대비 AUPRC 약 16.6% 상대 향상 (결측률 20%·중첩률 50%)',
    context: '다변량 제조 시계열의 결측값을 BRITS로 복원하는 과정에서 이상 탐지에 필요한 신호가 약화되는 문제를 다뤘습니다. 합성 이상 쌍과 탐지기 유도 보존 손실을 이용한 복원 방법을 연구하고, 팀장으로 가설과 비교 실험을 설계했습니다. 개인 PyTorch 실험과 팀 TensorFlow 구현은 별개의 코드와 결과로 관리했습니다.',
    responsibilities: ['개인 PyTorch 예비실험: 가설 확인과 팀원 설명을 위해 데이터 처리부터 학습·평가까지 구현', '개인 예비실험: 계획한 5개 시드 중 3개 평가 완료', '팀 TensorFlow 실험: 팀원들이 작성한 TCN·BRITS 코드 검토·수정 및 소규모 학습 동작 점검', '팀 실험의 평가 코드, 최종 검수·결과 정리·보고서 작성 담당', 'GitHub·Notion으로 업무 분담과 진행 상황 공유'],
    flow: ['연구 가설 설정', '개인 PyTorch 예비실험', '팀 TensorFlow 실험', '전체 학습·최종 평가'],
    results: ['개인 PyTorch 실험: 계획한 5개 시드 중 3개(11·22·33) 평가 완료', '결측률 20%·중첩률 50%에서 Pair-control 대비 AUPRC +0.0836(약 16.6% 상대 향상), 복원 MAE 약 9.7% 감소', '실제 TEP 20개 fault 평균 Recall은 약 1.06%p 개선했으나 모든 fault에서 개선되지는 않았습니다.', '팀 TensorFlow 구현과 데이터 파이프라인 통합·검증은 진행 중이며 팀 성능 결과는 포함하지 않았습니다.'],
    limits: ['개인 PyTorch 중간 결과와 팀 TensorFlow 실험은 별개의 작업입니다.', '개인 실험은 계획한 5개 시드 중 3개 결과이며, 팀 실험의 전체 학습과 최종 평가는 진행 중입니다.', 'Recall 임계값은 calibration 데이터에서 명목 FPR 1%에 맞췄습니다. 테스트 FPR이 정확히 1%라는 의미는 아닙니다.'],
    learning: '생소한 연구를 함께 진행하기 위해 데이터 처리부터 평가까지 이어지는 예비실험을 만들고, 이를 바탕으로 팀원에게 전체 실험 흐름을 설명했습니다.',
  },
  {
    visuals: [
      {kind:'chart',src:'../../media/housing-city-comparison.png',alt:'팀 발표 자료의 도시별 XGBoost 성능 비교: RMSE, MAE, R2, MAPE의 Train·Validation·Test 막대그래프',caption:'기계학습 6조(수정본) 20쪽의 실제 비교 그래프 영역을 발췌했습니다. 팀 실험 자료이며 축·범례·수치를 다시 그리거나 변경하지 않았습니다.',width:1424,height:908},
      {kind:'chart',src:'../../media/housing-seoul-shap.png',alt:'팀 발표 자료의 서울 SHAP 분석: LSTM-PCA·기존 매물·신규 피처의 기여도와 비율',caption:'같은 보고서 23쪽의 서울 SHAP 분석 영역입니다. 팀 자료의 결과 해석 예시이며 개인의 단독 분석 성과로 표현하지 않습니다.',width:1344,height:564},
    ],
    slug: 'housing-price', category: 'DATA · MACHINE LEARNING', filters: ['ai','data'], title: '다세대주택 가격예측', subtitle: 'LSTM·XGBoost 앙상블과 SHAP 분석',
    period: '2026.03 — 2026.06', team: '5인 팀 · 기계학습 수업', status: '완료', ongoing: false,
    summary: '서울과 6개 광역시의 다세대주택 가격을 예측하고, 도시별 설정값을 비교하며 모델 결과를 분석했습니다.',
    role: '초기 모델 코드 · 비교 실험 · 보고서·발표 준비', tags: ['Python', 'LSTM', 'XGBoost', 'SHAP'],
    outcome: '실험·보고서·발표를 기한 내 완료 · 조별 평가 2위',
    context: '팀은 서울과 6개 광역시의 다세대주택 가격을 예측하기 위해 LSTM과 XGBoost를 결합하고 SHAP으로 결과를 해석했습니다.',
    responsibilities: ['초기 모델 코드 구현', '도시별 성능 차이 확인 및 설정값 비교 실험', '보고서 초안 작성과 발표 준비', '조장 이탈 이후 데이터 처리·모델 흐름을 팀원에게 설명하고 발표 자료 공동 구성', '역할과 제출 권한의 공백을 팀원들과 조율'],
    flow: ['도시별 데이터', 'LSTM·XGBoost 앙상블', '설정값 비교', 'SHAP 분석'],
    results: ['계획한 실험·보고서·발표를 기한 내 완료', '수업 내 조별 평가 2위'],
    limits: ['수업 프로젝트의 결과이며 실제 시장에서의 예측 성능이나 운영 효과를 검증한 것은 아닙니다.'],
    learning: '모델 구현뿐 아니라 팀원이 전체 데이터 흐름을 이해하도록 설명하고, 역할과 제출 권한을 조율해 함께 결과물을 완성했습니다.',
  },
];
// Evidence checked against public repositories. Dates below identify recorded work,
// not an inferred release date. Keep source-specific claims and limits together.
export const teamsync: Project = {
  slug:'teamsync-ai', category:'AI AUTOMATION · DEVTOOLS', filters:['ai','web','automation'],
  title:'TeamSync AI', subtitle:'PR 분석 자동화와 읽기 전용 리뷰 대시보드',
  period:'2026.11 — Present', team:'개인 프로젝트',
  status:'주요 자동화·평가 구현 완료 · 추가 개선 진행', ongoing:true,
  summary:'GitHub PR의 코드 검사와 LLM 리뷰·테스트 생성을 자동화하고, 결과를 React 대시보드로 조회하는 개발팀 지원 도구입니다.',
  role:'전체 설계 · Python 자동화 파이프라인 · React 대시보드 구현',
  tags:['Python','GitHub Actions','React','TypeScript','OpenAI API','pytest','Ruff','Vite'],
  cardTags:['Python','GitHub Actions','React','TypeScript','OpenAI API','pytest'],
  outcome:'통제된 합성 사례 PR 12건 분석 · 사전 정의 버그 6/6 지적',
  context:'PR 코드 검토, Ruff·pytest 검사 결과 확인, 테스트 초안 작성이 반복되는 문제를 다뤘습니다. 검사와 AI 분석을 분리하고, 결과와 평가 근거를 한곳에서 확인할 수 있도록 개인 프로젝트로 설계·구현했습니다.',
  responsibilities:[
    'Python으로 PR diff 수집, Ruff·pytest 결과 파싱, OpenAI API 리뷰·테스트 초안 생성 파이프라인 구현',
    'GitHub Actions로 검사·분석·생성 테스트 실행·게시 단계를 분리하고 결과 상태 처리',
    '파일·추가 줄의 유효성을 확인한 뒤 PR 댓글을 등록·갱신하고 Discord Webhook으로 알림',
    '평가 결과 JSON Export와 React·TypeScript·Vite 기반 읽기 전용 대시보드 구현',
    'JSON Import, PR 상세, Evaluation, 검색·필터 및 데이터 검증 구현',
  ],
  flow:['GitHub PR 이벤트','변경 코드(diff) 수집','Ruff·pytest 실행 및 결과 파싱','LLM 리뷰·테스트 초안 생성','게시 위치 검증 → PR 댓글·Discord 알림','평가 결과 JSON Export → React 대시보드'],
  caseStudies:[
    {title:'생성 테스트 Import 누락을 버그 검출로 오판하지 않기',problem:'초기 S01 평가에서 LLM이 대상 함수의 import를 빠뜨린 테스트를 생성했습니다. 실행 실패를 실제 버그 검출로 세면 평가가 왜곡됩니다.',solution:'각 pytest 초안에 독립 실행에 필요한 import를 명시하도록 프롬프트를 고치고, NameError·ModuleNotFoundError를 환경 오류로 분류했습니다.',result:'해당 최초 실행은 평가에서 제외하고 재실행 결과를 사용했습니다. 코드 오류와 테스트 실행 오류를 구별하도록 개선했습니다.'},
    {title:'잘못된 기대값과 수정 코드 오탐 분석',problem:'생성 테스트 일부가 함수 계약보다 버그가 있는 현재 구현의 출력을 정답으로 취급해 수정 코드까지 실패시키는 사례가 있었습니다.',solution:'동일한 테스트 초안을 버그·수정 코드 쌍에 실행해 결과를 비교하고, 함수 계약과 결함 회귀 테스트를 우선하도록 생성 지침을 보완했습니다.',result:'기존 평가에서 30개 테스트 중 6개가 버그 실패·수정 통과, 6쌍 중 3쌍이 검출되었습니다. 프롬프트 보완 후 개선 효과는 아직 재측정하지 않았습니다.'},
    {title:'AI 리뷰 위치 검증 및 댓글 중복 방지',problem:'LLM이 출력한 줄 번호가 실제 PR의 추가 코드와 일치하지 않거나, 워크플로 재실행으로 같은 댓글이 중복 게시될 위험이 있습니다.',solution:'diff의 파일·추가 줄을 대조한 뒤 유효한 항목만 게시하고, 고유 마커가 있는 기존 봇 댓글은 새로 생성하지 않고 갱신하도록 했습니다.',result:'합성 사례 실제 PR 평가에서 게시 위치 15/15개가 유효했고, 평가 PR 12건의 봇 댓글 중복이 0건이었습니다. 위치 검증은 지적 내용의 정확도 검증과 구분합니다.'},
  ],
  results:[
    '2026.11.12 평가: 준비한 소형 합성 사례의 실제 GitHub PR 12건에서 AI 분석 12/12 성공',
    '사전 정의 버그 6/6 지적, 게시 위치 15/15 유효. 위치 유효성은 리뷰 내용의 정확성을 뜻하지 않습니다.',
    '동일 생성 테스트 초안을 버그·수정 버전에 실행하여 3/6쌍에서 버그 실패·수정 통과 확인',
    '수정 버전에서 오탐 2건 확인. 생성 테스트 30개 중 수정 버전 통과는 22개였습니다.',
    '저장소 검증 기록: Python 테스트 27개, Vitest 6개, 타입 검사·빌드 및 Chromium 동작 검증 통과',
  ],
  limits:[
    '통제된 합성 사례를 gpt-4o-mini로 한 번 평가한 결과이며 일반적인 실제 코드 리뷰 정확도로 해석하지 않습니다.',
    '생성 테스트의 기대값 오류와 오탐을 개선해야 합니다. 평가 후 프롬프트 보완 효과는 아직 재측정하지 않았습니다.',
    '대시보드는 JSON Import 기반의 읽기 전용 화면이며 실시간 API·DB 자동 연동은 구현되지 않았습니다.',
    '최신 저장소에는 정적 배포 설정만 준비돼 있으며 외부에 배포된 대시보드 URL은 없습니다.',
    '자동 병합·생성 테스트 자동 커밋은 제공하지 않습니다. 신뢰할 수 있는 동일 저장소 PR을 전제로 합니다.',
  ],
  learning:'리뷰 지적, 게시 위치 유효성, 생성 테스트의 버그 검출을 별개로 평가했습니다. 같은 테스트 초안을 두 버전에 실행해 비교 대상을 고정하고, 잘못된 기대값과 오탐을 개선 과제로 분리했습니다.',
  visuals:[{kind:'screenshot',src:'../../media/teamsync-dashboard.png',alt:'실제 TeamSync React 대시보드의 익명화된 평가 데이터: 12개 PR 목록, 상태·검색·평가 메뉴',caption:'TeamSync 저장소의 실제 Chromium 캡처입니다. 익명화된 합성 사례 평가를 탐색하는 로컬 대시보드이며 외부 배포 화면이 아닙니다. FAILED는 검사 상태를 함께 반영하며 분석 성공 여부와 구분합니다.',width:1440,height:1681}],
  demo:{src:'../../media/teamsync-react-demo.mp4?v=7225fc4f',caption:'TeamSync 저장소 제공 시연 영상 · 1분 45초 · 음성 없음',description:'실제 GitHub PR의 분석 댓글·생성 테스트 실행 상태와 평가 결과, React 대시보드를 함께 살펴보는 저장소 제공 영상입니다. 실시간 API·DB 자동 연동이나 외부 대시보드 배포를 뜻하지 않습니다.'},
  links:[
    {label:'View GitHub',url:'https://github.com/solw29/teamsync-ai'},
    {label:'Evaluation Report',url:'https://github.com/solw29/teamsync-ai/blob/079fbc66f0118630d40b6d36d17af27ffc001808/1107_D6/live-report.md'},
    {label:'Demo Video',url:'/media/teamsync-react-demo.mp4?v=7225fc4f'},
    {label:'Validation Report',url:'https://github.com/solw29/teamsync-ai/blob/079fbc66f0118630d40b6d36d17af27ffc001808/docs/react-test-report.md'},
  ],
};
export const planner: Project = {
  slug:'adhd-planner', category:'WEB APPLICATION · BACKEND', filters:['web','ai'],
  title:"ADHD Planner · Let's Go", subtitle:'자연어 일정 추출과 사용자별 계획 관리',
  period:'2026.09.19 기준 소스 기록', team:'개인 프로젝트',
  status:'주요 기능 구현 · 배포 링크 공개', ongoing:true,
  summary:'자연어 입력을 AI로 일정으로 변환하고 사용자별 계획을 저장·관리하는 웹서비스입니다.',
  role:'웹 UI · Node.js API · DB 및 로그인·세션 기능 구현',
  tags:['JavaScript','Node.js','PostgreSQL','SQLite','OpenAI API','HTML','CSS','Vercel Serverless Functions'],
  cardTags:['JavaScript','Node.js','PostgreSQL','SQLite','OpenAI API'],
  outcome:'자연어 일정 추출 · 사용자 프로필 저장 · 동시 수정 충돌 처리',
  context:'비정형 일정 입력을 정리하고, 사용자가 AI 추출 결과를 직접 확인·수정한 뒤 계획으로 확정할 수 있도록 만들었습니다. 사용자별 데이터를 저장하면서 여러 탭에서 수정한 내용이 조용히 덮어써지지 않도록 처리했습니다.',
  responsibilities:[
    'HTML·CSS·Vanilla JavaScript로 자연어 입력, 추출값 검수·수정, 체크리스트와 일정 관리 UI 구현',
    'Node.js API와 OpenAI API를 연결해 자연어 업무를 구조화된 일정으로 추출',
    '닉네임 기반 회원가입·로그인·로그아웃, 쿠키 세션 및 사용자 프로필 조회·저장 구현',
    '로컬 Node 서버와 Vercel Serverless Functions에서 같은 비즈니스 로직을 재사용하도록 분리',
    '로컬 SQLite와 배포용 PostgreSQL의 DB 어댑터 분리',
  ],
  flow:['HTML·CSS·Vanilla JavaScript 화면','Node.js API / Vercel Serverless Functions','OpenAI API 업무 추출','사용자 검수·수정 → 일정 확정','공통 프로필·세션 로직','DB 어댑터 → SQLite(로컬) / PostgreSQL(배포용)'],
  caseStudies:[
    {title:'오후 12시 이후 날짜가 넘어가는 오류와 시간 모델 정리',problem:'초기 플래너에서 오후 12시를 지나면 24시간이 아닌 12시간 만에 하루가 바뀐 것처럼 처리되는 오류를 경험했습니다.',solution:'현재 구현은 24시간제 HH:MM과 실제 날짜를 분리하고, 날짜·시각을 절대 분 단위로 비교합니다. 자정 이후 일정은 실제 시작·종료 날짜와 체크리스트 귀속 날짜를 별도로 관리합니다.',result:'현재 코드에 24시간 범위 검증, 자정 횡단 일정 비교, 새벽 0~4시의 전날 플래너 귀속 규칙이 반영되어 있습니다. 과거 오류를 만든 최초 코드의 정확한 원인은 별도 기록으로 확인하지 못했습니다.'},
    {title:'페이지를 켜 둔 채 자정을 넘겨도 오늘 날짜 갱신',problem:'초기에는 페이지를 처음 열 때 계산한 날짜가 유지되어, 자정을 넘겨도 오늘 화면이 이전 날짜로 남는 문제가 있었습니다.',solution:'현재 날짜를 매번 계산하는 함수로 분리하고 30초 주기 검사·focus·visibilitychange 이벤트로 날짜 전환을 감지합니다. 입력·수정 화면이 열린 경우에는 사용자의 입력을 보호하도록 갱신을 보류합니다.',result:'현재 구현에서는 실제 자정의 달력 날짜와 오전 4시의 플래너 기준 날짜 변화를 각각 감지하고 관련 화면을 다시 그리도록 구성했습니다.'},
    {title:'닉네임 중복·세션·관리자 인증의 경계',problem:'계정별 일정을 저장하려면 닉네임 오타·대소문자 중복·세션 만료·일반 사용자와 관리자 권한을 구분해야 했습니다.',solution:'trim·Unicode NFC 정규화와 소문자 비교 키를 사용하고 DB에 UNIQUE 제약조건을 두었습니다. 일반 사용자에게는 HttpOnly 쿠키 세션, 관리자에게는 별도 비밀번호(scrypt 해시)와 관리자 세션을 적용했습니다.',result:'가입 중 닉네임 중복은 HTTP 409, 미등록 닉네임 로그인은 404로 구분합니다. 일반 사용자 로그인은 닉네임만 사용하는 방식으로 계정 소유권 인증이 충분하지 않아 개선이 필요합니다.'},
    {title:'동시 저장으로 최신 일정이 덮어써지는 문제',problem:'두 탭이 같은 프로필 버전을 읽고 서로 다른 변경을 저장하면 늦게 도착한 요청이 먼저 저장된 내용을 덮어쓸 수 있습니다.',solution:'SQLite·PostgreSQL 양쪽에 expectedRevision 일치 조건의 UPDATE를 구현하고 불일치 시 HTTP 409 Conflict와 현재 revision을 반환합니다.',result:'충돌을 조용히 덮어쓰지 않고 사용자에게 최신 데이터 확인 후 재시도를 안내하도록 구성했습니다.'},
    {title:'서버와 브라우저 시간대 차이',problem:'Vercel 서버가 UTC 기준으로 동작할 때 한국 자정 이후 자연어의 오늘·내일을 전날 기준으로 해석할 수 있습니다.',solution:'AI 업무 추출 요청 시작 시 브라우저 로컬 날짜를 clientDate로 전송하고, 서버는 이를 시스템 프롬프트의 기준 날짜로 우선 사용하도록 했습니다.',result:'서버 시간대에 관계없이 사용자 브라우저 날짜를 기준으로 상대 날짜를 해석하도록 구현했습니다. 자동화된 시간대 회귀 테스트는 추가 과제입니다.'},
  ],
  engineering:[
    '클라이언트의 expectedRevision과 저장된 revision이 일치할 때만 UPDATE하도록 두 DB 어댑터에 조건부 갱신 구현',
    '동시 수정 충돌은 HTTP 409 Conflict와 currentRevision으로 반환하여 기존 데이터를 무조건 덮어쓰지 않도록 처리',
    '로그인 여부·세션 만료·저장 실패를 구분하고, 충돌 시 최신 데이터 확인 후 재시도하도록 UI 안내',
  ],
  results:[
    '저장소 코드에서 자연어 일정 추출, 닉네임 로그인·세션, 사용자별 프로필 저장 구현 확인',
    'SQLite·PostgreSQL 어댑터에서 revision 조건부 갱신과 API의 409 충돌 응답 확인',
    'README에 Vercel 배포 주소가 공개돼 있습니다. 이번 작업 환경에서는 해당 주소 접속이 차단돼 현재 운영 상태는 검증하지 못했습니다.',
  ],
  limits:[
    '인증·API·DB 관련 자동 테스트와 CI 보강이 필요합니다. 소스 확인을 운영 환경의 기능 검증으로 표현하지 않습니다.',
    '일반 사용자 로그인은 닉네임 기반이며 강한 본인 인증을 제공하지 않습니다.',
    '배포 환경은 PostgreSQL 연결 설정이 필요하며, 미설정 시 로그인·저장 API는 503을 반환합니다.',
    '최초 커밋은 2026.09.19에 확인되지만 정확한 개발 시작일과 운영 배포일은 확인되지 않았습니다.',
  ],
  learning:'로컬 서버와 서버리스 함수의 요청 어댑터를 나누고 공통 로직을 재사용했습니다. 저장 시 revision을 검사해 다중 탭의 변경 충돌을 드러내고 사용자가 다음 동작을 선택할 수 있도록 구성했습니다.',
  links:[{label:'View GitHub',url:'https://github.com/solw29/adhd-planner'},{label:'Live Demo',url:'https://adhd-planner-five.vercel.app/'}],
};
// One ordered collection drives card numbering, HTML routes and previous/next links.
export const allProjects = [teamsync, planner, experience, projects[0], projects[1], projects[2]]
  .map((project,index)=>({...project,number:String(index+1).padStart(2,'0')}));
export interface Skill { name: string; }
// Exact Notion inventory supplied by the user; no project proficiency is implied.
export const skillGroups: {title:string; subtitle:string; skills:Skill[]}[] = [
  {title:'Languages',subtitle:'',skills:[{name:'Python'},{name:'TypeScript'},{name:'JavaScript'},{name:'C'},{name:'Java'}]},
  {title:'Web / Backend',subtitle:'',skills:[{name:'React'},{name:'Node.js'},{name:'Vite'},{name:'Tailwind CSS'},{name:'HTML/CSS'},{name:'JSP'}]},
  {title:'Database',subtitle:'',skills:[{name:'PostgreSQL'},{name:'SQLite'},{name:'Oracle'},{name:'MySQL'}]},
  {title:'AI & Data',subtitle:'',skills:[{name:'PyTorch'},{name:'TensorFlow'},{name:'Hugging Face Transformers'}]},
  {title:'Development Tools',subtitle:'',skills:[{name:'Linux'},{name:'Git'},{name:'GitHub'}]},
];
