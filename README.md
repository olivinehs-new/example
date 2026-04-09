# MOEL Document Classifier (Vercel Serverless)

고용노동부 최근 3년 보도자료 + law.go.kr 직제/시행규칙을 기반으로  
문서의 `담당부서`와 `주요 키워드`를 분류합니다.

## 1) 설치

```bash
npm install
```

## 2) 데이터/모델 생성

```bash
npm run pipeline
```

생성 파일:

- `data/moel_press_releases_3y.json`
- `data/moel_legal_departments.json`
- `model/moel_doc_classifier.json`

## 3) 로컬 CLI 분류

```bash
npm run classify -- --text "임금체불 신고 절차와 사업주 처벌 기준 문의"
```

## 4) Vercel 배포 (서버 실행 불필요)

이 프로젝트는 Express 서버를 띄우지 않습니다.

- 정적 페이지: `public/*`
- 서버리스 API: `api/meta.js`, `api/classify.js`
- 라우팅: `vercel.json`

배포:

```bash
vercel
```

또는 GitHub 연동 후 Vercel에서 자동 배포하세요.

## 5) 웹 기능

- 텍스트 입력
- 파일 업로드: `txt`, `md`, `csv`, `json`, `pdf`, `docx`
- 결과: 예측 부서, 후보 부서, 주요 키워드, 유사 보도자료

## 6) 참고

- law.go.kr 구조가 바뀌면 `src/build-law-departments.js`를 조정해야 합니다.
- 모델 파일(`model/*.json`)은 용량이 클 수 있으므로 Vercel 프로젝트 설정에서 업로드/배포 제한을 확인하세요.
