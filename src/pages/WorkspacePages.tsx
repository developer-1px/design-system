import { useMemo, useState, type ReactNode } from 'react'
import {
  Check,
  ChevronDown,
  Code2,
  FileText,
  FolderOpen,
  Globe2,
  Inbox,
  MessageSquare,
  Search,
  SquareTerminal,
  Undo2,
} from 'lucide-react'
import { ApprovalComposer } from '../components/ApprovalComposer'
import { Inspector } from '../components/Inspector'
import {
  ActionDock,
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  CheckRow,
  CheckboxInput,
  CheckboxRow,
  ChoiceRow,
  Cluster,
  CodeLine,
  ControlRow,
  DataTable,
  Description,
  DetailRow,
  DeltaPair,
  EmptyState,
  FactRow,
  Field,
  FieldGroup,
  FileRow,
  Grid,
  IconButton,
  InputFrame,
  InlineCode,
  KeyValueRow,
  ListCard,
  MetaRow,
  MeterBar,
  MetricCard,
  PageStack,
  Panel,
  Prose,
  RangeInput,
  RowStack,
  SectionHeader,
  SegmentedControl,
  SkeletonLine,
  SourceRow,
  Swatch,
  TextInput,
} from '../design-system/primitives'
import {
  approvals,
  changedFiles,
  dataRows,
  pageMeta,
  projectGroups,
  runLog,
  systemPasses,
  tokenGroups,
  type PageId,
} from '../data/demo'
import { apgComponentPreviews } from '../components/apg/ApgPreviewRegistry'
import {
  componentInventory,
  componentInventorySummary,
} from '../data/componentInventory'

const routeComponentNames: Record<PageId, string> = {
  workstream: 'WorkstreamPage',
  projects: 'ProjectsPage',
  changes: 'ChangesPage',
  runs: 'RunsPage',
  approvals: 'ApprovalsPage',
  sources: 'SourcesPage',
  database: 'DatabasePage',
  components: 'ComponentsPage',
  catalog: 'CatalogPage',
  tokens: 'TokensPage',
  settings: 'SettingsPage',
}

const primitiveCatalogGroups = [
  {
    title: 'Controls',
    items: ['Button', 'IconButton', 'ControlRow', 'ChoiceRow', 'SegmentedControl'],
  },
  {
    title: 'Forms',
    items: [
      'Field',
      'FieldGroup',
      'InputFrame',
      'TextInput',
      'RangeInput',
      'CheckboxInput',
      'CheckboxRow',
      'MeterBar',
    ],
  },
  {
    title: 'Rows',
    items: [
      'MetaRow',
      'KeyValueRow',
      'DetailRow',
      'FileRow',
      'CheckRow',
      'FactRow',
      'SourceRow',
    ],
  },
  {
    title: 'Content',
    items: [
      'Badge',
      'Swatch',
      'SkeletonLine',
      'Description',
      'InlineCode',
      'CodeLine',
      'DeltaPair',
    ],
  },
  {
    title: 'Surfaces',
    items: [
      'Panel',
      'Card',
      'CardHeader',
      'CardTitle',
      'CardBody',
      'CardFooter',
      'ListCard',
      'MetricCard',
      'EmptyState',
    ],
  },
  {
    title: 'Layout',
    items: ['PageStack', 'Cluster', 'Grid', 'RowStack', 'Prose', 'SectionHeader'],
  },
  {
    title: 'Product',
    items: ['ActionDock', 'ApprovalComposer', 'Inspector', 'DataTable'],
  },
] as const

const pageCatalogItems = pageMeta.map((page) => routeComponentNames[page.id])
const apgCatalogItems = Object.keys(apgComponentPreviews).sort()

export function WorkstreamPage() {
  return (
    <>
      <Prose>
        <p>
          커밋 완료했습니다. 이제 원격에 push하고, 끝나면{' '}
          <InlineCode>git pull --ff-only</InlineCode>로 로컬/원격
          동기화 상태를 확인하겠습니다.
        </p>
        <p>
          확인해보니 App Server의{' '}
          <InlineCode>tool:progress</InlineCode> 알림은 tool id만 있고
          이름은 빠질 수 있습니다. 지금 TUI 쪽은 이걸 progress라는 별도 완료
          이벤트처럼 보낼 수 있어서 mapper에 tool name 추적을 넣겠습니다.
        </p>
      </Prose>

      <MetaRow icon={<MessageSquare />}>파일 2개 수정</MetaRow>

      <Prose>
        <p>
          progress 매핑을 같은 tool의{' '}
          <InlineCode>agent.tool_input</InlineCode>으로 바꿨습니다.
          이제 단위 테스트부터 다시 돌립니다.
        </p>
      </Prose>

      <ChangeCard />

      <MetaRow>11h 27m 44s 동안 작업 중입니다</MetaRow>

      <Prose>
        <p>
          좋아, 방금 끊긴 지점부터 이어서 상태를 다시 잡겠습니다. 마지막 커밋이
          로컬에만 남았을 수 있으니 먼저 브랜치/워킹트리/원격 차이를 확인하고,
          밀린 push와 pull부터 정리할게요.
        </p>
      </Prose>

      <CommandLog />
    </>
  )
}

export function ProjectsPage() {
  return (
    <PageStack>
      <SectionHeader
        eyebrow="작업 공간"
        title="프로젝트와 대화 흐름"
        actions={<Button icon={<Search />}>검색</Button>}
      />
      <Grid columns={3}>
        <MetricCard label="Projects" value="4" detail="활성 workspace 그룹" />
        <MetricCard label="Threads" value="11" detail="최근 대화와 승인 요청" />
        <MetricCard label="Pending" value="1" detail="승인 대기 중" />
      </Grid>
      <Grid columns={2}>
        {projectGroups[0].items.map((project) => (
          <Card key={project.name} pad>
            <CardHeader
              actions={
                <Badge tone={project.name === 'cstar-cli' ? 'positive' : undefined}>
                {project.threads.length || '0'} chats
                </Badge>
              }
              title={project.name}
            />
            {project.threads.length ? (
              <RowStack>
                {project.threads.map((thread) => (
                  <DetailRow
                    key={thread.title}
                    meta={thread.meta}
                    prefix={<MessageSquare />}
                    title={thread.title}
                  />
                ))}
              </RowStack>
            ) : (
              <EmptyState
                icon={<Inbox />}
                title="채팅 없음"
                description="아직 연결된 대화가 없습니다."
              />
            )}
          </Card>
        ))}
      </Grid>
    </PageStack>
  )
}

export function ChangesPage() {
  return (
    <PageStack>
      <SectionHeader
        eyebrow="변경 사항"
        title="변경 파일 리뷰"
        actions={
          <>
            <Button icon={<Undo2 />}>되돌리기</Button>
            <Button variant="primary">리뷰</Button>
          </>
        }
      />
      <ChangeCard />
      <ListCard
        actions={<Badge tone="info">typed event mapper</Badge>}
        title={<InlineCode>approvalProtocol.ts</InlineCode>}
      >
        {[
          ['+', 'const toolName = progressToolNames.get(toolId)'],
          ['+', 'emitToolInputDelta({ toolName, toolId, payload })'],
          ['-', 'emitProgressComplete({ id: toolId })'],
        ].map(([sign, line]) => (
          <CodeLine
            key={line}
            marker={sign}
            tone={sign === '+' ? 'positive' : 'danger'}
          >
            {line}
          </CodeLine>
        ))}
      </ListCard>
    </PageStack>
  )
}

export function RunsPage() {
  return (
    <PageStack>
      <SectionHeader
        eyebrow="실행"
        title="실행 로그"
        actions={<Button icon={<SquareTerminal />}>새 실행</Button>}
      />
      <Card pad>
        <RowStack>
          {runLog.map((run, index) => (
            <DetailRow
              detail={run.result}
              key={run.command}
              meta={
                <Badge tone={run.state === 'done' ? 'positive' : undefined}>
                  {run.state}
                </Badge>
              }
              prefix={index + 1}
              title={<InlineCode>{run.command}</InlineCode>}
            />
          ))}
        </RowStack>
      </Card>
    </PageStack>
  )
}

export function ApprovalsPage() {
  return (
    <PageStack>
      <SectionHeader
        eyebrow="승인"
        title="승인 큐"
      />
      <Grid columns={2}>
        {approvals.map((approval) => (
          <Card key={approval.title} pad>
            <CardHeader
              actions={
              <Badge
                tone={
                  approval.state === 'Pending'
                    ? 'warning'
                    : approval.state === 'Ready'
                      ? 'positive'
                      : undefined
                }
              >
                {approval.state}
              </Badge>
              }
              title={approval.title}
            />
            <Description>{approval.detail}</Description>
            <CodeLine>{approval.command}</CodeLine>
            <Cluster>
              <Button>건너뛰기</Button>
              <Button variant="primary">허용</Button>
            </Cluster>
          </Card>
        ))}
      </Grid>
    </PageStack>
  )
}

export function SourcesPage() {
  return (
    <PageStack>
      <SectionHeader
        eyebrow="출처"
        title="출처와 근거"
        actions={<Button icon={<Globe2 />}>출처 추가</Button>}
      />
      <Grid columns={2}>
        {[
          ['워크스페이스 파일', 'src/App.tsx, design-system primitives', 'Local'],
          ['레퍼런스 이미지', 'Codex 앱 화면의 밀도와 여백', 'Visual'],
          ['실행 결과', 'lint/build/rendering checks', 'Verified'],
          ['사용자 취향', 'light, minimal, 작은 장식', 'Preference'],
        ].map(([title, detail, meta]) => (
          <Card key={title} pad>
            <CardHeader icon={<FileText />} title={title} />
            <Description>{detail}</Description>
            <Badge>{meta}</Badge>
          </Card>
        ))}
      </Grid>
    </PageStack>
  )
}

export function DatabasePage() {
  return (
    <PageStack>
      <SectionHeader
        eyebrow="Private Database"
        title="Employee Overview"
        actions={
          <SegmentedControl
            label="Database tabs"
            options={[
              { label: 'Employees', selected: true },
              { label: 'Departments' },
              { label: 'Positions' },
            ]}
          />
        }
      />
      <Card>
        <DataTable
          columns={[
            {
              key: 'select',
              header: <CheckboxInput aria-label="Select all employees" />,
              render: (row) => (
                <CheckboxInput aria-label={`Select ${row.id}`} />
              ),
            },
            { key: 'id', header: 'Employee', render: (row) => row.id },
            {
              key: 'department',
              header: 'Department',
              render: (row) => (
                <Badge tone={row.state === 'Active' ? 'positive' : 'warning'}>
                  {row.department}
                </Badge>
              ),
            },
            { key: 'email', header: 'Email', render: (row) => row.email },
            {
              key: 'state',
              header: 'Employment',
              render: (row) => (
                <Badge tone={row.state === 'Active' ? 'positive' : 'warning'}>
                  {row.state}
                </Badge>
              ),
            },
            { key: 'owner', header: 'First Name', render: (row) => row.owner },
          ]}
          getRowKey={(row) => row.id}
          rows={dataRows}
        />
      </Card>
    </PageStack>
  )
}

export function CatalogPage() {
  return (
    <div className="catalog-page">
      <SectionHeader
        eyebrow="Catalog"
        title="디자인 도구"
      />

      {primitiveCatalogGroups.map((group) => (
        catalogGroup(group.title, group.items)
      ))}

      {catalogGroup('Pages', pageCatalogItems)}
      {catalogGroup('ARIA', apgCatalogItems)}
    </div>
  )
}

function catalogGroup(title: string, items: readonly string[]) {
  return (
    <section className="catalog-group" key={title}>
      <header className="catalog-group-head">
        <h2>{title}</h2>
        <span>{items.length}</span>
      </header>
      <div className="catalog-grid">
        {items.map((name) => (
          catalogItem(name)
        ))}
      </div>
    </section>
  )
}

function catalogItem(name: string) {
  const preview = componentPreviewFor(name)
  const source = componentInventory.find((item) => item.name === name)

  return (
    <article className="catalog-item" data-mode={preview.mode} key={name}>
      <header className="catalog-item-head">
        <strong>{name}</strong>
        {source ? <span>{source.file.replace(/^src\//, '')}</span> : null}
      </header>
      <div className="catalog-preview">
        {preview.body}
      </div>
    </article>
  )
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
  const initialPreviewKey =
    previews.find((entry) => entry.item.name === 'ApgAccordion')?.key ??
    previews.find((entry) => entry.item.name === 'ActionDock')?.key ??
    previews.find((entry) => entry.item.name === 'ApprovalComposer')?.key ??
    previews[0]?.key ??
    ''
  const [activeKey, setActiveKey] = useState(initialPreviewKey)
  const active = previews.find((entry) => entry.key === activeKey) ?? previews[0]
  const groups = useMemo(() => groupPreviewsByFile(previews), [previews])

  return (
    <div className="component-page">
      <header className="component-lab-head">
        <div>
          <p className="ds-label">src/**/*.tsx</p>
          <h1>Component bench</h1>
        </div>
      </header>

      <div className="component-lab-layout">
        <aside className="component-browser" aria-label="Component source browser">
          {groups.map((group) => (
            <section className="component-browser-group" key={group.file}>
              <p>{group.file}</p>
              {group.entries.map(({ item, key }) => (
                <ControlRow
                  as="button"
                  aria-current={key === active?.key ? 'true' : undefined}
                  className="component-browser-row"
                  key={key}
                  onClick={() => setActiveKey(key)}
                >
                  {item.name}
                </ControlRow>
              ))}
            </section>
          ))}
        </aside>

        {active ? (
          <section className="component-stage">
            <header className="component-stage-head">
              <div>
                <h2>{active.item.name}</h2>
              </div>
            </header>
            <div className="component-stage-canvas" data-mode={active.preview.mode}>
              {active.preview.body}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  )
}

type ComponentPreviewEntry = {
  item: (typeof componentInventory)[number]
  key: string
  preview: ComponentPreview
}

type ComponentPreview = {
  body: ReactNode
  mode: 'control' | 'page' | 'source'
}

function inventoryKey(item: (typeof componentInventory)[number]) {
  return `${item.file}:${item.name}:${item.line}`
}

function groupPreviewsByFile(previews: ComponentPreviewEntry[]) {
  const groups = new Map<string, ComponentPreviewEntry[]>()

  previews.forEach((entry) => {
    const shortFile = entry.item.file.replace(/^src\//, '')
    groups.set(shortFile, [...(groups.get(shortFile) ?? []), entry])
  })

  return Array.from(groups.entries()).map(([file, entries]) => ({ file, entries }))
}

function componentPreviewFor(name: string): ComponentPreview {
  const apgPreview = apgComponentPreviews[name]

  if (apgPreview) {
    return controlPreview(apgPreview)
  }

  switch (name) {
    case 'App':
      return controlPreview(
        <Card className="component-preview-panel" pad>
          <CardHeader title="Workspace shell" />
          <RowStack>
            <SkeletonLine width="54%" />
            <SkeletonLine width="72%" />
            <SkeletonLine width="44%" />
          </RowStack>
        </Card>,
      )
    case 'ApprovalComposer':
      return controlPreview(
        <div className="component-preview-composer">
          <ApprovalComposer />
        </div>,
      )
    case 'Button':
      return controlPreview(
        <Cluster className="component-preview-row">
          <Button>리뷰</Button>
          <Button icon={<Check />} variant="primary">
            적용
          </Button>
          <Button variant="ghost">취소</Button>
        </Cluster>,
      )
    case 'IconButton':
      return controlPreview(
        <Cluster className="component-preview-row">
          <IconButton icon={<Search />} label="검색" />
          <IconButton icon={<Undo2 />} label="되돌리기" />
          <IconButton icon={<ChevronDown />} label="펼치기" />
        </Cluster>,
      )
    case 'ControlRow':
      return controlPreview(
        <RowStack>
          <ControlRow icon={<Search />} trailing={<Badge>K</Badge>}>
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
            { label: 'Cards' },
            { label: 'Diff' },
          ]}
        />,
      )
    case 'ActionDock':
      return controlPreview(
        <ActionDock
          items={[
            { icon: FolderOpen, label: '파일', detail: '프로젝트 파일' },
            { icon: MessageSquare, label: '사이드 채팅', detail: '대화 시작' },
            { icon: Globe2, label: '브라우저', detail: '웹사이트 열기' },
            { icon: FileText, label: '검토', detail: '변경사항 보기' },
          ]}
        />,
      )
    case 'Panel':
      return controlPreview(
        <Panel className="component-preview-panel">
          <CardHeader actions={<Check />} title="진행 상황" />
          <RowStack as="ol">
            <CheckRow done>상태 확인</CheckRow>
            <CheckRow>렌더 검증</CheckRow>
          </RowStack>
        </Panel>,
      )
    case 'Card':
      return controlPreview(
        <Card className="component-preview-inner-card" pad>
          <CardTitle>파일 3개 편집됨</CardTitle>
          <FileRow path="src/App.tsx" delta="+18 -4" />
        </Card>,
      )
    case 'CardHeader':
      return controlPreview(
        <CardHeader
          actions={<Badge tone="positive">Ready</Badge>}
          detail="3 files updated"
          icon={<FileText />}
          title="Sync complete"
        />,
      )
    case 'CardTitle':
      return controlPreview(<CardTitle>파일 3개 편집됨</CardTitle>)
    case 'CardBody':
      return controlPreview(
        <Card className="component-preview-inner-card">
          <CardBody>
            <p>본문은 카드 안에서만 필요한 간격을 갖습니다.</p>
          </CardBody>
        </Card>,
      )
    case 'CardFooter':
      return controlPreview(
        <Card className="component-preview-inner-card">
          <CardFooter>
            <Button variant="ghost">취소</Button>
            <Button>저장</Button>
          </CardFooter>
        </Card>,
      )
    case 'ListCard':
      return controlPreview(
        <ListCard className="component-preview-inner-card" title="진행 상황">
          <CheckRow done>상태 확인</CheckRow>
          <CheckRow>렌더 검증</CheckRow>
        </ListCard>,
      )
    case 'Grid':
      return controlPreview(
        <Grid className="component-preview-metrics" columns={2}>
          <MetricCard label="Files" value="8" />
          <MetricCard label="Tests" value="2" />
        </Grid>,
      )
    case 'PageStack':
      return controlPreview(
        <PageStack>
          <SkeletonLine width="68%" />
          <SkeletonLine width="92%" />
          <SkeletonLine width="54%" />
        </PageStack>,
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
          <SourceRow icon={FileText}>워크스페이스 파일</SourceRow>
          <SourceRow icon={Globe2}>웹 검색</SourceRow>
        </RowStack>,
      )
    case 'Prose':
      return controlPreview(
        <Prose>
          <p>본문은 줄 간격과 폭만 통제하고 장식은 붙이지 않습니다.</p>
          <p>코드는 <InlineCode>InlineCode</InlineCode>로만 표시합니다.</p>
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
        <div className="component-preview-inspector">
          <Inspector />
        </div>,
      )
    case 'KeyValueRow':
      return controlPreview(
        <RowStack>
          <KeyValueRow label="Density" value="Compact" />
          <KeyValueRow
            label={<InlineCode>--ds-bg</InlineCode>}
            prefix={<Swatch value="#ffffff" />}
            value="#ffffff"
            valueTone="muted"
          />
        </RowStack>,
      )
    case 'DetailRow':
      return controlPreview(
        <RowStack>
          <DetailRow
            detail="마지막 커밋 확인"
            meta={<Badge tone="positive">done</Badge>}
            prefix={<FileText />}
            title="git status --short"
          />
          <DetailRow detail="대기 중" prefix="2" title="npm run build" />
        </RowStack>,
      )
    case 'Swatch':
      return controlPreview(
        <Cluster className="component-preview-row">
          <Swatch value="#ffffff" />
          <Swatch value="#f8f8f7" />
          <Swatch value="#242421" />
        </Cluster>,
      )
    case 'SkeletonLine':
      return controlPreview(
        <RowStack>
          <SkeletonLine width="88%" />
          <SkeletonLine width="62%" />
        </RowStack>,
      )
    case 'Description':
      return controlPreview(<Description>상세 설명은 본문보다 낮은 톤으로 둡니다.</Description>)
    case 'InlineCode':
      return controlPreview(<InlineCode>git pull --ff-only</InlineCode>)
    case 'CodeLine':
      return controlPreview(
        <RowStack>
          <CodeLine marker="+" tone="positive">const state = 'ready'</CodeLine>
          <CodeLine marker="-" tone="danger">const state = 'pending'</CodeLine>
        </RowStack>,
      )
    case 'DeltaPair':
      return controlPreview(<DeltaPair positive="+25,037" negative="-4,875" />)
    case 'Badge':
      return controlPreview(
        <Cluster className="component-preview-row">
          <Badge tone="positive">Ready</Badge>
          <Badge tone="warning">Review</Badge>
          <Badge tone="info">Info</Badge>
        </Cluster>,
      )
    case 'SectionHeader':
      return controlPreview(
        <SectionHeader
          eyebrow="작업 공간"
          title="변경 파일 리뷰"
          actions={<Button>리뷰</Button>}
        />,
      )
    case 'MetricCard':
      return controlPreview(
        <Grid className="component-preview-metrics" columns={2}>
          <MetricCard label="Files" value="8" detail="변경됨" />
          <MetricCard label="Tests" value="2" detail="통과" />
        </Grid>,
      )
    case 'EmptyState':
      return controlPreview(
        <EmptyState
          icon={<Inbox />}
          title="채팅 없음"
          description="아직 연결된 대화가 없습니다."
        />,
      )
    case 'FileRow':
      return controlPreview(
        <RowStack className="component-preview-stack">
          <FileRow path="src/pages/WorkspacePages.tsx" delta="+42 -16" />
          <FileRow path="src/App.css" delta="+96 -12" />
        </RowStack>,
      )
    case 'CheckRow':
      return controlPreview(
        <RowStack as="ol" className="component-preview-list">
          <CheckRow done>Stop and inspect current state</CheckRow>
          <CheckRow>Check rendered density</CheckRow>
        </RowStack>,
      )
    case 'FactRow':
      return controlPreview(
        <RowStack className="component-preview-stack">
          <FactRow icon={FileText} label="변경 사항" value="+894" />
          <FactRow icon={SquareTerminal} label="환경" value="Vite" />
        </RowStack>,
      )
    case 'SourceRow':
      return controlPreview(
        <RowStack className="component-preview-stack">
          <SourceRow icon={FileText}>워크스페이스 파일</SourceRow>
          <SourceRow icon={Globe2}>웹 검색</SourceRow>
        </RowStack>,
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
          <CheckboxRow checked readOnly>Compact</CheckboxRow>
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
      return controlPreview(<TextInput aria-label="Pattern" readOnly value="Listbox" />)
    case 'RangeInput':
      return controlPreview(
        <Field htmlFor="preview-range" label="Preview scale">
          <RangeInput id="preview-range" max={100} min={0} readOnly value={64} />
        </Field>,
      )
    case 'CheckboxInput':
      return controlPreview(<CheckboxInput aria-label="Select row" checked readOnly />)
    case 'CheckboxRow':
      return controlPreview(<CheckboxRow checked readOnly>Build finished</CheckboxRow>)
    case 'MeterBar':
      return controlPreview(<MeterBar max={100} min={0} value={72}>72%</MeterBar>)
    case 'DataTable':
      return controlPreview(
        <DataTable
          columns={[
            { key: 'id', header: 'ID', render: (row) => row.id },
            { key: 'state', header: 'State', render: (row) => row.state },
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
    case 'ComponentsPage':
      return controlPreview(
        <Card className="component-preview-inner-card" pad>
          <CardHeader
            detail={`${componentInventorySummary.components} components`}
            title="컴포넌트 프리뷰"
          />
          <RowStack>
            <SkeletonLine width="92%" />
            <SkeletonLine width="76%" />
            <SkeletonLine width="58%" />
          </RowStack>
        </Card>,
      )
    case 'CatalogPage':
      return controlPreview(
        <Card className="component-preview-inner-card" pad>
          <CardHeader
            detail={`${componentInventorySummary.components} components`}
            title="디자인 도구"
          />
          <Grid columns={2}>
            <SkeletonLine width="100%" />
            <SkeletonLine width="100%" />
            <SkeletonLine width="100%" />
            <SkeletonLine width="100%" />
          </Grid>
        </Card>,
      )
    case 'TokensPage':
      return pagePreview(<TokensPage />)
    case 'SettingsPage':
      return pagePreview(<SettingsPage />)
    case 'ChangeCard':
      return controlPreview(<ChangeCard className="component-preview-inner-card" />)
    case 'CommandLog':
      return controlPreview(<CommandLog />)
    default:
      return {
        mode: 'source',
        body: (
          <Card className="component-preview-inner-card" pad>
            <CardHeader icon={<FileText />} title="preview props 필요" />
          </Card>
        ),
      }
  }
}

function controlPreview(body: ReactNode): ComponentPreview {
  return { body, mode: 'control' }
}

function pagePreview(body: ReactNode): ComponentPreview {
  return {
    mode: 'page',
    body: <div className="component-preview-scale">{body}</div>,
  }
}

export function TokensPage() {
  return (
    <PageStack>
      <SectionHeader
        eyebrow="Values"
        title="색과 밀도"
      />
      <Grid columns={3}>
        {tokenGroups.map((group) => (
          <ListCard key={group.label} title={group.label}>
            {group.tokens.map(([name, value]) => (
              <KeyValueRow
                key={name}
                label={<InlineCode>{name}</InlineCode>}
                prefix={<Swatch value={value} />}
                value={value}
                valueTone="muted"
              />
            ))}
          </ListCard>
        ))}
      </Grid>
      <ListCard ordered title="디자인 점검">
        {systemPasses.map((item) => (
          <CheckRow done key={item}>{item}</CheckRow>
        ))}
      </ListCard>
    </PageStack>
  )
}

export function SettingsPage() {
  return (
    <PageStack>
      <SectionHeader
        eyebrow="Preferences"
        title="데모 기본 설정"
      />
      <ListCard title="기본값">
        {[
          ['Hero sections', 'Disabled'],
          ['Decorative gradients', 'Disabled'],
          ['Density', 'Compact'],
          ['Radius', 'Small'],
          ['Primary shell', 'Sidebar + work rail + inspector'],
        ].map(([label, value]) => (
          <KeyValueRow key={label} label={label} value={value} />
        ))}
      </ListCard>
    </PageStack>
  )
}

function ChangeCard({ className = '' }: { className?: string } = {}) {
  return (
    <ListCard
      actions={
        <>
          <Button icon={<Undo2 />} variant="ghost">
            실행 취소
          </Button>
          <Button>리뷰</Button>
        </>
      }
      className={className}
      detail={<DeltaPair positive="+271" negative="-51" />}
      icon={<Code2 />}
      title="파일 8개 편집됨"
    >
      {changedFiles.map((file) => (
        <FileRow key={file.path} path={file.path} delta={file.delta} />
      ))}
      <Button icon={<ChevronDown />}>
        5개 파일 더 보기
      </Button>
    </ListCard>
  )
}
function CommandLog() {
  return (
    <RowStack>
      <MetaRow icon={<SquareTerminal />} trailing={<ChevronDown />}>
        명령어 3개 실행함
      </MetaRow>
      <CodeLine>git log --oneline --decorate -5 실행함</CodeLine>
      <CodeLine>
        git rev-list --left-right --count origin/feat/cli-work...HEAD 실행함
      </CodeLine>
      <CodeLine>git status --short --branch 실행함</CodeLine>
    </RowStack>
  )
}
