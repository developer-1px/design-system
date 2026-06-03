# 004 — Tokens 페이지 State 스와치에 `--ds-warning` 누락

- **라우트:** `/tokens` (Values) → State 섹션
- **심각도:** 하 (쇼케이스/문서 누락, 시각 버그 아님)
- **유형:** 구성(토큰 카탈로그 완전성)

## 현상 (화면 실측)

Tokens 페이지 `State` 카드에 스와치가 3개만 표시됩니다.

- `--ds-positive` (초록)
- `--ds-danger` (빨강)
- `--ds-info` (파랑)

`warning`(주황) 스와치가 없습니다. 그런데 실제 배지 톤 중 **가장 많이 쓰이는 것이 warning**입니다
(Pending · Review · Queued · Draft · Watch · Conflict · Open 등 — approvals/sources/schedule/content/crm 전반).

## 원인 (소스)

토큰 자체는 정의돼 있습니다 — `src/design-system/tokens.css`

```css
--ds-positive: #247a52;
--ds-warning:  #9a661a;   /* 정의됨 */
--ds-danger:   #bd5550;
--ds-info:     #4e72cc;
```

`BadgeTone`도 4종을 포함 — `src/design-system/primitives.tsx`

```ts
export type BadgeTone = 'positive' | 'danger' | 'warning' | 'info'
```

하지만 Tokens 페이지가 읽는 카탈로그 데이터에서 빠져 있습니다 — `src/data/demo.ts`

```ts
{
  label: 'State',
  tokens: [
    ['--ds-positive', 'var(--ds-positive)'],
    ['--ds-danger',   'var(--ds-danger)'],
    ['--ds-info',     'var(--ds-info)'],
    // ← '--ds-warning' 누락
  ],
},
```

## 제안

`tokenGroups`의 State 항목에 `['--ds-warning', 'var(--ds-warning)']`를 추가.
토큰 카탈로그는 실제 정의(tokens.css)·타입(BadgeTone)과 1:1이어야 합니다.
