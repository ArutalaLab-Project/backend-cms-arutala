import { t } from 'elysia'
import { docs, successDoc, simpleSuccessDoc } from '../../../utils/doc-builder'
import {
  CourseModel,
  ParamsCourseModel,
  QueryCourseModel,
} from './course.model'

// 1. Data Structure for Documentation
const CourseDataSchema = t.Object({
  course_id: t.String({
    format: 'uuid',
    description: 'Unique ID of the course',
  }),
  course_title: t.String({ description: 'Title of the course' }),
  course_description: t.String({ description: 'Description of the course' }),
  course_headline: t.String({ description: 'Headline of the course' }),
  course_category_name: t.String({ description: 'Name of the category' }),
  course_field_name: t.String({ description: 'Name of the field' }),
  // Nested data for Latest Batch
  course_batch: t.Object({
    id: t.Optional(t.String()),
    name: t.Optional(t.String()),
    status: t.Optional(t.String()),
    posterUrl: t.Optional(t.Nullable(t.String())),
    registration_url: t.Optional(t.String()),
    registration_start: t.Optional(t.String()),
    registration_end: t.Optional(t.String()),
    start_date: t.Optional(t.String()),
    end_date: t.Optional(t.String()),
    instructor: t.Optional(
      t.Object({
        name: t.String(),
        jobTitle: t.String(),
        companyName: t.String(),
        profileUrl: t.Nullable(t.String()),
      })
    ),
    prices: t.Optional(
      t.Object({
        basePrice: t.Number(),
        discountType: t.Nullable(t.String()),
        discountValue: t.Nullable(t.Number()),
        finalPrice: t.Number(),
      })
    ),
  }),
})

// 2. Response Schemas
export const GetAllCourseResponse = successDoc(
  t.Array(CourseDataSchema),
  'Berhasil mengambil semua data course'
)

export const GetCourseByIdResponse = successDoc(
  t.Intersect([
    CourseDataSchema,
    t.Object({
      courseBenefit: t.Array(t.Any()),
      courseMaterial: t.Array(t.Any()),
      courseBatch: t.Array(t.Any()),
    }),
  ]),
  'Berhasil mengambil detail course'
)

export const CreatedCourseResponse = successDoc(
  t.Object({ course_id: t.String() }),
  'Berhasil menambah course baru',
  'Created'
)

// 3. Complete Route Documentation Objects
const CourseTags = ['Courses - Master']

export const AddCourseDoc = {
  body: CourseModel,
  ...docs('Create a New Course', CourseTags, {
    201: CreatedCourseResponse,
  }),
}

export const GetAllCourseDoc = {
  query: QueryCourseModel,
  ...docs('Get All Course with Query Parameter (optional)', CourseTags, {
    200: GetAllCourseResponse,
  }),
}

export const GetUpcomingCourseDoc = {
  ...docs('Get Upcoming Course (1 category 1 course)', CourseTags, {
    200: successDoc(
      t.Array(
        t.Object({
          course_id: t.String({ format: 'uuid' }),
          course_title: t.String(),
          course_description: t.String(),
          course_headline: t.String(),
          course_category_name: t.String(),
          course_field_name: t.String(),
          nearest_batch: t.Object({
            name: t.String(),
            posterUrl: t.Nullable(t.String()),
            registration_url: t.String(),
            start_date: t.String(),
            registration_end: t.String(),
          }),
        })
      ),
      'Berhasil mengambil data upcoming course'
    ),
  }),
}

export const GetCourseByIdDoc = {
  params: ParamsCourseModel,
  ...docs('Get course By Id', CourseTags, {
    200: GetCourseByIdResponse,
  }),
}

export const UpdateCourseDoc = {
  body: t.Partial(CourseModel),
  params: ParamsCourseModel,
  ...docs('Update Course by Id', CourseTags, {
    200: simpleSuccessDoc('Updated'),
  }),
}

export const DeleteCourseDoc = {
  params: ParamsCourseModel,
  ...docs('Delete Course by Id', CourseTags, {
    200: simpleSuccessDoc('Deleted'),
  }),
}
