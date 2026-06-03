# 002 — `conflict`와 `open`이 동일한 warning 톤 → 문제/정상 구분 불가

- **라우트:** `/schedule` (Resource plan) — 그 외 state 배지를 쓰는 전 페이지에 영향
- **심각도:** 중 (의미 색상 정합)
- **유형:** 구성(시맨틱 컬러)

## 현상 (화면 실측)

`/schedule`의 Resources 표에서 State 열 색상이 다음과 같습니다.

- `Booked` → 초록(positive)
- `Open` → 주황(warning)
- `Conflict` → 주황(warning)

`Open`(예약 여유 = 긍정/중립)과 `Conflict`(리소스 충돌 = 해결해야 할 문제)가
**완전히 같은 주황색**이라 한눈에 구분되지 않습니다. 충돌은 조치가 필요한 부정 상태인데
"여유 있음"과 같은 시각 가중치를 받습니다.

## 원인 (소스)

`src/pages/demoStateTone.ts`

```ts
if (['conflict','draft','negotiation','open','pending',
     'queued','review','triage','watch'].includes(normalized)) {
  return 'warning'
}
...
if (['blocked','danger','error','failed','inactive'].includes(normalized)) {
  return 'danger'   // ← 빨강 톤이 따로 있는데 conflict는 여기 없음
}
```

`danger`(빨강) 톤이 별도로 존재하지만 `conflict`는 `warning` 버킷에 들어가 있습니다.

## 제안

- `conflict`를 `danger` 버킷으로 이동 (충돌은 "주의"가 아니라 "문제").
  최소한 `open`(중립/여유)과 다른 톤이어야 함.
- 더 근본적으로는 단어→톤 매핑이 **납작한 문자열 배열**이라 신규 상태어가 늘수록
  버킷 분류 실수가 반복됩니다. 상태어를 정의하는 곳(데이터)에서 톤을 함께 선언하거나
  `Record<StateWord, BadgeTone>` 단일 맵으로 수렴하는 편이 안전합니다. (참고: `/aria-fit`, `/ocp`)
