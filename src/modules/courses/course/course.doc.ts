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
  is_displayed: t.Boolean({ description: 'Whether the course is displayed' }),
  course_category_name: t.String({ description: 'Name of the category' }),
  course_field_name: t.String({ description: 'Name of the field' }),
  // Nested data for Latest Batch
  latest_batch: t.Optional(t.Any({ description: 'Latest batch information' })),
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
            benefits: t.Array(t.Any()),
            materials: t.Array(t.Any()),
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
      200: GetAllCourseResponse, // Reuse the same list schema
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
