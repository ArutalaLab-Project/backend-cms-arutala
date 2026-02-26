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
  course_batch_name: t.String({ description: 'Name of the batch' }),
  course_batch_status: t.Enum(BatchStatus, {
    description: 'Current status of the batch',
  }),
  course_batch_poster_url: t.String({ description: 'URL of the batch poster' }),
  course_batch_registration_url: t.String({
    description: 'URL for registration',
  }),
  course_batch_registration_start: t.String({ format: 'date' }),
  course_batch_registration_end: t.String({ format: 'date' }),
  course_batch_start_date: t.String({ format: 'date' }),
  course_batch_end_date: t.String({ format: 'date' }),
  // Complex nested objects
  sessions: t.Array(t.Any(), { description: 'Batch sessions' }),
  price: t.Any({ description: 'Batch price information' }),
  instructor: t.Any({ description: 'Batch instructor information' }),
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
const CourseBatchTags = ['Courses']

export const AddCourseBatchDoc = {
  body: CourseBatchModel,
  detail: {
    tags: CourseBatchTags,
    summary: '[course-batch] Create a New Batch for Course',
    responses: {
      201: CreatedCourseBatchResponse,
    },
  },
}

export const UploadCourseBatchPosterDoc = {
  body: CourseBatchPosterUploadModel,
  detail: {
    tags: CourseBatchTags,
    summary: '[course-batch] Upload Poster for Batch of Course',
    responses: {
      200: SimpleSuccessResponse('Poster uploaded'),
    },
  },
}

export const GetCourseBatchByIdDoc = {
  params: ParamsCourseBatchModel,
  detail: {
    tags: CourseBatchTags,
    summary: '[course-batch] Get Course Batch by Course Id and Batch Id',
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
    summary: '[course-batch] Update Batch in Course by Batch Id',
    responses: {
      200: SimpleSuccessResponse('Updated'),
    },
  },
}

export const DeleteCourseBatchDoc = {
  params: ParamsCourseBatchModel,
  detail: {
    tags: CourseBatchTags,
    summary: '[course-batch] Delete Batch in Course by Batch Id',
    responses: {
      200: SimpleSuccessResponse('Deleted'),
    },
  },
}
