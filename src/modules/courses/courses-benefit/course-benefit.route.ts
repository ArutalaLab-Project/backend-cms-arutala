import bearer from '@elysiajs/bearer'
import Elysia from 'elysia'
import { CourseBenefitController } from './course-benefit.controller'
import { requireAuth } from '../../../guards/auth.guard'
import { GetAllCourseBenefitDoc } from './course-benefit.doc'

export const courseBenefit = new Elysia({ prefix: '/courses-benefit' })
  .use(bearer())
  .get(
    '/',
    async () => {
      const res = await CourseBenefitController.getAllCourseBenefitController()
      return res
    },
    {
      beforeHandle: requireAuth('READ_COURSE'),
      ...GetAllCourseBenefitDoc,
    }
  )
