import type { HTMLAttributes, ReactNode } from 'react'
import { ContentAssembly } from '../primitives/primitives'
import { contentStack } from '../composition/assembly'
import { previewStageBlock, previewTileBlock } from './componentPreviewBlocks'
import type { PreviewMode } from './componentPreviewTypes'
export { PreviewViewport } from './componentPreviewViewport'
export type { PreviewMode } from './componentPreviewTypes'
import './componentPreview.css'

export type PreviewBoxSize =
  | 'default'
  | 'surface'
  | 'tile'
  | 'metrics'
  | 'wide'
  | 'narrow'

export function PreviewTile({
  children,
  className = '',
  detail,
  mode,
  title,
  ...props
}: {
  children: ReactNode
  className?: string
  detail?: ReactNode
  mode?: PreviewMode
  title: ReactNode
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <ContentAssembly
      content={contentStack(
        previewTileBlock({
          children,
          className,
          detail,
          mode,
          title,
          ...props,
        }),
      )}
    />
  )
}

export function PreviewStage({
  children,
  className = '',
  mode,
  title,
  ...props
}: {
  children: ReactNode
  className?: string
  mode?: PreviewMode
  title: ReactNode
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <ContentAssembly
      content={contentStack(
        previewStageBlock({
          children,
          className,
          mode,
          title,
          ...props,
        }),
      )}
    />
  )
}

export function PreviewBox({
  children,
  className = '',
  size = 'default',
  ...props
}: {
  children: ReactNode
  className?: string
  size?: PreviewBoxSize
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`preview-box ${className}`.trim()} data-size={size} {...props}>
      {children}
    </div>
  )
}

export function PreviewScale({
  children,
  className = '',
  ...props
}: {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`preview-scale ${className}`.trim()} {...props}>
      {children}
    </div>
  )
}
