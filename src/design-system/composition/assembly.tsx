import type { ReactNode } from 'react'
import {
  Badge,
  type BadgeTone,
  CheckboxInput,
  type AreaContentSpec,
  type CollectionColumns,
  type DataColumn,
  DeltaPair,
  InlineCode,
  type ListSectionSetItem,
  type MetaBlockSpec,
  type NavigationProps,
  StateBadge,
  type SurfaceBlockSpec,
  type TableSectionSpec,
  type TextBlockSpec,
  type TitledGridBlockSpec,
  type TreeSectionSpec,
  TextStack,
} from '../primitives/primitives'

type AreaContentBlock = AreaContentSpec['blocks'][number]

type SectionKind =
  | 'code'
  | 'delta'
  | 'item'
  | 'metric'
  | 'meter'
  | 'record'
  | 'status'
  | 'value'

type SectionSetSpec = {
  columns?: CollectionColumns
  key?: string | number
  sections: ListSectionSetItem[]
}

type SectionSpec<K extends SectionKind> = Omit<
  Extract<ListSectionSetItem, { kind: K }>,
  'kind'
>

type MetricItemSpec<T> = {
  detail?: string
  label: string
  value: (items: readonly T[]) => ReactNode
}

type MeasureItem = {
  key?: string | number
  label: ReactNode
  value: number
}

type MarkedLine = readonly [ReactNode, ReactNode]
type DeltaParts = {
  negative: string
  positive: string
}

function sectionOf<K extends SectionKind>(
  kind: K,
  spec: SectionSpec<K>,
): Extract<ListSectionSetItem, { kind: K }> {
  return { ...spec, kind } as Extract<ListSectionSetItem, { kind: K }>
}

export function areaContent(spec: AreaContentSpec): AreaContentSpec {
  return spec
}

export function navigation(spec: NavigationProps): NavigationProps {
  return spec
}

function sectionSet(spec: SectionSetSpec): AreaContentBlock {
  return { ...spec, block: 'section-set' } as AreaContentBlock
}

export function sectionBlock(spec: ListSectionSetItem): AreaContentBlock {
  return sectionSet({ sections: [spec] })
}

function typedSectionBlock<K extends SectionKind>(
  kind: K,
  spec: SectionSpec<K>,
): AreaContentBlock {
  return sectionBlock(sectionOf(kind, spec))
}

export function sectionStackBlock(
  sections: ListSectionSetItem[],
  key?: string | number,
): AreaContentBlock {
  return sectionSet({ key, sections })
}

export function sectionPairBlock(
  first: ListSectionSetItem,
  second: ListSectionSetItem,
  key?: string | number,
): AreaContentBlock {
  return sectionSet({ key, sections: [first, second] })
}

export function sectionTrioBlock(
  first: ListSectionSetItem,
  second: ListSectionSetItem,
  third: ListSectionSetItem,
  key?: string | number,
): AreaContentBlock {
  return sectionSet({ key, sections: [first, second, third] })
}

export function sectionGridBlock(
  columns: NonNullable<SectionSetSpec['columns']>,
  sections: ListSectionSetItem[],
  key?: string | number,
): AreaContentBlock {
  return sectionSet({ columns, key, sections })
}

export function codeSectionBlock(spec: SectionSpec<'code'>): AreaContentBlock {
  return typedSectionBlock('code', spec)
}

export function deltaSectionBlock(
  spec: SectionSpec<'delta'>,
): AreaContentBlock {
  return typedSectionBlock('delta', spec)
}

export function itemSectionBlock(spec: SectionSpec<'item'>): AreaContentBlock {
  return typedSectionBlock('item', spec)
}

export function metricSectionBlock(
  spec: SectionSpec<'metric'>,
): AreaContentBlock {
  return typedSectionBlock('metric', spec)
}

export function meterSectionBlock(
  spec: SectionSpec<'meter'>,
): AreaContentBlock {
  return typedSectionBlock('meter', spec)
}

export function recordSectionBlock(
  spec: SectionSpec<'record'>,
): AreaContentBlock {
  return typedSectionBlock('record', spec)
}

export function statusSectionBlock(
  spec: SectionSpec<'status'>,
): AreaContentBlock {
  return typedSectionBlock('status', spec)
}

export function valueSectionBlock(
  spec: SectionSpec<'value'>,
): AreaContentBlock {
  return typedSectionBlock('value', spec)
}

export function gridBlock(spec: TitledGridBlockSpec): AreaContentBlock {
  return { ...spec, block: 'grid' } as AreaContentBlock
}

export function textBlock(spec: TextBlockSpec): AreaContentBlock {
  return { ...spec, block: 'text' } as AreaContentBlock
}

export function metaBlock(spec: MetaBlockSpec): AreaContentBlock {
  return { ...spec, block: 'meta' } as AreaContentBlock
}

export function surfaceBlock(spec: SurfaceBlockSpec): AreaContentBlock {
  return { ...spec, block: 'surface' } as AreaContentBlock
}

export function tableBlock<T>(spec: TableSectionSpec<T>): AreaContentBlock {
  return {
    ...(spec as unknown as TableSectionSpec<unknown>),
    block: 'table',
  } as AreaContentBlock
}

export function treeBlock(spec: TreeSectionSpec): AreaContentBlock {
  return { ...spec, block: 'tree' } as AreaContentBlock
}

export function codeSection(
  spec: SectionSpec<'code'>,
): Extract<ListSectionSetItem, { kind: 'code' }> {
  return sectionOf('code', spec)
}

export function deltaSection(
  spec: SectionSpec<'delta'>,
): Extract<ListSectionSetItem, { kind: 'delta' }> {
  return sectionOf('delta', spec)
}

export function itemSection(
  spec: SectionSpec<'item'>,
): Extract<ListSectionSetItem, { kind: 'item' }> {
  return sectionOf('item', spec)
}

export function metricSection(
  spec: SectionSpec<'metric'>,
): Extract<ListSectionSetItem, { kind: 'metric' }> {
  return sectionOf('metric', spec)
}

export function meterSection(
  spec: SectionSpec<'meter'>,
): Extract<ListSectionSetItem, { kind: 'meter' }> {
  return sectionOf('meter', spec)
}

export function recordSection(
  spec: SectionSpec<'record'>,
): Extract<ListSectionSetItem, { kind: 'record' }> {
  return sectionOf('record', spec)
}

export function statusSection(
  spec: SectionSpec<'status'>,
): Extract<ListSectionSetItem, { kind: 'status' }> {
  return sectionOf('status', spec)
}

export function valueSection(
  spec: SectionSpec<'value'>,
): Extract<ListSectionSetItem, { kind: 'value' }> {
  return sectionOf('value', spec)
}

export function metricItems<T>(
  items: readonly T[],
  specs: readonly MetricItemSpec<T>[],
): SectionSpec<'metric'>['items'] {
  return specs.map((spec) => ({
    detail: spec.detail,
    label: spec.label,
    value: spec.value(items),
  }))
}

export function proportionalMeterItems(
  items: readonly MeasureItem[],
  formatValue: (value: number) => ReactNode = String,
): SectionSpec<'meter'>['items'] {
  const max = Math.max(0, ...items.map((item) => item.value))

  return items.map((item) => ({
    key: item.key ?? String(item.label),
    label: item.label,
    meter: max === 0 ? 0 : Math.round((item.value / max) * 100),
    value: formatValue(item.value),
  }))
}

export function badgeNode(
  children: ReactNode,
  tone?: BadgeTone,
): ReactNode {
  return <Badge tone={tone}>{children}</Badge>
}

export function countNode(
  value: ReactNode,
  label?: ReactNode,
  tone?: BadgeTone,
): ReactNode {
  return (
    <Badge tone={tone}>
      {label ? (
        <>
          {value} {label}
        </>
      ) : (
        value
      )}
    </Badge>
  )
}

export function stateNode(children: ReactNode): ReactNode {
  return <StateBadge>{children}</StateBadge>
}

export function deltaNode(positive: ReactNode, negative: ReactNode): ReactNode {
  return <DeltaPair positive={positive} negative={negative} />
}

export function deltaParts(delta: string): DeltaParts {
  const [positive = '', negative = ''] = delta.trim().split(/\s+/, 2)

  return { negative, positive }
}

export function deltaNodeFromText(delta: string): ReactNode {
  const { negative, positive } = deltaParts(delta)

  return deltaNode(positive, negative)
}

export function deltaTotals<T>(
  items: readonly T[],
  deltaFor: (item: T) => string,
) {
  return items.reduce(
    (totals, item) => {
      const { negative, positive } = deltaParts(deltaFor(item))

      return {
        negative:
          totals.negative + Number(negative.match(/-(\d+)/)?.[1] ?? 0),
        positive:
          totals.positive + Number(positive.match(/\+(\d+)/)?.[1] ?? 0),
      }
    },
    { negative: 0, positive: 0 },
  )
}

function markerTone(marker: ReactNode): 'positive' | 'danger' | undefined {
  if (marker === '+') return 'positive'
  if (marker === '-') return 'danger'
  return undefined
}

export function markedCodeItems(
  lines: readonly MarkedLine[],
): SectionSpec<'code'>['items'] {
  return lines.map(([marker, line]) => ({
    key: String(line),
    line,
    marker,
    tone: markerTone(marker),
  }))
}

export function textColumn<T extends object>(
  key: keyof T & string,
  header: ReactNode,
): DataColumn<T> {
  return {
    key,
    header,
    render: (row) => row[key] as ReactNode,
  }
}

export function codeColumn<T extends object>(
  key: keyof T & string,
  header: ReactNode,
): DataColumn<T> {
  return {
    key,
    header,
    render: (row) => <InlineCode>{String(row[key])}</InlineCode>,
  }
}

export function badgeColumn<T extends object>(
  key: keyof T & string,
  header: ReactNode,
  toneFor?: (value: T[keyof T & string]) => BadgeTone | undefined,
): DataColumn<T> {
  return {
    key,
    header,
    render: (row) => (
      <Badge tone={toneFor?.(row[key] as T[keyof T & string])}>
        {row[key] as ReactNode}
      </Badge>
    ),
  }
}

export function detailColumn<T extends object>({
  detail,
  header,
  key,
  title,
}: {
  detail: keyof T & string
  header: ReactNode
  key: string
  title: keyof T & string
}): DataColumn<T> {
  return {
    key,
    header,
    render: (row) => (
      <TextStack
        detail={row[detail] as ReactNode}
        title={row[title] as ReactNode}
      />
    ),
  }
}

export function selectColumn<T>({
  labelFor,
}: {
  labelFor: (row: T) => string
}): DataColumn<T> {
  return {
    key: 'select',
    header: <CheckboxInput aria-label="Select all rows" />,
    render: (row) => <CheckboxInput aria-label={labelFor(row)} />,
  }
}
