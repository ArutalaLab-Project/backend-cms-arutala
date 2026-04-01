import { t } from 'elysia'
import { docs, successDoc, simpleSuccessDoc } from '../../../utils/doc-builder'
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
export const GetAllPageResponse = successDoc(
  t.Array(PageDataSchema),
  'Berhasil mengambil semua data pages'
)

export const GetPageByIdResponse = successDoc(
  t.Object({
    page_id: t.String({ format: 'uuid' }),
    page_title: t.String(),
    page_slug: t.String(),
  }),
  'Berhasil mengambil detail page'
)

export const getPageWithSeoActiveResponse = successDoc(
  t.Object({}),
  'Berhasil mengambil Seo active pada page ini'
)

export const CreatedPageResponse = successDoc(
  t.Object({ page_id: t.String() }),
  'Berhasil menambah pages baru',
  'Created'
)

// 3. Complete Route Documentation Objects
const PageTags = ['Pages - Master']

export const getPageWithSeoActive = {
  params: ParamsSlugPathModel,
  ...docs('Get Page With Seo Active', PageTags, {
    200: getPageWithSeoActiveResponse,
  }),
}

export const AddPageDoc = {
  body: PageModel,
  ...docs('Create a New Pages', PageTags, {
    201: CreatedPageResponse,
  }),
}

export const GetAllPageDoc = {
  ...docs('Get All Pages', PageTags, {
    200: GetAllPageResponse,
  }),
}

export const GetPageByIdDoc = {
  params: ParamsPageModel,
  ...docs('Get Page by Id', PageTags, {
    200: GetPageByIdResponse,
  }),
}

export const UpdatePageDoc = {
  body: PageModel,
  params: ParamsPageModel,
  ...docs('Update Page by Id', PageTags, {
    200: GetPageByIdResponse,
  }),
}

export const DeletePageDoc = {
  params: ParamsPageModel,
  ...docs('Delete Page by Id', PageTags, {
    200: simpleSuccessDoc('Deleted'),
  }),
}
