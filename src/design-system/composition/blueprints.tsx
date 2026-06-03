export type BlueprintLayout =
  | 'main'
  | 'rail-main'
  | 'rail-main-aside'
  | 'main-aside'
  | 'main-stack-aside'
  | 'triad'
  | 'matrix'

export type PatternBlueprintKind =
  | 'command'
  | 'data'
  | 'dialog'
  | 'disclosure'
  | 'feed'
  | 'field'
  | 'layout'
  | 'message'
  | 'navigation'
  | 'range'
  | 'tree'

export function LayoutBlueprint({ layout }: { layout: BlueprintLayout }) {
  return (
    <div className="ds-blueprint" data-layout={layout} aria-hidden="true">
      {layoutAreasFor(layout).map((area) => (
        <span className="ds-blueprint-cell" data-area={area} key={area} />
      ))}
    </div>
  )
}

export function PatternBlueprint({ kind }: { kind: PatternBlueprintKind }) {
  return (
    <div className="ds-pattern-blueprint" data-kind={kind} aria-hidden="true">
      {patternPartsFor(kind).map((part, index) => (
        <span
          className="ds-pattern-blueprint-cell"
          data-part={part}
          key={`${part}-${index}`}
        />
      ))}
    </div>
  )
}

function layoutAreasFor(layout: BlueprintLayout) {
  switch (layout) {
    case 'main':
      return ['main'] as const
    case 'rail-main':
      return ['rail', 'main'] as const
    case 'main-aside':
      return ['main', 'aside'] as const
    case 'main-stack-aside':
      return ['main', 'secondary', 'aside'] as const
    case 'triad':
      return ['main', 'secondary', 'tertiary', 'aside'] as const
    case 'matrix':
      return ['main', 'secondary', 'tertiary', 'aside'] as const
    case 'rail-main-aside':
      return ['rail', 'main', 'aside'] as const
  }
}

function patternPartsFor(kind: PatternBlueprintKind) {
  switch (kind) {
    case 'command':
      return ['primary', 'secondary', 'secondary'] as const
    case 'data':
      return ['header', 'row', 'row', 'row'] as const
    case 'dialog':
      return ['title', 'body', 'action', 'action'] as const
    case 'disclosure':
      return ['trigger', 'panel', 'trigger'] as const
    case 'feed':
      return ['card', 'card'] as const
    case 'field':
      return ['field', 'option', 'selected'] as const
    case 'layout':
      return ['rail', 'main', 'aside'] as const
    case 'message':
      return ['icon', 'title', 'body'] as const
    case 'navigation':
      return ['item', 'selected', 'item'] as const
    case 'range':
      return ['track', 'thumb'] as const
    case 'tree':
      return ['root', 'branch', 'branch'] as const
  }
}
