import { pageMeta, type PageId } from '../demo/data/demo'

const pageIds = new Set<string>(pageMeta.map((page) => page.id))

export function isPageId(value: string | null | undefined): value is PageId {
  return Boolean(value && pageIds.has(value))
}

export function pagePath(page: PageId) {
  return `/${page}`
}

export function pageFromPath(pathname: string): PageId {
  const page = pathname.replace(/^\/+|\/+$/g, '')
  return isPageId(page) ? page : 'workstream'
}
