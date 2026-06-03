import type { BlueprintLayout } from '../../design-system/composition/blueprints'
import type { PageId } from '../data/demo'

export const routeComponentNames: Record<PageId, string> = {
  workstream: 'WorkstreamPage',
  projects: 'ProjectsPage',
  changes: 'ChangesPage',
  runs: 'RunsPage',
  approvals: 'ApprovalsPage',
  sources: 'SourcesPage',
  database: 'DatabasePage',
  analytics: 'AnalyticsPage',
  commerce: 'CommercePage',
  crm: 'CrmPage',
  schedule: 'SchedulePage',
  content: 'ContentPage',
  repository: 'RepositoryPage',
  components: 'ComponentsPage',
  composition: 'CompositionPage',
  catalog: 'CatalogPage',
  tokens: 'TokensPage',
  settings: 'SettingsPage',
}

export function routeComponentNameFor(pageId: PageId) {
  return routeComponentNames[pageId]
}

export function routeComponentNamesFor(pages: readonly { id: PageId }[]) {
  return pages.map((page) => routeComponentNameFor(page.id))
}

export function pageIdForRouteComponentName(name: string): PageId | undefined {
  return (Object.entries(routeComponentNames) as [PageId, string][]).find(
    ([, componentName]) => componentName === name,
  )?.[0]
}

export const pageBlueprintLayouts: Record<PageId, BlueprintLayout> = {
  workstream: 'main',
  projects: 'rail-main-aside',
  changes: 'rail-main-aside',
  runs: 'rail-main-aside',
  approvals: 'rail-main-aside',
  sources: 'rail-main-aside',
  database: 'rail-main-aside',
  analytics: 'matrix',
  commerce: 'triad',
  crm: 'main-stack-aside',
  schedule: 'rail-main-aside',
  content: 'rail-main-aside',
  repository: 'rail-main-aside',
  components: 'rail-main',
  composition: 'rail-main',
  catalog: 'rail-main',
  tokens: 'rail-main',
  settings: 'rail-main',
}
