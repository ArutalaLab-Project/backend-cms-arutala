import { Static, t } from 'elysia'

// Model Course Benefit
export const CourseBenefitModel = t.Array(
  t.Object({
    courseBenefitId: t.String({
      format: 'uuid',
      error: 'Format uuid tidak valid',
    }),
    orderNum: t.Integer({
      error: 'order num harus integer',
    }),
  })
)

export type CourseBenefitProps = Static<typeof CourseBenefitModel>

// REQUEST
export const CourseBenefitRequestSchema = t.Object({
  title: t.String({
    minLength: 3,
    maxLength: 100,
    error: 'Title course benefit harus memiliki 3 sampai 100 karakter',
  }),
  description: t.String({
    minLength: 5,
    maxLength: 500,
    error: 'Description course benefit harus memiliki 5 sampai 500 karakter',
  }),
})
export type CourseBenefitRequest = Static<typeof CourseBenefitRequestSchema>

// RESPONSE
export const CourseBenefitResponseSchema = t.Object({
  id: t.String({ format: 'uuid' }),
  title: t.String(),
  description: t.String(),
})
export type CourseBenefitResponse = Static<typeof CourseBenefitResponseSchema>

// PARAMS
export const CourseBenefitParamsSchema = t.Object({
  courseBenefitId: t.String({
    format: 'uuid',
    error: 'Format param course benefit id tidak valid',
  }),
})
export type CourseBenefitParams = Static<typeof CourseBenefitParamsSchema>
