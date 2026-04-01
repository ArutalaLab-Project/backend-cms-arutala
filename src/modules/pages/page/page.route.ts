import bearer from '@elysiajs/bearer'
import Elysia from 'elysia'
import { PageController } from './page.controller'
import { assertAuth } from '../../../utils/assertAuth'
import { requireAuth } from '../../../guards/auth.guard'
import {
  AddPageDoc,
  DeletePageDoc,
  GetAllPageDoc,
  GetPageByIdDoc,
  getPageWithSeoActive,
  UpdatePageDoc,
} from './page.doc'

export const page = new Elysia()

  .use(bearer())
  .get(
    '/public/seo-active/*',
    async ({ params }) => {
      return await PageController.getActiveSeoBySlugPathController(params['*'])
    },
    {
      ...getPageWithSeoActive,
    }
  )
  .post(
    '/',
    async ({ body, store, set }) => {
      const res = await PageController.addPageController(
        body,
        assertAuth(store)
      )
      set.status = 201
      return res
    },
    {
      ...AddPageDoc,
      beforeHandle: requireAuth('CREATE_PAGE'),
    }
  )
  .get(
    '/',
    async () => {
      const res = await PageController.getAllController()
      return res
    },
    {
      ...GetAllPageDoc,
    }
  )

  .get(
    '/:pageId',
    async ({ params }) => {
      const res = await PageController.getPageByIdController(params)
      return res
    },
    {
      ...GetPageByIdDoc,
    }
  )

  .put(
    '/:pageId',
    async ({ body, params, store }) => {
      const res = await PageController.updatePageController(
        body,
        params,
        assertAuth(store)
      )
      return res
    },
    {
      ...UpdatePageDoc,
      beforeHandle: requireAuth('UPDATE_PAGE'),
    }
  )

  .delete(
    '/:pageId',
    async ({ params }) => {
      const res = await PageController.deletePageController(params)
      return res
    },
    {
      ...DeletePageDoc,
      beforeHandle: requireAuth('DELETE_PAGE'),
    }
  )
