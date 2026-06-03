import { ContentAssembly } from '../primitives/primitives'
import {
  codeSection,
  contentStack,
  itemSection,
  markedCodeItems,
  meterSection,
  metricSection,
  recordSection,
  sectionGridBlock,
  statusSection,
  type AreaContentBlock,
  valueSection,
} from '../composition/assembly'

export function assemblyNode(
  blocks: readonly AreaContentBlock[],
  key?: string | number,
) {
  return <ContentAssembly key={key} content={contentStack(...blocks)} />
}

export function sampleStatusSection(title = 'Checks') {
  return statusSection({
    items: [
      { label: 'Primary state', done: true },
      { label: 'Secondary state', done: true },
      { label: 'Tertiary state' },
    ],
    title,
  })
}

export function sampleValueSection(title = 'Values') {
  return valueSection({
    items: [
      { label: 'Density', value: 'Compact' },
      { label: 'Radius', value: 'Small' },
      { label: 'Tone', value: 'Quiet' },
    ],
    title,
  })
}

export function sampleRecordSection(title = 'Records') {
  return recordSection({
    items: [
      { detail: 'Secondary detail', meta: 'Ready', title: 'Primary record' },
      { detail: 'Secondary detail', meta: 'Review', title: 'Secondary record' },
      { detail: 'Secondary detail', title: 'Tertiary record' },
    ],
    title,
  })
}

export function sampleMeterSection(title = 'Meters') {
  return meterSection({
    items: [
      { label: 'Primary', meter: 76, value: '76%' },
      { label: 'Secondary', meter: 42, value: '42%' },
      { label: 'Tertiary', meter: 18, value: '18%' },
    ],
    title,
  })
}

export function sampleMetricSection(title = 'Metrics') {
  return metricSection({
    columns: 3,
    items: [
      { detail: 'compact', label: 'Rows', value: '24' },
      { detail: 'quiet', label: 'States', value: '6' },
      { detail: 'shared', label: 'Blocks', value: '12' },
    ],
    title,
  })
}

export function sampleItemSection(title = 'Items') {
  return itemSection({
    items: [
      { label: 'Primary item', value: 'A' },
      { label: 'Secondary item', value: 'B' },
      { label: 'Tertiary item', value: 'C' },
    ],
    title,
  })
}

export function sampleCodeSection(title = 'Code') {
  return codeSection({
    items: markedCodeItems([
      ['+', "const next = 'ready'"],
      [' ', "const tone = 'quiet'"],
      ['-', "const old = 'pending'"],
    ]),
    title,
  })
}

export function sampleSections() {
  return [sampleStatusSection(), sampleValueSection()]
}

export function sampleDenseSections() {
  return [
    sampleStatusSection('State'),
    sampleValueSection('Values'),
    sampleRecordSection('Records'),
    sampleMeterSection('Meters'),
  ]
}

export function sampleSectionGridBlock() {
  return sectionGridBlock(2, sampleDenseSections())
}
