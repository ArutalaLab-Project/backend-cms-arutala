import { t } from 'elysia'
import { docs, successDoc } from '../../../../utils/doc-builder'
import { ParamsSeoModel, SeoModel } from './seo.model'

// 1. Data Structure for Documentation
const SeoDataSchema = t.Object({
  seo_id: t.String({ format: 'uuid', description: 'Unique ID of the SEO' }),
  meta_title: t.String({ description: 'Meta title for SEO' }),
  meta_description: t.String({ description: 'Meta description for SEO' }),
  is_active: t.Boolean({ description: 'Whether the SEO is active' }),
})

// 2. Response Schemas
export const GetAllSeoResponse = successDoc(
  t.Array(SeoDataSchema),
  'Berhasil mengambil semua data SEO'
)

export const GetSeoByIdResponse = successDoc(
  SeoDataSchema,
  'Berhasil mengambil detail SEO'
)

export const CreatedSeoResponse = successDoc(
  t.Object({ seo_id: t.String() }),
  'Berhasil menambah SEO baru',
  'Created'
)

const SimpleIdResponse = (msg: string) =>
  successDoc(t.Object({ seo_id: t.String() }), msg)

// 3. Complete Route Documentation Objects
const PageTags = ['Pages - SEO']

export const AddSeoDoc = {
  body: SeoModel,
  ...docs('[SEO] Create a New SEO in Page', PageTags, {
    201: CreatedSeoResponse,
  }),
}

export const GetSeoByPageIdDoc = {
  ...docs('[SEO] Get SEO by page id', PageTags, {
    200: GetAllSeoResponse,
  }),
}

export const GetSeoByIdDoc = {
  params: ParamsSeoModel,
  ...docs('[SEO] Get SEO by id', PageTags, {
    200: GetSeoByIdResponse,
  }),
}

export const UpdateSeoDoc = {
  body: t.Partial(SeoModel),
  params: ParamsSeoModel,
  ...docs('[SEO] Update SEO by id', PageTags, {
    200: SimpleIdResponse('Updated'),
  }),
}

export const ChangeSeoStatusDoc = {
  params: ParamsSeoModel,
  ...docs('[SEO] Update SEO status (active or not active) by Id', PageTags, {
    200: SimpleIdResponse('Status Changed'),
  }),
}

export const DeleteSeoDoc = {
  params: ParamsSeoModel,
  ...docs('[SEO] Delete SEO by Id', PageTags, {
    200: SimpleIdResponse('Deleted'),
  }),
}
