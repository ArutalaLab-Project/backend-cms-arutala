import bearer from '@elysiajs/bearer'
import Elysia from 'elysia'
import { assertAuth } from '../../../../utils/assertAuth'
import { CourseBatchController } from './course-batch.controller'
import { requireAuth } from '../../../../guards/auth.guard'
import {
  AddCourseBatchDoc,
  DeleteCourseBatchDoc,
  GetCourseBatchByIdDoc,
  UpdateCourseBatchDoc,
  UploadCourseBatchPosterDoc,
} from './course-batch.doc'

export const courseBatch = new Elysia({ prefix: '/:courseId/batch' })
  .use(bearer())
  .post(
    '/',
    async ({ body, store, set, params }) => {
      const res = await CourseBatchController.addCourseBatchController(
        body,
        params,
        assertAuth(store)
      )

      set.status = 201
      return res
    },
    {
      ...AddCourseBatchDoc,
      beforeHandle: requireAuth('CREATE_COURSE'),
    }
  )
  .post(
    '/:batchId/upload',
    async ({ body, params, store }) => {
      const res = await CourseBatchController.uploadCourseBatchPosterController(
        body,
        params,
        assertAuth(store)
      )
      return res
    },
    {
      ...UploadCourseBatchPosterDoc,
      beforeHandle: requireAuth('CREATE_COURSE'),
    }
  )

  .get(
    '/:batchId',
    async ({ params }) => {
      const res = await CourseBatchController.getCourseBatchByBatchId(params)
      return res
    },
    GetCourseBatchByIdDoc
  )

  .patch(
    '/:batchId',
    async ({ body, params, store }) => {
      const res = await CourseBatchController.updateCourseBatchController(
        body,
        params,
        assertAuth(store)
      )
      return res
    },
    {
      ...UpdateCourseBatchDoc,
      beforeHandle: requireAuth('UPDATE_COURSE'),
    }
  )

  .delete(
    '/:batchId',
    async ({ params }) => {
      const res =
        await CourseBatchController.deleteCourseBatchController(params)
      return res
    },
    {
      ...DeleteCourseBatchDoc,
      beforeHandle: requireAuth('DELETE_COURSE'),
    }
  )
