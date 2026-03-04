import { bearer } from '@elysiajs/bearer'
import { Elysia } from 'elysia'
import { CourseFieldController } from './courses-field.controller'
import {
  CourseFieldParamsSchema,
  CourseFieldRequestSchema,
} from './courses-field.model'
import { requireAuth } from '../../../guards/auth.guard'
import { CourseFieldDocs } from './courses-field.doc'

export const courseField = new Elysia({ prefix: '/courses-field' })
  .use(bearer())
  .get(
    '/',
    async () => {
      const res = await CourseFieldController.getAllCourseFieldController()
      return res
    },
    {
      ...CourseFieldDocs.getAll,
    }
  )

  .post(
    '/',
    async ({ body, set }) => {
      const res = await CourseFieldController.addCourseFieldController(body)
      set.status = 201
      return res
    },
    {
      ...CourseFieldDocs.create,
      body: CourseFieldRequestSchema,
      beforeHandle: requireAuth('CREATE_COURSE'),
    }
  )

  .put(
    '/:courseFieldId',
    async ({ params, body }) => {
      const res = await CourseFieldController.updateCourseFieldController(
        body,
        params
      )
      return res
    },
    {
      ...CourseFieldDocs.update,
      body: CourseFieldRequestSchema,
      params: CourseFieldParamsSchema,
      beforeHandle: requireAuth('UPDATE_COURSE'),
    }
  )

  .delete(
    '/:courseFieldId',
    async ({ params }) => {
      const res =
        await CourseFieldController.deleteCourseFieldController(params)
      return res
    },
    {
      ...CourseFieldDocs.delete,
      beforeHandle: requireAuth('DELETE_COURSE'),
      params: CourseFieldParamsSchema,
    }
  )
