import {
  AlertTriangle,
  Bell,
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Folder,
  GripVertical,
  Info,
  ListChecks,
  Menu,
  Minus,
  PanelTop,
  Radio,
  Search,
  Settings,
  SlidersHorizontal,
  ToggleLeft,
} from 'lucide-react'
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CheckboxRow,
  ChoiceRow,
  Cluster,
  ControlRow,
  DataTable,
  Description,
  Field,
  FieldGroup,
  Grid,
  IconButton,
  InputFrame,
  MeterBar,
  RangeInput,
  RowStack,
  TextInput,
} from '../../design-system/primitives'
import './apg.css'

export function ApgAccordion() {
  return (
    <RowStack className="apg-demo" role="group" aria-label="Accordion">
      {['Overview', 'Keyboard', 'States'].map((label, index) => (
        <RowStack key={label}>
          <ControlRow
            as="button"
            aria-controls={`apg-accordion-panel-${index}`}
            aria-expanded={index === 0}
            trailing={<ChevronDown />}
          >
            {label}
          </ControlRow>
          {index === 0 ? (
            <Card id={`apg-accordion-panel-${index}`} pad>
              <Description>One expanded panel, compact content.</Description>
            </Card>
          ) : null}
        </RowStack>
      ))}
    </RowStack>
  )
}

export function ApgAlert() {
  return (
    <Card className="apg-demo apg-fit" pad role="alert">
      <CardHeader detail="3 files updated." icon={<Bell />} title="Sync complete" />
    </Card>
  )
}

export function ApgAlertDialog() {
  return (
    <Card
      aria-describedby="apg-alert-dialog-detail"
      aria-labelledby="apg-alert-dialog-title"
      className="apg-demo"
      pad
      role="alertdialog"
    >
      <CardHeader
        icon={<AlertTriangle />}
        title={<span id="apg-alert-dialog-title">Discard changes?</span>}
      />
      <Description>
        <span id="apg-alert-dialog-detail">This action cannot be undone.</span>
      </Description>
      <Cluster>
        <Button variant="ghost">Cancel</Button>
        <Button variant="primary">Discard</Button>
      </Cluster>
    </Card>
  )
}

export function ApgBreadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="apg-demo">
      <ol className="apg-breadcrumb">
        {['Home', 'Patterns', 'Breadcrumb'].map((label, index) => (
          <li key={label}>
            {index < 2 ? <a href="#">{label}</a> : <span aria-current="page">{label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function ApgButton() {
  return (
    <Cluster className="apg-demo apg-fit">
      <Button>Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="ghost">Ghost</Button>
    </Cluster>
  )
}

export function ApgCarousel() {
  return (
    <section
      aria-label="Release notes"
      aria-roledescription="carousel"
      className="apg-demo apg-carousel"
    >
      <IconButton icon={<ChevronLeft />} label="Previous slide" />
      <Card aria-label="1 of 3" className="apg-fill" pad role="group">
        <CardHeader detail="All APG cases mapped." title="Keyboard coverage" />
      </Card>
      <IconButton icon={<ChevronRight />} label="Next slide" />
    </section>
  )
}

export function ApgCheckbox() {
  return (
    <FieldGroup className="apg-demo" legend="Notifications">
      {['Build finished', 'Review needed'].map((label, index) => (
        <CheckboxRow checked={index === 0} key={label} readOnly>
          {label}
        </CheckboxRow>
      ))}
    </FieldGroup>
  )
}

export function ApgCombobox() {
  return (
    <RowStack className="apg-demo">
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
    </RowStack>
  )
}

export function ApgDialog() {
  return (
    <Card
      aria-labelledby="apg-dialog-title"
      className="apg-demo"
      pad
      role="dialog"
    >
      <CardHeader
        icon={<Info />}
        title={<span id="apg-dialog-title">Workspace settings</span>}
      />
      <Description>Controls stay in the dialog action row.</Description>
      <Cluster>
        <Button variant="ghost">Close</Button>
        <Button>Save</Button>
      </Cluster>
    </Card>
  )
}

export function ApgDisclosure() {
  return (
    <RowStack className="apg-demo">
      <ControlRow
        as="button"
        aria-controls="apg-disclosure-panel"
        aria-expanded="true"
        trailing={<ChevronDown />}
      >
        Advanced options
      </ControlRow>
      <Card id="apg-disclosure-panel" pad>
        <Description>Command timeout: 30s</Description>
      </Card>
    </RowStack>
  )
}

export function ApgFeed() {
  return (
    <RowStack className="apg-demo" role="feed">
      {['Build passed', 'Review requested'].map((title, index) => (
        <Card aria-posinset={index + 1} aria-setsize={2} key={title} pad role="article">
          <CardHeader detail="Today" title={title} />
        </Card>
      ))}
    </RowStack>
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
    <Grid className="apg-demo" columns={2}>
      <Card pad><CardHeader icon={<PanelTop />} title="Header" /></Card>
      <Card pad><CardHeader icon={<Menu />} title="Nav" /></Card>
      <Card pad><CardHeader icon={<BookOpen />} title="Main" /></Card>
      <Card pad><CardHeader icon={<Info />} title="Aside" /></Card>
    </Grid>
  )
}

export function ApgLink() {
  return (
    <ControlRow
      as="a"
      className="apg-demo apg-fit"
      href="#"
      trailing={<ExternalLink />}
    >
      APG reference
    </ControlRow>
  )
}

export function ApgListbox() {
  return (
    <RowStack aria-label="Patterns" className="apg-demo" role="listbox">
      {['Accordion', 'Listbox', 'Treeview'].map((label, index) => (
        <ControlRow aria-selected={index === 1} key={label} role="option">
          {label}
        </ControlRow>
      ))}
    </RowStack>
  )
}

export function ApgMenuButton() {
  return (
    <RowStack className="apg-demo">
      <Button
        aria-controls="apg-menu"
        aria-expanded="true"
        aria-haspopup="menu"
        icon={<ChevronDown />}
      >
        Actions
      </Button>
      <RowStack id="apg-menu" role="menu">
        <ControlRow as="button" role="menuitem">Copy</ControlRow>
        <ControlRow as="button" role="menuitem">Rename</ControlRow>
      </RowStack>
    </RowStack>
  )
}

export function ApgMenubar() {
  return (
    <Cluster aria-label="Application" className="apg-demo apg-fit" role="menubar">
      {['File', 'Edit', 'View'].map((label) => (
        <Button key={label} role="menuitem">
          {label}
        </Button>
      ))}
    </Cluster>
  )
}

export function ApgMeter() {
  return (
    <Field className="apg-demo" htmlFor="apg-meter" label="Coverage">
      <MeterBar id="apg-meter" max={100} min={0} value={72}>72%</MeterBar>
    </Field>
  )
}

export function ApgRadioGroup() {
  return (
    <FieldGroup className="apg-demo" legend="Density">
      <Cluster role="radiogroup">
        {['Compact', 'Comfortable'].map((label, index) => (
          <ChoiceRow
            checked={index === 0}
            key={label}
            role="radio"
          >
            <Radio />
            {label}
          </ChoiceRow>
        ))}
      </Cluster>
    </FieldGroup>
  )
}

export function ApgSlider() {
  return (
    <Field className="apg-demo" htmlFor="apg-slider" label="Preview scale">
      <RangeInput id="apg-slider" max={100} min={0} readOnly value={64} />
    </Field>
  )
}

export function ApgSpinbutton() {
  return (
    <Field className="apg-demo" htmlFor="apg-spinbutton" label="Retries">
      <TextInput
        aria-valuemax={9}
        aria-valuemin={0}
        aria-valuenow={2}
        id="apg-spinbutton"
        readOnly
        role="spinbutton"
        value="2"
      />
    </Field>
  )
}

export function ApgSwitch() {
  return (
    <ChoiceRow checked className="apg-demo apg-fit" role="switch">
      <ToggleLeft />
      Auto apply
      <Badge tone="positive">On</Badge>
    </ChoiceRow>
  )
}

export function ApgTable() {
  return (
    <Card className="apg-demo">
      <DataTable
        columns={[
          { key: 'pattern', header: 'Pattern', render: (row) => row.pattern },
          { key: 'status', header: 'Status', render: (row) => row.status },
        ]}
        getRowKey={(row) => row.pattern}
        rows={[{ pattern: 'Table', status: 'Ready' }]}
      />
    </Card>
  )
}

export function ApgTabs() {
  return (
    <RowStack className="apg-demo">
      <Cluster aria-label="Pattern views" role="tablist">
        {['Code', 'Preview', 'ARIA'].map((label, index) => (
          <Button aria-selected={index === 1} key={label} role="tab">
            {label}
          </Button>
        ))}
      </Cluster>
      <Card pad role="tabpanel">
        <Description>Preview content</Description>
      </Card>
    </RowStack>
  )
}

export function ApgToolbar() {
  return (
    <Cluster aria-label="Formatting" className="apg-demo apg-fit" role="toolbar">
      <IconButton icon={<Minus />} label="Decrease" />
      <IconButton icon={<SlidersHorizontal />} label="Tune" />
      <IconButton icon={<Settings />} label="Settings" />
    </Cluster>
  )
}

export function ApgTooltip() {
  return (
    <RowStack className="apg-demo">
      <Button aria-describedby="apg-tooltip">Target</Button>
      <Card className="apg-tooltip" id="apg-tooltip" pad role="tooltip">
        <Description>Opens details</Description>
      </Card>
    </RowStack>
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
    <RowStack aria-label="Files" className="apg-demo" role="tree">
      <ControlRow aria-expanded="true" icon={<Folder />} role="treeitem">
        patterns
      </ControlRow>
      <ControlRow aria-selected="true" icon={<ListChecks />} role="treeitem">
        listbox.tsx
      </ControlRow>
    </RowStack>
  )
}

export function ApgWindowSplitter() {
  return (
    <div className="apg-demo apg-splitter">
      <section>Canvas</section>
      <div
        aria-controls="apg-splitter-secondary"
        aria-valuemax={80}
        aria-valuemin={20}
        aria-valuenow={48}
        role="separator"
        tabIndex={0}
      >
        <GripVertical />
      </div>
      <section id="apg-splitter-secondary">Inspector</section>
    </div>
  )
}

function apgGridLike(role: 'grid' | 'treegrid', rows: string[][]) {
  return (
    <div aria-label={role} className="apg-demo apg-grid" role={role}>
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
