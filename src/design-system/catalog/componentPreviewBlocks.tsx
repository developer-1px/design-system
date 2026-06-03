import type { HTMLAttributes, ReactNode } from 'react'
import type { AreaContentSpec } from '../primitives/primitives'
import { surfaceBlock } from '../composition/assembly'
import type { PreviewMode } from './componentPreviewTypes'
import { PreviewViewport } from './componentPreviewViewport'

type PreviewBlock = AreaContentSpec['blocks'][number]

type PreviewTileBlockSpec = {
  children: ReactNode
  className?: string
  detail?: ReactNode
  mode?: PreviewMode
  title: ReactNode
} & HTMLAttributes<HTMLDivElement>

type PreviewStageBlockSpec = {
  children: ReactNode
  className?: string
  mode?: PreviewMode
  title: ReactNode
} & HTMLAttributes<HTMLDivElement>

export function previewTileBlock({
  children,
  className = '',
  detail,
  mode,
  title,
  ...props
}: PreviewTileBlockSpec): PreviewBlock {
  return surfaceBlock({
    children: <PreviewViewport mode={mode}>{children}</PreviewViewport>,
    className: `preview-tile ${className}`.trim(),
    detail,
    title,
    ...props,
  })
}

export function previewStageBlock({
  children,
  className = '',
  mode,
  title,
  ...props
}: PreviewStageBlockSpec): PreviewBlock {
  const stageMode = mode ?? 'control'

  return surfaceBlock({
    children: (
      <PreviewViewport className="preview-stage-canvas" mode={mode}>
        {children}
      </PreviewViewport>
    ),
    className: `preview-stage preview-stage-${stageMode} ${className}`.trim(),
    title,
    ...props,
  })
}
