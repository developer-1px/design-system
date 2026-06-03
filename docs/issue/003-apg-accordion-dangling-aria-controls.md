# 003 — ApgAccordion의 `aria-controls`가 렌더되지 않는 패널 id를 가리킴

- **라우트:** `/components` → `ApgAccordion` 프리뷰
- **심각도:** 중 (APG 접근성 쇼케이스의 ARIA 결함)
- **유형:** 코드(ARIA 정합)

## 현상 (화면 실측 + DOM)

- 프리뷰의 아코디언 헤더(`Overview`/`Keyboard`/`States`)는 `<button>`이고
  `Overview`만 펼쳐진 정적 스냅샷입니다. 헤더 클릭(실제 button ref로 클릭 확인)에도
  패널이 토글되지 않습니다 — 이는 "프리뷰는 정적"이라는 의도로 보이므로 그 자체는 이슈 아님.
- 다만 collapsed 헤더(`Keyboard`, `States`)에 걸린 `aria-controls`가
  **DOM에 존재하지 않는 패널 id**를 가리킵니다.

## 원인 (소스)

`src/components/apg/ApgComponents.tsx`

```tsx
export function ApgAccordion() {
  return (
    <ApgStack role="group" aria-label="Accordion">
      {['Overview', 'Keyboard', 'States'].map((label, index) => (
        <RowStack key={label}>
          <ControlRow
            as="button"
            aria-controls={`apg-accordion-panel-${index}`}   // 0,1,2 모두 emit
            aria-expanded={index === 0}
            trailing={<ChevronDown />}
          >
            {label}
          </ControlRow>
          {index === 0 ? (
            <ApgSurface id={`apg-accordion-panel-${index}`}>  {/* panel-0만 렌더 */}
              <Description>One expanded panel, compact content.</Description>
            </ApgSurface>
          ) : null}
        </RowStack>
      ))}
    </ApgStack>
  )
}
```

- 헤더 3개 모두 `aria-controls="apg-accordion-panel-{0,1,2}"`를 emit하지만,
  패널은 `index === 0`일 때만 렌더됩니다.
- 결과적으로 `apg-accordion-panel-1`, `apg-accordion-panel-2`는
  **참조 대상이 없는 dangling `aria-controls`** 입니다. (WAI-ARIA: IDREF는 존재해야 함)
- APG 패턴을 보여주는 화면이라 ARIA 정확성이 핵심인데, 권장 패턴의 반례가 됩니다.

## 제안

- 정적 프리뷰를 유지하려면 collapsed 헤더에서 `aria-controls`를 빼거나(접힌 패널 미렌더 시),
  패널을 항상 렌더하고 `hidden` 속성으로 감춰 IDREF를 유효하게 유지.
- 상호작용을 의도했다면 `useState`로 `expanded` index를 관리하고 `aria-expanded`를 연동.
  (참고: `/aria-fit` — APG/ARIA 어휘 정합)
