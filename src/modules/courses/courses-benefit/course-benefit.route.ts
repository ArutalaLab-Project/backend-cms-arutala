import bearer from '@elysiajs/bearer'
import Elysia from 'elysia'
import { CourseBenefitController } from './course-benefit.controller'
import { requireAuth } from '../../../guards/auth.guard'
import { CourseBenefitDocs } from './course-benefit.doc'
import {
  CourseBenefitParamsSchema,
  CourseBenefitRequestSchema,
} from './course-benefit.model'

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
      ...CourseBenefitDocs.getAll,
    }
  )

  .post(
    '/',
    async ({ body, set }) => {
      const res = await CourseBenefitController.addCourseBenefitController(body)
      set.status = 201
      return res
    },
    {
      ...CourseBenefitDocs.create,
      body: CourseBenefitRequestSchema,
      beforeHandle: requireAuth('CREATE_COURSE'),
    }
  )

  .put(
    '/:courseBenefitId',
    async ({ params, body }) => {
      const res = await CourseBenefitController.updateCourseBenefitController(
        body,
        params
      )
      return res
    },
    {
      ...CourseBenefitDocs.update,
      body: CourseBenefitRequestSchema,
      params: CourseBenefitParamsSchema,
      beforeHandle: requireAuth('UPDATE_COURSE'),
    }
  )

  .delete(
    '/:courseBenefitId',
    async ({ params }) => {
      const res =
        await CourseBenefitController.deleteCourseBenefitController(params)
      return res
    },
    {
      ...CourseBenefitDocs.delete,
      beforeHandle: requireAuth('DELETE_COURSE'),
      params: CourseBenefitParamsSchema,
    }
  )
