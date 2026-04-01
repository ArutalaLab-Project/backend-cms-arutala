import { t } from 'elysia'
import { docs, successDoc, simpleSuccessDoc } from '../../utils/doc-builder'
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
export const GetAllMitraResponse = successDoc(
  t.Array(MitraDataSchema),
  'Berhasil mengambil semua data mitra'
)

export const GetMitraByIdResponse = successDoc(
  MitraDataSchema,
  'Berhasil mengambil detail mitra'
)

export const CreatedMitraResponse = successDoc(
  t.Object({ mitra_id: t.String() }),
  'Berhasil menambah mitra baru',
  'Created'
)

// 3. Complete Route Documentation Objects
const MitraTags = ['Mitra']

export const AddMitraDoc = {
  body: MitraModel,
  ...docs('Create a New Mitra', MitraTags, {
    201: CreatedMitraResponse,
  }),
}

export const GetAllMitraDoc = {
  query: QueryMitraModel,
  ...docs('Get All Mitra', MitraTags, {
    200: GetAllMitraResponse,
  }),
}

export const GetMitraByIdDoc = {
  params: ParamsMitraModel,
  ...docs('Get Mitra by Id', MitraTags, {
    200: GetMitraByIdResponse,
  }),
}

export const UpdateMitraDoc = {
  body: t.Partial(MitraModel),
  params: ParamsMitraModel,
  ...docs('Update Mitra by Id', MitraTags, {
    200: simpleSuccessDoc('Updated'),
  }),
}

export const DeleteMitraDoc = {
  params: ParamsMitraModel,
  ...docs('Delete Mitra by Id', MitraTags, {
    200: simpleSuccessDoc('Deleted'),
  }),
}
