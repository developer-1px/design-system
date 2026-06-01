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
import { ApprovalComposer } from './components/ApprovalComposer'
import { Inspector } from './components/Inspector'
import {
  ControlRow,
  IconButton,
} from './design-system/primitives'
import { pageMeta, projectGroups, type PageId } from './data/demo'
import { pageComponents } from './pages/registry'
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
  const setActivePage = useCallback((page: PageId) => {
    navigate({ to: '/$pageId', params: { pageId: page } })
  }, [navigate])
  const moveRoute = useCallback((direction: -1 | 1) => {
    const nextIndex =
      (activeIndex + direction + pageMeta.length) % pageMeta.length
    setActivePage(pageMeta[nextIndex].id)
  }, [activeIndex, setActivePage])

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
    <div className="codex-system">
      <aside className="side-rail" aria-label="Workspace navigation">
        <nav className="quick-nav" aria-label="Primary actions">
          {quickActions.map(({ icon: Icon, label }) => (
            <ControlRow
              as="button"
              className="quick-nav-item"
              icon={<Icon />}
              key={label}
            >
              {label}
            </ControlRow>
          ))}
        </nav>

        <div className="project-scroll">
          {projectGroups.map((group) => (
            <section className="project-block" key={group.label}>
              <p className="ds-label project-label">{group.label}</p>
              {group.items.map((project) => (
                <div className="project-tree" key={project.name}>
                  <ControlRow as="button" className="project-root" icon={<Folder />}>
                    {project.name}
                  </ControlRow>
                  {project.threads.map((thread) => (
                    <ControlRow
                      as="button"
                      aria-current={thread.page === activePage ? 'page' : undefined}
                      className="thread-item"
                      key={thread.title}
                      onClick={() => thread.page && setActivePage(thread.page)}
                    >
                      {thread.title}
                    </ControlRow>
                  ))}
                </div>
              ))}
            </section>
          ))}
        </div>

        <ControlRow
          as="button"
          className="settings-link"
          icon={<Settings />}
          onClick={() => setActivePage('settings')}
        >
          설정
        </ControlRow>
      </aside>

      <main className="workbench">
        <header className="topbar">
          <div className="crumbs">
            <Sparkles />
            <span>Home</span>
            <span>/</span>
            <strong>{activeMeta.crumb}</strong>
          </div>
          <div className="topbar-actions">
            <IconButton icon={<PanelRight />} label="패널 토글" />
            <IconButton icon={<MoreHorizontal />} label="더 보기" />
          </div>
        </header>

        <div className={activePage === 'workstream' ? 'work-stream' : 'page-rail'}>
          <ActivePage />
        </div>

        {activePage === 'workstream' ? <ApprovalComposer /> : null}
      </main>

      <Inspector />

      <RouteBrowser
        activePage={activePage}
        enabled={routeBrowseEnabled}
        onMove={moveRoute}
        onToggle={() => setRouteBrowseEnabled((enabled) => !enabled)}
        onSelect={setActivePage}
      />
    </div>
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
    <aside
      aria-label="Route browser"
      className="route-browser"
      data-enabled={enabled ? 'true' : 'false'}
    >
      <button
        aria-pressed={enabled}
        className="route-browser-toggle"
        onClick={onToggle}
        type="button"
      >
        <span>{activeIndex + 1}/{pageMeta.length}</span>
        <strong>{pageMeta[activeIndex].label}</strong>
        <kbd>⌘\</kbd>
      </button>

      {enabled ? (
        <div className="route-browser-panel">
          <div className="route-browser-actions">
            <button aria-label="Previous route" onClick={() => onMove(-1)} type="button">
              <ArrowLeft />
            </button>
            <button aria-label="Next route" onClick={() => onMove(1)} type="button">
              <ArrowRight />
            </button>
          </div>

          <div className="route-browser-list">
            {pageMeta.map((page) => (
              <button
                aria-current={page.id === activePage ? 'page' : undefined}
                key={page.id}
                onClick={() => onSelect(page.id)}
                type="button"
              >
                <span>{page.label}</span>
                <small>/{page.id}</small>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </aside>
  )
}

export default App
