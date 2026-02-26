import bearer from '@elysiajs/bearer'
import Elysia from 'elysia'
import { requireAuth } from '../../guards/auth.guard'
import { assertAuth } from '../../utils/assertAuth'
import { ContributorController } from './contributor.controller'
import {
  AddContributorDoc,
  DeleteContributorDoc,
  GetAllContributorDoc,
  GetContributorByIdDoc,
  UpdateContributorDoc,
} from './contributor.doc'

export const contributor = new Elysia().group('/contributors', (app) =>
  app
    .use(bearer())
    .post(
      '/',
      async ({ body, store, set }) => {
        const res = await ContributorController.addContributorController(
          body,
          assertAuth(store)
        )
        set.status = 201
        return res
      },
      {
        ...AddContributorDoc,
        beforeHandle: requireAuth('CREATE_CONTRIBUTOR'),
      }
    )

    .get(
      '/',
      async ({ query }) => {
        const res =
          await ContributorController.getAllContributorController(query)
        return res
      },
      GetAllContributorDoc
    )

    .get(
      '/:contributorId',
      async ({ params }) => {
        const res =
          await ContributorController.getContributorByIdController(params)
        return res
      },
      {
        ...GetContributorByIdDoc,
        beforeHandle: requireAuth('READ_CONTRIBUTOR'),
      }
    )

    .patch(
      '/:contributorId',
      async ({ body, store, params }) => {
        const res = await ContributorController.updateContributorController(
          params,
          body,
          assertAuth(store)
        )
        return res
      },
      {
        ...UpdateContributorDoc,
        beforeHandle: requireAuth('UPDATE_CONTRIBUTOR'),
      }
    )

    .delete(
      '/:contributorId',
      async ({ params }) => {
        const res =
          await ContributorController.deleteContributorController(params)
        return res
      },
      {
        ...DeleteContributorDoc,
        beforeHandle: requireAuth('DELETE_CONTRIBUTOR'),
      }
    )
)
