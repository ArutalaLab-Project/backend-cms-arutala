import { t } from 'elysia'
import { createResponseSchema } from '../../../../utils/schemaHelper'
import { ParamsSeoModel, SeoModel } from './seo.model'

// 1. Data Structure for Documentation
const SeoDataSchema = t.Object({
  seo_id: t.String({ format: 'uuid', description: 'Unique ID of the SEO' }),
  meta_title: t.String({ description: 'Meta title for SEO' }),
  meta_description: t.String({ description: 'Meta description for SEO' }),
  is_active: t.Boolean({ description: 'Whether the SEO is active' }),
})

// 2. Response Schemas
export const GetAllSeoResponse = {
  description: 'Berhasil mengambil semua data SEO',
  content: {
    'application/json': {
      schema: createResponseSchema(t.Array(SeoDataSchema)),
    },
  },
}

export const GetSeoByIdResponse = {
  description: 'Berhasil mengambil detail SEO',
  content: {
    'application/json': {
      schema: createResponseSchema(SeoDataSchema),
    },
  },
}

export const CreatedSeoResponse = {
  description: 'Berhasil menambah SEO baru',
  content: {
    'application/json': {
      schema: createResponseSchema(t.Object({ seo_id: t.String() }), 'Created'),
    },
  },
}

const SimpleIdResponse = (msg: string) => ({
  description: msg,
  content: {
    'application/json': {
      schema: createResponseSchema(t.Object({ seo_id: t.String() }), msg),
    },
  },
})

// 3. Complete Route Documentation Objects
const PageTags = ['Pages'] // SEO belongs to Pages tags in original route

export const AddSeoDoc = {
  body: SeoModel,
  detail: {
    tags: PageTags,
    summary: '[SEO] Create a New SEO in Page',
    responses: {
      201: CreatedSeoResponse,
    },
  },
}

export const GetSeoByPageIdDoc = {
  detail: {
    tags: PageTags,
    summary: '[SEO] Get SEO by page id',
    responses: {
      200: GetAllSeoResponse,
    },
  },
}

export const GetSeoByIdDoc = {
  params: ParamsSeoModel,
  detail: {
    tags: PageTags,
    summary: '[SEO] Get SEO by id',
    responses: {
      200: GetSeoByIdResponse,
    },
  },
}

export const UpdateSeoDoc = {
  body: t.Partial(SeoModel),
  params: ParamsSeoModel,
  detail: {
    tags: PageTags,
    summary: '[SEO] Update SEO by id',
    responses: {
      200: SimpleIdResponse('Updated'),
    },
  },
}

export const ChangeSeoStatusDoc = {
  params: ParamsSeoModel,
  detail: {
    tags: PageTags,
    summary: '[SEO] Update SEO status (active or not active) by Id',
    responses: {
      200: SimpleIdResponse('Status Changed'),
    },
  },
}

export const DeleteSeoDoc = {
  params: ParamsSeoModel,
  detail: {
    tags: PageTags,
    summary: '[SEO] Delete SEO by Id',
    responses: {
      200: SimpleIdResponse('Deleted'),
    },
  },
}
