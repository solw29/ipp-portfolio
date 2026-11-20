import {allProjects, type Project} from './data';
import {escapeHtml as e} from './ui';
import results from './experiment-results.json';

export function experimentEvidence(base: string) {
 const rows = results.synthetic;
 const pair = rows.find(r=>r.method==='Pair-control' && r.overlap==='0.5')!;
 const proposed = rows.find(r=>r.method==='Proposed' && r.overlap==='0.5')!;
 const pairTep = results.tep.find(r=>r.method==='Pair-control')!;
 const proposedTep = results.tep.find(r=>r.method==='Proposed')!;
 const n=(v:string)=>Number(v).toFixed(4);
 const range=(row:Record<string,string>,metric:string)=>`${n(row[`${metric}_mean`])} ± ${n(row[`${metric}_std`])}`;
 return `<div class="experiment-evidence" id="experiment-results"><div class="evidence-heading"><span class="eyebrow">PERSONAL PYTORCH EXPERIMENT · 3 SEEDS</span><h3>AUPRC 개선을 확인한 개인 실험</h3><p>결측률 20% · 합성 이상–결측 중첩률 50% · seeds 11, 22, 33<br>비교 대상: 이상 보존 손실을 추가하지 않은 Pair-control</p></div><figure class="result-figure"><a href="${base}results/anomaly/auprc-overlap-3seeds.svg" download><img src="${base}results/anomaly/auprc-overlap-3seeds.svg" alt="개인 PyTorch 실험, 3 seeds. 중첩률 0·50·100%별 Pair-control과 Proposed AUPRC 비교. 오차 막대는 표본 표준편차입니다." loading="lazy" width="900" height="550"></a><figcaption>개인 PyTorch 실험, 3 seeds · 평균 ± 표본 표준편차. 그래프를 선택하면 SVG를 내려받습니다. 팀 TensorFlow 결과는 포함하지 않았습니다.</figcaption></figure><div class="table-scroll" tabindex="0" role="region" aria-label="개인 실험 성능 비교표"><table><caption>중첩률 50% 합성 이상 성능 및 TEP 20개 fault 평균 Recall</caption><thead><tr><th scope="col">지표</th><th scope="col">Pair-control</th><th scope="col">Proposed</th></tr></thead><tbody><tr><th scope="row">합성 이상 AUPRC ↑</th><td>${range(pair,'auprc')}</td><td><strong>${range(proposed,'auprc')}</strong></td></tr><tr><th scope="row">복원 MAE ↓</th><td>${range(pair,'mae')}</td><td>${range(proposed,'mae')}</td></tr><tr><th scope="row">실제 TEP fault 평균 Recall ↑</th><td>${range(pairTep,'recall')}</td><td>${range(proposedTep,'recall')}</td></tr></tbody></table></div><p class="evidence-note">AUPRC 절대 차이 +0.0836, 상대 향상 약 16.6%. 복원 MAE는 약 9.7% 감소했습니다. MAE는 제공된 CSV에서 중첩률별로 동일하게 기록된 값입니다.</p><p class="evidence-note">TEP Recall은 각 시드에서 20개 fault를 평균한 뒤 시드 간 평균과 표본 표준편차를 구했습니다. 개선 폭은 약 1.06%p이며 모든 fault에서 개선되지는 않았습니다. 임계값은 calibration 데이터의 명목 FPR 1% 기준이며 테스트 FPR 1%를 보장하지 않습니다.</p><details class="overlap-data"><summary>중첩률별 AUPRC 원자료 보기</summary><div class="table-scroll"><table><caption>평균 ± 표본 표준편차 · 3 seeds</caption><thead><tr><th scope="col">중첩률</th><th scope="col">Pair-control</th><th scope="col">Proposed</th></tr></thead><tbody>${['0.0','0.5','1.0'].map(o=>`<tr><th scope="row">${Number(o)*100}%</th><td>${range(rows.find(r=>r.method==='Pair-control'&&r.overlap===o)!,'auprc')}</td><td>${range(rows.find(r=>r.method==='Proposed'&&r.overlap===o)!,'auprc')}</td></tr>`).join('')}</tbody></table></div></details><div class="evidence-downloads"><a class="button" href="${base}results/anomaly/personal-pytorch-3seeds.zip" download>결과 CSV 전체 ZIP ↓</a><a class="text-link" href="${base}results/anomaly/synthetic_summary_3seeds.csv" download>합성 이상 요약 CSV ↓</a><a class="text-link" href="${base}results/anomaly/tep_fault_macro_summary_3seeds.csv" download>TEP 요약 CSV ↓</a></div><p class="repository-note">팀 저장소 비공개</p></div>`;
}

export function projectMedia(slug: string, base: string) {
 const project=allProjects.find(p=>p.slug===slug);
 if(project?.demo){
  const d=project.demo;
  return `<section class="project-media" id="media" aria-label="${e(project.title)} 시연 영상"><div><span class="eyebrow">ACTUAL DEMO / LOCAL RECORDING</span><h2>실제 대시보드 시연</h2><p>${e(d.description)}</p></div><figure><video controls playsinline preload="metadata" ${d.poster?`poster="${e(d.poster)}"`:''} aria-label="${e(project.title)} 저장소 제공 무음 시연 영상"><source src="${e(d.src)}" type="video/mp4">아래 링크에서 영상 파일을 내려받을 수 있습니다.</video><figcaption>${e(d.caption)}</figcaption></figure><a class="text-link" href="${e(d.src)}" download>Demo Video 내려받기 ↓</a></section>`;
 }
 if (slug==='scopion') return `<section class="project-media" id="media" aria-label="SCOPION 시연 영상"><div><span class="eyebrow">PROTOTYPE WALKTHROUGH</span><h2>실제 프로토타입 시연</h2><p>업로드·추출값 검토·관리자 승인·양식 출력 흐름을 담은 제공 영상입니다. 영상의 시연 값은 실제 운영 성과를 뜻하지 않습니다.</p></div><figure><video controls playsinline preload="metadata" poster="${base}media/scopion-demo-poster.jpg" aria-label="SCOPION 웹 프로토타입 화면 시연, 음성 없는 영상"><source src="${base}media/scopion-demo.mp4" type="video/mp4">브라우저에서 재생할 수 없으면 아래 영상 파일을 내려받아 주세요.</video><figcaption>SCOPION · 사용자 제공 시연 영상 · 1분 31초 · 음성 없음</figcaption></figure><details class="video-description"><summary>영상에서 다루는 흐름을 글로 보기</summary><p>자료 업로드 → OCR 추출값 확인 → 검토·수정 → 관리자 승인 → 배출량 산정 → 원청 양식 출력. 고지서 추출값과 공통 스키마를 화면으로 연결한 프로토타입을 시연합니다. 실제 전기 고지서 2건·합성 가스 고지서 검증 범위와 남은 작업은 아래 본문에 구분했습니다.</p></details><a class="text-link" href="${base}media/scopion-demo.mp4" download>시연 영상 내려받기 ↓</a></section>`;
 if (slug==='shopping-qa') {
  const documents=[
   {title:'발표 포스터',label:'RESEARCH POSTER',pdf:'ack-2026-poster.pdf',preview:'capstone-poster.png',width:849,height:1200,alt:'ACK 2026 발표 포스터: 신뢰성 인지 RAG의 데이터셋, 파이프라인, AI Judge 예비 평가와 Oracle 분석',caption:'연구의 구현 과정과 예비 평가를 정리한 실제 발표 포스터입니다.'},
   {title:'학술대회 논문',label:'RESEARCH PAPER · 3 PAGES',pdf:'ack-2026-paper.pdf',preview:'capstone-paper-preview.png',width:849,height:1200,alt:'ACK 2026 논문 첫 페이지: 상충 및 불충분한 상품정보 환경에서 근거 기반 쇼핑 질의응답을 위한 신뢰성 인지 RAG',caption:'제공된 3쪽 논문의 첫 페이지입니다. PDF를 열면 전체 내용을 볼 수 있습니다.'},
  ];
  return `<section class="project-media research-media" id="media" aria-label="ACK 2026 발표 포스터와 논문"><div><span class="eyebrow">ACK 2026 · RESEARCH MATERIALS</span><h2>포스터와 논문으로 보는 연구</h2><p>상충·불충분한 상품정보를 다룬 신뢰성 인지 RAG 연구의 실제 발표 자료입니다. 각 자료를 선택하면 원본 PDF가 새 창에서 열립니다.</p></div><div class="research-documents">${documents.map(d=>`<article class="research-document-card"><div class="research-document-header"><span class="eyebrow">${d.label}</span><h3>${d.title}</h3></div><figure><a class="research-document-preview" href="${base}documents/${d.pdf}" target="_blank" rel="noopener noreferrer" aria-label="${d.title} 원본 PDF 새 창에서 보기"><img src="${base}media/${d.preview}" alt="${e(d.alt)}" width="${d.width}" height="${d.height}" loading="lazy"></a><figcaption>${d.caption}</figcaption></figure><div class="research-document-actions"><a class="text-link" href="${base}documents/${d.pdf}" target="_blank" rel="noopener noreferrer">${d.title} PDF 보기 ↗</a><a class="text-link" href="${base}documents/${d.pdf}" download>${d.title} 다운로드 ↓</a></div></article>`).join('')}</div></section>`;
 }

 return '';
}

// Only render supplied assets. Empty collections deliberately produce no placeholder.
export function visualGallery(project:Project) {
 const assets=project.visuals || [];
 const legacy=project.image?`<figure class="project-image"><img src="${e(project.image.src)}" alt="${e(project.image.alt)}" loading="lazy"><figcaption>${e(project.image.caption)}</figcaption></figure>`:'';
 return legacy+(assets.length?`<section class="visual-gallery" aria-label="프로젝트 실제 시각 자료">${assets.map(a=>`<figure data-visual-kind="${a.kind}"><a href="${e(a.src)}" target="_blank" rel="noopener noreferrer"><img src="${e(a.src)}" alt="${e(a.alt)}" width="${a.width}" height="${a.height}" loading="lazy"></a><figcaption>${e(a.caption)}</figcaption></figure>`).join('')}</section>`:'');
}
