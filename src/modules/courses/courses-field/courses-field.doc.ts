import { createCrudDocs } from '../../../utils/doc-builder'
import { CourseFieldResponseSchema } from './courses-field.model'

export const CourseFieldDocs = createCrudDocs({
  resourceName: 'Course Field',
  tag: 'Courses - Field',
  dataSchema: CourseFieldResponseSchema,
})
