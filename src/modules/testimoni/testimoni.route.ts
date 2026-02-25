import bearer from '@elysiajs/bearer'
import Elysia from 'elysia'
import { assertAuth } from '../../utils/assertAuth'
import { TestimoniController } from './testimoni.controller'
import { requireAuth } from '../../guards/auth.guard'
import {
  AddTestimoniDoc,
  DeleteTestimoniDoc,
  GetAllTestimoniDoc,
  GetTestimoniByIdDoc,
  UpdateTestimoniDoc,
} from './testimoni.doc'

export const testimoni = new Elysia().group('/testimonies', (app) =>
  app
    .use(bearer())
    .post(
      '/',
      async ({ body, store, set }) => {
        const res = await TestimoniController.addTestimoniController(
          body,
          assertAuth(store)
        )
        set.status = 201
        return res
      },
      {
        ...AddTestimoniDoc,
        beforeHandle: requireAuth('CREATE_TESTIMONI'),
      }
    )
    .get(
      '/',
      async ({ query }) => {
        const res = await TestimoniController.getAllTestimoniController(query)
        return res
      },
      GetAllTestimoniDoc
    )

    .get(
      '/:testimoniId',
      async ({ params }) => {
        const res = await TestimoniController.getTestimoniByIdController(params)
        return res
      },
      {
        ...GetTestimoniByIdDoc,
        beforeHandle: requireAuth('READ_TESTIMONI'),
      }
    )

    .patch(
      '/:testimoniId',
      async ({ body, store, params }) => {
        const res = await TestimoniController.updateTestimoniController(
          body,
          params,
          assertAuth(store)
        )
        return res
      },
      {
        ...UpdateTestimoniDoc,
        beforeHandle: requireAuth('UPDATE_TESTIMONI'),
      }
    )
    .delete(
      '/:testimoniId',
      async ({ params }) => {
        const res = await TestimoniController.deleteTestimoniController(params)
        return res
      },
      {
        ...DeleteTestimoniDoc,
        beforeHandle: requireAuth('DELETE_TESTIMONI'),
      }
    )
)
