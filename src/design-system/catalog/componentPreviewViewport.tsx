import type { HTMLAttributes, ReactNode } from 'react'
import type { PreviewMode } from './componentPreviewTypes'

export function PreviewViewport({
  children,
  className = '',
  mode,
  ...props
}: {
  children: ReactNode
  className?: string
  mode?: PreviewMode
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`preview-viewport ${className}`.trim()} data-mode={mode} {...props}>
      {children}
    </div>
  )
}
