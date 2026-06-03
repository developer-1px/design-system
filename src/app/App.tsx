import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from '@tanstack/react-router'
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Clock3,
  Folder,
  MoreHorizontal,
  PanelRight,
  Plus,
  Search,
  Settings,
  Sparkles,
} from 'lucide-react'
import { ApprovalComposer } from '../demo/shell/ApprovalComposer'
import { Inspector } from '../demo/shell/Inspector'
import {
  Breadcrumb,
  Cluster,
  ControlRow,
  FloatingPanel,
  FloatingPanelBody,
  IconButton,
  IndentedItem,
  IndentedStack,
  NavGroup,
  NavStack,
  ScrollStack,
  ShellFrame,
  ShellMain,
  ShellRail,
  ShellSurface,
  ShellTopbar,
  TextStack,
} from '../design-system/primitives/primitives'
import { pageMeta, projectGroups, type PageId } from '../demo/data/demo'
import { pageComponents } from '../demo/pages/registry'
import { pageFromPath } from './routes'
import './App.css'

const quickActions = [
  { icon: Plus, label: '새 채팅' },
  { icon: Search, label: '검색' },
  { icon: Bot, label: '플러그인' },
  { icon: Clock3, label: '자동화' },
]

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [routeBrowseEnabled, setRouteBrowseEnabled] = useState(false)
  const activePage = pageFromPath(location.pathname)
  const activeMeta = useMemo(
    () => pageMeta.find((page) => page.id === activePage) ?? pageMeta[0],
    [activePage],
  )
  const activeIndex = pageMeta.findIndex((page) => page.id === activePage)
  const ActivePage = pageComponents[activePage]
  const isCanvasPage = activeMeta.surface === 'canvas'
  const showComposer = activeMeta.showComposer ?? false
  const showInspector = activeMeta.showInspector ?? !isCanvasPage
  const setActivePage = useCallback(
    (page: PageId) => {
      navigate({ to: '/$pageId', params: { pageId: page } })
    },
    [navigate],
  )
  const moveRoute = useCallback(
    (direction: -1 | 1) => {
      const nextIndex =
        (activeIndex + direction + pageMeta.length) % pageMeta.length
      setActivePage(pageMeta[nextIndex].id)
    },
    [activeIndex, setActivePage],
  )

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === '\\') {
        event.preventDefault()
        setRouteBrowseEnabled((enabled) => !enabled)
        return
      }

      if (!routeBrowseEnabled) return

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        moveRoute(-1)
        return
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        moveRoute(1)
        return
      }

      if (event.key === 'Escape') {
        event.preventDefault()
        setRouteBrowseEnabled(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [moveRoute, routeBrowseEnabled])

  return (
    <ShellFrame data-page={activePage} surface={activeMeta.surface}>
      <ShellRail aria-label="Workspace navigation">
        <NavStack aria-label="Primary actions">
          {quickActions.map(({ icon: Icon, label }) => (
            <ControlRow as="button" icon={<Icon />} key={label}>
              {label}
            </ControlRow>
          ))}
        </NavStack>

        <ScrollStack inset="top">
          {projectGroups.map((group) => (
            <NavGroup key={group.label} label={group.label}>
              {group.items.map((project) => (
                <IndentedStack key={project.name}>
                  <ControlRow as="button" icon={<Folder />}>
                    {project.name}
                  </ControlRow>
                  {project.threads.map((thread) => (
                    <IndentedItem depth={1} key={thread.title}>
                      <ControlRow
                        as="button"
                        aria-current={
                          thread.page === activePage ? 'page' : undefined
                        }
                        onClick={() =>
                          thread.page && setActivePage(thread.page)
                        }
                      >
                        {thread.title}
                      </ControlRow>
                    </IndentedItem>
                  ))}
                </IndentedStack>
              ))}
            </NavGroup>
          ))}
        </ScrollStack>

        <ControlRow
          as="button"
          icon={<Settings />}
          onClick={() => setActivePage('settings')}
        >
          설정
        </ControlRow>
      </ShellRail>

      <ShellMain>
        <ShellTopbar
          actions={
            <>
              <IconButton icon={<PanelRight />} label="패널 토글" />
              <IconButton icon={<MoreHorizontal />} label="더 보기" />
            </>
          }
        >
          <Breadcrumb
            current={activeMeta.crumb}
            icon={<Sparkles />}
            items={['Home']}
          />
        </ShellTopbar>

        <ShellSurface surface={activeMeta.surface}>
          <ActivePage />
        </ShellSurface>

        {showComposer ? <ApprovalComposer /> : null}
      </ShellMain>

      {showInspector ? <Inspector /> : null}

      <RouteBrowser
        activePage={activePage}
        enabled={routeBrowseEnabled}
        onMove={moveRoute}
        onToggle={() => setRouteBrowseEnabled((enabled) => !enabled)}
        onSelect={setActivePage}
      />
    </ShellFrame>
  )
}

function RouteBrowser({
  activePage,
  enabled,
  onMove,
  onSelect,
  onToggle,
}: {
  activePage: PageId
  enabled: boolean
  onMove: (direction: -1 | 1) => void
  onSelect: (page: PageId) => void
  onToggle: () => void
}) {
  const activeIndex = pageMeta.findIndex((page) => page.id === activePage)

  return (
    <FloatingPanel aria-label="Route browser" open={enabled}>
      <ControlRow
        as="button"
        aria-pressed={enabled}
        className="ds-floating-panel-toggle"
        onClick={onToggle}
        trailing={<kbd>⌘\</kbd>}
      >
        <TextStack
          detail={`${activeIndex + 1}/${pageMeta.length}`}
          title={pageMeta[activeIndex].label}
        />
      </ControlRow>

      {enabled ? (
        <FloatingPanelBody>
          <Cluster>
            <IconButton
              icon={<ArrowLeft />}
              label="Previous route"
              onClick={() => onMove(-1)}
            />
            <IconButton
              icon={<ArrowRight />}
              label="Next route"
              onClick={() => onMove(1)}
            />
          </Cluster>

          <NavStack aria-label="Routes">
            {pageMeta.map((page) => (
              <ControlRow
                as="button"
                aria-current={page.id === activePage ? 'page' : undefined}
                key={page.id}
                onClick={() => onSelect(page.id)}
                trailing={<small>/{page.id}</small>}
              >
                {page.label}
              </ControlRow>
            ))}
          </NavStack>
        </FloatingPanelBody>
      ) : null}
    </FloatingPanel>
  )
}

export default App
