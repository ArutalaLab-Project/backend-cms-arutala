import { Elysia } from 'elysia'
import { AuthController } from './auth.controller'
import { jwtPlugin } from '../../plugins/jwt/jwt.plugin'
import { assertAuth } from '../../utils/assertAuth'
import bearer from '@elysiajs/bearer'
import { requireAuth } from '../../guards/auth.guard'
import { GetMeDoc, RefreshDoc, SignInDoc, SignOutDoc } from './auth.doc'

export const auth = (app: Elysia) =>
  app.group('/auth', (app) =>
    app
      .use(jwtPlugin)
      .post(
        '/sign-in',
        async ({ body, accessToken, refreshToken }) => {
          const res = await AuthController.signInController(
            body,
            accessToken,
            refreshToken
          )
          return res
        },
        SignInDoc
      )

      .put(
        '/refresh',
        async ({ body, accessToken, refreshToken }) => {
          const res = AuthController.refreshController(
            body,
            accessToken,
            refreshToken
          )
          return res
        },
        RefreshDoc
      )
      .delete(
        '/sign-out',
        async ({ body }) => {
          const res = await AuthController.signOutController(body)
          return res
        },
        SignOutDoc
      )

      .use(bearer())
      .get(
        '/me',
        async ({ store }) => {
          const res = await AuthController.getUserAuthenticatedController(
            assertAuth(store)
          )
          return res
        },
        {
          ...GetMeDoc,
          beforeHandle: requireAuth('CHECK_AUTHENTICATED'),
        }
      )
  )
