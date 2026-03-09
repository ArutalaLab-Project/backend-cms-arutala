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
  UpdatePageDoc,
} from './page.doc'
import { ParamsSlugPathModel } from './page.model'

export const page = new Elysia()

  .use(bearer())
  .get(
    '/public/seo-active/*',
    async ({ params }) => {
      return await PageController.getActiveSeoBySlugPathController(params['*'])
    },
    {
      params: ParamsSlugPathModel,
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
      // beforeHandle: requireAuth('READ_PAGE'),
    }
  )

  // .get(
  //   '/public/:pageSlug/seo-active',
  //   async ({ params }) => {
  //     const res = await PageController.getActiveSeoByPageSlugController(
  //       params.pageSlug
  //     )
  //     return res
  //   },
  //   {
  //     params: ParamsPageSlugModel,
  //   }
  // )

  .get(
    '/:pageId',
    async ({ params }) => {
      const res = await PageController.getPageByIdController(params)
      return res
    },
    {
      ...GetPageByIdDoc,
      // beforeHandle: requireAuth('READ_PAGE'),
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
