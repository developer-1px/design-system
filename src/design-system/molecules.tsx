import type { HTMLAttributes, ReactNode } from 'react'
import {
  CheckCircle2,
  Circle,
  type LucideIcon,
} from 'lucide-react'

type RootProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode
}

function root({ children, className = '', ...props }: RootProps) {
  return (
    <section className={`ds-molecule ${className}`.trim()} {...props}>
      {children}
    </section>
  )
}

type HeaderProps = HTMLAttributes<HTMLElement> & {
  icon?: LucideIcon
  title: ReactNode
}

function header({ className = '', icon: Icon, title, ...props }: HeaderProps) {
  return (
    <header
      className={`ds-molecule-header ${className}`.trim()}
      data-marker={Icon ? 'true' : 'false'}
      {...props}
    >
      <strong>{title}</strong>
      {Icon ? (
        <span className="ds-molecule-marker">
          <Icon />
        </span>
      ) : null}
    </header>
  )
}

type ListProps = HTMLAttributes<HTMLElement> & {
  as?: 'div' | 'ol' | 'ul'
  children: ReactNode
}

function list({ as = 'div', children, className = '', ...props }: ListProps) {
  const Tag = as

  return (
    <Tag className={`ds-molecule-list ${className}`.trim()} {...props}>
      {children}
    </Tag>
  )
}

type RowProps = HTMLAttributes<HTMLElement> & {
  as?: 'div' | 'li'
  detail?: ReactNode
  icon?: LucideIcon
  labelTone?: 'default' | 'strong' | 'code'
  marker?: ReactNode
  muted?: boolean
  state?: 'done' | 'pending'
  value?: ReactNode
  valueTone?: 'default' | 'muted' | 'positive'
}

function row({
  as = 'div',
  children,
  className = '',
  detail,
  icon: Icon,
  labelTone = 'default',
  marker,
  muted,
  state,
  value,
  valueTone = 'default',
  ...props
}: RowProps) {
  const Tag = as
  const hasMarker = Boolean(marker ?? Icon)

  return (
    <Tag
      className={`ds-molecule-row ${className}`.trim()}
      data-label-tone={labelTone}
      data-marker={hasMarker ? 'true' : 'false'}
      data-muted={muted ? 'true' : undefined}
      data-state={state}
      data-value={value ? 'true' : 'false'}
      data-value-tone={valueTone}
      {...props}
    >
      {hasMarker ? (
        <span className="ds-molecule-marker">
          {marker ?? (Icon ? <Icon /> : null)}
        </span>
      ) : null}
      <span className="ds-molecule-label">
        <span className="ds-molecule-title">{children}</span>
        {detail ? <span className="ds-molecule-detail">{detail}</span> : null}
      </span>
      {value ? <strong className="ds-molecule-value">{value}</strong> : null}
    </Tag>
  )
}

function statusRow({ children, done }: { children: ReactNode; done?: boolean }) {
  return row({
    as: 'li',
    children,
    marker: done ? <CheckCircle2 /> : <Circle />,
    state: done ? 'done' : 'pending',
  })
}

function factRow({
  icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: ReactNode
  value: ReactNode
}) {
  return row({ children: label, icon, value })
}

function sourceRow({
  children,
  icon,
  muted,
}: {
  children: ReactNode
  icon: LucideIcon
  muted?: boolean
}) {
  return row({ children, icon, muted })
}

export const molecule = {
  FactRow: factRow,
  Header: header,
  List: list,
  Root: root,
  Row: row,
  SourceRow: sourceRow,
  StatusRow: statusRow,
} as const
