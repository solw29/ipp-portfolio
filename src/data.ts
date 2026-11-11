export const profile = {
  name: '정유진', englishName: 'Chung Yujin',
  university: '동덕여자대학교', major: '데이터사이언스 전공 · 컴퓨터학 복수전공',
  role: 'SW Development / Data & AI', email: 'minteugene59@gmail.com',
  phone: '010-9461-3886', github: 'https://github.com/solw29',
  introduction: '데이터사이언스와 컴퓨터학을 공부하며 웹 프로토타입 개발, API 연동, 데이터 처리와 AI 모델 비교 실험을 수행해 왔습니다.',
};
// Public mode is the default. Set the official program name only after confirmation.
export const contentSettings = {
  application: { enabled: false, company: '주식회사 누아', role: 'SW개발', program: null as string | null },
  showPhone: true, // Previously explicitly provided for publication; can be disabled independently.
};
export interface Project {
  slug: string; number: string; category: string; title: string; subtitle: string;
  period: string; team: string; status: string; ongoing: boolean;
  summary: string; role: string; tags: string[]; outcome: string;
  context: string; responsibilities: string[]; flow: string[];
  results: string[]; limits: string[]; learning: string;
  visuals?: {kind: 'screenshot' | 'chart' | 'diagram'; src: string; alt: string; caption: string; width: number; height: number}[];
  image?: {src: string; alt: string; caption: string};
  links?: {label: string; url: string}[];
}
export const experience: Project = {
  slug: 'scopion', number: '01', category: 'WEB DEVELOPMENT',
  title: 'SCOPION', subtitle: '탄소배출량 관리 플랫폼', period: '2026.07 — Present',
  team: '5인 팀 · AI상상그라운드 상상챌린지', status: '프로토타입 개발 중', ongoing: true,
  summary: '자동차부품 중소기업의 Scope 1·2 배출량 관리를 위한 웹 프로토타입. 고지서에서 추출한 값을 검토하고 승인하는 흐름을 연결했습니다.',
  role: '웹 화면 구현 · 외부 API 연동', tags: ['TypeScript', 'Vite', 'Tailwind CSS', 'OCR API', 'Claude Sonnet API'],
  outcome: '고지서 업로드부터 검토·승인·산정·출력까지 이어지는 화면 구현',
  context: '20개 선발 팀 중 하나로 참여했습니다. 팀은 자동차부품 중소기업의 배출량 관리 흐름을 다루며, 저는 웹 화면과 외부 API 연동을 담당했습니다.',
  responsibilities: ['TypeScript·Vite·Tailwind CSS 기반 웹 프로토타입 구현', 'OCR API로 고지서 값을 추출하고 팀 공통 데이터 스키마에 맞춰 화면과 연결', 'Claude Sonnet API를 이용해 고지서 값과 과거 기록을 설명하는 챗봇형 에이전트 구현', '추출값 검토·수정, 관리자 승인, 배출량 산정, 원청 양식 출력 흐름 연결'],
  flow: ['자료 업로드', 'OCR 값 추출', '검토·수정', '관리자 승인', '배출량 산정', '원청 양식 출력'],
  results: ['실제 전기 고지서 2건과 합성 가스 고지서로 검증 규칙 확인', '추출 결과를 공통 데이터 스키마에 맞춰 검토 화면으로 연결', '배출계수의 출처 확인 전까지 시연에서는 데모 값으로 명시'],
  limits: ['운영 중인 완성 서비스가 아닌 개발 중인 프로토타입입니다.', '실제 가스 고지서 검증은 진행 중입니다.', '과거 시계열 기록을 활용한 설명 기능을 보강하고 있습니다.'],
  learning: 'API 응답을 보여주는 것에서 끝내지 않고, 사용자가 추출값을 확인하고 수정한 뒤 승인할 수 있도록 데이터와 화면의 흐름을 연결했습니다.',
};
export const projects: Project[] = [
  {
    slug: 'shopping-qa', number: '03', category: 'RESEARCH · RAG', title: '신뢰성 인지 쇼핑 QA RAG', subtitle: '이커머스 상품정보 기반 신뢰성 인지 RAG',
    period: '2026.09 — 2026.11', team: '2인 연구형 캡스톤', status: '투고·포스터 발표 완료', ongoing: false,
    summary: '상품 설명과 리뷰가 상충하거나 근거가 부족할 때, 답변 방식을 조절하는 RAG를 연구했습니다.',
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
    slug: 'anomaly-detection', number: '02', category: 'RESEARCH · DEEP LEARNING', title: '제조 시계열 이상탐지 연구', subtitle: '딥러닝 제조 이상탐지 프로젝트',
    period: '2026.09 — 2026.11', team: '4인 팀 · 딥러닝 수업', status: 'PyTorch 개인 실험 3회 완료 · TensorFlow 팀 구현 검증 중', ongoing: true,
    summary: '제조 시계열의 결측값을 복원하면서 이상 탐지 신호를 보존하는 BRITS 기반 학습 방법을 연구했습니다. 개인 PyTorch 실험 3회에서 중첩률 50% 조건의 AUPRC를 Pair-control 대비 약 16.6% 높이고 MAE를 약 9.7% 줄였습니다. 팀 TensorFlow 구현과 데이터 파이프라인 통합·검증은 진행 중입니다.',
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
    slug: 'housing-price', number: '04', category: 'DATA · MACHINE LEARNING', title: '다세대주택 가격예측', subtitle: 'LSTM·XGBoost 앙상블과 SHAP 분석',
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
export const allProjects = [experience, projects[1], projects[0], projects[2]];
export interface Skill { name: string; }
// Exact Notion inventory supplied by the user; no project proficiency is implied.
export const skillGroups: {title:string; subtitle:string; skills:Skill[]}[] = [
  {title:'Languages',subtitle:'',skills:[{name:'Python'},{name:'C'},{name:'Java'},{name:'TypeScript'}]},
  {title:'Web',subtitle:'',skills:[{name:'JSP'},{name:'Vite'},{name:'Tailwind CSS'}]},
  {title:'DB',subtitle:'SQL 기반 데이터 조회 및 관리',skills:[{name:'Oracle'},{name:'MySQL'}]},
  {title:'AI & Data',subtitle:'',skills:[{name:'PyTorch'},{name:'TensorFlow'},{name:'Hugging Face Transformers'}]},
  {title:'Development Tools',subtitle:'',skills:[{name:'Linux'},{name:'Git'},{name:'GitHub'}]},
];
