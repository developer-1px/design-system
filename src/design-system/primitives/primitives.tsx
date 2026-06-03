import type {
  ButtonHTMLAttributes,
  FieldsetHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  MeterHTMLAttributes,
  ReactNode,
} from 'react'
import { Children, isValidElement } from 'react'
import { FileText, type LucideIcon } from 'lucide-react'
import { molecule } from '../molecules/molecules'
import { stateToneFor } from '../foundation/stateTone'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'primary' | 'ghost'
  icon?: ReactNode
}

export function Button({
  children,
  className = '',
  icon,
  variant = 'default',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`ds-button ${className}`.trim()}
      data-variant={variant}
      type={type}
      {...props}
    >
      {icon}
      {children}
    </button>
  )
}

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  icon: ReactNode
}

export function IconButton({
  className = '',
  label,
  icon,
  type = 'button',
  ...props
}: IconButtonProps) {
  return (
    <button
      className={`ds-icon-button ${className}`.trim()}
      aria-label={label}
      type={type}
      {...props}
    >
      {icon}
    </button>
  )
}

type ShellSurface = 'workspace' | 'canvas'

export function ShellFrame({
  children,
  className = '',
  surface = 'workspace',
  ...props
}: {
  children: ReactNode
  className?: string
  surface?: ShellSurface
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`ds-shell-frame ${className}`.trim()}
      data-surface={surface}
      {...props}
    >
      {children}
    </div>
  )
}

export function ShellRail({
  children,
  className = '',
  ...props
}: {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLElement>) {
  return (
    <aside className={`ds-shell-rail ${className}`.trim()} {...props}>
      {children}
    </aside>
  )
}

export function ShellMain({
  children,
  className = '',
  ...props
}: {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLElement>) {
  return (
    <main className={`ds-shell-main ${className}`.trim()} {...props}>
      {children}
    </main>
  )
}

export function ShellTopbar({
  actions,
  children,
  className = '',
  ...props
}: {
  actions?: ReactNode
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLElement>) {
  return (
    <header className={`ds-shell-topbar ${className}`.trim()} {...props}>
      {children}
      {actions ? <Cluster>{actions}</Cluster> : null}
    </header>
  )
}

export function ShellSurface({
  children,
  className = '',
  surface = 'workspace',
  ...props
}: {
  children: ReactNode
  className?: string
  surface?: ShellSurface
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`ds-shell-surface ${className}`.trim()}
      data-surface={surface}
      {...props}
    >
      {children}
    </div>
  )
}

export function ShellInspector({
  children,
  className = '',
  ...props
}: {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLElement>) {
  return (
    <aside className={`ds-shell-inspector ${className}`.trim()} {...props}>
      {children}
    </aside>
  )
}

export function Breadcrumb({
  className = '',
  current,
  icon,
  items,
  ...props
}: {
  className?: string
  current: ReactNode
  icon?: ReactNode
  items: ReactNode[]
} & HTMLAttributes<HTMLElement>) {
  return (
    <nav className={`ds-breadcrumb ${className}`.trim()} {...props}>
      {icon}
      {items.map((item, index) => (
        <span key={index}>{item}</span>
      ))}
      <span>/</span>
      <strong>{current}</strong>
    </nav>
  )
}

export function ScrollStack({
  children,
  className = '',
  inset = 'none',
  ...props
}: {
  children: ReactNode
  className?: string
  inset?: 'none' | 'top'
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`ds-scroll-stack ${className}`.trim()}
      data-inset={inset}
      {...props}
    >
      {children}
    </div>
  )
}

export function NavGroup({
  children,
  className = '',
  label,
  ...props
}: {
  children: ReactNode
  className?: string
  label: ReactNode
} & HTMLAttributes<HTMLElement>) {
  return (
    <section className={`ds-nav-group ${className}`.trim()} {...props}>
      <p className="ds-label">{label}</p>
      <div className="ds-nav-group-list">{children}</div>
    </section>
  )
}

export function FloatingPanel({
  children,
  className = '',
  open,
  ...props
}: {
  children: ReactNode
  className?: string
  open?: boolean
} & HTMLAttributes<HTMLElement>) {
  return (
    <aside
      className={`ds-floating-panel ${className}`.trim()}
      data-open={open ? 'true' : 'false'}
      {...props}
    >
      {children}
    </aside>
  )
}

export function FloatingPanelBody({
  children,
  className = '',
  ...props
}: {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`ds-floating-panel-body ${className}`.trim()} {...props}>
      {children}
    </div>
  )
}

function SectionSurface({
  as = 'div',
  children,
  className = '',
  floating,
  pad,
  ...props
}: {
  as?: 'div' | 'form'
  children: ReactNode
  className?: string
  floating?: boolean
  pad?: boolean
} & HTMLAttributes<HTMLElement>) {
  const Tag = as

  return (
    <Tag
      className={`ds-section-surface ${className}`.trim()}
      data-floating={floating ? 'true' : undefined}
      data-pad={pad ? 'true' : undefined}
      {...props}
    >
      {children}
    </Tag>
  )
}

export function FormSection({
  actions,
  children,
  className = '',
  footer,
  floating,
  icon,
  title,
  ...props
}: Omit<HTMLAttributes<HTMLFormElement>, 'title'> & {
  actions?: ReactNode
  children: ReactNode
  className?: string
  footer?: ReactNode
  floating?: boolean
  icon?: ReactNode
  title: ReactNode
}) {
  return (
    <SectionSurface
      as="form"
      className={`ds-form-section ${className}`.trim()}
      floating={floating}
      {...props}
    >
      <SectionTitlebar actions={actions} icon={icon} title={title} />
      <div className="ds-section-body">{children}</div>
      {footer ? <footer className="ds-section-footer">{footer}</footer> : null}
    </SectionSurface>
  )
}

type PageFrameProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  size?: 'default' | 'wide' | 'document'
}

export function PageFrame({
  children,
  className = '',
  size = 'default',
  ...props
}: PageFrameProps) {
  return (
    <div
      className={`ds-page-frame ${className}`.trim()}
      data-size={size}
      {...props}
    >
      {children}
    </div>
  )
}

type TitlebarLevel = 'page' | 'section' | 'group'
type TitlebarTitleAs = 'h1' | 'h2' | 'strong'

export function Titlebar({
  actions,
  className = '',
  count,
  detail,
  eyebrow,
  icon,
  level = 'section',
  title,
  titleAs = 'strong',
  ...props
}: Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  actions?: ReactNode
  count?: ReactNode
  detail?: ReactNode
  eyebrow?: ReactNode
  icon?: ReactNode
  level?: TitlebarLevel
  title: ReactNode
  titleAs?: TitlebarTitleAs
}) {
  const Title = titleAs

  return (
    <header
      className={`ds-titlebar ${className}`.trim()}
      data-level={level}
      {...props}
    >
      {icon ? <span className="ds-icon-slot">{icon}</span> : null}
      <div className="ds-titlebar-copy">
        {eyebrow ? <p className="ds-label">{eyebrow}</p> : null}
        <Title className="ds-titlebar-title">{title}</Title>
        {detail ? <p className="ds-titlebar-detail">{detail}</p> : null}
      </div>
      {count ? <span className="ds-titlebar-count">{count}</span> : null}
      {actions ? (
        <Cluster className="ds-titlebar-actions">{actions}</Cluster>
      ) : null}
    </header>
  )
}

export function PageLayout({
  actions,
  asideContent: asideSpec,
  className = '',
  eyebrow,
  layout = 'rail-main-aside',
  mainContent: mainSpec,
  railContent: railSpec,
  railNavigation,
  secondaryContent: secondarySpec,
  size = 'default',
  tabsNavigation,
  tertiaryContent: tertiarySpec,
  title,
  ...props
}: Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
  actions?: ReactNode
  asideContent?: AreaContentSpec
  className?: string
  eyebrow?: ReactNode
  layout?: AreaGridLayout
  mainContent?: AreaContentSpec
  railContent?: AreaContentSpec
  railNavigation?: NavigationProps
  secondaryContent?: AreaContentSpec
  size?: PageFrameProps['size']
  tabsNavigation?: NavigationProps
  tertiaryContent?: AreaContentSpec
  title?: ReactNode
}) {
  const railNode = railSpec ? (
    <ContentAssembly content={railSpec} />
  ) : railNavigation ? (
    <Navigation {...railNavigation} />
  ) : (
    null
  )
  const tabsContent = tabsNavigation ? <Navigation {...tabsNavigation} /> : null
  const mainNode = mainSpec ? <ContentAssembly content={mainSpec} /> : null
  const asideNode = asideSpec ? <ContentAssembly content={asideSpec} /> : null
  const secondaryNode = secondarySpec
    ? <ContentAssembly content={secondarySpec} />
    : null
  const tertiaryNode = tertiarySpec ? (
    <ContentAssembly content={tertiarySpec} />
  ) : (
    null
  )

  return (
    <PageFrame className={className} size={size} {...props}>
      {title !== undefined || eyebrow !== undefined || actions !== undefined ? (
        <Titlebar
          actions={actions}
          eyebrow={eyebrow}
          level="page"
          title={title}
          titleAs="h1"
        />
      ) : null}
      {tabsContent}
      <AreaGrid layout={layout}>
        {railNode ? <Area name="rail">{railNode}</Area> : null}
        <Area name="main">
          <SectionStack>{mainNode}</SectionStack>
        </Area>
        {secondaryNode ? (
          <Area name="secondary">
            <SectionStack>{secondaryNode}</SectionStack>
          </Area>
        ) : null}
        {tertiaryNode ? (
          <Area name="tertiary">
            <SectionStack>{tertiaryNode}</SectionStack>
          </Area>
        ) : null}
        {asideNode ? (
          <Area name="aside">
            <SectionStack>{asideNode}</SectionStack>
          </Area>
        ) : null}
      </AreaGrid>
    </PageFrame>
  )
}

export type AreaContentSpec = {
  blocks: AreaContentBlock[]
}

declare const areaContentBlockBrand: unique symbol

type AreaContentBlock = {
  readonly [areaContentBlockBrand]: true
} & (
  | ({ block: 'grid' } & TitledGridBlockSpec)
  | ({ block: 'meta' } & MetaBlockSpec)
  | ({ block: 'section-set' } & ListSectionSetSpec)
  | ({ block: 'surface' } & SurfaceBlockSpec)
  | ({ block: 'table' } & TableSectionSpec<unknown>)
  | ({ block: 'text' } & TextBlockSpec)
  | ({ block: 'tree' } & TreeSectionSpec)
)

type ListSectionSetSpec = {
  columns?: CollectionColumns
  key?: string | number
  sections: ListSectionSetItem[]
}

export type TitledGridBlockSpec = {
  columns?: CollectionColumns
  count?: ReactNode
  items: ReactNode[]
  key?: string | number
  title: ReactNode
}

export type SurfaceBlockSpec = SectionProps & {
  key?: string | number
}

export type TextBlockSpec = {
  children: ReactNode
  key?: string | number
}

export type MetaBlockSpec = {
  children: ReactNode
  icon?: ReactNode
  key?: string | number
  trailing?: ReactNode
}

export function ContentAssembly({ content }: { content: AreaContentSpec }) {
  return renderAreaContent(content)
}

function renderAreaContent({ blocks }: AreaContentSpec) {
  return (
    <>{blocks?.map((block, index) => renderAreaContentBlock(block, index))}</>
  )
}

function renderAreaContentBlock(block: AreaContentBlock, index: number) {
  if (block.block === 'grid') {
    return (
      <TitledGrid
        columns={block.columns}
        count={block.count}
        key={block.key ?? rowKey(block.title, index)}
        title={block.title}
      >
        {Children.toArray(block.items)}
      </TitledGrid>
    )
  }

  if (block.block === 'section-set') {
    return (
      <ListSectionSet
        columns={block.columns}
        key={block.key ?? rowKey(block.sections[0]?.title, index)}
        sections={block.sections}
      />
    )
  }

  if (block.block === 'tree') {
    return (
      <TreeSection
        icon={block.icon}
        items={block.items}
        key={block.key ?? rowKey(block.title, index)}
        title={block.title}
      />
    )
  }

  if (block.block === 'text') {
    return <Prose key={block.key ?? index}>{block.children}</Prose>
  }

  if (block.block === 'meta') {
    return (
      <MetaRow
        icon={block.icon}
        key={block.key ?? rowKey(block.children, index)}
        trailing={block.trailing}
      >
        {block.children}
      </MetaRow>
    )
  }

  if (block.block === 'surface') {
    const { children, ...sectionProps } = stripAreaBlockKeys(block)

    return (
      <Section
        key={block.key ?? rowKey(sectionProps.title, index)}
        {...sectionProps}
      >
        {children}
      </Section>
    )
  }

  const tableProps = stripAreaBlockKeys(block)

  return (
    <TableSection
      key={block.key ?? rowKey(tableProps.title, index)}
      {...tableProps}
    />
  )
}

function stripAreaBlockKeys<T extends { block: string; key?: string | number }>(
  block: T,
) {
  return Object.fromEntries(
    Object.entries(block).filter(([key]) => key !== 'block' && key !== 'key'),
  ) as Omit<T, 'block' | 'key'>
}

type AreaGridLayout =
  | 'main'
  | 'rail-main'
  | 'rail-main-aside'
  | 'main-aside'
  | 'main-stack-aside'
  | 'triad'
  | 'matrix'

export function AreaGrid({
  children,
  className = '',
  layout = 'rail-main-aside',
  ...props
}: {
  children: ReactNode
  className?: string
  layout?: AreaGridLayout
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`ds-area-grid ${className}`.trim()}
      data-layout={layout}
      {...props}
    >
      {children}
    </div>
  )
}

type AreaName = 'rail' | 'main' | 'secondary' | 'tertiary' | 'aside'

export function Area({
  children,
  className = '',
  name,
  ...props
}: {
  children: ReactNode
  className?: string
  name: AreaName
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`ds-area ${className}`.trim()} data-area={name} {...props}>
      {children}
    </div>
  )
}

export function NavStack({
  'aria-label': ariaLabel,
  children,
  className = '',
  ...props
}: {
  'aria-label': string
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLElement>) {
  return (
    <nav
      aria-label={ariaLabel}
      className={`ds-nav-stack ${className}`.trim()}
      {...props}
    >
      {children}
    </nav>
  )
}

export function TabRow({
  'aria-label': ariaLabel,
  children,
  className = '',
  ...props
}: {
  'aria-label': string
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLElement>) {
  return (
    <nav
      aria-label={ariaLabel}
      className={`ds-tab-row ${className}`.trim()}
      {...props}
    >
      {children}
    </nav>
  )
}

export function SectionStack({
  children,
  className = '',
  ...props
}: {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`ds-section-stack ${className}`.trim()} {...props}>
      {children}
    </div>
  )
}

export function SplitView({
  children,
  className = '',
  ...props
}: {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`ds-split-view ${className}`.trim()} {...props}>
      {children}
    </div>
  )
}

export function Pane({
  children,
  className = '',
  role,
  ...props
}: {
  children: ReactNode
  className?: string
  role: 'rail' | 'main'
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`ds-pane ${className}`.trim()} data-role={role} {...props}>
      {children}
    </div>
  )
}

export function CollectionGrid({
  children,
  className = '',
  columns = 2,
  ...props
}: {
  children: ReactNode
  className?: string
  columns?: CollectionColumns
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`ds-collection-grid ${className}`.trim()}
      data-columns={columns}
      {...props}
    >
      {children}
    </div>
  )
}

export type CollectionColumns = 1 | 2 | 3 | 4 | 'auto'

export function SectionGrid({
  children,
  className = '',
  columns = 2,
  ...props
}: {
  children: ReactNode
  className?: string
  columns?: CollectionColumns
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <CollectionGrid
      className={`ds-section-grid ${className}`.trim()}
      columns={columns}
      {...props}
    >
      {children}
    </CollectionGrid>
  )
}

type NavigationItem = {
  key?: string | number
  current?: boolean
  href?: string
  icon?: ReactNode
  label: ReactNode
  onClick?: () => void
  trailing?: ReactNode
}

type NavigationGroup = {
  count?: ReactNode
  items: NavigationItem[]
  key?: string | number
  title: ReactNode
}

type NavigationVariant = 'list' | 'tabs' | 'groups'
export type NavigationProps = {
  'aria-label': string
  groups?: NavigationGroup[]
  items?: NavigationItem[]
  variant?: NavigationVariant
}

function NavigationControl({
  current,
  href,
  icon,
  label,
  onClick,
  trailing,
}: NavigationItem) {
  const controlAs = onClick ? 'button' : href ? 'a' : 'div'

  return (
    <ControlRow
      as={controlAs}
      aria-current={current ? 'page' : undefined}
      href={href}
      icon={icon}
      onClick={onClick}
      trailing={trailing}
    >
      {label}
    </ControlRow>
  )
}

export function Navigation(props: NavigationProps) {
  const {
    'aria-label': ariaLabel,
    groups = [],
    items = [],
    variant = 'list',
  } = props

  if (variant === 'tabs') {
    return (
      <TabRow aria-label={ariaLabel}>
        {items.map((item, index) => (
          <NavigationControl
            key={item.key ?? rowKey(item.label, index)}
            {...item}
          />
        ))}
      </TabRow>
    )
  }

  if (variant === 'groups') {
    return (
      <ScrollStack aria-label={ariaLabel}>
        {groups.map((group, groupIndex) => (
          <SectionGroup
            count={group.count}
            key={group.key ?? rowKey(group.title, groupIndex)}
            title={group.title}
          >
            <RowStack gap="tight">
              {group.items.map((item, itemIndex) => (
                <NavigationControl
                  key={item.key ?? rowKey(item.label, itemIndex)}
                  {...item}
                />
              ))}
            </RowStack>
          </SectionGroup>
        ))}
      </ScrollStack>
    )
  }

  return (
    <NavStack aria-label={ariaLabel}>
      {items.map((item, index) => (
        <NavigationControl
          key={item.key ?? rowKey(item.label, index)}
          {...item}
        />
      ))}
    </NavStack>
  )
}

export function TextStack({
  className = '',
  detail,
  title,
  ...props
}: {
  className?: string
  detail?: ReactNode
  title: ReactNode
} & Omit<HTMLAttributes<HTMLSpanElement>, 'title'>) {
  return (
    <span className={`ds-text-stack ${className}`.trim()} {...props}>
      <span>{title}</span>
      {detail ? <small>{detail}</small> : null}
    </span>
  )
}

export function SectionGroup({
  children,
  className = '',
  count,
  title,
  ...props
}: {
  children: ReactNode
  className?: string
  count?: ReactNode
  title: ReactNode
} & Omit<HTMLAttributes<HTMLElement>, 'title'>) {
  return (
    <section className={`ds-section-group ${className}`.trim()} {...props}>
      <Titlebar count={count} level="group" title={title} titleAs="h2" />
      {children}
    </section>
  )
}

export function TitledGrid({
  children,
  className = '',
  columns = 'auto',
  count,
  title,
  ...props
}: {
  children: ReactNode
  className?: string
  columns?: CollectionColumns
  count?: ReactNode
  title: ReactNode
} & Omit<HTMLAttributes<HTMLElement>, 'title'>) {
  return (
    <SectionGroup className={className} count={count} title={title} {...props}>
      <SectionGrid columns={columns}>{children}</SectionGrid>
    </SectionGroup>
  )
}

export function IndentedStack({
  children,
  className = '',
  ...props
}: {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`ds-indented-stack ${className}`.trim()} {...props}>
      {children}
    </div>
  )
}

export function IndentedItem({
  children,
  className = '',
  depth = 0,
  ...props
}: {
  children: ReactNode
  className?: string
  depth?: 0 | 1 | 2
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`ds-indented-item ${className}`.trim()}
      data-depth={depth}
      {...props}
    >
      {children}
    </div>
  )
}

export function Cluster({
  children,
  className = '',
  ...props
}: {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`ds-cluster ${className}`.trim()} {...props}>
      {children}
    </div>
  )
}

export function Prose({
  children,
  className = '',
  ...props
}: {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`ds-prose ${className}`.trim()} {...props}>
      {children}
    </div>
  )
}

export function MetaRow({
  children,
  icon,
  trailing,
}: {
  children: ReactNode
  icon?: ReactNode
  trailing?: ReactNode
}) {
  return (
    <div className="ds-meta-row">
      {icon}
      <span>{children}</span>
      {trailing}
    </div>
  )
}

function SectionTitlebar(props: {
  actions?: ReactNode
  detail?: ReactNode
  icon?: ReactNode
  title: ReactNode
}) {
  return <Titlebar level="section" titleAs="strong" {...props} />
}

type SectionProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
  actions?: ReactNode
  children?: ReactNode
  className?: string
  detail?: ReactNode
  icon?: ReactNode
  title?: ReactNode
}

type TitledSectionProps = SectionProps & {
  title: ReactNode
}

export function Section({
  actions,
  children,
  className = '',
  detail,
  icon,
  title,
  ...props
}: SectionProps) {
  return (
    <SectionSurface className={`ds-section ${className}`.trim()} pad {...props}>
      {title !== undefined ? (
        <SectionTitlebar
          actions={actions}
          detail={detail}
          icon={icon}
          title={title}
        />
      ) : null}
      {children}
    </SectionSurface>
  )
}

type ListSectionShellProps = Omit<TitledSectionProps, 'children'>
type ListSectionKind =
  | 'code'
  | 'delta'
  | 'item'
  | 'metric'
  | 'meter'
  | 'record'
  | 'status'
  | 'value'

type FreeListSectionProps = TitledSectionProps & {
  footer?: ReactNode
  items?: never
  kind?: never
  ordered?: boolean
}

type TypedListSectionProps =
  | (ListSectionShellProps & {
      footer?: ReactNode
      items: CodeListItem[]
      kind: 'code'
    })
  | (ListSectionShellProps & {
      footer?: ReactNode
      items: DeltaListItem[]
      kind: 'delta'
    })
  | (ListSectionShellProps & {
      footer?: ReactNode
      items: ItemListItem[]
      kind: 'item'
    })
  | (ListSectionShellProps & {
      columns?: 2 | 3 | 4
      footer?: ReactNode
      items: MetricListItem[]
      kind: 'metric'
    })
  | (ListSectionShellProps & {
      footer?: ReactNode
      items: MeterListItem[]
      kind: 'meter'
    })
  | (ListSectionShellProps & {
      footer?: ReactNode
      items: RecordListItem[]
      kind: 'record'
    })
  | (ListSectionShellProps & {
      footer?: ReactNode
      items: StatusListItem[]
      kind: 'status'
    })
  | (ListSectionShellProps & {
      footer?: ReactNode
      items: ValueListItem[]
      kind: 'value'
    })

export type ListSectionProps = FreeListSectionProps | TypedListSectionProps
export type ListSectionSetItem = ListSectionProps & {
  key?: string | number
}

export function ListSection(props: ListSectionProps) {
  if (props.kind === 'metric') {
    const {
      className = '',
      columns,
      footer,
      items,
      kind,
      ...sectionProps
    } = props

    return (
      <Section
        className={`ds-list-section ${className}`.trim()}
        data-list-kind={kind}
        {...sectionProps}
      >
        <MetricList columns={columns} items={items} />
        {footer ? <div className="ds-list-footer">{footer}</div> : null}
      </Section>
    )
  }

  if (props.kind) {
    const { className = '', footer, items, kind, ...sectionProps } = props

    return (
      <Section
        className={`ds-list-section ${className}`.trim()}
        data-list-kind={kind}
        {...sectionProps}
      >
        {listBodyFor(kind, items)}
        {footer ? <div className="ds-list-footer">{footer}</div> : null}
      </Section>
    )
  }

  const { children, className = '', footer, ordered, ...sectionProps } = props

  const body = isListAssembly(children) ? (
    children
  ) : (
    <RowStack as={ordered ? 'ol' : 'div'}>{children}</RowStack>
  )

  return (
    <Section
      className={`ds-list-section ${className}`.trim()}
      {...sectionProps}
    >
      {body}
      {footer ? <div className="ds-list-footer">{footer}</div> : null}
    </Section>
  )
}

export function NavigationSection({
  actions,
  className = '',
  detail,
  icon,
  title,
  ...navigationProps
}: Omit<TitledSectionProps, 'children'> & NavigationProps) {
  return (
    <ListSection
      actions={actions}
      className={className}
      detail={detail}
      icon={icon}
      title={title}
    >
      <Navigation {...navigationProps} />
    </ListSection>
  )
}

function ListSectionSet({
  columns,
  sections,
}: {
  columns?: CollectionColumns
  sections: ListSectionSetItem[]
}) {
  const body = sections.map(({ key, ...section }, index) => (
    <ListSection key={key ?? rowKey(section.title, index)} {...section} />
  ))

  return columns ? (
    <SectionGrid columns={columns}>{body}</SectionGrid>
  ) : (
    <>{body}</>
  )
}

function listBodyFor(
  kind: Exclude<ListSectionKind, 'metric'>,
  items:
    | CodeListItem[]
    | DeltaListItem[]
    | ItemListItem[]
    | MeterListItem[]
    | RecordListItem[]
    | StatusListItem[]
    | ValueListItem[],
) {
  switch (kind) {
    case 'code':
      return <CodeList items={items as CodeListItem[]} />
    case 'delta':
      return <DeltaList items={items as DeltaListItem[]} />
    case 'item':
      return <ItemList items={items as ItemListItem[]} />
    case 'meter':
      return <MeterList items={items as MeterListItem[]} />
    case 'record':
      return <RecordList items={items as RecordListItem[]} />
    case 'status':
      return <StatusList items={items as StatusListItem[]} />
    case 'value':
      return <ValueList items={items as ValueListItem[]} />
  }
}

function isListAssembly(children: ReactNode) {
  const childArray = Children.toArray(children)

  if (childArray.length !== 1) return false

  const child = childArray[0]
  if (!isValidElement(child)) return false

  return [
    RowStack,
    Navigation,
    NavStack,
    TabRow,
    ValueList,
    RecordList,
    CodeList,
    DeltaList,
    MeterList,
    StatusList,
    ItemList,
    IndentedStack,
  ].includes(child.type as never)
}

export function RowStack({
  'aria-label': ariaLabel,
  as = 'div',
  children,
  className = '',
  gap = 'default',
  role,
  ...props
}: {
  'aria-label'?: string
  as?: 'div' | 'ol'
  children: ReactNode
  className?: string
  gap?: 'default' | 'tight'
  role?: string
} & HTMLAttributes<HTMLElement>) {
  const Tag = as

  return (
    <Tag
      aria-label={ariaLabel}
      className={`ds-row-stack ${className}`.trim()}
      data-gap={gap}
      role={role}
      {...props}
    >
      {children}
    </Tag>
  )
}

type ChoiceRowProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  checked?: boolean
  prefix?: ReactNode
}

export function ChoiceRow({
  checked,
  children,
  className = '',
  prefix,
  role = 'radio',
  type = 'button',
  ...props
}: ChoiceRowProps) {
  return (
    <button
      aria-checked={checked}
      className={`ds-choice ds-control ${className}`.trim()}
      role={role}
      type={type}
      {...props}
    >
      {prefix ? <span className="ds-choice-prefix">{prefix}</span> : null}
      {children}
    </button>
  )
}

type ControlRowProps = HTMLAttributes<HTMLElement> & {
  as?: 'button' | 'div' | 'a'
  icon?: ReactNode
  href?: string
  trailing?: ReactNode
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
}

export function ControlRow({
  as = 'div',
  children,
  className = '',
  icon,
  href,
  trailing,
  type = 'button',
  ...props
}: ControlRowProps) {
  const content = (
    <>
      {icon ? <span className="ds-control-row-icon">{icon}</span> : null}
      <span className="ds-control-row-label">{children}</span>
      {trailing ? (
        <span className="ds-control-row-trailing">{trailing}</span>
      ) : null}
    </>
  )
  const classes = `ds-control-row ds-control ${className}`.trim()

  if (as === 'button') {
    return (
      <button
        className={classes}
        type={type}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    )
  }

  if (as === 'a') {
    return (
      <a className={classes} href={href} {...props}>
        {content}
      </a>
    )
  }

  return (
    <div className={classes} {...props}>
      {content}
    </div>
  )
}

type FieldProps = HTMLAttributes<HTMLDivElement> & {
  htmlFor: string
  label: string
}

export function Field({
  children,
  className = '',
  htmlFor,
  label,
  ...props
}: FieldProps) {
  return (
    <div className={`ds-field ${className}`.trim()} {...props}>
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  )
}

type FieldGroupProps = FieldsetHTMLAttributes<HTMLFieldSetElement> & {
  legend: string
}

export function FieldGroup({
  children,
  className = '',
  legend,
  ...props
}: FieldGroupProps) {
  return (
    <fieldset className={`ds-fieldset ${className}`.trim()} {...props}>
      <legend>{legend}</legend>
      {children}
    </fieldset>
  )
}

export function InputFrame({
  children,
  className = '',
  trailing,
  ...props
}: {
  children: ReactNode
  className?: string
  trailing?: ReactNode
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`ds-input-frame ${className}`.trim()} {...props}>
      {children}
      {trailing ? <span>{trailing}</span> : null}
    </div>
  )
}

type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  type?: 'text' | 'search' | 'number'
}

export function TextInput({
  className = '',
  type = 'text',
  ...props
}: TextInputProps) {
  return (
    <input className={`ds-input ${className}`.trim()} type={type} {...props} />
  )
}

export function RangeInput({
  className = '',
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>) {
  return (
    <input className={`ds-range ${className}`.trim()} type="range" {...props} />
  )
}

export function CheckboxInput({
  className = '',
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>) {
  return (
    <input
      className={`ds-checkbox-input ${className}`.trim()}
      type="checkbox"
      {...props}
    />
  )
}

export function CheckboxRow({
  children,
  className = '',
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  children: ReactNode
  className?: string
}) {
  return (
    <label className={`ds-checkbox-row ${className}`.trim()}>
      <CheckboxInput {...props} />
      <span>{children}</span>
    </label>
  )
}

export function MeterBar({
  children,
  className = '',
  ...props
}: MeterHTMLAttributes<HTMLMeterElement>) {
  return (
    <meter className={`ds-meter ${className}`.trim()} {...props}>
      {children}
    </meter>
  )
}

export function Swatch({ value }: { value: string }) {
  return (
    <span
      aria-hidden="true"
      className="ds-swatch"
      style={{ background: value }}
    />
  )
}

export type SkeletonLineWidth = 'short' | 'medium' | 'long' | 'full'

export function SkeletonLine({
  width = 'full',
}: {
  width?: SkeletonLineWidth
}) {
  return (
    <span aria-hidden="true" className="ds-skeleton-line" data-width={width} />
  )
}

export function SkeletonStack({
  lines = ['full', 'long', 'medium'],
}: {
  lines?: SkeletonLineWidth[]
}) {
  return (
    <RowStack>
      {lines.map((width, index) => (
        <SkeletonLine key={`${width}-${index}`} width={width} />
      ))}
    </RowStack>
  )
}

export function PlaceholderSection({
  lines,
  ...props
}: Omit<TitledSectionProps, 'children'> & {
  lines?: SkeletonLineWidth[]
}) {
  return (
    <ListSection {...props}>
      <SkeletonStack lines={lines} />
    </ListSection>
  )
}

export function Description({ children }: { children: ReactNode }) {
  return <p className="ds-description">{children}</p>
}

export function KeyValueRow({
  label,
  prefix,
  value,
  valueTone = 'default',
}: {
  label: ReactNode
  prefix?: ReactNode
  value: ReactNode
  valueTone?: 'default' | 'muted'
}) {
  return (
    <molecule.Row
      className="ds-key-value-row"
      marker={prefix}
      value={value}
      valueTone={valueTone}
    >
      {label}
    </molecule.Row>
  )
}

type ValueListItem = {
  key?: string | number
  label: ReactNode
  prefix?: ReactNode
  value: ReactNode
  valueTone?: 'default' | 'muted'
}

export function ValueList({ items }: { items: ValueListItem[] }) {
  return (
    <RowStack>
      {items.map((item, index) => (
        <KeyValueRow
          key={item.key ?? rowKey(item.label, index)}
          label={item.label}
          prefix={item.prefix}
          value={item.value}
          valueTone={item.valueTone}
        />
      ))}
    </RowStack>
  )
}

export function DetailRow({
  detail,
  meta,
  prefix,
  title,
}: {
  detail?: ReactNode
  meta?: ReactNode
  prefix?: ReactNode
  title: ReactNode
}) {
  return (
    <molecule.Row
      className="ds-detail-row"
      detail={detail}
      labelTone="strong"
      marker={prefix}
      value={meta}
      valueTone="muted"
    >
      {title}
    </molecule.Row>
  )
}

type RecordListItem = {
  key?: string | number
  detail?: ReactNode
  meta?: ReactNode
  prefix?: ReactNode
  title: ReactNode
}

export function RecordList({ items }: { items: RecordListItem[] }) {
  return (
    <RowStack>
      {items.map((item, index) => (
        <DetailRow
          detail={item.detail}
          key={item.key ?? rowKey(item.title, index)}
          meta={item.meta}
          prefix={item.prefix}
          title={item.title}
        />
      ))}
    </RowStack>
  )
}

export function CodeLine({
  children,
  marker,
  tone,
}: {
  children: ReactNode
  marker?: ReactNode
  tone?: 'positive' | 'danger'
}) {
  return (
    <code
      className="ds-code-line"
      data-marker={marker ? 'true' : 'false'}
      data-tone={tone}
    >
      {marker ? <span>{marker}</span> : null}
      {children}
    </code>
  )
}

export function InlineCode({ children }: { children: ReactNode }) {
  return <code className="ds-code">{children}</code>
}

type CodeListItem = {
  key?: string | number
  line: ReactNode
  marker?: ReactNode
  tone?: 'positive' | 'danger'
}

export function CodeList({ items }: { items: CodeListItem[] }) {
  return (
    <RowStack>
      {items.map((item, index) => (
        <CodeLine
          key={item.key ?? rowKey(item.line, index)}
          marker={item.marker}
          tone={item.tone}
        >
          {item.line}
        </CodeLine>
      ))}
    </RowStack>
  )
}

export function DeltaPair({
  positive,
  negative,
}: {
  positive: ReactNode
  negative: ReactNode
}) {
  return (
    <span className="ds-delta-pair">
      <span>{positive}</span>
      <span>{negative}</span>
    </span>
  )
}

export type DataColumn<T> = {
  key: string
  header: ReactNode
  render: (row: T) => ReactNode
}

export function StateColumn<T extends { state: ReactNode }>(
  header: ReactNode = 'State',
  toneFor: (state: T['state']) => BadgeTone | undefined = stateToneFor,
): DataColumn<T> {
  return {
    key: 'state',
    header,
    render: (row) => (
      <StateBadge tone={toneFor?.(row.state)}>{row.state}</StateBadge>
    ),
  }
}

export function DataTable<T>({
  columns,
  getRowKey,
  rows,
}: {
  columns: Array<DataColumn<T>>
  getRowKey: (row: T) => string | number
  rows: T[]
}) {
  return (
    <div className="ds-table-scroll">
      <table className="ds-data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={getRowKey(row)}>
              {columns.map((column) => (
                <td key={column.key}>{column.render(row)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export type TableSectionSpec<T> = Omit<TitledSectionProps, 'children'> & {
  columns: Array<DataColumn<T>>
  getRowKey: (row: T) => string | number
  key?: string | number
  rows: T[]
}

export function TableSection<T>({
  actions,
  className = '',
  columns,
  detail,
  getRowKey,
  icon,
  rows,
  title,
  ...props
}: TableSectionSpec<T>) {
  return (
    <Section
      actions={actions}
      className={className}
      detail={detail}
      icon={icon}
      title={title}
      {...props}
    >
      <DataTable columns={columns} getRowKey={getRowKey} rows={rows} />
    </Section>
  )
}

export function GridSection({
  children,
  className = '',
  columns = 'auto',
  ...sectionProps
}: Omit<TitledSectionProps, 'children'> & {
  children: ReactNode
  columns?: CollectionColumns
}) {
  return (
    <Section className={className} {...sectionProps}>
      <CollectionGrid columns={columns}>{children}</CollectionGrid>
    </Section>
  )
}

type MetricListItem = {
  detail?: string
  key?: string | number
  label: string
  value: ReactNode
}

function MetricList({
  children,
  className = '',
  columns = 3,
  items,
  ...props
}: {
  children?: ReactNode
  className?: string
  columns?: 2 | 3 | 4
  items?: MetricListItem[]
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <CollectionGrid
      className={`ds-metric-list ${className}`.trim()}
      columns={columns}
      {...props}
    >
      {items
        ? items.map((item, index) => (
            <MetricItem
              detail={item.detail}
              key={item.key ?? rowKey(item.label, index)}
              label={item.label}
              value={item.value}
            />
          ))
        : children}
    </CollectionGrid>
  )
}

export function MeterRow({
  label,
  value,
  meter,
}: {
  label: ReactNode
  value: ReactNode
  meter: number
}) {
  return (
    <div className="ds-meter-row">
      <KeyValueRow label={label} value={value} />
      <MeterBar max={100} min={0} value={meter}>
        {meter}%
      </MeterBar>
    </div>
  )
}

type MeterListItem = {
  key?: string | number
  label: ReactNode
  meter: number
  value: ReactNode
}

export function MeterList({ items }: { items: MeterListItem[] }) {
  return (
    <RowStack>
      {items.map((item, index) => (
        <MeterRow
          key={item.key ?? rowKey(item.label, index)}
          label={item.label}
          meter={item.meter}
          value={item.value}
        />
      ))}
    </RowStack>
  )
}

export type BadgeTone = 'positive' | 'danger' | 'warning' | 'info'

export function Badge({
  children,
  tone,
}: {
  children: ReactNode
  tone?: BadgeTone
}) {
  return (
    <span className="ds-badge" data-tone={tone}>
      {children}
    </span>
  )
}

export function StateBadge({
  children,
  tone = stateToneFor(children),
}: {
  children: ReactNode
  tone?: BadgeTone
}) {
  return <Badge tone={tone}>{children}</Badge>
}

export function SegmentedControl({
  label,
  options,
}: {
  label: string
  options: Array<{
    label: string
    selected?: boolean
  }>
}) {
  return (
    <div className="ds-segment" aria-label={label} role="tablist">
      {options.map((option) => (
        <button
          aria-selected={option.selected ? 'true' : 'false'}
          key={option.label}
          role="tab"
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

function MetricItem({
  label,
  value,
  detail,
}: {
  label: string
  value: ReactNode
  detail?: string
}) {
  return (
    <div className="ds-metric-item">
      <span>{label}</span>
      <strong>{value}</strong>
      {detail ? <p>{detail}</p> : null}
    </div>
  )
}

export function EmptyState({
  icon,
  title,
  description,
}: {
  icon: ReactNode
  title: string
  description?: string
}) {
  return (
    <div className="ds-empty-state">
      <span>{icon}</span>
      <strong>{title}</strong>
      {description ? <p>{description}</p> : null}
    </div>
  )
}

export function DeltaRow({
  delta,
  icon: Icon = FileText,
  label,
}: {
  delta: string
  icon?: LucideIcon
  label: ReactNode
}) {
  return (
    <molecule.Row
      className="ds-delta-row"
      icon={Icon}
      labelTone="code"
      value={delta}
      valueTone="positive"
    >
      {label}
    </molecule.Row>
  )
}

type DeltaListItem = {
  delta: string
  icon?: LucideIcon
  key?: string | number
  label: ReactNode
}

export function DeltaList({ items }: { items: DeltaListItem[] }) {
  return (
    <RowStack>
      {items.map((item, index) => (
        <DeltaRow
          delta={item.delta}
          icon={item.icon}
          key={item.key ?? rowKey(item.label, index)}
          label={item.label}
        />
      ))}
    </RowStack>
  )
}

type StatusListItem = {
  key?: string | number
  done?: boolean
  label: ReactNode
}

export function StatusList({ items }: { items: StatusListItem[] }) {
  return (
    <RowStack as="ol">
      {items.map((item, index) => (
        <CheckRow done={item.done} key={item.key ?? rowKey(item.label, index)}>
          {item.label}
        </CheckRow>
      ))}
    </RowStack>
  )
}

export function CheckRow({
  children,
  done,
}: {
  children: ReactNode
  done?: boolean
}) {
  return <molecule.StatusRow done={done}>{children}</molecule.StatusRow>
}

export function ItemRow({
  children,
  detail,
  icon: Icon,
  muted,
  value,
}: {
  children: ReactNode
  detail?: ReactNode
  icon?: LucideIcon
  muted?: boolean
  value?: ReactNode
}) {
  return (
    <molecule.ItemRow detail={detail} icon={Icon} muted={muted} value={value}>
      {children}
    </molecule.ItemRow>
  )
}

type ItemListItem = {
  detail?: ReactNode
  icon?: LucideIcon
  key?: string | number
  label: ReactNode
  muted?: boolean
  value?: ReactNode
}

export function ItemList({ items }: { items: ItemListItem[] }) {
  return (
    <RowStack>
      {items.map((item, index) => (
        <ItemRow
          detail={item.detail}
          icon={item.icon}
          key={item.key ?? rowKey(item.label, index)}
          muted={item.muted}
          value={item.value}
        >
          {item.label}
        </ItemRow>
      ))}
    </RowStack>
  )
}

export type TreeItem = {
  children?: TreeItem[]
  icon?: ReactNode
  key?: string | number
  label: ReactNode
}

export type TreeSectionSpec = {
  icon?: ReactNode
  items: TreeItem[]
  key?: string | number
  title: ReactNode
}

export function TreeSection({
  icon,
  items,
  title,
}: TreeSectionSpec) {
  return (
    <ListSection icon={icon} title={title}>
      <IndentedStack>
        {items.map((item, index) => (
          <TreeNode item={item} key={item.key ?? rowKey(item.label, index)} />
        ))}
      </IndentedStack>
    </ListSection>
  )
}

function TreeNode({ depth = 0, item }: { depth?: 0 | 1 | 2; item: TreeItem }) {
  const nextDepth = Math.min(depth + 1, 2) as 0 | 1 | 2

  return (
    <IndentedStack>
      <IndentedItem depth={depth}>
        <ControlRow icon={item.icon}>{item.label}</ControlRow>
      </IndentedItem>
      {item.children?.map((child, index) => (
        <TreeNode
          depth={nextDepth}
          item={child}
          key={child.key ?? rowKey(child.label, index)}
        />
      ))}
    </IndentedStack>
  )
}

function rowKey(value: ReactNode, index: number) {
  return typeof value === 'string' || typeof value === 'number' ? value : index
}
