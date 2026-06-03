import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../design-system/foundation/tokens.css'
import '../design-system/primitives/primitives.css'
import '../design-system/molecules/molecules.css'
import '../design-system/composition/blueprints.css'
import './global.css'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
