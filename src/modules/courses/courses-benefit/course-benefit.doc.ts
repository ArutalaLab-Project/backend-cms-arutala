import { createCrudDocs } from '../../../utils/doc-builder'
import { CourseBenefitResponseSchema } from './course-benefit.model'

export const CourseBenefitDocs = createCrudDocs({
  resourceName: 'Course Benefit',
  tag: 'Courses - Benefit',
  dataSchema: CourseBenefitResponseSchema,
})
