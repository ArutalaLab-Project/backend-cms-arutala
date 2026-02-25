import bearer from '@elysiajs/bearer'
import Elysia from 'elysia'
import { MitraController } from './mitra.controller'
import { requireAuth } from '../../guards/auth.guard'
import { assertAuth } from '../../utils/assertAuth'
import {
  AddMitraDoc,
  DeleteMitraDoc,
  GetAllMitraDoc,
  GetMitraByIdDoc,
  UpdateMitraDoc,
} from './mitra.doc'

export const mitra = new Elysia().group('/mitras', (app) =>
  app
    .use(bearer())
    .post(
      '/',
      async ({ body, store, set }) => {
        const res = await MitraController.addMitraController(
          body,
          assertAuth(store)
        )
        set.status = 201
        return res
      },
      {
        ...AddMitraDoc,
        beforeHandle: requireAuth('CREATE_MITRA'),
      }
    )
    .get(
      '/',
      async ({ query }) => {
        const res = await MitraController.getAllMitraController(query)
        return res
      },
      GetAllMitraDoc
    )

    .get(
      '/:mitraId',
      async ({ params }) => {
        const res = await MitraController.getMitraByIdController(params)
        return res
      },
      {
        ...GetMitraByIdDoc,
        beforeHandle: requireAuth('READ_MITRA'),
      }
    )
    .patch(
      '/:mitraId',
      async ({ body, store, params }) => {
        const res = await MitraController.updateMitraController(
          params,
          body,
          assertAuth(store)
        )
        return res
      },
      {
        ...UpdateMitraDoc,
        beforeHandle: requireAuth('UPDATE_MITRA'),
      }
    )
    .delete(
      '/:mitraId',
      async ({ params }) => {
        const res = await MitraController.deleteMitraController(params.mitraId)
        return res
      },
      {
        ...DeleteMitraDoc,
        beforeHandle: requireAuth('DELETE_MITRA'),
      }
    )
)
