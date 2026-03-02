import { t } from 'elysia'
import { createResponseSchema } from '../../../utils/schemaHelper'
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
export const GetAllCourseResponse = {
  description: 'Berhasil mengambil semua data course',
  content: {
    'application/json': {
      schema: createResponseSchema(t.Array(CourseDataSchema)),
    },
  },
}

export const GetCourseByIdResponse = {
  description: 'Berhasil mengambil detail course',
  content: {
    'application/json': {
      schema: createResponseSchema(
        t.Intersect([
          CourseDataSchema,
          t.Object({
            courseBenefit: t.Array(t.Any()),
            courseMaterial: t.Array(t.Any()),
            courseBatch: t.Array(t.Any()),
          }),
        ])
      ),
    },
  },
}

export const CreatedCourseResponse = {
  description: 'Berhasil menambah course baru',
  content: {
    'application/json': {
      schema: createResponseSchema(
        t.Object({ course_id: t.String() }),
        'Created'
      ),
    },
  },
}

const SimpleSuccessResponse = (msg: string) => ({
  description: msg,
  content: {
    'application/json': {
      schema: createResponseSchema(t.Null(), msg),
    },
  },
})

// 3. Complete Route Documentation Objects
const CourseTags = ['Courses']

export const AddCourseDoc = {
  body: CourseModel,
  detail: {
    tags: CourseTags,
    summary: '[course] Create a New Course',
    responses: {
      201: CreatedCourseResponse,
    },
  },
}

export const GetAllCourseDoc = {
  query: QueryCourseModel,
  detail: {
    tags: CourseTags,
    summary: '[course] Get All Course with Query Parameter (optional)',
    responses: {
      200: GetAllCourseResponse,
    },
  },
}

export const GetUpcomingCourseDoc = {
  detail: {
    tags: CourseTags,
    summary: '[course] Get Upcoming Course (1 category 1 course)',
    responses: {
      200: {
        description: 'Berhasil mengambil data upcoming course',
        content: {
          'application/json': {
            schema: createResponseSchema(
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
              )
            ),
          },
        },
      },
    },
  },
}

export const GetCourseByIdDoc = {
  params: ParamsCourseModel,
  detail: {
    tags: CourseTags,
    summary: '[course] Get course By Id',
    responses: {
      200: GetCourseByIdResponse,
    },
  },
}

export const UpdateCourseDoc = {
  body: t.Partial(CourseModel),
  params: ParamsCourseModel,
  detail: {
    tags: CourseTags,
    summary: '[course] Update Course by Id',
    responses: {
      200: SimpleSuccessResponse('Updated'),
    },
  },
}

export const DeleteCourseDoc = {
  params: ParamsCourseModel,
  detail: {
    tags: CourseTags,
    summary: '[course] Delete Course by Id',
    responses: {
      200: SimpleSuccessResponse('Deleted'),
    },
  },
}
