import { Elysia } from 'elysia'
import { MessageController } from './message.controller'
import { requireAuth } from '../../guards/auth.guard'
import { bearer } from '@elysiajs/bearer'
import { assertAuth } from '../../utils/assertAuth'
import {
  AddMessageDoc,
  DeleteMessageDoc,
  GetAllMessageDoc,
  GetMessageByIdDoc,
  UpdateMessageDoc,
} from './message.doc'

export const message = new Elysia().group('/messages', (app) =>
  app
    .post(
      '/',
      async ({ body, set }) => {
        const res = await MessageController.addMessageController(body)
        set.status = 201
        return res
      },
      AddMessageDoc
    )

    .use(bearer())
    .get(
      '/',
      async () => {
        const res = await MessageController.getAllMessageController()
        return res
      },
      {
        ...GetAllMessageDoc,
        beforeHandle: requireAuth('READ_MESSAGE'),
      }
    )

    .get(
      '/:messageId',
      async ({ params }) => {
        const res = await MessageController.getMessageByIdController(params)
        return res
      },
      {
        ...GetMessageByIdDoc,
        beforeHandle: requireAuth('READ_MESSAGE'),
      }
    )

    .put(
      '/:messageId',
      async ({ params, body, store }) => {
        const res = await MessageController.updateMessageController(
          body,
          params.messageId,
          assertAuth(store)
        )
        return res
      },
      {
        ...UpdateMessageDoc,
        beforeHandle: requireAuth('UPDATE_MESSAGE'),
      }
    )

    .delete(
      '/:messageId',
      async ({ params }) => {
        const res = await MessageController.deleteMessageController(
          params.messageId
        )
        return res
      },
      {
        ...DeleteMessageDoc,
        beforeHandle: requireAuth('DELETE_MESSAGE'),
      }
    )
)
