import type {
  ButtonHTMLAttributes,
  FieldsetHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  MeterHTMLAttributes,
  ReactNode,
} from 'react'
import {
  FileText,
  type LucideIcon,
} from 'lucide-react'
import { molecule } from './molecules'

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

export function Panel({
  children,
  className = '',
  ...props
}: {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLElement>) {
  return (
    <section className={`ds-panel ${className}`.trim()} {...props}>
      {children}
    </section>
  )
}

export function Card({
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
      className={`ds-card ${className}`.trim()}
      data-floating={floating ? 'true' : undefined}
      data-pad={pad ? 'true' : undefined}
      {...props}
    >
      {children}
    </Tag>
  )
}

export function CardTitle({ children }: { children: ReactNode }) {
  return <strong className="ds-card-title">{children}</strong>
}

export function CardBody({
  children,
  className = '',
  ...props
}: {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`ds-card-body ${className}`.trim()} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({
  children,
  className = '',
  ...props
}: {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <footer className={`ds-card-footer ${className}`.trim()} {...props}>
      {children}
    </footer>
  )
}

export function PageStack({ children }: { children: ReactNode }) {
  return <div className="ds-page-stack">{children}</div>
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

export function CardHeader({
  actions,
  detail,
  icon,
  title,
}: {
  actions?: ReactNode
  detail?: ReactNode
  icon?: ReactNode
  title: ReactNode
}) {
  return (
    <header className="ds-card-header">
      {icon ? <span className="ds-icon-slot">{icon}</span> : null}
      <div className="ds-card-heading">
        <strong>{title}</strong>
        {detail ? <p>{detail}</p> : null}
      </div>
      {actions ? <Cluster>{actions}</Cluster> : null}
    </header>
  )
}

export function ListCard({
  actions,
  children,
  className = '',
  detail,
  icon,
  ordered,
  title,
  ...props
}: Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
  actions?: ReactNode
  children: ReactNode
  className?: string
  detail?: ReactNode
  icon?: ReactNode
  ordered?: boolean
  title: ReactNode
}) {
  return (
    <Card className={className} pad {...props}>
      <CardHeader actions={actions} detail={detail} icon={icon} title={title} />
      <RowStack as={ordered ? 'ol' : 'div'}>{children}</RowStack>
    </Card>
  )
}

export function Grid({
  children,
  className = '',
  columns = 2,
  ...props
}: {
  children: ReactNode
  className?: string
  columns?: 2 | 3
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`ds-grid ${className}`.trim()} data-columns={columns} {...props}>
      {children}
    </div>
  )
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
      {trailing ? <span className="ds-control-row-trailing">{trailing}</span> : null}
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
  return <input className={`ds-input ${className}`.trim()} type={type} {...props} />
}

export function RangeInput({
  className = '',
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>) {
  return <input className={`ds-range ${className}`.trim()} type="range" {...props} />
}

export function CheckboxInput({
  className = '',
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>) {
  return (
    <input className={`ds-checkbox-input ${className}`.trim()} type="checkbox" {...props} />
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
  return <span aria-hidden="true" className="ds-swatch" style={{ background: value }} />
}

export function SkeletonLine({ width = '100%' }: { width?: string }) {
  return <span aria-hidden="true" className="ds-skeleton-line" style={{ width }} />
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
    <code className="ds-code-line" data-marker={marker ? 'true' : 'false'} data-tone={tone}>
      {marker ? <span>{marker}</span> : null}
      {children}
    </code>
  )
}

export function InlineCode({ children }: { children: ReactNode }) {
  return <code className="ds-code">{children}</code>
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

export function Badge({
  children,
  tone,
}: {
  children: ReactNode
  tone?: 'positive' | 'danger' | 'warning' | 'info'
}) {
  return (
    <span className="ds-badge" data-tone={tone}>
      {children}
    </span>
  )
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string
  title: string
  description?: string
  actions?: ReactNode
}) {
  return (
    <header className="ds-section-header">
      <div>
        {eyebrow ? <p className="ds-label">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {description ? <p>{description}</p> : null}
      </div>
      {actions ? <div className="ds-section-actions">{actions}</div> : null}
    </header>
  )
}

export function ActionDock({
  items,
  label = 'Actions',
}: {
  items: Array<{
    icon: LucideIcon
    label: string
    detail?: string
    disabled?: boolean
  }>
  label?: string
}) {
  return (
    <div aria-label={label} className="ds-action-dock" role="toolbar">
      {items.map(({ icon: Icon, label: itemLabel, detail, disabled }) => (
        <button
          className="ds-action-tile ds-control"
          disabled={disabled}
          key={itemLabel}
          type="button"
        >
          <Icon />
          <strong>{itemLabel}</strong>
          {detail ? <span>{detail}</span> : null}
        </button>
      ))}
    </div>
  )
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

export function MetricCard({
  label,
  value,
  detail,
}: {
  label: string
  value: ReactNode
  detail?: string
}) {
  return (
    <div className="ds-metric-card">
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
  description: string
}) {
  return (
    <div className="ds-empty-state">
      <span>{icon}</span>
      <strong>{title}</strong>
      <p>{description}</p>
    </div>
  )
}

export function FileRow({
  path,
  delta,
}: {
  path: string
  delta: string
}) {
  return (
    <molecule.Row
      className="ds-file-row"
      icon={FileText}
      labelTone="code"
      value={delta}
      valueTone="positive"
    >
      {path}
    </molecule.Row>
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

export function FactRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: ReactNode
}) {
  return <molecule.FactRow icon={Icon} label={label} value={value} />
}

export function SourceRow({
  icon: Icon,
  children,
  muted,
}: {
  icon: LucideIcon
  children: ReactNode
  muted?: boolean
}) {
  return (
    <molecule.SourceRow icon={Icon} muted={muted}>
      {children}
    </molecule.SourceRow>
  )
}
