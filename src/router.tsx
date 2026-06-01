import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from '@tanstack/react-router'
import App from './App'
import { isPageId, pagePath } from './routes'

const rootRoute = createRootRoute({
  component: App,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    const legacyPage =
      typeof window === 'undefined'
        ? undefined
        : new URLSearchParams(window.location.search).get('page')

    throw redirect({
      replace: true,
      to: pagePath(isPageId(legacyPage) ? legacyPage : 'workstream'),
    })
  },
})

const pageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '$pageId',
  beforeLoad: ({ params }) => {
    if (!isPageId(params.pageId)) {
      throw redirect({ replace: true, to: pagePath('workstream') })
    }
  },
})

const routeTree = rootRoute.addChildren([indexRoute, pageRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
