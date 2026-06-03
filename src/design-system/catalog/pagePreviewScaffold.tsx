import { ContentAssembly } from '../primitives/primitives'
import {
  areaContent,
  sectionGridBlock,
  statusSection,
  valueSection,
} from '../composition/assembly'

export function assemblyNode(
  blocks: Parameters<typeof areaContent>[0]['blocks'],
  key?: string | number,
) {
  return <ContentAssembly key={key} content={areaContent({ blocks })} />
}

export function sampleStatusSection(title = 'Checks') {
  return statusSection({
    items: [
      { label: 'One', done: true },
      { label: 'Two', done: true },
    ],
    title,
  })
}

export function sampleValueSection(title = 'Values') {
  return valueSection({
    items: [
      { label: 'A', value: '1' },
      { label: 'B', value: '2' },
    ],
    title,
  })
}

export function sampleSections() {
  return [sampleStatusSection(), sampleValueSection()]
}

export function sampleSectionGridBlock() {
  return sectionGridBlock(2, sampleSections())
}
