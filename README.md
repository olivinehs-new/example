# MOEL Document Classifier

고용노동부 최근 3년 보도자료를 기반으로 문서(QnA/문의/민원 등)의

- 담당부서
- 주요 내용(키워드)

을 분류하는 프로젝트입니다.

추가로 `law.go.kr`의 다음 법령 본문을 반영해 부서 사전을 보강합니다.

- 고용노동부와 그 소속기관 직제
- 고용노동부와 그 소속기관 직제 시행규칙

## Install

```bash
npm install
```

## Full pipeline

```bash
npm run pipeline
```

Pipeline outputs:

- Press data: `data/moel_press_releases_3y.json`
- Legal department dictionary: `data/moel_legal_departments.json`
- Model: `model/moel_doc_classifier.json`

## Individual commands

Collect press releases:

```bash
npm run scrape:moel
```

Build legal department dictionary from law.go.kr:

```bash
npm run build:law
```

Build model:

```bash
npm run build:model
```

Classify text (CLI):

```bash
npm run classify -- --text "임금체불 신고 절차와 사업주 처벌 기준이 궁금합니다."
```

Classify file (CLI):

```bash
npm run classify -- --file ./sample.txt
```

## Web UI (text + attachment)

```bash
npm run serve
```

Open:

`http://localhost:3000`

Supported attachment types:

- txt
- md
- csv
- json
- pdf
- docx

## Notes

- If law.go.kr structure changes, update `src/build-law-departments.js`.
- Scraped press releases can include missing/ambiguous department labels.
- Model quality improves when `scrape:moel` is refreshed regularly.
