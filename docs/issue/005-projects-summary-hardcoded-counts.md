# 005 — Projects Summary 카운트가 하드코딩되어 실제 데이터와 불일치

- **라우트:** `/projects` (Projects) → Summary 카드
- **심각도:** 하 (데모 데이터 정합)
- **유형:** 코드(파생 값 미사용)

## 현상 (화면 실측)

Summary 카드:

| 지표 | 표시 값 | 실제 데이터 | 일치? |
|------|--------:|------------:|:-----:|
| Projects (활성 workspace 그룹) | **4** | 5 (cstar-cli, nano-edit, canvas, zod-crud, demo-lab) | ✗ |
| Threads (최근 대화와 승인 요청) | **11** | 17 (전체 thread 객체 수) | ✗ |
| Pending (승인 대기 중) | 1 | — | (확인 불가) |

좌측 사이드바·본문 카드에는 분명히 프로젝트 5개가 렌더되는데 Summary는 "Projects 4"라고 표시합니다.
chat 배지 합계(3+2+4+2+6)도 17인데 Threads는 11로 표기됩니다.

## 원인 (소스)

`src/pages/WorkspacePages.tsx`

```ts
metricListBlock({
  columns: 3,
  items: [
    { detail: '활성 workspace 그룹', label: 'Projects', value: '4' },   // 하드코딩
    { detail: '최근 대화와 승인 요청', label: 'Threads',  value: '11' },  // 하드코딩
    { detail: '승인 대기 중',          label: 'Pending',  value: '1' },
  ],
  title: 'Summary',
}),
```

바로 아래 본문은 `projectGroups[0].items`(5개)와 각 `project.threads`로 렌더되는데,
Summary 숫자만 데이터와 분리된 리터럴이라 동기화가 깨졌습니다.

## 제안

데이터에서 파생:

```ts
const projects = projectGroups[0].items
const threadCount = projects.reduce((n, p) => n + p.threads.length, 0)
// value: String(projects.length), value: String(threadCount)
```

"화면에 보이는 목록"과 "요약 숫자"가 같은 소스를 보게 하면 향후 데이터 변경에도 자동 정합.
