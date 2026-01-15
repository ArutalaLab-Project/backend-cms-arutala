import { Elysia } from 'elysia'
import { requireAuth } from '../../guards/auth.guard'
import { bearer } from '@elysiajs/bearer'
import { MentorCreateModel, MentorUploadModel } from './mentor.model'
import { MentorController } from './mentor.controller'
import { assertAuth } from '../../utils/assertAuth'

export const mentor = new Elysia().group('/mentors', (app) =>
  app
    .use(bearer())
    .post(
      '/upload',
      async ({ body }) => {
        const res = await MentorController.uploadProfileController(body.profile)
        return res
      },
      {
        beforeHandle: requireAuth(['ADMIN', 'SUPER_ADMIN']),
        body: MentorUploadModel,
      }
    )

    .post(
      '/',
      async ({ body, store, set }) => {
        const res = await MentorController.addMentorController(
          body,
          assertAuth(store)
        )
        set.status = 201
        return res
      },
      {
        beforeHandle: requireAuth(['ADMIN', 'SUPER_ADMIN']),
        body: MentorCreateModel,
      }
    )

    .get(
      '/',
      async () => {
        const res = await MentorController.getAllMentorController()
        return res
      },
      {
        beforeHandle: requireAuth(['ADMIN', 'SUPER_ADMIN']),
      }
    )

    .put(
      '/:mentorId',
      async ({ body, store, params }) => {
        const res = await MentorController.updateMentorController(
          params.mentorId,
          body,
          assertAuth(store)
        )
        return res
      },
      {
        beforeHandle: requireAuth(['ADMIN', 'SUPER_ADMIN']),
        body: MentorCreateModel,
      }
    )

    .delete(
      '/:mentorId',
      async ({ params }) => {
        const res = await MentorController.deleteMentorController(
          params.mentorId
        )
        return res
      },
      {
        beforeHandle: requireAuth(['ADMIN', 'SUPER_ADMIN']),
      }
    )
)
