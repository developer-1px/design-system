import type { PageId } from '../data/demo'

export type CompositionReuseRow = {
  formulas: string[]
  layout: string
  page: PageId
  proof: string
}

export const compositionReuseRows: CompositionReuseRow[] = [
  {
    page: 'analytics',
    layout: 'matrix',
    formulas: [
      'metricSectionBlock',
      'meterSectionBlock',
      'tableBlock',
      'recordSectionBlock',
    ],
    proof: 'metrics, rows, meters, and records share the same block grammar',
  },
  {
    page: 'commerce',
    layout: 'triad',
    formulas: [
      'statusSectionBlock',
      'sectionPairBlock',
      'valueSection',
      'itemSection',
      'tableBlock',
    ],
    proof: 'queue, summary, inventory, and table content reuse section sets',
  },
  {
    page: 'crm',
    layout: 'main-stack-aside',
    formulas: [
      'sectionGridBlock',
      'recordSection',
      'sectionPairBlock',
      'valueSection',
      'tableBlock',
    ],
    proof: 'columns, side summary, activity, and records stay structural',
  },
  {
    page: 'schedule',
    layout: 'rail-main-aside',
    formulas: [
      'recordSectionBlock',
      'tableBlock',
      'sectionPairBlock',
      'meterSection',
      'statusSection',
    ],
    proof: 'time rows, resources, meters, and checks use shared sections',
  },
  {
    page: 'content',
    layout: 'rail-main-aside',
    formulas: [
      'tableBlock',
      'sectionTrioBlock',
      'valueSection',
      'itemSection',
      'statusSection',
    ],
    proof: 'queue, selected detail, channels, and checklist share trio grammar',
  },
  {
    page: 'repository',
    layout: 'rail-main-aside',
    formulas: [
      'treeBlock',
      'tableBlock',
      'codeSectionBlock',
      'sectionTrioBlock',
      'recordSection',
    ],
    proof: 'tree, table, code, and side records compose without repo-specific APIs',
  },
]
