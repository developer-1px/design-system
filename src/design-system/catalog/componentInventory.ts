type ComponentScope = 'exported' | 'default' | 'local'

export type ComponentInventoryItem = {
  name: string
  file: string
  line: number
  scope: ComponentScope
  signature: string
}

const sourceModules = import.meta.glob('../../**/*.tsx', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>

export const componentInventory = Object.entries(sourceModules)
  .flatMap(([modulePath, source]) =>
    extractComponents(normalizePath(modulePath), source),
  )
  .filter((item) => item.scope !== 'local' && !isPreviewScaffold(item.file))
  .sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line)

export const componentInventorySummary = {
  files: new Set(componentInventory.map((item) => item.file)).size,
  components: componentInventory.length,
}

export function inventoryKey(item: ComponentInventoryItem) {
  return `${item.file}:${item.name}:${item.line}`
}

export function groupInventoryEntriesByFile<
  T extends { item: ComponentInventoryItem },
>(entries: T[]) {
  const groups = new Map<string, T[]>()

  entries.forEach((entry) => {
    const shortFile = entry.item.file.replace(/^src\//, '')
    groups.set(shortFile, [...(groups.get(shortFile) ?? []), entry])
  })

  return Array.from(groups.entries()).map(([file, entries]) => ({
    file,
    entries,
  }))
}

function normalizePath(modulePath: string) {
  return modulePath.replace(/^(?:\.\.\/)+/, 'src/')
}

function isPreviewScaffold(file: string) {
  return file === 'src/design-system/catalog/componentPreview.tsx'
}

function extractComponents(file: string, source: string): ComponentInventoryItem[] {
  const items = new Map<string, ComponentInventoryItem>()
  const defaultExportName = matchFirst(source, /export\s+default\s+([A-Z][A-Za-z0-9_]*)/)

  collectFunctionDeclarations(file, source, defaultExportName, items)
  collectArrowComponents(file, source, defaultExportName, items)

  return Array.from(items.values())
}

function collectFunctionDeclarations(
  file: string,
  source: string,
  defaultExportName: string | undefined,
  items: Map<string, ComponentInventoryItem>,
) {
  const functionPattern =
    /(^|\n)(export\s+)?function\s+([A-Z][A-Za-z0-9_]*)\s*\(([^)]*)\)/g

  for (const match of source.matchAll(functionPattern)) {
    const [, , exportKeyword, name, params] = match
    if (!looksLikeComponentBody(source, match.index ?? 0)) continue
    addItem(items, {
      name,
      file,
      line: lineNumberAt(source, match.index ?? 0),
      scope: scopeFor(name, Boolean(exportKeyword), defaultExportName),
      signature: `${name}(${compact(params)})`,
    })
  }
}

function collectArrowComponents(
  file: string,
  source: string,
  defaultExportName: string | undefined,
  items: Map<string, ComponentInventoryItem>,
) {
  const arrowPattern =
    /(^|\n)(export\s+)?const\s+([A-Z][A-Za-z0-9_]*)\s*=\s*(\([^)]*\)|[A-Za-z0-9_]+)\s*=>/g

  for (const match of source.matchAll(arrowPattern)) {
    const [, , exportKeyword, name, params] = match
    if (!looksLikeComponentBody(source, match.index ?? 0)) continue
    addItem(items, {
      name,
      file,
      line: lineNumberAt(source, match.index ?? 0),
      scope: scopeFor(name, Boolean(exportKeyword), defaultExportName),
      signature: `${name}${compact(params)}`,
    })
  }
}

function addItem(
  items: Map<string, ComponentInventoryItem>,
  item: ComponentInventoryItem,
) {
  items.set(`${item.file}:${item.name}:${item.line}`, item)
}

function scopeFor(
  name: string,
  isExported: boolean,
  defaultExportName: string | undefined,
): ComponentScope {
  if (name === defaultExportName) return 'default'
  if (isExported) return 'exported'
  return 'local'
}

function looksLikeComponentBody(source: string, index: number) {
  const bodyPreview = source.slice(index, index + 1200)
  return /return\s*\(?\s*</.test(bodyPreview) || /=>\s*\(?\s*</.test(bodyPreview)
}

function lineNumberAt(source: string, index: number) {
  return source.slice(0, index).split('\n').length
}

function matchFirst(source: string, pattern: RegExp) {
  return source.match(pattern)?.[1]
}

function compact(value: string) {
  return value.replace(/\s+/g, ' ').trim()
}
