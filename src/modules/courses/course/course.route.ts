import { bearer } from '@elysiajs/bearer'
import { Elysia } from 'elysia'
import { assertAuth } from '../../../utils/assertAuth'
import { requireAuth } from '../../../guards/auth.guard'
import { CourseController } from './course.controller'
import {
  AddCourseDoc,
  DeleteCourseDoc,
  GetAllCourseDoc,
  GetCourseByIdDoc,
  GetUpcomingCourseDoc,
  UpdateCourseDoc,
} from './course.doc'

export const course = new Elysia()
  .use(bearer())
  .post(
    '/',
    async ({ body, set, store }) => {
      const res = await CourseController.addCourseController(
        body,
        assertAuth(store)
      )
      set.status = 201
      return res
    },
    {
      ...AddCourseDoc,
      beforeHandle: requireAuth('CREATE_COURSE'),
    }
  )
  .get(
    '/',
    async ({ query }) => {
      const res = await CourseController.getAllCourseController(query)
      return res
    },
    GetAllCourseDoc
  )
  .get(
    '/upcoming-course',
    async () => {
      const res = await CourseController.getUpcomingCourseController()
      return res
    },
    GetUpcomingCourseDoc
  )
  .get(
    '/:courseId',
    async ({ params }) => {
      const res = await CourseController.getCourseByIdController(params)
      return res
    },
    GetCourseByIdDoc
  )

  .patch(
    '/:courseId',
    async ({ params, body, store }) => {
      const res = await CourseController.updateCourseController(
        body,
        params,
        assertAuth(store)
      )
      return res
    },
    {
      ...UpdateCourseDoc,
      beforeHandle: requireAuth('UPDATE_COURSE'),
    }
  )

  .delete(
    '/:courseId',
    async ({ params }) => {
      const res = await CourseController.deleteCourseController(params)
      return res
    },
    {
      ...DeleteCourseDoc,
      beforeHandle: requireAuth('DELETE_COURSE'),
    }
  )
