import bearer from '@elysiajs/bearer'
import Elysia from 'elysia'
import { requireAuth } from '../../guards/auth.guard'
import { AnalyticsController } from './analytics.controller'
import { GetOverviewDoc } from './analytics.doc'

export const analytics = new Elysia().group('/analytics', (app) =>
  app.use(bearer()).get(
    '/overview',
    () => {
      return AnalyticsController.getOverviewController()
    },
    {
      ...GetOverviewDoc,
      beforeHandle: requireAuth('READ_ANALYTICS'),
    }
  )
)
