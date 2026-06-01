import type { ComponentType } from 'react'
import type { PageId } from '../data/demo'
import {
  ApprovalsPage,
  CatalogPage,
  ChangesPage,
  ComponentsPage,
  DatabasePage,
  ProjectsPage,
  RunsPage,
  SettingsPage,
  SourcesPage,
  TokensPage,
  WorkstreamPage,
} from './WorkspacePages'

export const pageComponents: Record<PageId, ComponentType> = {
  workstream: WorkstreamPage,
  projects: ProjectsPage,
  changes: ChangesPage,
  runs: RunsPage,
  approvals: ApprovalsPage,
  sources: SourcesPage,
  database: DatabasePage,
  components: ComponentsPage,
  catalog: CatalogPage,
  tokens: TokensPage,
  settings: SettingsPage,
}
