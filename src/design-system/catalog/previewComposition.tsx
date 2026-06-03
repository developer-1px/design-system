import type { ReactNode } from 'react'
import { ContentAssembly, type AreaContentSpec } from '../primitives/primitives'
import { areaContent } from '../composition/assembly'
import { PreviewBox, PreviewScale, type PreviewBoxSize } from './componentPreview'
import type { PreviewMode } from './componentPreviewTypes'

export type ComponentPreview = {
  body: ReactNode
  mode: PreviewMode
}

export function controlPreview(
  body: ReactNode,
  size: PreviewBoxSize = 'default',
  className = '',
): ComponentPreview {
  return {
    body: (
      <PreviewBox className={className} size={size}>
        {body}
      </PreviewBox>
    ),
    mode: 'control',
  }
}

export function assemblyPreview(
  blocks: AreaContentSpec['blocks'],
  size: PreviewBoxSize = 'default',
  className = '',
): ComponentPreview {
  return controlPreview(
    <ContentAssembly content={areaContent({ blocks })} />,
    size,
    className,
  )
}

export function pagePreview(body: ReactNode): ComponentPreview {
  return {
    mode: 'page',
    body: <PreviewScale>{body}</PreviewScale>,
  }
}
