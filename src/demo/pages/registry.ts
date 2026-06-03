import type { ComponentType } from 'react'
import type { PageId } from '../data/demo'
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
import {
  CatalogPage,
  CompositionPage,
  ComponentsPage,
} from './DesignSystemPages'
import { SettingsPage, TokensPage } from './DesignSystemValuePages'

export const pageComponents: Record<PageId, ComponentType> = {
  workstream: WorkstreamPage,
  projects: ProjectsPage,
  changes: ChangesPage,
  runs: RunsPage,
  approvals: ApprovalsPage,
  sources: SourcesPage,
  database: DatabasePage,
  analytics: AnalyticsPage,
  commerce: CommercePage,
  crm: CrmPage,
  schedule: SchedulePage,
  content: ContentPage,
  repository: RepositoryPage,
  components: ComponentsPage,
  composition: CompositionPage,
  catalog: CatalogPage,
  tokens: TokensPage,
  settings: SettingsPage,
}
