import type { ReactNode } from 'react'
import type { BadgeTone } from '../primitives/primitives'

const stateToneMap: Record<string, BadgeTone> = {
  active: 'positive',
  blocked: 'danger',
  booked: 'positive',
  checks: 'positive',
  conflict: 'danger',
  danger: 'danger',
  done: 'positive',
  draft: 'warning',
  error: 'danger',
  expansion: 'info',
  failed: 'danger',
  flat: 'info',
  inactive: 'danger',
  info: 'info',
  main: 'positive',
  negotiation: 'warning',
  open: 'info',
  packed: 'positive',
  paid: 'positive',
  pending: 'warning',
  pinned: 'info',
  proposal: 'info',
  queued: 'warning',
  ready: 'positive',
  review: 'warning',
  rising: 'positive',
  stable: 'positive',
  steady: 'info',
  triage: 'warning',
  verified: 'positive',
  watch: 'warning',
}

export function stateToneFor(value: ReactNode): BadgeTone | undefined {
  if (typeof value !== 'string') return undefined

  return stateToneMap[value.toLowerCase()]
}
