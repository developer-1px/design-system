import type { HTMLAttributes, ReactNode } from 'react'
import {
  CheckCircle2,
  Circle,
  type LucideIcon,
} from 'lucide-react'

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
  const hasValue = value !== undefined && value !== null

  return (
    <Tag
      className={`ds-molecule-row ${className}`.trim()}
      data-label-tone={labelTone}
      data-marker={hasMarker ? 'true' : 'false'}
      data-muted={muted ? 'true' : undefined}
      data-state={state}
      data-value={hasValue ? 'true' : 'false'}
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
      {hasValue ? <strong className="ds-molecule-value">{value}</strong> : null}
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

function itemRow({
  children,
  detail,
  icon,
  muted,
  value,
  valueTone = 'default',
}: {
  children: ReactNode
  detail?: ReactNode
  icon?: LucideIcon
  muted?: boolean
  value?: ReactNode
  valueTone?: RowProps['valueTone']
}) {
  return row({ children, detail, icon, muted, value, valueTone })
}

export const molecule = {
  ItemRow: itemRow,
  Row: row,
  StatusRow: statusRow,
} as const
