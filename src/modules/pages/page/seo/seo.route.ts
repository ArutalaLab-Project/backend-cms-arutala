import bearer from '@elysiajs/bearer'
import Elysia from 'elysia'
import { SeoController } from './seo.controller'
import { requireAuth } from '../../../../guards/auth.guard'
import { assertAuth } from '../../../../utils/assertAuth'
import {
  AddSeoDoc,
  ChangeSeoStatusDoc,
  DeleteSeoDoc,
  GetSeoByIdDoc,
  GetSeoByPageIdDoc,
  UpdateSeoDoc,
} from './seo.doc'

export const seo = new Elysia({ prefix: '/:pageId/seo' })
  .use(bearer())
  .post(
    '/',
    async ({ body, params, store, set }) => {
      const res = await SeoController.addSeoController(
        body,
        params,
        assertAuth(store)
      )
      set.status = 201
      return res
    },
    {
      ...AddSeoDoc,
      beforeHandle: requireAuth('CREATE_SEO'),
    }
  )
  .get(
    '/',
    async ({ params }) => {
      const res = await SeoController.getSeoByPageIdController(params)
      return res
    },
    {
      ...GetSeoByPageIdDoc,
      // beforeHandle: requireAuth('READ_SEO'),
    }
  )
  .get(
    '/:seoId',
    async ({ params }) => {
      const res = await SeoController.getSeoByIdController(params)
      return res
    },
    {
      ...GetSeoByIdDoc,
      // beforeHandle: requireAuth('READ_SEO'),
    }
  )
  .patch(
    '/:seoId',
    async ({ body, params, store }) => {
      const res = await SeoController.updateSeoController(
        body,
        params,
        assertAuth(store)
      )
      return res
    },
    {
      ...UpdateSeoDoc,
      beforeHandle: requireAuth('UPDATE_SEO'),
    }
  )

  .put(
    '/:seoId',
    async ({ params, store }) => {
      const res = await SeoController.changeStatusSeoController(
        params,
        assertAuth(store)
      )
      return res
    },
    {
      ...ChangeSeoStatusDoc,
      beforeHandle: requireAuth('UPDATE_SEO'),
    }
  )

  .delete(
    '/:seoId',
    async ({ params }) => {
      const res = await SeoController.deleteSeoController(params)
      return res
    },
    {
      ...DeleteSeoDoc,
      beforeHandle: requireAuth('DELETE_SEO'),
    }
  )
