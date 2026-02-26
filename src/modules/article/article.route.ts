import bearer from '@elysiajs/bearer'
import Elysia from 'elysia'
import { requireAuth } from '../../guards/auth.guard'
import { ArticleController } from './article.controller'
import { assertAuth } from '../../utils/assertAuth'
import {
  AddArticleDoc,
  AddCoverArticleDoc,
  DeleteArticleDoc,
  GetAllArticleDoc,
  GetArticleByIdDoc,
  UpdateArticleDoc,
  UpdateCoverArticleDoc,
  UploadContentImageDoc,
} from './article.doc'

// Main Article routes with external documentation
export const article = new Elysia().group('/article', (app) =>
  app
    .use(bearer())
    .post(
      '/',
      async ({ body, store, set }) => {
        const res = await ArticleController.addArticleController(
          body,
          assertAuth(store)
        )
        set.status = 201
        return res
      },
      {
        ...AddArticleDoc,
        beforeHandle: requireAuth('CREATE_ARTICLE'),
      }
    )
    .get(
      '/',
      async ({ query }) => {
        const res = await ArticleController.getAllArticleController(query)
        return res
      },
      GetAllArticleDoc
    )

    .get(
      '/:articleId',
      async ({ params }) => {
        const res = await ArticleController.getArticleByIdController(params)
        return res
      },
      GetArticleByIdDoc
    )
    .patch(
      '/:articleId',
      async ({ body, params, store }) => {
        const res = await ArticleController.updateArticleController(
          body,
          params,
          assertAuth(store)
        )
        return res
      },
      {
        ...UpdateArticleDoc,
        beforeHandle: requireAuth('UPDATE_ARTICLE'),
      }
    )

    .post(
      '/upload',
      async ({ body }) => {
        const res = await ArticleController.uploadContentImageController(body)
        return res
      },
      {
        ...UploadContentImageDoc,
        beforeHandle: requireAuth('CREATE_COURSE'),
      }
    )

    .delete(
      '/:articleId',
      async ({ params }) => {
        const res = await ArticleController.deleteArticleController(params)
        return res
      },
      {
        ...DeleteArticleDoc,
        beforeHandle: requireAuth('DELETE_ARTICLE'),
      }
    )

    .post(
      '/:articleId/cover',
      async ({ body, params }) => {
        const res = await ArticleController.addCoverArticleController(
          body,
          params
        )
        return res
      },
      {
        ...AddCoverArticleDoc,
        beforeHandle: requireAuth('CREATE_ARTICLE'),
      }
    )

    .patch(
      '/:articleId/cover',
      async ({ body, params, store }) => {
        const res = await ArticleController.updateCoverArticleController(
          body,
          params,
          assertAuth(store)
        )
        return res
      },
      {
        ...UpdateCoverArticleDoc,
        beforeHandle: requireAuth('UPDATE_ARTICLE'),
      }
    )
)
