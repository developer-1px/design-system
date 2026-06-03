import { useMemo, useState } from 'react'
import {
  Check,
  ChevronDown,
  Code2,
  FileText,
  FolderOpen,
  GitBranch,
  Globe2,
  Inbox,
  MessageSquare,
  CircleDot,
  MoreHorizontal,
  Search,
  SquareTerminal,
  Undo2,
} from 'lucide-react'
import { ApprovalComposer } from '../shell/ApprovalComposer'
import { Inspector } from '../shell/Inspector'
import {
  Area,
  AreaGrid,
  Badge,
  Button,
  CollectionGrid,
  CheckRow,
  CheckboxInput,
  CheckboxRow,
  ChoiceRow,
  Cluster,
  CodeList,
  CodeLine,
  ControlRow,
  DataTable,
  Description,
  DetailRow,
  DeltaPair,
  DeltaList,
  DeltaRow,
  EmptyState,
  FloatingPanel,
  FloatingPanelBody,
  Field,
  FieldGroup,
  FormSection,
  IconButton,
  IndentedItem,
  IndentedStack,
  InputFrame,
  InlineCode,
  KeyValueRow,
  ItemList,
  MetaRow,
  MeterBar,
  MeterList,
  MeterRow,
  NavigationSection,
  PageLayout,
  PlaceholderSection,
  Pane,
  Prose,
  RecordList,
  SplitView,
  NavStack,
  PageFrame,
  TabRow,
  RangeInput,
  RowStack,
  Breadcrumb,
  NavGroup,
  ScrollStack,
  SegmentedControl,
  ShellFrame,
  ShellInspector,
  ShellMain,
  ShellRail,
  ShellSurface,
  ShellTopbar,
  SkeletonLine,
  SkeletonStack,
  StateBadge,
  StateColumn,
  StatusList,
  Swatch,
  ItemRow,
  TextInput,
  TextStack,
  Titlebar,
  ValueList,
} from '../../design-system/primitives/primitives'
import {
  areaContent,
  badgeNode,
  codeSectionBlock,
  countNode,
  deltaSectionBlock,
  gridBlock,
  itemSectionBlock,
  itemSection,
  sectionBlock,
  sectionGridBlock,
  sectionPairBlock,
  sectionStackBlock,
  sectionTrioBlock,
  markedCodeItems,
  metaBlock,
  meterSectionBlock,
  metricSectionBlock,
  metricSection,
  navigation,
  recordSectionBlock,
  recordSection,
  stateNode,
  statusSectionBlock,
  statusSection,
  surfaceBlock,
  tableBlock,
  textColumn,
  textBlock,
  treeBlock,
  valueSectionBlock,
  valueSection,
} from '../../design-system/composition/assembly'
import {
  PreviewBox,
  PreviewScale,
  PreviewStage,
  PreviewTile,
  PreviewViewport,
} from '../../design-system/catalog/componentPreview'
import {
  assemblyPreview,
  controlPreview,
  type ComponentPreview,
  pagePreview,
} from '../../design-system/catalog/previewComposition'
import {
  LayoutBlueprint,
  PatternBlueprint,
  type PatternBlueprintKind,
} from '../../design-system/composition/blueprints'
import { previewStageBlock } from '../../design-system/catalog/componentPreviewBlocks'
import {
  assemblyNode,
  sampleSectionGridBlock,
  sampleSections,
  sampleStatusSection,
  sampleValueSection,
} from '../../design-system/catalog/pagePreviewScaffold'
import {
  apgBlueprintKinds,
  primitiveCatalogGroups,
} from '../../design-system/catalog/catalogModel'
import {
  compositionFormulaGroups,
  type CompositionFormula,
} from '../../design-system/catalog/compositionFormulas'
import {
  pageBlueprintLayouts,
  pageIdForRouteComponentName,
  routeComponentNamesFor,
} from './pageCatalogModel'
import { compositionReuseRows } from './compositionReuseProof'
import {
  dataRows,
  pageMeta,
  type PageId,
} from '../data/demo'
import { apgComponentPreviews } from '../../patterns/apg/ApgPreviewRegistry'
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
} from '../../patterns/apg/ApgAdapters'
import {
  componentInventory,
  componentInventorySummary,
  groupInventoryEntriesByFile,
  inventoryKey,
} from '../../design-system/catalog/componentInventory'

import {
  ApprovalsPage,
  AnalyticsPage,
  ChangesPage,
  ContentPage,
  CommercePage,
  CrmPage,
  DatabasePage,
  ProjectsPage,
  RepositoryPage,
  RunsPage,
  SchedulePage,
  SourcesPage,
  WorkstreamPage,
} from './WorkspacePages'
import { SettingsPage, TokensPage } from './DesignSystemValuePages'

const pageCatalogItems = routeComponentNamesFor(pageMeta)
const apgAdapterItems = [
  'AccessibleAccordion',
  'AccessibleBreadcrumb',
  'AccessibleButton',
  'AccessibleCheckboxGroup',
  'AccessibleDisclosure',
  'AccessibleLink',
  'AccessibleListbox',
  'AccessibleMenuButton',
  'AccessibleMeter',
  'AccessibleRadioGroup',
  'AccessibleSlider',
  'AccessibleSpinbutton',
  'AccessibleSwitch',
  'AccessibleTabs',
  'AccessibleToolbar',
  'AccessibleTooltip',
  'AccessibleWindowSplitter',
] as const
const apgCatalogItems = Object.keys(apgComponentPreviews).sort()
const catalogSections = [
  ...primitiveCatalogGroups,
  { title: 'APG adapters', items: apgAdapterItems },
  { title: 'Pages', items: pageCatalogItems },
  { title: 'APG patterns', items: apgCatalogItems },
] as const

export function CatalogPage() {
  return (
    <PageLayout
      eyebrow="Design System"
      layout="rail-main"
      railNavigation={navigation({
        'aria-label': 'Catalog sections',
        items: [
          ...primitiveCatalogGroups.map((group) => ({
            key: group.title,
            label: group.title,
          })),
          { label: 'APG adapters' },
          { label: 'Pages' },
          { label: 'APG patterns' },
        ],
        variant: 'list',
      })}
      title="Catalog"
      mainContent={areaContent({
        blocks: catalogSections.map(({ items, title }) =>
          gridBlock({
            count: countNode(items.length),
            items: items.map((name) => catalogItem(name)),
            key: title,
            title,
          }),
        ),
      })}
    />
  )
}

function catalogItem(name: string) {
  const preview = catalogPreviewFor(name)

  return (
    <PreviewTile key={name} mode={preview.mode} title={name}>
      {preview.body}
    </PreviewTile>
  )
}

function catalogPreviewFor(name: string): ComponentPreview {
  const pageId = pageIdForRouteComponentName(name)

  if (pageId) {
    return pageBlueprintPreview(pageId)
  }

  if (name in apgBlueprintKinds) {
    return apgBlueprintPreview(apgBlueprintKinds[name])
  }

  return componentPreviewFor(name)
}

export function ComponentsPage() {
  const previews = useMemo(
    () =>
      componentInventory.map((item) => ({
        item,
        key: inventoryKey(item),
        preview: componentPreviewFor(item.name),
      })),
    [],
  )
  const initialPreviewKey = previews[0]?.key ?? ''
  const [activeKey, setActiveKey] = useState(initialPreviewKey)
  const active =
    previews.find((entry) => entry.key === activeKey) ?? previews[0]
  const groups = useMemo(() => groupInventoryEntriesByFile(previews), [previews])

  return (
    <PageLayout
      actions={countNode(componentInventorySummary.components, 'previews')}
      eyebrow="src/**/*.tsx"
      layout="rail-main"
      railNavigation={navigation({
        'aria-label': 'Component source browser',
        groups: groups.map((group) => ({
          key: group.file,
          items: group.entries.map(({ item, key }) => ({
            current: key === active?.key,
            key,
            label: item.name,
            onClick: () => setActiveKey(key),
          })),
          title: group.file,
        })),
        variant: 'groups',
      })}
      size="wide"
      title="Components"
      mainContent={areaContent({
        blocks: active
          ? [
              previewStageBlock({
                children: active.preview.body,
                mode: active.preview.mode,
                title: active.item.name,
              }),
            ]
          : [],
      })}
    />
  )
}

export function CompositionPage() {
  return (
    <PageLayout
      actions={countNode(compositionFormulaGroups.length, 'groups')}
      eyebrow="Design system"
      layout="rail-main"
      railNavigation={navigation({
        'aria-label': 'Composition formula groups',
        groups: compositionFormulaGroups.map((group) => ({
          count: countNode(group.items.length),
          items: group.items.map((formula) => ({
            label: formula.name,
            trailing: <small>{formula.previewKey}</small>,
          })),
          title: group.title,
        })),
        variant: 'groups',
      })}
      size="wide"
      title="Composition formulas"
      mainContent={areaContent({
        blocks: [
          sectionGridBlock(3, [
            valueSection({
              items: [
                { label: 'Names', value: 'structural' },
                { label: 'Slots', value: 'open' },
                { label: 'Density', value: 'owned' },
              ],
              title: 'Layer contract',
            }),
            statusSection({
              items: [
                { label: 'No app semantics in formula names', done: true },
                { label: 'Demo domains provide content only', done: true },
                { label: 'Composition owns rhythm and alignment', done: true },
              ],
              title: 'Rules',
            }),
            valueSection({
              items: [
                { label: 'Domain fixtures', value: compositionReuseRows.length },
                { label: 'Formula groups', value: compositionFormulaGroups.length },
                {
                  label: 'Boundary',
                  value: '@interactive-os/aria -> design-md -> app',
                },
              ],
              title: 'Proof fixture',
            }),
          ]),
          tableBlock({
            columns: [
              {
                key: 'page',
                header: 'Fixture',
                render: (row) => row.page,
              },
              {
                key: 'layout',
                header: 'Layout',
                render: (row) => <InlineCode>{row.layout}</InlineCode>,
              },
              {
                key: 'formulas',
                header: 'Shared formulas',
                render: (row) => (
                  <Cluster>
                    {row.formulas.map((formula) => (
                      <InlineCode key={formula}>{formula}</InlineCode>
                    ))}
                  </Cluster>
                ),
              },
              {
                key: 'proof',
                header: 'Proof',
                render: (row) => row.proof,
              },
            ],
            getRowKey: (row) => row.page,
            rows: compositionReuseRows,
            title: 'Cross-domain reuse',
          }),
          ...compositionFormulaGroups.map((group) =>
          gridBlock({
            columns: 3,
            count: countNode(group.items.length),
            items: group.items.map((formula) => formulaTile(formula)),
            key: group.title,
            title: group.title,
          }),
          ),
        ],
      })}
    />
  )
}

function formulaTile(formula: CompositionFormula) {
  const preview = componentPreviewFor(formula.previewKey)

  return (
    <PreviewTile
      detail={<FormulaNotation formula={formula} />}
      key={formula.name}
      mode={preview.mode}
      title={formula.name}
    >
      {preview.body}
    </PreviewTile>
  )
}

function FormulaNotation({ formula }: { formula: CompositionFormula }) {
  return (
    <TextStack
      detail={`${formula.parts.join(' + ')} -> ${formula.output}`}
      title={<InlineCode>{formula.formula}</InlineCode>}
    />
  )
}

function componentPreviewFor(name: string): ComponentPreview {
  const apgPreview = apgComponentPreviews[name]

  if (apgPreview) {
    return controlPreview(apgPreview)
  }

  switch (name) {
    case 'App':
      return controlPreview(
        <PlaceholderSection
          lines={['medium', 'long', 'short']}
          title="Workspace shell"
        />,
      )
    case 'ApprovalComposer':
      return controlPreview(
        <div>
          <ApprovalComposer />
        </div>,
        'wide',
        'preview-composer',
      )
    case 'AccessibleAccordion':
      return controlPreview(
        <AccessibleAccordion
          items={[
            { key: 'one', label: 'One', content: 'First panel.' },
            { key: 'two', label: 'Two', content: 'Second panel.' },
            { key: 'three', label: 'Three', content: 'Third panel.' },
          ]}
        />,
      )
    case 'AccessibleBreadcrumb':
      return controlPreview(
        <AccessibleBreadcrumb
          items={[
            { href: '#home', key: 'home', label: 'Home' },
            { href: '#patterns', key: 'patterns', label: 'Patterns' },
            { current: 'page', key: 'breadcrumb', label: 'Breadcrumb' },
          ]}
        />,
      )
    case 'AccessibleButton':
      return controlPreview(<AccessibleButton label="Run action" pressed />)
    case 'AccessibleCheckboxGroup':
      return controlPreview(
        <AccessibleCheckboxGroup
          items={[
            { checked: true, key: 'build', label: 'Build finished' },
            { key: 'review', label: 'Review needed' },
          ]}
          label="Notifications"
        />,
      )
    case 'AccessibleDisclosure':
      return controlPreview(
        <AccessibleDisclosure
          content="Command timeout: 30s"
          label="Advanced options"
        />,
      )
    case 'AccessibleLink':
      return controlPreview(
        <AccessibleLink href="#patterns" label="APG reference" />,
      )
    case 'AccessibleListbox':
      return controlPreview(
        <AccessibleListbox
          items={[
            { key: 'accordion', label: 'Accordion' },
            { key: 'listbox', label: 'Listbox' },
            { key: 'treeview', label: 'Treeview' },
          ]}
        />,
      )
    case 'AccessibleMenuButton':
      return controlPreview(
        <AccessibleMenuButton
          defaultOpen
          items={[
            { key: 'copy', label: 'Copy' },
            { key: 'rename', label: 'Rename' },
          ]}
        />,
      )
    case 'AccessibleMeter':
      return controlPreview(
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
        />,
      )
    case 'AccessibleRadioGroup':
      return controlPreview(
        <AccessibleRadioGroup
          items={[
            { checked: true, key: 'compact', label: 'Compact' },
            { key: 'comfortable', label: 'Comfortable' },
          ]}
          label="Density"
        />,
      )
    case 'AccessibleSlider':
      return controlPreview(
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
        />,
      )
    case 'AccessibleSpinbutton':
      return controlPreview(
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
        />,
      )
    case 'AccessibleSwitch':
      return controlPreview(
        <AccessibleSwitch
          items={[{ checked: true, key: 'auto-apply', label: 'Auto apply' }]}
          label="Automation"
        />,
      )
    case 'AccessibleTabs':
      return controlPreview(
        <AccessibleTabs
          items={[
            { key: 'code', label: 'Code', content: 'Implementation.' },
            { key: 'preview', label: 'Preview', content: 'Rendered output.' },
            { key: 'aria', label: 'ARIA', content: 'Semantic props.' },
          ]}
        />,
      )
    case 'AccessibleToolbar':
      return controlPreview(
        <AccessibleToolbar
          items={[
            { key: 'decrease', label: 'Decrease' },
            { key: 'tune', label: 'Tune', pressed: true },
            { key: 'settings', label: 'Settings' },
          ]}
          label="Formatting"
        />,
      )
    case 'AccessibleTooltip':
      return controlPreview(
        <AccessibleTooltip
          defaultOpen
          label="Target"
          tooltip="Opens details"
        />,
      )
    case 'AccessibleWindowSplitter':
      return controlPreview(<AccessibleWindowSplitter />, 'wide')
    case 'Button':
      return controlPreview(
        <Cluster>
          <Button>리뷰</Button>
          <Button icon={<Check />} variant="primary">
            적용
          </Button>
          <Button variant="ghost">취소</Button>
        </Cluster>,
      )
    case 'IconButton':
      return controlPreview(
        <Cluster>
          <IconButton icon={<Search />} label="검색" />
          <IconButton icon={<Undo2 />} label="되돌리기" />
          <IconButton icon={<ChevronDown />} label="펼치기" />
        </Cluster>,
      )
    case 'ControlRow':
      return controlPreview(
        <RowStack>
          <ControlRow icon={<Search />} trailing={badgeNode('K')}>
            검색
          </ControlRow>
          <ControlRow aria-current="page" icon={<MessageSquare />}>
            현재 대화
          </ControlRow>
        </RowStack>,
      )
    case 'ChoiceRow':
      return controlPreview(
        <RowStack>
          <ChoiceRow checked prefix="1.">
            예
          </ChoiceRow>
          <ChoiceRow prefix="2.">아니오</ChoiceRow>
        </RowStack>,
      )
    case 'SegmentedControl':
      return controlPreview(
        <SegmentedControl
          label="View"
          options={[
            { label: 'Table', selected: true },
            { label: 'Tiles' },
            { label: 'Diff' },
          ]}
        />,
      )
    case 'FormSection':
      return controlPreview(
        <FormSection
          footer={
            <>
              <Button variant="ghost">취소</Button>
              <Button>저장</Button>
            </>
          }
          title="Form"
        >
          <Field htmlFor="preview-form-field" label="Label">
            <TextInput id="preview-form-field" readOnly value="Value" />
          </Field>
        </FormSection>,
      )
    case 'PlaceholderSection':
      return controlPreview(
        <PlaceholderSection
          lines={['full', 'long', 'medium']}
          title="Placeholder"
        />,
      )
    case 'Section':
      return assemblyPreview([
        surfaceBlock({
          children: <SkeletonStack lines={['full', 'medium']} />,
          title: 'Surface',
        }),
      ])
    case 'ListSection':
      return assemblyPreview(
        [
          sectionGridBlock(2, [
              statusSection({
                items: [
                  { label: '상태 확인', done: true },
                  { label: '렌더 검증' },
                ],
                title: 'Status',
              }),
              valueSection({
                items: [
                  { label: 'Density', value: 'Compact' },
                  { label: 'Radius', value: 'Small' },
                ],
                title: 'Values',
              }),
              recordSection({
                items: [
                  {
                    detail: '마지막 커밋 확인',
                    meta: stateNode('done'),
                    title: 'git status --short',
                  },
                  { detail: '대기 중', title: 'npm run build' },
                ],
                title: 'Records',
              }),
              metricSection({
                columns: 2,
                items: [
                  { label: 'Files', value: '8' },
                  { label: 'Tests', value: '2' },
                ],
                title: 'Metrics',
              }),
              itemSection({
                items: [
                  { icon: FileText, label: '워크스페이스 파일' },
                  { icon: Globe2, label: '웹 검색' },
                ],
                title: 'Items',
              }),
          ]),
        ],
        'wide',
      )
    case 'PageFrame':
      return controlPreview(
        <PageFrame>
          <Titlebar
            eyebrow="Area"
            level="page"
            title="Page frame"
            titleAs="h1"
          />
          <PlaceholderSection lines={['full']} title="Surface" />
        </PageFrame>,
      )
    case 'PageLayout':
      return controlPreview(
        <PageLayout
          asideContent={areaContent({
            blocks: [
              statusSectionBlock({
                items: [{ label: 'Ready', done: true }],
                title: 'Aside',
              }),
            ],
          })}
          eyebrow="Area"
          layout="rail-main-aside"
          railNavigation={navigation({
            'aria-label': 'Preview page rail',
            items: [{ current: true, label: 'Rail' }, { label: 'Filter' }],
            variant: 'list',
          })}
          mainContent={areaContent({
            blocks: [
              sectionBlock({
                children: <SkeletonStack lines={['full']} />,
                title: 'Main',
              }),
            ],
          })}
          title="Page layout"
        />,
        'wide',
      )
    case 'ShellFrame':
      return pagePreview(
        <ShellFrame surface="canvas">
          <ShellMain>
            <ShellSurface surface="canvas">
              <PlaceholderSection lines={['long']} title="Shell" />
            </ShellSurface>
          </ShellMain>
        </ShellFrame>,
      )
    case 'ShellRail':
      return controlPreview(
        <ShellRail aria-label="Preview rail">
          <NavStack aria-label="Preview actions">
            <ControlRow icon={<FileText />}>Action</ControlRow>
            <ControlRow icon={<Search />}>Search</ControlRow>
          </NavStack>
        </ShellRail>,
        'narrow',
      )
    case 'ShellMain':
      return controlPreview(
        <ShellMain>
          <ShellSurface surface="canvas">
            <PlaceholderSection lines={['long']} title="Main" />
          </ShellSurface>
        </ShellMain>,
        'wide',
      )
    case 'ShellTopbar':
      return controlPreview(
        <ShellTopbar
          actions={<IconButton icon={<MoreHorizontal />} label="More" />}
        >
          <Breadcrumb current="workspace" items={['Home']} />
        </ShellTopbar>,
        'wide',
      )
    case 'ShellSurface':
      return controlPreview(
        <ShellSurface surface="canvas">
          <PlaceholderSection lines={['long']} title="Surface" />
        </ShellSurface>,
        'wide',
      )
    case 'ShellInspector':
      return controlPreview(
        <ShellInspector aria-label="Preview inspector">
          {assemblyNode([sectionBlock(sampleStatusSection('Inspector'))])}
        </ShellInspector>,
        'narrow',
      )
    case 'Breadcrumb':
      return controlPreview(
        <Breadcrumb current="design-system/components" items={['Home']} />,
        'wide',
      )
    case 'ScrollStack':
      return controlPreview(
        <ScrollStack>
          {assemblyNode([
            sectionPairBlock(
              sampleStatusSection('One'),
              sampleValueSection('Two'),
            ),
          ])}
        </ScrollStack>,
      )
    case 'NavGroup':
      return controlPreview(
        <NavGroup label="Group">
          <ControlRow aria-current="page" icon={<FolderOpen />}>
            Project
          </ControlRow>
          <IndentedItem depth={1}>
            <ControlRow icon={<MessageSquare />}>Thread</ControlRow>
          </IndentedItem>
        </NavGroup>,
        'narrow',
      )
    case 'FloatingPanel':
      return controlPreview(
        <FloatingPanel open>
          <ControlRow
            as="button"
            aria-pressed="true"
            className="ds-floating-panel-toggle"
            trailing={<kbd>⌘\</kbd>}
          >
            Routes
          </ControlRow>
        </FloatingPanel>,
        'narrow',
      )
    case 'FloatingPanelBody':
      return controlPreview(
        <FloatingPanelBody>
          <NavStack aria-label="Preview floating list">
            <ControlRow aria-current="page">Projects</ControlRow>
            <ControlRow>Changes</ControlRow>
          </NavStack>
        </FloatingPanelBody>,
        'narrow',
      )
    case 'Titlebar':
      return controlPreview(
        <Titlebar
          actions={<Button>Action</Button>}
          detail="Secondary line"
          icon={<FileText />}
          title="Section title"
        />,
      )
    case 'AreaGrid':
      return controlPreview(
        <AreaGrid>
          <Area name="rail">
            <NavStack aria-label="Preview rail">
              <ControlRow aria-current="page">Rail</ControlRow>
              <ControlRow>Filter</ControlRow>
            </NavStack>
          </Area>
          <Area name="main">
            <PlaceholderSection lines={['full']} title="Main" />
          </Area>
          <Area name="aside">
            {assemblyNode([sectionBlock(sampleStatusSection('Aside'))])}
          </Area>
        </AreaGrid>,
      )
    case 'Area':
      return controlPreview(
        <AreaGrid layout="main-aside">
          <Area name="main">
            <PlaceholderSection lines={['full']} title="Main area" />
          </Area>
          <Area name="aside">
            <PlaceholderSection lines={['medium']} title="Aside area" />
          </Area>
        </AreaGrid>,
      )
    case 'NavStack':
      return controlPreview(
        <NavStack aria-label="Preview nav">
          <ControlRow aria-current="page" icon={<FileText />}>
            Files
          </ControlRow>
          <ControlRow icon={<Globe2 />}>Web</ControlRow>
          <ControlRow icon={<Check />}>Verified</ControlRow>
        </NavStack>,
      )
    case 'TabRow':
      return controlPreview(
        <TabRow aria-label="Preview tabs">
          <ControlRow aria-current="page" icon={<Code2 />}>
            Code
          </ControlRow>
          <ControlRow icon={<CircleDot />}>Issues</ControlRow>
        </TabRow>,
      )
    case 'Navigation':
      return assemblyPreview(
        [
          gridBlock({
            columns: 3,
            items: [
              <NavigationSection
                aria-label="Preview navigation list"
                items={[
                  { current: true, icon: <FileText />, label: 'Files' },
                  { icon: <Globe2 />, label: 'Web' },
                ]}
                title="List"
                variant="list"
              />,
              <NavigationSection
                aria-label="Preview navigation tabs"
                items={[
                  { current: true, icon: <Code2 />, label: 'Code' },
                  { icon: <CircleDot />, label: 'Issues' },
                ]}
                title="Tabs"
                variant="tabs"
              />,
              <NavigationSection
                aria-label="Preview grouped navigation"
                groups={[
                  {
                    items: [
                      { current: true, icon: <FolderOpen />, label: 'src' },
                      { icon: <FileText />, label: 'router.ts' },
                    ],
                    title: 'Group',
                  },
                ]}
                title="Groups"
                variant="groups"
              />,
            ],
            title: 'Navigation',
          }),
        ],
        'wide',
      )
    case 'NavigationSection':
      return controlPreview(
        <NavigationSection
          aria-label="Preview section navigation"
          items={[
            { current: true, icon: <FileText />, label: 'Files' },
            { icon: <Globe2 />, label: 'Web' },
          ]}
          title="Navigation"
          variant="list"
        />,
      )
    case 'SectionStack':
      return assemblyPreview([
        sectionBlock(sampleStatusSection('Primary')),
        sectionBlock(sampleValueSection('Secondary')),
      ])
    case 'CollectionGrid':
      return controlPreview(
        <CollectionGrid columns={2}>
          <SkeletonLine width="full" />
          <SkeletonLine width="full" />
          <SkeletonLine width="full" />
          <SkeletonLine width="full" />
        </CollectionGrid>,
      )
    case 'TitledGrid':
      return assemblyPreview(
        [
          gridBlock({
            columns: 2,
            count: '2',
            items: sampleSections().map((section, index) =>
              assemblyNode([sectionBlock(section)], index),
            ),
            title: 'Grouped sections',
          }),
        ],
        'wide',
      )
    case 'StateColumn':
      return assemblyPreview([
        tableBlock({
          columns: [
            textColumn<(typeof dataRows)[number]>('id', 'ID'),
            StateColumn(),
          ],
          getRowKey: (row) => row.id,
          rows: dataRows.slice(0, 3),
          title: 'State column',
        }),
      ])
    case 'SectionGroup':
      return assemblyPreview([
        gridBlock({
          columns: 2,
          count: '2',
          items: sampleSections().map((section, index) =>
            assemblyNode([sectionBlock(section)], index),
          ),
          title: 'Group',
        }),
      ])
    case 'IndentedStack':
      return controlPreview(
        <IndentedStack>
          <IndentedItem>
            <ControlRow icon={<FolderOpen />}>src</ControlRow>
          </IndentedItem>
          <IndentedItem depth={1}>
            <ControlRow icon={<FileText />}>router.ts</ControlRow>
          </IndentedItem>
        </IndentedStack>,
      )
    case 'IndentedItem':
      return controlPreview(
        <IndentedStack>
          <IndentedItem depth={1}>
            <ControlRow icon={<FileText />}>nested item</ControlRow>
          </IndentedItem>
        </IndentedStack>,
      )
    case 'TreeSection':
      return assemblyPreview([
        treeBlock({
          icon: <GitBranch />,
          items: [
            {
              children: [
                { icon: <FileText />, label: 'router.ts' },
                { icon: <FileText />, label: 'pages.tsx' },
              ],
              icon: <FolderOpen />,
              label: 'src',
            },
            {
              children: [{ icon: <FileText />, label: 'notes.md' }],
              icon: <FolderOpen />,
              label: 'docs',
            },
          ],
          title: 'Tree',
        }),
      ])
    case 'SectionBlock':
      return assemblyPreview([sectionBlock(sampleStatusSection('One list'))])
    case 'SectionStackBlock':
      return assemblyPreview([sectionStackBlock(sampleSections())])
    case 'SectionPairBlock':
      return assemblyPreview([
        sectionPairBlock(
          sampleStatusSection('First'),
          sampleValueSection('Second'),
        ),
      ])
    case 'SectionTrioBlock':
      return assemblyPreview([
        sectionTrioBlock(
          sampleStatusSection('First'),
          sampleValueSection('Second'),
          recordSection({
            items: [
              { detail: 'Secondary detail', title: 'Primary record' },
              { detail: 'Secondary detail', title: 'Secondary record' },
            ],
            title: 'Third',
          }),
        ),
      ])
    case 'SectionGridBlock':
      return assemblyPreview([sectionGridBlock(2, sampleSections())], 'wide')
    case 'CodeSectionBlock':
      return assemblyPreview([
        codeSectionBlock({
          items: markedCodeItems([
            ['+', "const state = 'ready'"],
            ['-', "const state = 'pending'"],
          ]),
          title: 'Code',
        }),
      ])
    case 'DeltaSectionBlock':
      return assemblyPreview([
        deltaSectionBlock({
          items: [
            { delta: '+42 -16', label: 'Changed group' },
            { delta: '+96 -12', label: 'Updated section' },
          ],
          title: 'Delta',
        }),
      ])
    case 'ItemSectionBlock':
      return assemblyPreview([
        itemSectionBlock({
          items: [
            { icon: FileText, label: 'Primary item' },
            { icon: Globe2, label: 'Secondary item' },
          ],
          title: 'Items',
        }),
      ])
    case 'MetricSectionBlock':
      return assemblyPreview([
        metricSectionBlock({
          columns: 2,
          items: [
            { label: 'Files', value: '8' },
            { label: 'Tests', value: '2' },
          ],
          title: 'Metrics',
        }),
      ])
    case 'MeterSectionBlock':
      return assemblyPreview([
        meterSectionBlock({
          items: [
            { label: 'Team load', meter: 76, value: '76%' },
            { label: 'Open blocks', meter: 42, value: '11' },
          ],
          title: 'Meters',
        }),
      ])
    case 'RecordSectionBlock':
      return assemblyPreview([
        recordSectionBlock({
          items: [
            {
              detail: 'Secondary detail',
              meta: stateNode('done'),
              title: 'Primary record',
            },
            { detail: 'Secondary detail', title: 'Secondary record' },
          ],
          title: 'Records',
        }),
      ])
    case 'StatusSectionBlock':
      return assemblyPreview([
        statusSectionBlock({
          items: [
            { label: 'Primary state', done: true },
            { label: 'Secondary state' },
          ],
          title: 'Status',
        }),
      ])
    case 'ValueSectionBlock':
      return assemblyPreview([
        valueSectionBlock({
          items: [
            { label: 'Density', value: 'Compact' },
            { label: 'Radius', value: 'Small' },
          ],
          title: 'Values',
        }),
      ])
    case 'SurfaceBlock':
      return assemblyPreview([
        surfaceBlock({
          children: <SkeletonStack lines={['full', 'medium']} />,
          title: 'Surface',
        }),
      ])
    case 'TableBlock':
      return assemblyPreview([
        tableBlock({
          columns: [
            textColumn<(typeof dataRows)[number]>('id', 'ID'),
            StateColumn(),
          ],
          getRowKey: (row) => row.id,
          rows: dataRows.slice(0, 3).map((row, index) => ({
            ...row,
            id: `ROW-${String(index + 1).padStart(3, '0')}`,
          })),
          title: 'Table',
        }),
      ])
    case 'GridBlock':
      return assemblyPreview(
        [
          gridBlock({
            columns: 2,
            items: sampleSections().map((section, index) =>
              assemblyNode([sectionBlock(section)], index),
            ),
            title: 'Grid',
          }),
        ],
        'wide',
      )
    case 'TreeBlock':
      return assemblyPreview([
        treeBlock({
          icon: <FolderOpen />,
          items: [
            {
              children: [{ icon: <FileText />, label: 'index.tsx' }],
              icon: <FolderOpen />,
              label: 'src',
            },
          ],
          title: 'Tree',
        }),
      ])
    case 'TextBlock':
      return assemblyPreview([
        textBlock({
          children: <p>Content line.</p>,
        }),
      ])
    case 'MetaBlock':
      return assemblyPreview([
        metaBlock({
          children: 'Secondary note',
          icon: <MessageSquare />,
          trailing: <ChevronDown />,
        }),
      ])
    case 'SplitView':
      return controlPreview(
        <SplitView>
          <Pane role="rail">
            <NavStack aria-label="Preview split">
              <ControlRow aria-current="page">List</ControlRow>
              <ControlRow>Queue</ControlRow>
            </NavStack>
          </Pane>
          <Pane role="main">
            <PreviewStage mode="control" title="Stage">
              <PlaceholderSection lines={['long']} title="Preview" />
            </PreviewStage>
          </Pane>
        </SplitView>,
      )
    case 'Pane':
      return controlPreview(
        <SplitView>
          <Pane role="rail">
            <ControlRow aria-current="page">Rail pane</ControlRow>
          </Pane>
          <Pane role="main">
            <PlaceholderSection lines={['long']} title="Main pane" />
          </Pane>
        </SplitView>,
      )
    case 'PreviewTile':
      return controlPreview(
        <PreviewTile title="Tile">
          <Button>Action</Button>
        </PreviewTile>,
      )
    case 'PreviewViewport':
      return controlPreview(
        <PreviewViewport>
          <Button>Viewport content</Button>
        </PreviewViewport>,
      )
    case 'PreviewStage':
      return controlPreview(
        <PreviewStage mode="control" title="Stage title">
          <Button>Preview content</Button>
        </PreviewStage>,
      )
    case 'PreviewBox':
      return controlPreview(
        <PreviewBox size="surface">
          <PlaceholderSection lines={['long']} title="Preview box" />
        </PreviewBox>,
      )
    case 'PreviewScale':
      return controlPreview(
        <PreviewScale>
          <PageFrame>
            <Titlebar eyebrow="Scaled" level="page" title="Page" titleAs="h1" />
          </PageFrame>
        </PreviewScale>,
      )
    case 'TextStack':
      return controlPreview(
        <TextStack detail="Secondary line" title="Primary line" />,
      )
    case 'Cluster':
      return controlPreview(
        <Cluster>
          <Button>리뷰</Button>
          <Button variant="primary">적용</Button>
        </Cluster>,
      )
    case 'RowStack':
      return controlPreview(
        <RowStack>
          <ItemRow icon={FileText}>워크스페이스 파일</ItemRow>
          <ItemRow icon={Globe2}>웹 검색</ItemRow>
        </RowStack>,
      )
    case 'Prose':
      return controlPreview(
        <Prose>
          <p>
            Content line with <InlineCode>code</InlineCode>.
          </p>
        </Prose>,
      )
    case 'MetaRow':
      return controlPreview(
        <MetaRow icon={<MessageSquare />} trailing={<ChevronDown />}>
          파일 2개 수정
        </MetaRow>,
      )
    case 'Inspector':
      return controlPreview(
        <div>
          <Inspector />
        </div>,
        'narrow',
        'preview-inspector',
      )
    case 'KeyValueRow':
      return controlPreview(
        <RowStack>
          <KeyValueRow label="Density" value="Compact" />
          <KeyValueRow
            label={<InlineCode>--ds-bg</InlineCode>}
            prefix={<Swatch value="var(--ds-bg)" />}
            value="var(--ds-bg)"
            valueTone="muted"
          />
        </RowStack>,
      )
    case 'ValueList':
      return controlPreview(
        <ValueList
          items={[
            { label: 'Density', value: 'Compact' },
            { label: 'Radius', value: 'Small' },
            { label: 'Shell', value: 'Enabled' },
          ]}
        />,
      )
    case 'DetailRow':
      return controlPreview(
        <RowStack>
          <DetailRow
            detail="마지막 커밋 확인"
            meta={stateNode('done')}
            prefix={<FileText />}
            title="git status --short"
          />
          <DetailRow detail="대기 중" prefix="2" title="npm run build" />
        </RowStack>,
      )
    case 'RecordList':
      return controlPreview(
        <RecordList
          items={[
            {
              detail: '마지막 커밋 확인',
              meta: stateNode('done'),
              prefix: <FileText />,
              title: 'git status --short',
            },
            { detail: '대기 중', prefix: '2', title: 'npm run build' },
          ]}
        />,
      )
    case 'CodeList':
      return controlPreview(
        <CodeList
          items={markedCodeItems([
            ['+', "const state = 'ready'"],
            ['-', "const state = 'pending'"],
          ])}
        />,
      )
    case 'Swatch':
      return controlPreview(
        <Cluster>
          <Swatch value="var(--ds-bg)" />
          <Swatch value="var(--ds-bg-soft)" />
          <Swatch value="var(--ds-text)" />
        </Cluster>,
      )
    case 'SkeletonLine':
      return controlPreview(
        <RowStack>
          <SkeletonLine width="full" />
          <SkeletonLine width="medium" />
        </RowStack>,
      )
    case 'SkeletonStack':
      return controlPreview(
        <SkeletonStack lines={['full', 'long', 'medium', 'short']} />,
      )
    case 'Description':
      return controlPreview(
        <Description>상세 설명은 본문보다 낮은 톤으로 둡니다.</Description>,
      )
    case 'InlineCode':
      return controlPreview(<InlineCode>git pull --ff-only</InlineCode>)
    case 'CodeLine':
      return controlPreview(
        <RowStack>
          <CodeLine marker="+" tone="positive">
            const state = 'ready'
          </CodeLine>
          <CodeLine marker="-" tone="danger">
            const state = 'pending'
          </CodeLine>
        </RowStack>,
      )
    case 'DeltaPair':
      return controlPreview(<DeltaPair positive="+25,037" negative="-4,875" />)
    case 'Badge':
      return controlPreview(
        <Cluster>
          <Badge tone="positive">Ready</Badge>
          <Badge tone="warning">Review</Badge>
          <Badge tone="info">Info</Badge>
        </Cluster>,
      )
    case 'StateBadge':
      return controlPreview(
        <Cluster>
          <StateBadge>Ready</StateBadge>
          <StateBadge>Review</StateBadge>
          <StateBadge>Failed</StateBadge>
        </Cluster>,
      )
    case 'TableSection':
      return assemblyPreview([
        tableBlock({
          columns: [
            textColumn<(typeof dataRows)[number]>('id', 'ID'),
            StateColumn(),
          ],
          getRowKey: (row) => row.id,
          rows: dataRows.slice(0, 3),
          title: 'Rows',
        }),
      ])
    case 'GridSection':
      return assemblyPreview(
        [
          gridBlock({
            columns: 2,
            items: sampleSections().map((section, index) =>
              assemblyNode([sectionBlock(section)], index),
            ),
            title: 'Grid',
          }),
        ],
        'wide',
      )
    case 'SectionGrid':
      return assemblyPreview(
        [sampleSectionGridBlock()],
        'wide',
      )
    case 'MeterRow':
      return controlPreview(
        <MeterRow label="Team load" meter={76} value="76%" />,
      )
    case 'MeterList':
      return controlPreview(
        <MeterList
          items={[
            { label: 'Team load', meter: 76, value: '76%' },
            { label: 'Open blocks', meter: 42, value: '11' },
          ]}
        />,
      )
    case 'EmptyState':
      return controlPreview(
        <EmptyState icon={<Inbox />} title="채팅 없음" />,
      )
    case 'DeltaRow':
      return controlPreview(
        <RowStack>
          <DeltaRow delta="+42 -16" label="Changed group" />
          <DeltaRow delta="+96 -12" label="Updated section" />
        </RowStack>,
      )
    case 'DeltaList':
      return controlPreview(
        <DeltaList
          items={[
            { delta: '+42 -16', label: 'Changed group' },
            { delta: '+96 -12', label: 'Updated section' },
          ]}
        />,
      )
    case 'CheckRow':
      return controlPreview(
        <RowStack as="ol">
          <CheckRow done>Stop and inspect current state</CheckRow>
          <CheckRow>Check rendered density</CheckRow>
        </RowStack>,
      )
    case 'StatusList':
      return controlPreview(
        <StatusList
          items={[
            { label: 'Stop and inspect current state', done: true },
            { label: 'Check rendered density' },
          ]}
        />,
      )
    case 'ItemRow':
      return controlPreview(
        <RowStack>
          <ItemRow icon={FileText} value="+894">
            변경 사항
          </ItemRow>
          <ItemRow icon={SquareTerminal} value="Vite">
            환경
          </ItemRow>
        </RowStack>,
      )
    case 'ItemList':
      return controlPreview(
        <ItemList
          items={[
            { icon: FileText, label: '워크스페이스 파일' },
            { icon: Globe2, label: '웹 검색' },
          ]}
        />,
      )
    case 'Field':
      return controlPreview(
        <Field htmlFor="preview-field" label="Pattern">
          <TextInput id="preview-field" readOnly value="Listbox" />
        </Field>,
      )
    case 'FieldGroup':
      return controlPreview(
        <FieldGroup legend="Density">
          <CheckboxRow checked readOnly>
            Compact
          </CheckboxRow>
          <CheckboxRow readOnly>Comfortable</CheckboxRow>
        </FieldGroup>,
      )
    case 'InputFrame':
      return controlPreview(
        <InputFrame trailing={<Search />}>
          <TextInput aria-label="Search" readOnly value="Listbox" />
        </InputFrame>,
      )
    case 'TextInput':
      return controlPreview(
        <TextInput aria-label="Pattern" readOnly value="Listbox" />,
      )
    case 'RangeInput':
      return controlPreview(
        <Field htmlFor="preview-range" label="Preview scale">
          <RangeInput
            id="preview-range"
            max={100}
            min={0}
            readOnly
            value={64}
          />
        </Field>,
      )
    case 'CheckboxInput':
      return controlPreview(
        <CheckboxInput aria-label="Select row" checked readOnly />,
      )
    case 'CheckboxRow':
      return controlPreview(
        <CheckboxRow checked readOnly>
          Build finished
        </CheckboxRow>,
      )
    case 'MeterBar':
      return controlPreview(
        <MeterBar max={100} min={0} value={72}>
          72%
        </MeterBar>,
      )
    case 'DataTable':
      return controlPreview(
        <DataTable
          columns={[
            textColumn<(typeof dataRows)[number]>('id', 'ID'),
            StateColumn(),
          ]}
          getRowKey={(row) => row.id}
          rows={dataRows.slice(0, 3)}
        />,
      )
    case 'WorkstreamPage':
      return pagePreview(<WorkstreamPage />)
    case 'ProjectsPage':
      return pagePreview(<ProjectsPage />)
    case 'ChangesPage':
      return pagePreview(<ChangesPage />)
    case 'RunsPage':
      return pagePreview(<RunsPage />)
    case 'ApprovalsPage':
      return pagePreview(<ApprovalsPage />)
    case 'SourcesPage':
      return pagePreview(<SourcesPage />)
    case 'DatabasePage':
      return pagePreview(<DatabasePage />)
    case 'AnalyticsPage':
      return pagePreview(<AnalyticsPage />)
    case 'CommercePage':
      return pagePreview(<CommercePage />)
    case 'CrmPage':
      return pagePreview(<CrmPage />)
    case 'SchedulePage':
      return pagePreview(<SchedulePage />)
    case 'ContentPage':
      return pagePreview(<ContentPage />)
    case 'RepositoryPage':
      return pagePreview(<RepositoryPage />)
    case 'ComponentsPage':
      return controlPreview(
        <PlaceholderSection
          detail={`${componentInventorySummary.components} components`}
          lines={['full', 'long', 'medium']}
          title="컴포넌트 프리뷰"
        />,
      )
    case 'CompositionPage':
      return assemblyPreview([
        gridBlock({
          columns: 2,
          count: `${compositionFormulaGroups.length} groups`,
          items: compositionFormulaGroups.slice(0, 2).map((group) =>
            assemblyNode([
              valueSectionBlock({
                items: group.items.slice(0, 3).map((formula) => ({
                  label: formula.name,
                  value: formula.previewKey,
                })),
                title: group.title,
              }),
            ]),
          ),
          title: 'Composition formulas',
        }),
      ])
    case 'CatalogPage':
      return assemblyPreview([
        gridBlock({
          columns: 2,
          count: `${componentInventorySummary.components} components`,
          items: sampleSections().map((section, index) =>
            assemblyNode([sectionBlock(section)], index),
          ),
          title: '디자인 도구',
        }),
      ])
    case 'TokensPage':
      return pagePreview(<TokensPage />)
    case 'SettingsPage':
      return pagePreview(<SettingsPage />)
    default:
      return {
        mode: 'source',
        body: (
          <PlaceholderSection
            icon={<FileText />}
            lines={['long']}
            title="preview props 필요"
          />
        ),
      }
  }
}

function pageBlueprintPreview(pageId: PageId): ComponentPreview {
  return controlPreview(
    <LayoutBlueprint layout={pageBlueprintLayouts[pageId]} />,
    'tile',
  )
}

function apgBlueprintPreview(kind: PatternBlueprintKind): ComponentPreview {
  return controlPreview(<PatternBlueprint kind={kind} />, 'tile')
}
