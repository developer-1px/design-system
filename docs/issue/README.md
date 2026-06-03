# Issue 제보 — 페이지 실측 점검 (2026-06-02)

`http://localhost:5174/` dev 서버를 Chrome MCP로 띄워 17개 라우트를 전수 스크린샷하며
코드·구성의 이상점을 점검한 결과입니다. 각 이슈는 **화면 실측 + 소스 근거**를 함께 기록합니다.

> ⚠️ 점검 중 `src/pages/*` 파일들이 다른 세션에서 실시간 리팩토링되고 있었습니다
> (WorkspacePages → DesignSystemPages 분리 등). 아래 line 번호는 점검 시점 스냅샷이며,
> 재확인 시 위치가 달라질 수 있습니다. 발견된 **로직/데이터 이슈 자체**는 구조 리팩토링과 무관합니다.

## 점검 라우트 (17/17)

workstream · projects · changes · runs · approvals · sources · database · analytics ·
commerce · crm · schedule · content · repository · components · catalog · tokens · settings

## 이슈 목록

| # | 제목 | 위치 | 심각도 |
|---|------|------|--------|
| [001](001-funnel-meter-not-proportional.md) | Funnel 미터 바 너비가 실제 값과 비례하지 않음 | analytics | 중 |
| [002](002-state-tone-conflict-open-collision.md) | `conflict`와 `open`이 동일한 warning 톤 → 문제/정상 구분 불가 | schedule 외 | 중 |
| [003](003-apg-accordion-dangling-aria-controls.md) | ApgAccordion의 `aria-controls`가 렌더되지 않는 패널 id를 가리킴 | components(APG) | 중 |
| [004](004-tokens-page-missing-warning-swatch.md) | Tokens 페이지 State 스와치에 `--ds-warning` 누락 | tokens | 하 |
| [005](005-projects-summary-hardcoded-counts.md) | Projects Summary 카운트가 하드코딩되어 실제 데이터와 불일치 | projects | 하 |

## 반응형 / overflow 점검 (2차)

데모 자체 체크리스트가 "모바일 overflow 점검 (좁은 viewport에서 table·preview가 부모를
벗어나지 않는지)"를 미완으로 표시하고 있어 추가 점검했습니다.

- **데스크톱(1440px) 실측:** 17개 라우트 전부 `documentElement.scrollWidth == clientWidth`
  (페이지 레벨 가로 스크롤 0). `overflow:visible` 요소 중 카드 경계를 실제로 벗어나는 것 0건.
  - `/catalog`에서 프리뷰 카드 내부 요소 35건이 `scrollWidth > clientWidth`로 잡혔으나,
    렌더 우단이 카드 경계 안(`spillsCard:false`)이라 **시각적 이탈 없음**(min-content 기반 false positive).
- **반응형 CSS 정합:** 브레이크포인트는 `1180px`(inspector 숨김 + sidebar compact),
  `760px`(rail 숨김 + `overflow-x:hidden` + `.ds-table-scroll` + `min-width:0` + breadcrumb 절단)로
  비교적 꼼꼼히 작성돼 있음 (`primitives.css`, `App.css`, `componentPreview.css`).
- **⚠️ 한계:** 이 MCP/Chrome 환경은 창 크기와 무관하게 **고정 1440 가상 뷰포트**로 렌더되어
  (`resize_window` 후에도 `innerWidth==1440`), `760px`·`1180px` 브레이크포인트의 실제 레이아웃을
  **스크린샷으로 검증하지 못했습니다.** 실기기/DevTools device emulation에서 별도 확인 권장.
  특히 `760px`에서 `.ds-shell-rail{display:none}` 후 네비게이션 대체 수단(햄버거 등) 유무는 미검증.

## 부가 관찰 (이슈 아님)

- **일시적 빌드 깨짐(해결됨):** 점검 시작 직후 `workstream`이 백색 화면이었고
  콘솔에 `SyntaxError: The requested module '/src/pages/pagePreviewScaffold.tsx'
  does not provide an export named 'DemoStateBadge'` (10:49:54, 10:50:42) 가 떴습니다.
  동시 진행 중이던 `DemoStateBadge.tsx` 분리 리팩토링의 과도기 상태였고, 직후
  import 경로(`./DemoStateBadge`, `./demoStateTone`)가 정리되며 정상 렌더로 복구됐습니다.
  현재 재현되지 않으므로 별도 이슈로 등록하지 않되, 리팩토링 중 import barrel 정합을
  먼저 맞추고 파일을 옮기는 순서를 권장합니다.
