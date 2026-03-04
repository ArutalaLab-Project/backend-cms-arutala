import { Static, t } from 'elysia'

// REQUEST
export const CourseFieldRequestSchema = t.Object({
  fieldName: t.String({
    minLength: 5,
    maxLength: 100,
    error: 'Nama field untuk course harus memiliki 5 sampai 100 karakter',
  }),
})
export type CourseFieldRequest = Static<typeof CourseFieldRequestSchema>

// RESPONSE
export const CourseFieldResponseSchema = t.Object({
  id: t.String({ format: 'uuid' }),
  fieldName: t.String(),
})
export type CourseFieldResponse = Static<typeof CourseFieldResponseSchema>

// PARAMS
export const CourseFieldParamsSchema = t.Object({
  courseFieldId: t.String({
    format: 'uuid',
    error: 'Format param course field id tidak valid',
  }),
})
export type CourseFieldParams = Static<typeof CourseFieldParamsSchema>
