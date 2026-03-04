import { createCrudDocs } from '../../../utils/doc-builder'
import {
  CourseFieldParamsSchema,
  CourseFieldRequestSchema,
  CourseFieldResponseSchema,
} from './courses-field.model'

export const CourseFieldDocs = createCrudDocs({
  resourceName: 'Course Field',
  tag: 'Course Field',
  bodySchema: CourseFieldRequestSchema,
  dataSchema: CourseFieldResponseSchema,
  paramSchema: CourseFieldParamsSchema,
})
