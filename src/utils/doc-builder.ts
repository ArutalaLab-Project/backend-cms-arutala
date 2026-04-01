import { t, TSchema } from 'elysia'
import { createResponseSchema, ErrorResponseSchema } from './schemaHelper'

export interface CrudDocConfig {
  resourceName: string
  tag: string
  dataSchema: TSchema
}

export const jsonContent = (schema: TSchema) => ({
  'application/json': {
    schema,
  },
})

export const successDoc = (
  dataSchema: TSchema,
  description: string,
  message?: string
) => ({
  description,
  content: jsonContent(
    createResponseSchema(dataSchema, message ?? description)
  ),
})

export const errorDoc = (description: string) => ({
  description,
  content: jsonContent(ErrorResponseSchema),
})

export const simpleSuccessDoc = (msg: string) => ({
  description: msg,
  content: jsonContent(createResponseSchema(t.Null(), msg)),
})

export const docs = (
  summary: string,
  tags: string[],
  responses: Record<number, any> = {}
) => ({
  detail: {
    summary,
    tags,
    responses,
  },
})

export const createCrudDocs = ({
  resourceName,
  tag,
  dataSchema,
}: CrudDocConfig) => {
  const tags = [tag]

  return {
    getAll: docs(`Get All ${resourceName}`, tags, {
      200: successDoc(
        t.Array(dataSchema),
        `Berhasil mengambil semua data ${resourceName}`
      ),
    }),

    getById: docs(`Get ${resourceName} by Id`, tags, {
      200: successDoc(dataSchema, `Berhasil mengambil detail ${resourceName}`),
      404: errorDoc(`${resourceName} tidak ditemukan`),
    }),

    create: docs(`Create ${resourceName}`, tags, {
      201: successDoc(dataSchema, `${resourceName} berhasil dibuat`, 'Created'),
      400: errorDoc('Validation Error'),
    }),

    update: docs(`Update ${resourceName}`, tags, {
      200: successDoc(
        dataSchema,
        `${resourceName} berhasil diperbarui`,
        'Updated'
      ),
      400: errorDoc('Validation Error'),
      404: errorDoc(`${resourceName} tidak ditemukan`),
    }),

    delete: docs(`Delete ${resourceName}`, tags, {
      200: successDoc(
        dataSchema,
        `${resourceName} berhasil dihapus`,
        'Deleted'
      ),
      404: errorDoc(`${resourceName} tidak ditemukan`),
    }),
  }
}
