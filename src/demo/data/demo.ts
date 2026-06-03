export type PageId =
  | 'workstream'
  | 'projects'
  | 'changes'
  | 'runs'
  | 'approvals'
  | 'sources'
  | 'database'
  | 'analytics'
  | 'commerce'
  | 'crm'
  | 'schedule'
  | 'content'
  | 'repository'
  | 'components'
  | 'composition'
  | 'catalog'
  | 'tokens'
  | 'settings'

export type PageSurface = 'workspace' | 'canvas'

export type PageMeta = {
  id: PageId
  label: string
  crumb: string
  description: string
  surface: PageSurface
  showComposer?: boolean
  showInspector?: boolean
}

export const pageMeta: PageMeta[] = [
  {
    id: 'workstream',
    label: '작업 흐름',
    crumb: 'https://oss.navercorp.com/HyperscaleAI/clova...',
    description: '레퍼런스에 가장 가까운 Codex형 기본 화면',
    surface: 'workspace',
    showComposer: true,
    showInspector: true,
  },
  {
    id: 'projects',
    label: '프로젝트',
    crumb: 'workspace/projects',
    description: '폴더, 채팅, 승인 상태를 같은 sidebar density로 정리',
    surface: 'canvas',
  },
  {
    id: 'changes',
    label: '변경 사항',
    crumb: 'workspace/changes',
    description: 'diff와 파일 변경 카드를 재사용 가능한 패턴으로 분리',
    surface: 'canvas',
  },
  {
    id: 'runs',
    label: '실행 로그',
    crumb: 'workspace/runs',
    description: '명령 실행과 결과를 작은 타임라인으로 표시',
    surface: 'canvas',
  },
  {
    id: 'approvals',
    label: '승인',
    crumb: 'workspace/approvals',
    description: '권한 요청과 선택지를 하단 카드 문법으로 확장',
    surface: 'canvas',
  },
  {
    id: 'sources',
    label: '출처',
    crumb: 'workspace/sources',
    description: '파일, 웹, 대화 레퍼런스의 신뢰도를 정리',
    surface: 'canvas',
  },
  {
    id: 'database',
    label: '데이터',
    crumb: 'workspace/database',
    description: '첫 레퍼런스 이미지의 database table 밀도 적용',
    surface: 'canvas',
  },
  {
    id: 'analytics',
    label: '분석',
    crumb: 'demo/analytics',
    description: '지표, 세그먼트, 이벤트 상태를 같은 섹션과 표로 구성',
    surface: 'canvas',
  },
  {
    id: 'commerce',
    label: '커머스',
    crumb: 'demo/commerce',
    description: '주문, 재고, 정산 운영 화면을 같은 데이터 밀도로 구성',
    surface: 'canvas',
  },
  {
    id: 'crm',
    label: 'CRM',
    crumb: 'demo/crm',
    description: '고객, 딜, 파이프라인 화면을 같은 행과 섹션 문법으로 구성',
    surface: 'canvas',
  },
  {
    id: 'schedule',
    label: '일정',
    crumb: 'demo/schedule',
    description: '캘린더와 리소스 계획을 조용한 업무 화면으로 구성',
    surface: 'canvas',
  },
  {
    id: 'content',
    label: '콘텐츠',
    crumb: 'demo/content',
    description: '에디토리얼 큐와 검수 상태를 같은 primitive로 구성',
    surface: 'canvas',
  },
  {
    id: 'repository',
    label: '저장소',
    crumb: 'demo/repository',
    description: '코드, 이슈, PR, 프로젝트 보드를 하나의 협업 구조로 구성',
    surface: 'canvas',
  },
  {
    id: 'components',
    label: '컴포넌트',
    crumb: 'design-system/components',
    description: '향후 데모에서 복붙할 primitive catalog',
    surface: 'canvas',
  },
  {
    id: 'composition',
    label: '조합식',
    crumb: 'design-system/composition',
    description: '도메인 없는 조립 공식을 한 화면에서 확인',
    surface: 'canvas',
  },
  {
    id: 'catalog',
    label: '카탈로그',
    crumb: 'design-system/catalog',
    description: '디자인 컴포넌트 도구를 한 화면에서 훑어보기',
    surface: 'canvas',
  },
  {
    id: 'tokens',
    label: '기준값',
    crumb: 'design-system/values',
    description: '색, 여백, 상태 값을 조용히 정리',
    surface: 'canvas',
  },
  {
    id: 'settings',
    label: '설정',
    crumb: 'workspace/settings',
    description: '조용한 설정/환경 화면 패턴',
    surface: 'canvas',
  },
]

export type ThreadItem = {
  title: string
  meta: string
  active?: boolean
  page?: PageId
}

export type ProjectGroup = {
  label: string
  items: Array<{
    name: string
    threads: ThreadItem[]
  }>
}

export const projectGroups: ProjectGroup[] = [
  {
    label: '프로젝트',
    items: [
      {
        name: 'cstar-cli',
        threads: [
          {
            title: 'https://oss.naver...',
            meta: '승인 대기 중',
            active: true,
            page: 'workstream',
          },
          {
            title: '지금 apps/frontend/cli만 뜯더구...',
            meta: '#2',
            page: 'projects',
          },
          {
            title: 'codex cli opensource의 폴더구...',
            meta: '#3',
            page: 'changes',
          },
        ],
      },
      {
        name: 'nano-edit',
        threads: [
          { title: 'zod-crud 마이그레이션', meta: '#4', page: 'runs' },
          { title: '승인 큐 상태 점검', meta: '#5', page: 'approvals' },
        ],
      },
      {
        name: 'canvas',
        threads: [
          { title: '$discuss 이 서비스가 figma mak...', meta: '#6', page: 'sources' },
          { title: '새 채팅', meta: '#7', page: 'database' },
          { title: '$doubt 지금 만들어 놓은 컴포넌...', meta: '#8', page: 'components' },
          { title: '조합식 카탈로그', meta: '#9', page: 'composition' },
          { title: '디자인 카탈로그', meta: '#10', page: 'catalog' },
        ],
      },
      {
        name: 'zod-crud',
        threads: [
          {
            title: '퍼사드로 public에 제공되는 API를 ...',
            meta: '1일',
            page: 'tokens',
          },
          {
            title: '$discuss 우리 패키지의 책임을 명...',
            meta: '2일',
            page: 'settings',
          },
        ],
      },
      {
        name: 'demo-lab',
        threads: [
          { title: 'analytics overview', meta: '#11', page: 'analytics' },
          { title: 'commerce operations', meta: '#12', page: 'commerce' },
          { title: 'crm pipeline', meta: '#13', page: 'crm' },
          { title: 'resource schedule', meta: '#14', page: 'schedule' },
          { title: 'content review', meta: '#15', page: 'content' },
          { title: 'repo collaboration', meta: '#16', page: 'repository' },
        ],
      },
    ],
  },
  {
    label: '채팅',
    items: [{ name: '채팅 없음', threads: [] }],
  },
]

export const changedFiles = [
  {
    path: 'apps/frontend/cli/src/thin/runtime/modes/app-server/approvalBroker.ts',
    delta: '+1 -1',
    area: 'approval',
    state: 'edited',
  },
  {
    path: 'apps/frontend/cli/src/thin/runtime/modes/app-server/approvalProtocol.ts',
    delta: '+28 -0',
    area: 'protocol',
    state: 'selected',
  },
  {
    path: 'apps/frontend/cli/src/thin/runtime/modes/app-server/brainClient.ts',
    delta: '+10 -30',
    area: 'client',
    state: 'review',
  },
  {
    path: 'apps/frontend/cli/src/thin/runtime/modes/app-server/eventMapper.ts',
    delta: '+22 -4',
    area: 'runtime',
    state: 'edited',
  },
  {
    path: 'apps/frontend/cli/src/thin/runtime/modes/app-server/toolNames.ts',
    delta: '+18 -0',
    area: 'runtime',
    state: 'new',
  },
  {
    path: 'apps/frontend/cli/src/thin/runtime/modes/app-server/__tests__/approvalProtocol.test.ts',
    delta: '+42 -2',
    area: 'test',
    state: 'covered',
  },
  {
    path: 'apps/frontend/cli/src/thin/runtime/modes/app-server/__tests__/brainClient.test.ts',
    delta: '+16 -8',
    area: 'test',
    state: 'covered',
  },
  {
    path: 'apps/frontend/cli/src/thin/runtime/modes/app-server/index.ts',
    delta: '+3 -0',
    area: 'entry',
    state: 'edited',
  },
]

export const progress = [
  { label: '중단 후 git 상태와 마지막 커밋 확인', done: true },
  { label: '남은 커밋 push 후 ff-only pull', done: false },
  { label: '다음 TUI/App Server 정확성 개선 지점 선정', done: false },
  { label: '수정·테스트·커밋 반복', done: false },
]

export const systemPasses = [
  '원본 기준 본문 레일과 여백',
  '상단 breadcrumb와 도구 버튼',
  '좌측 프로젝트 대화 상태',
  '우측 진행/환경/출처 패널',
  '변경 파일 카드',
  '승인 요청 카드',
  '데이터 테이블 밀도',
  '색과 상태 토큰',
  '반복 행/카드 primitive',
  '모바일 가로 overflow 점검',
]

export const approvals = [
  {
    title: 'git pull --ff-only 허용',
    detail: '.git/FETCH_HEAD 쓰기 제한으로 pull 확인이 실패했습니다.',
    command: 'git pull --ff-only',
    state: 'Pending',
  },
  {
    title: '브랜치 push',
    detail: '마지막 커밋 하나가 원격보다 앞서 있습니다.',
    command: 'git push origin feat/cli-work',
    state: 'Ready',
  },
  {
    title: '스모크 테스트 실행',
    detail: 'TUI 이벤트 이름 매핑이 다시 깨지지 않는지 확인합니다.',
    command: 'npm run demo:smoke',
    state: 'Queued',
  },
  {
    title: '브라우저 스크린샷 검증',
    detail: '로컬 dev server 화면을 다시 열어 렌더 밀도를 확인합니다.',
    command: 'npm run screenshot:routes',
    state: 'Pending',
  },
  {
    title: '변경 파일 리뷰',
    detail: '디자인 토큰과 페이지 조립 변경만 남았는지 확인합니다.',
    command: 'git diff --stat',
    state: 'Ready',
  },
  {
    title: '프로덕션 빌드',
    detail: '라우터와 컴포넌트 preview가 production bundle에서 깨지지 않는지 확인합니다.',
    command: 'npm run build',
    state: 'Queued',
  },
  {
    title: '모바일 overflow 점검',
    detail: '좁은 viewport에서 table과 preview가 부모를 벗어나지 않는지 확인합니다.',
    command: 'npm run screenshot:mobile',
    state: 'Queued',
  },
]

export const runLog = [
  {
    command: 'git log --oneline --decorate -5',
    result: '마지막 커밋 5853a07e 확인',
    state: 'done',
  },
  {
    command: 'git rev-list --left-right --count origin/feat/cli-work...HEAD',
    result: '원격보다 1 commit ahead',
    state: 'done',
  },
  {
    command: 'git status --short --branch',
    result: 'tracked 변경 없음, 기존 미추적 항목 유지',
    state: 'done',
  },
  {
    command: 'npm run typecheck',
    result: '대기 중',
    state: 'pending',
  },
  {
    command: 'npm run lint',
    result: 'eslint 통과',
    state: 'done',
  },
  {
    command: 'npm run build',
    result: 'vite production bundle 생성',
    state: 'done',
  },
  {
    command: 'chrome --screenshot /repository',
    result: '저장소 캔버스 렌더 확인',
    state: 'done',
  },
  {
    command: 'chrome --screenshot /components',
    result: '컴포넌트 preview 기본 화면 확인',
    state: 'done',
  },
  {
    command: 'git diff --check',
    result: '대기 중',
    state: 'pending',
  },
]

export const dataRows = [
  {
    id: 'EMP001',
    department: 'Finance',
    email: 'alex.meyer@acme.test',
    state: 'Active',
    owner: 'Alex',
  },
  {
    id: 'EMP002',
    department: 'HR',
    email: 'sarah.kim@acme.test',
    state: 'Active',
    owner: 'Sarah',
  },
  {
    id: 'EMP003',
    department: 'Marketing',
    email: 'daniel.roberts@acme.test',
    state: 'Review',
    owner: 'Daniel',
  },
  {
    id: 'EMP004',
    department: 'Engineering',
    email: 'nina.schultz@acme.test',
    state: 'Active',
    owner: 'Nina',
  },
  {
    id: 'EMP005',
    department: 'Sales',
    email: 'ryan.walker@acme.test',
    state: 'Active',
    owner: 'Ryan',
  },
  {
    id: 'EMP006',
    department: 'Engineering',
    email: 'olivia.hart@acme.test',
    state: 'Review',
    owner: 'Olivia',
  },
  {
    id: 'EMP007',
    department: 'Engineering',
    email: 'jason.ford@acme.test',
    state: 'Active',
    owner: 'Jason',
  },
  {
    id: 'EMP008',
    department: 'HR',
    email: 'maria.lopez@acme.test',
    state: 'Active',
    owner: 'Maria',
  },
  {
    id: 'EMP009',
    department: 'Finance',
    email: 'kevin.turner@acme.test',
    state: 'Review',
    owner: 'Kevin',
  },
  {
    id: 'EMP010',
    department: 'Marketing',
    email: 'hana.lee@acme.test',
    state: 'Active',
    owner: 'Hana',
  },
]

export const tokenGroups = [
  {
    label: 'Surfaces',
    tokens: [
      ['--ds-bg', 'var(--ds-bg)'],
      ['--ds-bg-soft', 'var(--ds-bg-soft)'],
      ['--ds-control', 'var(--ds-control)'],
      ['--ds-border', 'var(--ds-border)'],
    ],
  },
  {
    label: 'Text',
    tokens: [
      ['--ds-text', 'var(--ds-text)'],
      ['--ds-text-muted', 'var(--ds-text-muted)'],
      ['--ds-text-faint', 'var(--ds-text-faint)'],
    ],
  },
  {
    label: 'State',
    tokens: [
      ['--ds-positive', 'var(--ds-positive)'],
      ['--ds-warning', 'var(--ds-warning)'],
      ['--ds-danger', 'var(--ds-danger)'],
      ['--ds-info', 'var(--ds-info)'],
    ],
  },
  {
    label: 'Space',
    tokens: [
      ['--ds-space-8', 'var(--ds-space-8)'],
      ['--ds-space-12', 'var(--ds-space-12)'],
      ['--ds-row-height', 'var(--ds-row-height)'],
      ['--ds-surface-pad', 'var(--ds-surface-pad)'],
    ],
  },
  {
    label: 'Type',
    tokens: [
      ['--ds-type-caption', 'var(--ds-type-caption)'],
      ['--ds-type-body', 'var(--ds-type-body)'],
      ['--ds-type-control', 'var(--ds-type-control)'],
      ['--ds-type-title', 'var(--ds-type-title)'],
    ],
  },
]
