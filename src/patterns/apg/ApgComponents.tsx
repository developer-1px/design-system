import type { HTMLAttributes, ReactNode } from 'react'
import {
  AlertTriangle,
  Bell,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Folder,
  Info,
  ListChecks,
  Menu,
  PanelTop,
  Search,
} from 'lucide-react'
import {
  Button,
  Cluster,
  ControlRow,
  ContentAssembly,
  DataTable,
  Description,
  Field,
  IconButton,
  InputFrame,
  RowStack,
  TextInput,
} from '../../design-system/primitives/primitives'
import { areaContent, gridBlock, surfaceBlock } from '../../design-system/composition/assembly'
import {
  AccessibleAccordion,
  AccessibleBreadcrumb,
  AccessibleButton,
  AccessibleCheckboxGroup,
  AccessibleDisclosure,
  AccessibleLink,
  AccessibleListbox,
  AccessibleMenuButton,
  AccessibleMeter,
  AccessibleRadioGroup,
  AccessibleSlider,
  AccessibleSpinbutton,
  AccessibleSwitch,
  AccessibleTabs,
  AccessibleToolbar,
  AccessibleTooltip,
  AccessibleWindowSplitter,
} from './ApgAdapters'
import './apg.css'

type ApgSurfaceProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
  children?: ReactNode
  detail?: ReactNode
  icon?: ReactNode
  title?: ReactNode
}

function ApgSurface({
  children,
  className = '',
  fit,
  ...props
}: ApgSurfaceProps & { fit?: boolean }) {
  return (
    <ContentAssembly
      content={areaContent({
        blocks: [
          surfaceBlock({
            children,
            className: demoClass('demo-surface', fit && 'demo-fit', className),
            ...props,
          }),
        ],
      })}
    />
  )
}

function demoClass(...names: Array<string | false | undefined>) {
  return ['demo-frame', ...names].filter(Boolean).join(' ')
}

function ApgStack({
  children,
  className = '',
  fit,
  ...props
}: {
  children: ReactNode
  className?: string
  fit?: boolean
} & HTMLAttributes<HTMLElement>) {
  return (
    <RowStack className={demoClass(fit && 'demo-fit', className)} {...props}>
      {children}
    </RowStack>
  )
}

function ApgInline({
  children,
  className = '',
  fit = true,
  ...props
}: {
  children: ReactNode
  className?: string
  fit?: boolean
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <Cluster className={demoClass(fit && 'demo-fit', className)} {...props}>
      {children}
    </Cluster>
  )
}

export function ApgAccordion() {
  return (
    <AccessibleAccordion
      items={[
        { key: 'overview', label: 'Overview', content: 'One expanded panel.' },
        { key: 'keyboard', label: 'Keyboard', content: 'Arrow, Home, End.' },
        { key: 'states', label: 'States', content: 'Expanded and active.' },
      ]}
    />
  )
}

export function ApgAlert() {
  return (
    <ApgSurface
      detail="3 files updated."
      fit
      icon={<Bell />}
      role="alert"
      title="Sync complete"
    />
  )
}

export function ApgAlertDialog() {
  return (
    <ApgSurface
      aria-describedby="apg-alert-dialog-detail"
      aria-labelledby="apg-alert-dialog-title"
      icon={<AlertTriangle />}
      role="alertdialog"
      title={<span id="apg-alert-dialog-title">Discard changes?</span>}
    >
      <RowStack>
        <Description>
          <span id="apg-alert-dialog-detail">This action cannot be undone.</span>
        </Description>
        <Cluster>
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Discard</Button>
        </Cluster>
      </RowStack>
    </ApgSurface>
  )
}

export function ApgBreadcrumb() {
  return (
    <AccessibleBreadcrumb
      items={[
        { href: '#home', key: 'home', label: 'Home' },
        { href: '#patterns', key: 'patterns', label: 'Patterns' },
        { current: 'page', key: 'breadcrumb', label: 'Breadcrumb' },
      ]}
    />
  )
}

export function ApgButton() {
  return (
    <AccessibleButton label="Run action" pressed />
  )
}

export function ApgCarousel() {
  return (
    <section
      aria-label="Release notes"
      aria-roledescription="carousel"
      className={demoClass('demo-carousel')}
    >
      <IconButton icon={<ChevronLeft />} label="Previous slide" />
      <ApgSurface
        aria-label="1 of 3"
        className="demo-fill"
        detail="All APG cases mapped."
        role="group"
        title="Keyboard coverage"
      />
      <IconButton icon={<ChevronRight />} label="Next slide" />
    </section>
  )
}

export function ApgCheckbox() {
  return (
    <AccessibleCheckboxGroup
      items={[
        { checked: true, key: 'build', label: 'Build finished' },
        { key: 'review', label: 'Review needed' },
      ]}
      label="Notifications"
    />
  )
}

export function ApgCombobox() {
  return (
    <ApgStack>
      <Field htmlFor="apg-combobox-input" label="Pattern">
        <InputFrame trailing={<Search />}>
          <TextInput
            aria-autocomplete="list"
            aria-controls="apg-combobox-list"
            aria-expanded="true"
            id="apg-combobox-input"
            role="combobox"
            value="Listbox"
            readOnly
          />
        </InputFrame>
      </Field>
      <RowStack id="apg-combobox-list" role="listbox">
        <ControlRow aria-selected="true" role="option">Listbox</ControlRow>
        <ControlRow role="option">Treeview</ControlRow>
      </RowStack>
    </ApgStack>
  )
}

export function ApgDialog() {
  return (
    <ApgSurface
      aria-labelledby="apg-dialog-title"
      icon={<Info />}
      role="dialog"
      title={<span id="apg-dialog-title">Workspace settings</span>}
    >
      <RowStack>
        <Description>Controls stay in the dialog action row.</Description>
        <Cluster>
          <Button variant="ghost">Close</Button>
          <Button>Save</Button>
        </Cluster>
      </RowStack>
    </ApgSurface>
  )
}

export function ApgDisclosure() {
  return (
    <AccessibleDisclosure
      content="Command timeout: 30s"
      label="Advanced options"
    />
  )
}

export function ApgFeed() {
  return (
    <ApgStack role="feed">
      {['Build passed', 'Review requested'].map((title, index) => (
        <ApgSurface
          aria-posinset={index + 1}
          aria-setsize={2}
          detail="Today"
          key={title}
          role="article"
          title={title}
        />
      ))}
    </ApgStack>
  )
}

export function ApgGrid() {
  return apgGridLike('grid', [
    ['Pattern', 'Role', 'State'],
    ['Tabs', 'tablist', 'ready'],
    ['Menu', 'menu', 'review'],
  ])
}

export function ApgLandmarks() {
  return (
    <ContentAssembly
      content={areaContent({
        blocks: [
          gridBlock({
            columns: 2,
            items: [
              <ApgSurface icon={<PanelTop />} title="Header" />,
              <ApgSurface icon={<Menu />} title="Nav" />,
              <ApgSurface icon={<BookOpen />} title="Main" />,
              <ApgSurface icon={<Info />} title="Aside" />,
            ],
            title: 'Landmarks',
          }),
        ],
      })}
    />
  )
}

export function ApgLink() {
  return (
    <AccessibleLink href="#patterns" label="APG reference" />
  )
}

export function ApgListbox() {
  return (
    <AccessibleListbox
      items={[
        { key: 'accordion', label: 'Accordion' },
        { key: 'listbox', label: 'Listbox' },
        { key: 'treeview', label: 'Treeview' },
      ]}
      label="Patterns"
    />
  )
}

export function ApgMenuButton() {
  return (
    <AccessibleMenuButton
      defaultOpen
      items={[
        { key: 'copy', label: 'Copy' },
        { key: 'rename', label: 'Rename' },
      ]}
    />
  )
}

export function ApgMenubar() {
  return (
    <ApgInline aria-label="Application" role="menubar">
      {['File', 'Edit', 'View'].map((label) => (
        <Button key={label} role="menuitem">
          {label}
        </Button>
      ))}
    </ApgInline>
  )
}

export function ApgMeter() {
  return (
    <AccessibleMeter
      items={[
        {
          key: 'coverage',
          label: 'Coverage',
          max: 100,
          min: 0,
          value: 72,
          valueText: '72%',
        },
      ]}
    />
  )
}

export function ApgRadioGroup() {
  return (
    <AccessibleRadioGroup
      items={[
        { checked: true, key: 'compact', label: 'Compact' },
        { key: 'comfortable', label: 'Comfortable' },
      ]}
      label="Density"
    />
  )
}

export function ApgSlider() {
  return (
    <AccessibleSlider
      items={[
        {
          key: 'scale',
          label: 'Preview scale',
          max: 100,
          min: 0,
          value: 64,
          valueText: '64%',
        },
      ]}
    />
  )
}

export function ApgSpinbutton() {
  return (
    <AccessibleSpinbutton
      items={[
        {
          key: 'retries',
          label: 'Retries',
          max: 9,
          min: 0,
          value: 2,
        },
      ]}
    />
  )
}

export function ApgSwitch() {
  return (
    <AccessibleSwitch
      items={[{ checked: true, key: 'auto-apply', label: 'Auto apply' }]}
      label="Automation"
    />
  )
}

export function ApgTable() {
  return (
    <ApgSurface>
      <DataTable
        columns={[
          { key: 'pattern', header: 'Pattern', render: (row) => row.pattern },
          { key: 'status', header: 'Status', render: (row) => row.status },
        ]}
        getRowKey={(row) => row.pattern}
        rows={[{ pattern: 'Table', status: 'Ready' }]}
      />
    </ApgSurface>
  )
}

export function ApgTabs() {
  return (
    <AccessibleTabs
      items={[
        { key: 'code', label: 'Code', content: 'Implementation surface.' },
        { key: 'preview', label: 'Preview', content: 'Rendered behavior.' },
        { key: 'aria', label: 'ARIA', content: 'Roles and state.' },
      ]}
      label="Pattern views"
    />
  )
}

export function ApgToolbar() {
  return (
    <AccessibleToolbar
      items={[
        { key: 'decrease', label: 'Decrease' },
        { key: 'tune', label: 'Tune', pressed: true },
        { key: 'settings', label: 'Settings' },
      ]}
      label="Formatting"
    />
  )
}

export function ApgTooltip() {
  return (
    <AccessibleTooltip defaultOpen label="Target" tooltip="Opens details" />
  )
}

export function ApgTreegrid() {
  return apgGridLike('treegrid', [
    ['Name', 'Owner'],
    ['Components', 'Design'],
    ['APG set', 'Runtime'],
  ])
}

export function ApgTreeview() {
  return (
    <ApgStack aria-label="Files" role="tree">
      <ControlRow aria-expanded="true" icon={<Folder />} role="treeitem">
        patterns
      </ControlRow>
      <ControlRow aria-selected="true" icon={<ListChecks />} role="treeitem">
        listbox.tsx
      </ControlRow>
    </ApgStack>
  )
}

export function ApgWindowSplitter() {
  return <AccessibleWindowSplitter />
}

function apgGridLike(role: 'grid' | 'treegrid', rows: string[][]) {
  return (
    <div aria-label={role} className={demoClass('demo-grid')} role={role}>
      {rows.map((row, rowIndex) => (
        <div key={row.join('-')} role="row">
          {row.map((cell) => (
            <div key={cell} role={rowIndex === 0 ? 'columnheader' : 'gridcell'}>
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
