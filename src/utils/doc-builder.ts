import { t, TSchema } from 'elysia'
import { createResponseSchema, ErrorResponseSchema } from './schemaHelper'

interface CrudDocConfig {
  resourceName: string
  tag: string
  dataSchema: TSchema
  bodySchema?: TSchema
  paramSchema?: TSchema
}

const jsonContent = (schema: TSchema) => ({
  'application/json': {
    schema,
  },
})

const successDoc = (
  dataSchema: TSchema,
  description: string,
  message?: string
) => ({
  description,
  content: jsonContent(
    createResponseSchema(dataSchema, message ?? description)
  ),
})

const errorDoc = (description: string) => ({
  description,
  content: jsonContent(ErrorResponseSchema),
})

export const createCrudDocs = ({
  resourceName,
  tag,
  dataSchema,
  bodySchema,
  paramSchema,
}: CrudDocConfig) => {
  const tags = [tag]

  return {
    getAll: {
      detail: {
        tags,
        summary: `Get All ${resourceName}`,
        responses: {
          200: successDoc(
            t.Array(dataSchema),
            `Berhasil mengambil semua data ${resourceName}`
          ),
          // 401: errorDoc('Unauthorized'),
        },
      },
    },

    getById: {
      params: paramSchema,
      detail: {
        tags,
        summary: `Get ${resourceName} by Id`,
        responses: {
          200: successDoc(
            dataSchema,
            `Berhasil mengambil detail ${resourceName}`
          ),
          404: errorDoc(`${resourceName} tidak ditemukan`),
          // 401: errorDoc('Unauthorized'),
        },
      },
    },

    create: {
      body: bodySchema,
      detail: {
        tags,
        summary: `Create ${resourceName}`,
        responses: {
          201: successDoc(
            dataSchema,
            `${resourceName} berhasil dibuat`,
            'Created'
          ),
          // 400: errorDoc('Validation Error'),
          // 401: errorDoc('Unauthorized'),
        },
      },
    },

    update: {
      body: bodySchema,
      params: paramSchema,
      detail: {
        tags,
        summary: `Update ${resourceName}`,
        responses: {
          200: successDoc(
            dataSchema,
            `${resourceName} berhasil diperbarui`,
            'Updated'
          ),
          // 400: errorDoc('Validation Error'),
          404: errorDoc(`${resourceName} tidak ditemukan`),
          // 401: errorDoc('Unauthorized'),
        },
      },
    },

    delete: {
      params: paramSchema,
      detail: {
        tags,
        summary: `Delete ${resourceName}`,
        responses: {
          200: successDoc(
            dataSchema,
            `${resourceName} berhasil dihapus`,
            'Deleted'
          ),
          404: errorDoc(`${resourceName} tidak ditemukan`),
          // 401: errorDoc('Unauthorized'),
        },
      },
    },
  }
}
