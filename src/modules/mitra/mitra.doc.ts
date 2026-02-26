import { t } from 'elysia'
import { createResponseSchema } from '../../utils/schemaHelper'
import { MitraModel, ParamsMitraModel, QueryMitraModel } from './mitra.model'

// 1. Data Structure for Documentation
const MitraDataSchema = t.Object({
  mitra_id: t.String({ format: 'uuid', description: 'Unique ID of the mitra' }),
  mitra_name: t.String({ description: 'Name of the mitra' }),
  business_field: t.String({ description: 'Business field of the mitra' }),
  mitra_logo_url: t.String({ description: 'URL of the mitra logo' }),
  is_displayed: t.Boolean({
    description: 'Whether the mitra is displayed on the landing page',
  }),
})

// 2. Response Schemas
export const GetAllMitraResponse = {
  description: 'Berhasil mengambil semua data mitra',
  content: {
    'application/json': {
      schema: createResponseSchema(t.Array(MitraDataSchema)),
    },
  },
}

export const GetMitraByIdResponse = {
  description: 'Berhasil mengambil detail mitra',
  content: {
    'application/json': {
      schema: createResponseSchema(MitraDataSchema),
    },
  },
}

export const CreatedMitraResponse = {
  description: 'Berhasil menambah mitra baru',
  content: {
    'application/json': {
      schema: createResponseSchema(
        t.Object({ mitra_id: t.String() }),
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
const MitraTags = ['Mitra']

export const AddMitraDoc = {
  body: MitraModel,
  detail: {
    tags: MitraTags,
    summary: 'Create a New Mitra',
    responses: {
      201: CreatedMitraResponse,
    },
  },
}

export const GetAllMitraDoc = {
  query: QueryMitraModel,
  detail: {
    tags: MitraTags,
    summary: 'Get All Mitra',
    responses: {
      200: GetAllMitraResponse,
    },
  },
}

export const GetMitraByIdDoc = {
  params: ParamsMitraModel,
  detail: {
    tags: MitraTags,
    summary: 'Get Mitra by Id',
    responses: {
      200: GetMitraByIdResponse,
    },
  },
}

export const UpdateMitraDoc = {
  body: t.Partial(MitraModel),
  params: ParamsMitraModel,
  detail: {
    tags: MitraTags,
    summary: 'Update Mitra by Id',
    responses: {
      200: SimpleSuccessResponse('Updated'),
    },
  },
}

export const DeleteMitraDoc = {
  params: ParamsMitraModel,
  detail: {
    tags: MitraTags,
    summary: 'Delete Mitra by Id',
    responses: {
      200: SimpleSuccessResponse('Deleted'),
    },
  },
}
