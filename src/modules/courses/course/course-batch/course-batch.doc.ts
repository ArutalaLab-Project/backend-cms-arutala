import { t } from 'elysia'
import { createResponseSchema } from '../../../../utils/schemaHelper'
import {
  BatchStatus,
  CourseBatchModel,
  CourseBatchPosterUploadModel,
  ParamsCourseBatchModel,
} from './course-batch.model'

// 1. Data Structure for Documentation
const CourseBatchDataSchema = t.Object({
  course_batch_id: t.String({
    format: 'uuid',
    description: 'Unique ID of the course batch',
  }),
  name: t.String({ description: 'Name of the batch' }),
  batch_status: t.Enum(BatchStatus, {
    description: 'Current status of the batch',
  }),
  poster_url: t.Nullable(t.String({ description: 'URL of the batch poster' })),
  registration_url: t.String({
    description: 'URL for registration',
  }),
  registration_start: t.String({ format: 'date' }),
  registration_end: t.String({ format: 'date' }),
  start_date: t.String({ format: 'date' }),
  end_date: t.String({ format: 'date' }),
  // Flat instructor fields from JOIN
  instructor_id: t.String({ format: 'uuid' }),
  instructor_name: t.String(),
  instructor_job_title: t.String(),
  instructor_company_name: t.String(),
  instructor_profile_url: t.Nullable(t.String()),
  // Flat price fields from JOIN
  base_price: t.Number(),
  discount_type: t.Nullable(t.String()),
  discount_value: t.Nullable(t.Number()),
  final_price: t.Number(),
  // Nested sessions
  sessions: t.Array(
    t.Object({
      course_session_id: t.Number(),
      topic: t.String(),
      date: t.String({ format: 'date' }),
      start_time: t.String(),
      end_time: t.String(),
    }),
    { description: 'Batch sessions' }
  ),
})

// 2. Response Schemas
export const GetAllCourseBatchResponse = {
  description: 'Berhasil mengambil semua data batch course',
  content: {
    'application/json': {
      schema: createResponseSchema(t.Array(CourseBatchDataSchema)),
    },
  },
}

export const GetCourseBatchByIdResponse = {
  description: 'Berhasil mengambil detail batch course',
  content: {
    'application/json': {
      schema: createResponseSchema(CourseBatchDataSchema),
    },
  },
}

export const CreatedCourseBatchResponse = {
  description: 'Berhasil menambah batch course baru',
  content: {
    'application/json': {
      schema: createResponseSchema(
        t.Object({ course_batch_id: t.String() }),
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
const CourseBatchTags = ['Courses - Batch']

export const AddCourseBatchDoc = {
  body: CourseBatchModel,
  detail: {
    tags: CourseBatchTags,
    summary: 'Create a New Batch for Course',
    responses: {
      201: CreatedCourseBatchResponse,
    },
  },
}

export const UploadCourseBatchPosterDoc = {
  body: CourseBatchPosterUploadModel,
  detail: {
    tags: CourseBatchTags,
    summary: 'Upload Poster for Batch of Course',
    responses: {
      200: {
        description: 'Poster uploaded',
        content: {
          'application/json': {
            schema: createResponseSchema(
              t.Object({ poster_url: t.String() }),
              'Upload poster pada batch berhasil'
            ),
          },
        },
      },
    },
  },
}

export const GetCourseBatchByIdDoc = {
  params: ParamsCourseBatchModel,
  detail: {
    tags: CourseBatchTags,
    summary: 'Get Course Batch by Course Id and Batch Id',
    responses: {
      200: GetCourseBatchByIdResponse,
    },
  },
}

export const UpdateCourseBatchDoc = {
  body: t.Partial(CourseBatchModel),
  params: ParamsCourseBatchModel,
  detail: {
    tags: CourseBatchTags,
    summary: 'Update Batch in Course by Batch Id',
    responses: {
      200: SimpleSuccessResponse('Updated'),
    },
  },
}

export const DeleteCourseBatchDoc = {
  params: ParamsCourseBatchModel,
  detail: {
    tags: CourseBatchTags,
    summary: 'Delete Batch in Course by Batch Id',
    responses: {
      200: SimpleSuccessResponse('Deleted'),
    },
  },
}
