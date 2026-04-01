import { t } from 'elysia'
import { docs, successDoc } from '../../../utils/doc-builder'

const CourseCategoryResponseSchema = t.Array(
  t.Object({
    id: t.String({ format: 'uuid' }),
    name: t.String(),
    min_duration: t.String(),
    max_duration: t.String(),
  })
)

const CourseCategoryTags = ['Courses - Category']

export const GetAllCourseCategoryDoc = docs(
  'Get All Course Category',
  CourseCategoryTags,
  {
    200: successDoc(
      CourseCategoryResponseSchema,
      'Berhasil mengambil data course category'
    ),
  }
)
