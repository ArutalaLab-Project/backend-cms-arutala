import { t } from 'elysia'
import { docs, successDoc } from '../../../utils/doc-builder'

const CourseBenefitTags = ['Courses - Benefit']

export const GetAllCourseBenefitDoc = docs(
  'Get All Course Benefit',
  CourseBenefitTags,
  {
    200: successDoc(t.Array(t.Any()), 'Berhasil mengambil data course benefit'),
  }
)
