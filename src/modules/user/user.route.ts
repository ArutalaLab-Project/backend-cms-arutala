import { bearer } from '@elysiajs/bearer'
import { Elysia } from 'elysia'
import { requireAuth } from '../../guards/auth.guard'
import { assertAuth } from '../../utils/assertAuth'
import { UserController } from './user.controller'
import {
  AddUserDoc,
  DeleteUserDoc,
  GetAllUserDoc,
  GetUserByIdDoc,
} from './user.doc'

export const user = new Elysia().group('/users', (app) =>
  app
    .use(bearer())
    .post(
      '/',
      async ({ body, store, set }) => {
        const res = await UserController.addUserController(
          body,
          assertAuth(store)
        )
        set.status = 201
        return res
      },
      {
        ...AddUserDoc,
        beforeHandle: requireAuth('CREATE_USER'),
      }
    )

    .get(
      '/',
      async () => {
        const res = await UserController.getAllUserController()
        return res
      },
      {
        ...GetAllUserDoc,
        beforeHandle: requireAuth('READ_USER'),
      }
    )

    .get(
      '/:userId',
      async ({ params }) => {
        const res = await UserController.getUserByIdController(params)
        return res
      },
      {
        ...GetUserByIdDoc,
        beforeHandle: requireAuth('READ_USER'),
      }
    )

    .delete(
      '/:userId',
      async ({ params }) => {
        const res = await UserController.deleteUserController(params)
        return res
      },
      {
        ...DeleteUserDoc,
        beforeHandle: requireAuth('DELETE_USER'),
      }
    )
)
