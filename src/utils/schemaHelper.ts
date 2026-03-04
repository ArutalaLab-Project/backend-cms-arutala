import { t, TSchema } from 'elysia'

/**
 * Helper to create a consistent ApiResponse schema for documentation
 */
export const createResponseSchema = (
  dataSchema: TSchema,
  messageDefault: string = 'Success'
) => {
  return t.Object({
    success: t.Boolean({ default: true }),
    message: t.String({ default: messageDefault }),
    data: dataSchema,
  })
}

/**
 * Standard error response schema
 */
export const ErrorResponseSchema = t.Object({
  success: t.Boolean({ default: false }),
  statusCode: t.String(),
  message: t.String(),
})
