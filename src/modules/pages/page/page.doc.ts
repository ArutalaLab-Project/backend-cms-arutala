import { t } from 'elysia'
import { createResponseSchema } from '../../../utils/schemaHelper'
import { PageModel, ParamsPageModel, ParamsSlugPathModel } from './page.model'

// 1. Data Structure for Documentation
const PageDataSchema = t.Object({
  page_id: t.String({ format: 'uuid', description: 'Unique ID of the page' }),
  page_title: t.String({ description: 'Title of the page' }),
  page_slug: t.String({ description: 'Slug of the page' }),
  parent_page_title: t.Optional(
    t.String({ description: 'Title of the parent page' })
  ),
})

// 2. Response Schemas
export const GetAllPageResponse = {
  description: 'Berhasil mengambil semua data pages',
  content: {
    'application/json': {
      schema: createResponseSchema(t.Array(PageDataSchema)),
    },
  },
}

export const GetPageByIdResponse = {
  description: 'Berhasil mengambil detail page',
  content: {
    'application/json': {
      schema: createResponseSchema(
        t.Object({
          page_id: t.String({ format: 'uuid' }),
          page_title: t.String(),
          page_slug: t.String(),
        })
      ),
    },
  },
}

export const getPageWithSeoActiveResponse = {
  description: 'Berhasil mengambil Seo active pada page ini',
  content: { 'application/json': {} },
}

export const CreatedPageResponse = {
  description: 'Berhasil menambah pages baru',
  content: {
    'application/json': {
      schema: createResponseSchema(
        t.Object({ page_id: t.String() }),
        'Created'
      ),
    },
  },
}

const SimpleSuccessResponse = (msg: string) => ({
  description: msg,
  content: {
    'application/json': {
      schema: createResponseSchema(t.Null(), msg),
    },
  },
})

// 3. Complete Route Documentation Objects
const PageTags = ['Pages']

export const getPageWithSeoActive = {
  params: ParamsSlugPathModel,
  detail: {
    tags: PageTags,
    summary: 'Get Page With Seo Active',
    responses: {
      200: getPageWithSeoActiveResponse,
    },
  },
}

export const AddPageDoc = {
  body: PageModel,
  detail: {
    tags: PageTags,
    summary: 'Create a New Pages',
    responses: {
      201: CreatedPageResponse,
    },
  },
}

export const GetAllPageDoc = {
  detail: {
    tags: PageTags,
    summary: 'Get All Pages',
    responses: {
      200: GetAllPageResponse,
    },
  },
}

export const GetPageByIdDoc = {
  params: ParamsPageModel,
  detail: {
    tags: PageTags,
    summary: 'Get Page by Id',
    responses: {
      200: GetPageByIdResponse,
    },
  },
}

export const UpdatePageDoc = {
  body: PageModel,
  params: ParamsPageModel,
  detail: {
    tags: PageTags,
    summary: 'Update Page by Id',
    responses: {
      200: GetPageByIdResponse,
    },
  },
}

export const DeletePageDoc = {
  params: ParamsPageModel,
  detail: {
    tags: PageTags,
    summary: 'Delete Page by Id',
    responses: {
      200: SimpleSuccessResponse('Deleted'),
    },
  },
}
