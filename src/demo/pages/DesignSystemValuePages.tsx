import { Check, CircleDot, Columns3, FileText } from 'lucide-react'
import { InlineCode, PageLayout, Swatch } from '../../design-system/primitives/primitives'
import {
  areaContent,
  sectionGridBlock,
  navigation,
  statusSection,
  valueSection,
} from '../../design-system/composition/assembly'
import { systemPasses, tokenGroups } from '../data/demo'

export function TokensPage() {
  return (
    <PageLayout
      eyebrow="Design System"
      layout="rail-main"
      railNavigation={navigation({
        'aria-label': 'Token groups',
        items: [
          ...tokenGroups.map((group) => ({
            key: group.label,
            label: group.label,
          })),
          { current: true, label: 'Checks' },
        ],
        variant: 'list',
      })}
      size="document"
      mainContent={areaContent({
        blocks: [
          sectionGridBlock(2, [
            ...tokenGroups.map((group) => ({
              key: group.label,
              ...valueSection({
                items: group.tokens.map(([name, value]) => ({
                  key: name,
                  label: <InlineCode>{name}</InlineCode>,
                  prefix: ['Surfaces', 'Text', 'State'].includes(
                    group.label,
                  ) ? (
                    <Swatch value={value} />
                  ) : undefined,
                  value,
                  valueTone: 'muted' as const,
                })),
                title: group.label,
              }),
            })),
            statusSection({
              items: systemPasses.map((item) => ({
                label: item,
                done: true,
              })),
              title: 'Checks',
            }),
          ]),
        ],
      })}
      title="Values"
    />
  )
}

export function SettingsPage() {
  return (
    <PageLayout
      eyebrow="Preferences"
      layout="rail-main"
      railNavigation={navigation({
        'aria-label': 'Settings sections',
        items: [
          { current: true, icon: <Check />, label: 'Defaults' },
          { icon: <Columns3 />, label: 'Layout' },
          { icon: <FileText />, label: 'Content' },
          { icon: <CircleDot />, label: 'States' },
        ],
        variant: 'list',
      })}
      size="document"
      mainContent={areaContent({
        blocks: [
          sectionGridBlock(2, [
            valueSection({
              items: [
                { label: 'Hero', value: 'Disabled' },
                { label: 'Decoration', value: 'Disabled' },
                { label: 'Density', value: 'Compact' },
                { label: 'Radius', value: 'Small' },
                { label: 'Shell', value: 'Route canvas' },
                { label: 'Intro copy', value: 'Disabled' },
                { label: 'Marketing', value: 'Disabled' },
                { label: 'Preview', value: 'Component canvas' },
                { label: 'Route browser', value: 'Enabled' },
              ],
              title: 'Defaults',
            }),
            statusSection({
              items: [
                { label: 'Content first', done: true },
                { label: 'One control state', done: true },
                { label: 'Icons scale with text', done: true },
                { label: 'Screenshot every route' },
                { label: 'No decorative hero', done: true },
                { label: 'No nested section shell', done: true },
                { label: 'Mobile overflow' },
                { label: 'Token raw values' },
              ],
              title: 'Rules',
            }),
          ]),
        ],
      })}
      title="Demo defaults"
    />
  )
}
