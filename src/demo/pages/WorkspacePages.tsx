import {
  BarChart3,
  CalendarDays,
  Check,
  ChevronDown,
  Code2,
  Columns3,
  CreditCard,
  FileText,
  FolderOpen,
  GitBranch,
  GitPullRequest,
  Globe2,
  Inbox,
  KanbanSquare,
  MessageSquare,
  CircleDot,
  Package,
  Search,
  ShoppingCart,
  SquareTerminal,
  Undo2,
  Users,
} from 'lucide-react'
import {
  Button,
  InlineCode,
  PageLayout,
  SegmentedControl,
  StateColumn,
} from '../../design-system/primitives/primitives'
import {
  badgeColumn,
  badgeNode,
  codeColumn,
  codeSectionBlock,
  codeSection,
  contentStack,
  countNode,
  deltaNodeFromText,
  deltaSectionBlock,
  deltaNode,
  deltaTotals,
  detailColumn,
  itemSection,
  sectionGridBlock,
  sectionPairBlock,
  sectionTrioBlock,
  markedCodeItems,
  metaBlock,
  meterSectionBlock,
  meterSection,
  metricItems,
  metricSectionBlock,
  navigation,
  proportionalMeterItems,
  recordSectionBlock,
  recordSection,
  selectColumn,
  stateNode,
  statusSectionBlock,
  statusSection,
  tableBlock,
  textColumn,
  textBlock,
  treeBlock,
  valueSection,
} from '../../design-system/composition/assembly'
import {
  approvals,
  changedFiles,
  dataRows,
  projectGroups,
  runLog,
} from '../data/demo'

export function WorkstreamPage() {
  return (
    <PageLayout
      layout="main"
      mainContent={contentStack(
          textBlock({
            children: (
              <>
                <p>
                  커밋 완료했습니다. 이제 원격에 push하고, 끝나면{' '}
                  <InlineCode>git pull --ff-only</InlineCode>로 로컬/원격
                  동기화 상태를 확인하겠습니다.
                </p>
                <p>
                  확인해보니 App Server의{' '}
                  <InlineCode>tool:progress</InlineCode> 알림은 tool id만 있고
                  이름은 빠질 수 있습니다. 지금 TUI 쪽은 이걸 progress라는 별도
                  완료 이벤트처럼 보낼 수 있어서 mapper에 tool name 추적을
                  넣겠습니다.
                </p>
              </>
            ),
          }),
          metaBlock({
            children: '파일 2개 수정',
            icon: <MessageSquare />,
          }),
          textBlock({
            children: (
              <p>
                progress 매핑을 같은 tool의{' '}
                <InlineCode>agent.tool_input</InlineCode>으로 바꿨습니다. 이제
                단위 테스트부터 다시 돌립니다.
              </p>
            ),
          }),
          deltaSectionBlock({
            actions: (
              <>
                <Button icon={<Undo2 />} variant="ghost">
                  실행 취소
                </Button>
                <Button>리뷰</Button>
              </>
            ),
            detail: deltaNode('+271', '-51'),
            footer: <Button icon={<ChevronDown />}>5개 파일 더 보기</Button>,
            icon: <Code2 />,
            items: changedFiles.map((file) => ({
              delta: file.delta,
              key: file.path,
              label: file.path,
            })),
            title: '파일 8개 편집됨',
          }),
          metaBlock({
            children: '11h 27m 44s 동안 작업 중입니다',
          }),
          textBlock({
            children: (
              <p>
                좋아, 방금 끊긴 지점부터 이어서 상태를 다시 잡겠습니다. 마지막
                커밋이 로컬에만 남았을 수 있으니 먼저 브랜치/워킹트리/원격
                차이를 확인하고, 밀린 push와 pull부터 정리할게요.
              </p>
            ),
          }),
          codeSectionBlock({
            icon: <SquareTerminal />,
            items: [
              { line: 'git log --oneline --decorate -5 실행함' },
              {
                line: 'git rev-list --left-right --count origin/feat/cli-work...HEAD 실행함',
              },
              { line: 'git status --short --branch 실행함' },
            ],
            title: '명령어 3개 실행함',
          }),
      )}
    />
  )
}

export function ProjectsPage() {
  const projects = projectGroups[0].items

  return (
    <PageLayout
      actions={<Button icon={<Search />}>검색</Button>}
      asideContent={contentStack(
          statusSectionBlock({
            items: [
              { label: '승인 대기 큐 확인', done: true },
              { label: '디자인 카탈로그 추가', done: true },
              { label: 'repo collaboration review' },
            ],
            title: 'Activity',
          }),
      )}
      eyebrow="Workspace"
      railNavigation={navigation({
        'aria-label': 'Project groups',
        items: projects.map((project) => ({
          current: project.name === 'cstar-cli',
          icon: <FolderOpen />,
          key: project.name,
          label: project.name,
        })),
        variant: 'list',
      })}
      mainContent={contentStack(
          metricSectionBlock({
            columns: 3,
            items: metricItems(projects, [
              {
                detail: '활성 workspace 그룹',
                label: 'Projects',
                value: (items) => String(items.length),
              },
              {
                detail: '최근 대화와 승인 요청',
                label: 'Threads',
                value: (items) =>
                  String(
                    items.reduce(
                      (total, item) => total + item.threads.length,
                      0,
                    ),
                  ),
              },
              {
                detail: '승인 대기 중',
                label: 'Pending',
                value: (items) =>
                  String(
                    items.reduce(
                      (total, item) =>
                        total +
                        item.threads.filter((thread) =>
                          thread.meta.includes('승인 대기'),
                        ).length,
                      0,
                    ),
                  ),
              },
            ]),
            title: 'Summary',
          }),
          sectionGridBlock(
            2,
            projects.map((project) => ({
              actions: countNode(
                project.threads.length,
                'chats',
                project.name === 'cstar-cli' ? 'positive' : undefined,
              ),
              ...recordSection({
                items: project.threads.length
                  ? project.threads.map((thread) => ({
                      key: thread.title,
                      meta: thread.meta,
                      prefix: <MessageSquare />,
                      title: thread.title,
                    }))
                  : [{ prefix: <Inbox />, title: '채팅 없음' }],
                title: project.name,
              }),
              key: project.name,
            })),
          ),
      )}
      title="Projects"
    />
  )
}

export function ChangesPage() {
  const changePathRoot = 'apps/frontend/cli/src/thin/runtime/modes/app-server/'
  const formatChangePath = (path: string) => path.replace(changePathRoot, '')
  const selectedFile = changedFiles[1]
  const totalDelta = deltaTotals(changedFiles, (file) => file.delta)
  const diffLines = [
    ['+', 'const toolName = toolNames.get(id) ?? input.name'],
    ['+', 'const payload = normalizeToolInput(input)'],
    ['+', 'emitToolInput({ id, name: toolName, payload })'],
    [' ', 'if (input.type === "progress") {'],
    ['-', '  emitProgressComplete({ id })'],
    ['+', '  emitProgressDelta({ id, name: toolName })'],
    [' ', '}'],
    ['+', 'trackApprovalRequest({ id, toolName })'],
    ['+', 'return approvalBroker.request(payload)'],
  ] as const

  return (
    <PageLayout
      actions={
        <>
          <Button icon={<Undo2 />}>되돌리기</Button>
          <Button variant="primary">리뷰</Button>
        </>
      }
      asideContent={contentStack(
          sectionPairBlock(
              valueSection({
                items: [
                  { label: 'Files', value: changedFiles.length },
                  { label: 'Added', value: `+${totalDelta.positive}` },
                  { label: 'Removed', value: `-${totalDelta.negative}` },
                  { label: 'Selected', value: selectedFile.area },
                ],
                title: 'Summary',
              }),
              statusSection({
                items: [
                  { label: 'Mapper updated', done: true },
                  { label: 'Tool name fallback', done: true },
                  { label: 'Approval payload normalized', done: true },
                  { label: 'Run app-server smoke' },
                  { label: 'Review remaining client diff' },
                ],
                title: 'Review',
              }),
          ),
      )}
      eyebrow="Review"
      railNavigation={navigation({
        'aria-label': 'Change files',
        items: changedFiles.map((file) => ({
          current: file.state === 'selected',
          icon: <FileText />,
          key: file.path,
          label: formatChangePath(file.path),
          trailing: deltaNodeFromText(file.delta),
        })),
        variant: 'list',
      })}
      mainContent={contentStack(
          tableBlock({
            actions: deltaNode(
              `+${totalDelta.positive}`,
              `-${totalDelta.negative}`,
            ),
            columns: [
              {
                key: 'path',
                header: 'Path',
                render: (row) => (
                  <InlineCode>{formatChangePath(row.path)}</InlineCode>
                ),
              },
              textColumn<(typeof changedFiles)[number]>('area', 'Area'),
              StateColumn(),
              {
                key: 'delta',
                header: 'Delta',
                render: (row) => deltaNodeFromText(row.delta),
              },
            ],
            getRowKey: (row) => row.path,
            icon: <GitBranch />,
            rows: changedFiles,
            title: 'Files changed',
          }),
          codeSectionBlock({
            actions: badgeNode('typed event mapper', 'info'),
            items: markedCodeItems(diffLines),
            title: (
              <InlineCode>{selectedFile.path.split('/').at(-1)}</InlineCode>
            ),
          }),
      )}
      title="Changes"
    />
  )
}

export function RunsPage() {
  return (
    <PageLayout
      actions={<Button icon={<SquareTerminal />}>새 실행</Button>}
      asideContent={contentStack(
          statusSectionBlock({
            items: [
              { label: 'git status', done: true },
              { label: 'unit tests', done: true },
              { label: 'typecheck' },
              { label: 'desktop screenshots', done: true },
              { label: 'mobile screenshots' },
              { label: 'visual review notes' },
            ],
            title: 'Checks',
          }),
      )}
      eyebrow="Runtime"
      railNavigation={navigation({
        'aria-label': 'Run filters',
        items: [
          { current: true, icon: <Check />, label: 'Recent' },
          { icon: <SquareTerminal />, label: 'Commands' },
          { icon: <CircleDot />, label: 'Pending' },
        ],
        variant: 'list',
      })}
      mainContent={contentStack(
          recordSectionBlock({
            items: runLog.map((run, index) => ({
              detail: run.result,
              key: run.command,
              meta: stateNode(run.state),
              prefix: index + 1,
              title: <InlineCode>{run.command}</InlineCode>,
            })),
            title: 'Log',
          }),
      )}
      title="Runs"
    />
  )
}

export function ApprovalsPage() {
  return (
    <PageLayout
      asideContent={contentStack(
          statusSectionBlock({
            items: [
              { label: 'Dangerous command gate', done: true },
              { label: 'One decision per request', done: true },
              { label: 'Remember trusted commands' },
            ],
            title: 'Policy',
          }),
      )}
      eyebrow="Permissions"
      railNavigation={navigation({
        'aria-label': 'Approval states',
        items: [
          { current: true, icon: <CircleDot />, label: 'Pending' },
          { icon: <Check />, label: 'Ready' },
          { icon: <Inbox />, label: 'Queued' },
        ],
        variant: 'list',
      })}
      mainContent={contentStack(
          sectionPairBlock(
              recordSection({
                items: approvals.map((approval) => ({
                  detail: approval.detail,
                  key: approval.title,
                  meta: stateNode(approval.state),
                  prefix: <CircleDot />,
                  title: approval.title,
                })),
                title: 'Requests',
              }),
              codeSection({
                actions: (
                  <>
                    <Button>건너뛰기</Button>
                    <Button variant="primary">허용</Button>
                  </>
                ),
                items: approvals.map((approval) => ({
                  key: approval.command,
                  line: approval.command,
                })),
                title: 'Commands',
              }),
          ),
      )}
      title="Approvals"
    />
  )
}

export function SourcesPage() {
  const sourceRows = [
    {
      title: '워크스페이스 파일',
      detail: 'src/App.tsx, design-system primitives',
      type: 'Local',
      state: 'Verified',
    },
    {
      title: '레퍼런스 이미지',
      detail: 'Codex 앱 화면의 밀도와 여백',
      type: 'Visual',
      state: 'Verified',
    },
    {
      title: '실행 결과',
      detail: 'lint/build/rendering checks',
      type: 'Command',
      state: 'Verified',
    },
    {
      title: '사용자 취향',
      detail: 'light, minimal, 작은 장식',
      type: 'Preference',
      state: 'Pinned',
    },
    {
      title: '라우트 캡처',
      detail: 'projects, database, repository, components',
      type: 'Visual',
      state: 'Verified',
    },
    {
      title: '토큰 파일',
      detail: 'spacing, type, icon scale, state color',
      type: 'Local',
      state: 'Review',
    },
    {
      title: '컴포넌트 inventory',
      detail: 'source exports and generated previews',
      type: 'Local',
      state: 'Verified',
    },
    {
      title: '모바일 확인',
      detail: 'narrow viewport overflow and wrapping',
      type: 'Visual',
      state: 'Queued',
    },
  ]

  return (
    <PageLayout
      actions={<Button icon={<Globe2 />}>출처 추가</Button>}
      asideContent={contentStack(
          statusSectionBlock({
            items: [
              { label: 'Prefer current code', done: true },
              { label: 'Verify with screenshots', done: true },
              { label: 'Record visual regressions' },
            ],
            title: 'Use',
          }),
      )}
      eyebrow="Evidence"
      railNavigation={navigation({
        'aria-label': 'Source types',
        items: [
          { current: true, icon: <FileText />, label: 'Files' },
          { icon: <Globe2 />, label: 'Web' },
          { icon: <MessageSquare />, label: 'Preference' },
          { icon: <Check />, label: 'Verified' },
        ],
        variant: 'list',
      })}
      mainContent={contentStack(
          tableBlock({
            columns: [
              detailColumn<(typeof sourceRows)[number]>({
                detail: 'detail',
                header: 'Source',
                key: 'source',
                title: 'title',
              }),
              textColumn<(typeof sourceRows)[number]>('type', 'Type'),
              StateColumn(),
            ],
            getRowKey: (row) => row.title,
            icon: <FileText />,
            rows: sourceRows,
            title: 'Evidence',
          }),
      )}
      title="Sources"
    />
  )
}

export function DatabasePage() {
  return (
    <PageLayout
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
      asideContent={contentStack(
          sectionPairBlock(
              valueSection({
                icon: <Users />,
                items: [
                  { label: 'Active', value: '12' },
                  { label: 'Needs review', value: '3' },
                  { label: 'Departments', value: '5' },
                ],
                title: 'People',
              }),
              statusSection({
                items: [
                  { label: 'Email conflicts', done: true },
                  { label: 'Department tags', done: true },
                  { label: 'Salary band audit' },
                ],
                title: 'Checks',
              }),
          ),
      )}
      eyebrow="Private Database"
      railNavigation={navigation({
        'aria-label': 'Database views',
        items: [
          { current: true, icon: <Users />, label: 'Employees' },
          { icon: <Columns3 />, label: 'Departments' },
          { icon: <CircleDot />, label: 'Positions' },
          { icon: <Check />, label: 'Review' },
        ],
        variant: 'list',
      })}
      size="wide"
      mainContent={contentStack(
          tableBlock({
            columns: [
              selectColumn<(typeof dataRows)[number]>({
                labelFor: (row) => `Select ${row.id}`,
              }),
              textColumn<(typeof dataRows)[number]>('id', 'Employee'),
              badgeColumn<(typeof dataRows)[number]>(
                'department',
                'Department',
              ),
              textColumn<(typeof dataRows)[number]>('email', 'Email'),
              StateColumn('Employment'),
              textColumn<(typeof dataRows)[number]>('owner', 'First Name'),
            ],
            getRowKey: (row) => row.id,
            rows: dataRows,
            title: 'Employees',
          }),
      )}
      title="Employee overview"
    />
  )
}

export function AnalyticsPage() {
  const eventRows = [
    {
      event: 'Activation',
      segment: 'Team trial',
      rate: '42.8%',
      state: 'Rising',
    },
    { event: 'Invite sent', segment: 'SMB', rate: '31.4%', state: 'Stable' },
    { event: 'Export', segment: 'Enterprise', rate: '18.2%', state: 'Review' },
    {
      event: 'Retained day 7',
      segment: 'All users',
      rate: '64.9%',
      state: 'Rising',
    },
    {
      event: 'Connected source',
      segment: 'Developer',
      rate: '58.7%',
      state: 'Rising',
    },
    { event: 'Shared report', segment: 'Ops', rate: '22.1%', state: 'Stable' },
    {
      event: 'Invited admin',
      segment: 'Enterprise',
      rate: '37.6%',
      state: 'Stable',
    },
    {
      event: 'Dormant day 14',
      segment: 'All users',
      rate: '8.4%',
      state: 'Review',
    },
  ]
  const funnelValues = [
    ['Visited pricing', 12480],
    ['Started trial', 2960],
    ['Invited teammate', 1218],
    ['Converted', 486],
  ] as const
  const funnelRows = proportionalMeterItems(
    funnelValues.map(([label, value]) => ({ label, value })),
    (value) => value.toLocaleString('en-US'),
  )

  return (
    <PageLayout
      actions={
        <SegmentedControl
          label="Analytics range"
          options={[
            { label: '7d' },
            { label: '30d', selected: true },
            { label: '90d' },
          ]}
        />
      }
      asideContent={contentStack(
          meterSectionBlock({
            icon: <BarChart3 />,
            items: funnelRows,
            title: 'Funnel',
          }),
      )}
      eyebrow="Analytics / Growth"
      layout="matrix"
      secondaryContent={contentStack(
          tableBlock({
            columns: [
              textColumn<(typeof eventRows)[number]>('event', 'Event'),
              textColumn<(typeof eventRows)[number]>('segment', 'Segment'),
              textColumn<(typeof eventRows)[number]>('rate', 'Rate'),
              StateColumn(),
            ],
            getRowKey: (row) => row.event,
            icon: <Users />,
            rows: eventRows,
            title: 'Segments',
          }),
      )}
      tertiaryContent={contentStack(
          recordSectionBlock({
            items: [
              {
                detail: 'high intent',
                meta: badgeNode('+18%', 'positive'),
                title: 'Team trial',
              },
              {
                detail: 'sales assisted',
                meta: stateNode('steady'),
                title: 'Enterprise',
              },
              {
                detail: 'low activity',
                meta: stateNode('watch'),
                title: 'Dormant workspaces',
              },
              {
                detail: 'self serve',
                meta: badgeNode('+9%', 'positive'),
                title: 'Developer',
              },
              {
                detail: 'ops teams',
                meta: stateNode('flat'),
                title: 'Internal tools',
              },
            ],
            title: 'Cohorts',
          }),
      )}
      mainContent={contentStack(
          metricSectionBlock({
            columns: 2,
            icon: <BarChart3 />,
            items: [
              { detail: '+12.8%', label: 'Revenue', value: '$84.2k' },
              {
                detail: 'trial to first project',
                label: 'Activation',
                value: '42.8%',
              },
              {
                detail: 'low usage accounts',
                label: 'Churn risk',
                value: '6.1%',
              },
              {
                detail: 'seat growth',
                label: 'Expansion',
                value: '$12.6k',
              },
            ],
            title: 'North star',
          }),
      )}
      title="Growth overview"
    />
  )
}

export function CommercePage() {
  const orderRows = [
    {
      id: 'ORD-1028',
      customer: 'Studio North',
      total: '$428.00',
      state: 'Paid',
    },
    {
      id: 'ORD-1029',
      customer: 'Mira Foods',
      total: '$86.40',
      state: 'Packed',
    },
    {
      id: 'ORD-1030',
      customer: 'Orbit Lab',
      total: '$1,240.00',
      state: 'Review',
    },
    {
      id: 'ORD-1031',
      customer: 'Haru Market',
      total: '$219.90',
      state: 'Paid',
    },
    {
      id: 'ORD-1032',
      customer: 'Maple Office',
      total: '$640.20',
      state: 'Packed',
    },
    { id: 'ORD-1033', customer: 'Line Works', total: '$74.00', state: 'Paid' },
    {
      id: 'ORD-1034',
      customer: 'North Pier',
      total: '$318.50',
      state: 'Review',
    },
    { id: 'ORD-1035', customer: 'Casa Lab', total: '$926.10', state: 'Paid' },
  ]

  return (
    <PageLayout
      actions={<Button icon={<ShoppingCart />}>새 주문</Button>}
      asideContent={contentStack(
          sectionPairBlock(
              valueSection({
                icon: <ShoppingCart />,
                items: [
                  { label: 'Orders', value: '128' },
                  { label: 'SLA', value: '92%' },
                  { label: 'Returns', value: '6' },
                ],
                title: 'Fulfillment',
              }),
              itemSection({
                icon: <Package />,
                items: [
                  { icon: Package, label: 'Linen tote', value: '14 left' },
                  { icon: Package, label: 'Ceramic cup', value: '8 left' },
                  { icon: Package, label: 'Desk mat', value: '42 left' },
                  { icon: Package, label: 'Cable pouch', value: '21 left' },
                  { icon: Package, label: 'Notebook', value: '64 left' },
                ],
                title: 'Inventory',
              }),
          ),
      )}
      eyebrow="Commerce / Operations"
      layout="triad"
      secondaryContent={contentStack(
          tableBlock({
            columns: [
              textColumn<(typeof orderRows)[number]>('id', 'Order'),
              textColumn<(typeof orderRows)[number]>('customer', 'Customer'),
              textColumn<(typeof orderRows)[number]>('total', 'Total'),
              StateColumn(),
            ],
            getRowKey: (row) => row.id,
            icon: <CreditCard />,
            rows: orderRows,
            title: 'Orders',
          }),
      )}
      tertiaryContent={contentStack(
          metricSectionBlock({
            columns: 3,
            items: [
              {
                detail: '재입고 필요 SKU',
                label: 'Inventory risk',
                value: '7',
              },
              { detail: '다음 정산', label: 'Payout', value: '$18.4k' },
              { detail: '검토 필요', label: 'Disputes', value: '2' },
            ],
            title: 'Metrics',
          }),
      )}
      mainContent={contentStack(
          statusSectionBlock({
            icon: <ShoppingCart />,
            items: [
              { label: '결제 확인', done: true },
              { label: '오늘 출고 라벨 생성', done: true },
              { label: '반품 사유 검수' },
              { label: '재고 알림 승인' },
              { label: '배송 SLA 지연 확인' },
              { label: '정산 보류건 해제' },
            ],
            title: 'Work queue',
          }),
      )}
      title="Store operations"
    />
  )
}

export function CrmPage() {
  const dealColumns = [
    {
      stage: 'Qualified',
      deals: [
        ['Atlas Co.', '$18k', 'Intro call'],
        ['Pixel Bank', '$24k', 'Discovery'],
        ['River Studio', '$12k', 'Use case'],
      ],
    },
    {
      stage: 'Proposal',
      deals: [
        ['Nova Labs', '$42k', 'Security review'],
        ['Open Studio', '$31k', 'Pricing'],
        ['Signal Works', '$36k', 'Pilot scope'],
      ],
    },
    {
      stage: 'Negotiation',
      deals: [
        ['Morning Bank', '$96k', 'Legal redline'],
        ['Grid Works', '$58k', 'Procurement'],
        ['Layer Co.', '$44k', 'MSA update'],
      ],
    },
    {
      stage: 'Expansion',
      deals: [
        ['Haru Group', '$28k', 'Usage review'],
        ['Blue Harbor', '$64k', 'Seat plan'],
        ['Northwind', '$22k', 'Admin rollout'],
      ],
    },
  ] as const
  const accountRows = [
    {
      account: 'Morning Bank',
      owner: 'Mina',
      value: '$96k',
      state: 'Negotiation',
    },
    { account: 'Blue Harbor', owner: 'Jae', value: '$64k', state: 'Expansion' },
    {
      account: 'Grid Works',
      owner: 'Ara',
      value: '$58k',
      state: 'Negotiation',
    },
    { account: 'Nova Labs', owner: 'Leo', value: '$42k', state: 'Proposal' },
    { account: 'Signal Works', owner: 'Noa', value: '$36k', state: 'Proposal' },
  ]

  return (
    <PageLayout
      actions={<Button icon={<Users />}>계정 추가</Button>}
      asideContent={contentStack(
          sectionPairBlock(
              valueSection({
                items: [
                  { label: 'Pipeline', value: '$642k' },
                  { label: 'Win rate', value: '31%' },
                  { label: 'Next actions', value: '18' },
                  { label: 'At risk', value: '3' },
                ],
                title: 'Forecast',
              }),
              statusSection({
                items: [
                  { label: 'Morning Bank legal sent', done: true },
                  { label: 'Nova Labs security reply', done: true },
                  { label: 'Grid Works procurement call' },
                  { label: 'Blue Harbor expansion plan' },
                ],
                title: 'Activity',
              }),
          ),
      )}
      eyebrow="CRM / Sales"
      layout="main-stack-aside"
      secondaryContent={contentStack(
          tableBlock({
            columns: [
              textColumn<(typeof accountRows)[number]>('account', 'Account'),
              textColumn<(typeof accountRows)[number]>('owner', 'Owner'),
              textColumn<(typeof accountRows)[number]>('value', 'Value'),
              StateColumn('Stage'),
            ],
            getRowKey: (row) => row.account,
            icon: <Users />,
            rows: accountRows,
            title: 'Accounts',
          }),
      )}
      tabsNavigation={navigation({
        'aria-label': 'CRM views',
        items: [
          { current: true, icon: <KanbanSquare />, label: 'Stages' },
          { icon: <Users />, label: 'Accounts' },
          { icon: <MessageSquare />, label: 'Activity' },
        ],
        variant: 'tabs',
      })}
      mainContent={contentStack(
          sectionGridBlock(
            4,
            dealColumns.map(({ deals, stage }) => ({
              ...recordSection({
                icon: <KanbanSquare />,
                items: deals.map(([account, value, next]) => ({
                  detail: next,
                  key: account,
                  meta: badgeNode(value, 'info'),
                  title: account,
                })),
                title: stage,
              }),
              key: stage,
            })),
          ),
      )}
      title="Pipeline"
    />
  )
}

export function SchedulePage() {
  const slots = [
    ['09:30', 'Design review', 'Room A'],
    ['11:00', 'Partner sync', 'Zoom'],
    ['12:30', 'Support handoff', 'Desk'],
    ['14:30', 'Release check', 'Ops'],
    ['16:00', 'Hiring loop', 'Room C'],
    ['17:30', 'Incident review', 'War room'],
    ['18:00', 'Capacity lock', 'Ops'],
  ] as const
  const resourceRows = [
    { resource: 'Room A', owner: 'Design', load: '78%', state: 'Booked' },
    { resource: 'Zoom', owner: 'Partnership', load: '54%', state: 'Open' },
    { resource: 'Desk', owner: 'Support', load: '66%', state: 'Booked' },
    { resource: 'Ops', owner: 'Release', load: '82%', state: 'Conflict' },
    { resource: 'Room C', owner: 'Hiring', load: '46%', state: 'Open' },
  ]

  return (
    <PageLayout
      actions={<Button icon={<CalendarDays />}>일정 추가</Button>}
      asideContent={contentStack(
          sectionPairBlock(
              meterSection({
                items: [
                  { label: 'Team load', meter: 76, value: '76%' },
                  { label: 'Conflicts', meter: 18, value: '2' },
                  { label: 'Open blocks', meter: 42, value: '11' },
                ],
                title: 'Capacity',
              }),
              statusSection({
                items: [
                  { label: '회의실 장비 확인', done: true },
                  { label: '릴리즈 체크리스트 공유', done: true },
                  { label: '인터뷰 패널 브리핑' },
                  { label: '다음 주 capacity lock' },
                  { label: 'Ops conflict owner 지정' },
                ],
                title: 'Prep',
              }),
          ),
      )}
      eyebrow="Schedule / Resources"
      railNavigation={navigation({
        'aria-label': 'Schedule days',
        items: [
          { current: true, label: 'Today' },
          { label: 'Tomorrow' },
          { label: 'This week' },
          { label: 'Conflicts' },
        ],
        variant: 'list',
      })}
      mainContent={contentStack(
          recordSectionBlock({
            icon: <CalendarDays />,
            items: slots.map(([time, title, room]) => ({
              key: time,
              meta: room,
              prefix: time,
              title,
            })),
            title: 'Today',
          }),
          tableBlock({
            columns: [
              textColumn<(typeof resourceRows)[number]>('resource', 'Resource'),
              textColumn<(typeof resourceRows)[number]>('owner', 'Owner'),
              textColumn<(typeof resourceRows)[number]>('load', 'Load'),
              StateColumn(),
            ],
            getRowKey: (row) => row.resource,
            icon: <Users />,
            rows: resourceRows,
            title: 'Resources',
          }),
      )}
      title="Resource plan"
    />
  )
}

export function ContentPage() {
  const contentRows = [
    { title: 'Spring launch', owner: 'Mina', channel: 'Blog', state: 'Ready' },
    { title: 'Security note', owner: 'Jae', channel: 'Docs', state: 'Review' },
    { title: 'Partner story', owner: 'Leo', channel: 'Email', state: 'Draft' },
    {
      title: 'Release recap',
      owner: 'Ara',
      channel: 'Changelog',
      state: 'Ready',
    },
    {
      title: 'Customer proof',
      owner: 'Noa',
      channel: 'Landing',
      state: 'Review',
    },
    { title: 'API guide', owner: 'Ian', channel: 'Docs', state: 'Ready' },
    { title: 'Webinar recap', owner: 'Sora', channel: 'Email', state: 'Draft' },
    { title: 'Migration note', owner: 'Jin', channel: 'Docs', state: 'Review' },
  ]

  return (
    <PageLayout
      actions={<Button icon={<FileText />}>새 문서</Button>}
      asideContent={contentStack(
          sectionTrioBlock(
              valueSection({
                actions: stateNode('Review'),
                detail: '권한, 보관 기간, 감사 로그 문장을 검수 중입니다.',
                icon: <FileText />,
                items: [
                  { label: 'Owner', value: 'Jae' },
                  { label: 'Channel', value: 'Docs' },
                  { label: 'Due', value: 'Today' },
                ],
                title: 'Security note',
              }),
              itemSection({
                items: [
                  { icon: Globe2, label: 'Blog' },
                  { icon: MessageSquare, label: 'Email' },
                  { icon: FileText, label: 'Docs' },
                ],
                title: 'Channels',
              }),
              statusSection({
                items: [
                  { label: 'SEO title', done: true },
                  { label: 'Preview image', done: true },
                  { label: 'Legal language' },
                ],
                title: 'Checklist',
              }),
          ),
      )}
      eyebrow="Content / Publishing"
      railNavigation={navigation({
        'aria-label': 'Content stages',
        items: [
          { current: true, icon: <FileText />, label: 'Review' },
          { icon: <Globe2 />, label: 'Channels' },
          { icon: <Check />, label: 'Ready' },
        ],
        variant: 'list',
      })}
      mainContent={contentStack(
          tableBlock({
            columns: [
              textColumn<(typeof contentRows)[number]>('title', 'Title'),
              textColumn<(typeof contentRows)[number]>('owner', 'Owner'),
              textColumn<(typeof contentRows)[number]>('channel', 'Channel'),
              StateColumn(),
            ],
            getRowKey: (row) => row.title,
            icon: <FileText />,
            rows: contentRows,
            title: 'Queue',
          }),
      )}
      title="Editorial queue"
    />
  )
}

export function RepositoryPage() {
  const fileRows = [
    { path: 'src/app/router.ts', area: 'routing', updated: '2h' },
    { path: 'src/features/issues/list.tsx', area: 'issues', updated: '4h' },
    { path: 'src/features/pulls/review.tsx', area: 'review', updated: '1d' },
    {
      path: 'src/features/projects/board.tsx',
      area: 'projects',
      updated: '1d',
    },
    { path: 'docs/adr/004-project-board.md', area: 'docs', updated: '2d' },
    { path: 'docs/adr/005-route-browser.md', area: 'docs', updated: '3d' },
  ]
  const treeGroups = [
    [
      'src',
      'app/router.ts',
      'features/issues/list.tsx',
      'features/pulls/review.tsx',
    ],
    ['docs', 'adr/004-project-board.md', 'adr/005-route-browser.md'],
  ] as const
  const diffLines = [
    [' ', 'const pageRoute = createRoute({'],
    ['+', 'createRoute({ path: "$pageId" })'],
    [' ', 'beforeLoad: ({ params }) => {'],
    [' ', '  if (!isPageId(params.pageId)) {'],
    [' ', '    throw redirect({ to: "/workstream" })'],
    [' ', '  }'],
    [' ', '}'],
    [' ', 'const pageComponents = {'],
    ['+', 'repository: RepositoryPage'],
    ['+', 'catalog: CatalogPage'],
    ['-', 'page query decides active view'],
    ['+', 'page path selects canvas'],
    [' ', '} satisfies Record<PageId, ComponentType>'],
  ] as const

  return (
    <PageLayout
      actions={
        <>
          {stateNode('main')}
          <Button icon={<GitPullRequest />}>New pull request</Button>
        </>
      }
      asideContent={contentStack(
          sectionTrioBlock(
              recordSection({
                items: [
                  {
                    detail: 'layout abstraction',
                    meta: stateNode('open'),
                    title: 'Separate page canvas by route type',
                  },
                  {
                    detail: 'design system',
                    meta: stateNode('triage'),
                    title: 'Reduce duplicated row spacing',
                  },
                  {
                    detail: 'keyboard',
                    meta: stateNode('ready'),
                    title: 'Route browser shortcuts',
                  },
                ],
                title: 'Issues',
              }),
              recordSection({
                items: [
                  {
                    detail: '7 files changed',
                    meta: stateNode('checks'),
                    title: 'Layout variants',
                  },
                  {
                    detail: 'review requested',
                    meta: stateNode('review'),
                    title: 'Catalog preview cleanup',
                  },
                ],
                title: 'Pull requests',
              }),
              statusSection({
                items: [
                  { label: 'Issue labels' },
                  { label: 'Auth copy' },
                  { label: 'Router split', done: true },
                  { label: 'Stage keyboard' },
                ],
                title: 'Project',
              }),
          ),
      )}
      eyebrow="interactive-os / design-md"
      railContent={contentStack(
          treeBlock({
            icon: <GitBranch />,
            items: treeGroups.map(([root, ...paths]) => ({
              children: paths.map((path) => ({
                icon: <FileText />,
                key: path,
                label: path,
              })),
              icon: <FolderOpen />,
              key: root,
              label: root,
            })),
            title: 'Files',
          }),
      )}
      size="wide"
      tabsNavigation={navigation({
        'aria-label': 'Repository sections',
        items: [
          { current: true, icon: <Code2 />, label: 'Code' },
          { icon: <CircleDot />, label: 'Issues', trailing: countNode(3) },
          {
            icon: <GitPullRequest />,
            label: 'Pull requests',
            trailing: countNode(2),
          },
          { icon: <Columns3 />, label: 'Projects', trailing: countNode(1) },
        ],
        variant: 'tabs',
      })}
      mainContent={contentStack(
          tableBlock({
            actions: deltaNode('+271', '-51'),
            columns: [
              codeColumn<(typeof fileRows)[number]>('path', 'Path'),
              textColumn<(typeof fileRows)[number]>('area', 'Area'),
              textColumn<(typeof fileRows)[number]>('updated', 'Updated'),
            ],
            getRowKey: (row) => row.path,
            icon: <GitBranch />,
            rows: fileRows,
            title: 'Changed files',
          }),
          codeSectionBlock({
            actions: stateNode('checks'),
            icon: <Code2 />,
            items: markedCodeItems(diffLines),
            title: 'Router split',
          }),
      )}
      title="Design system workspace"
    />
  )
}
