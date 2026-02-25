import { t } from 'elysia'
import { createResponseSchema } from '../../utils/schemaHelper'
import {
  ParamsTestimoniModel,
  QueryTestimoniModel,
  TestimoniCategory,
  TestimoniModel,
} from './testimoni.model'

// 1. Data Structure for Documentation
const TestimoniDataSchema = t.Object({
  testimoni_id: t.String({
    format: 'uuid',
    description: 'Unique ID of the testimoni',
  }),
  author_name: t.String({ description: 'Name of the author' }),
  author_job_title: t.String({ description: 'Job title of the author' }),
  author_company_name: t.String({ description: 'Company name of the author' }),
  author_profile_url: t.String({
    description: 'URL of the author profile image',
  }),
  testimoni_content: t.String({ description: 'Content of the testimoni' }),
  testimoni_category: t.Enum(TestimoniCategory, {
    description: 'Category of the testimoni (SISWA/TALENT)',
  }),
  is_displayed: t.Boolean({
    description: 'Whether the testimoni is displayed on the landing page',
  }),
})

// 2. Response Schemas
export const GetAllTestimoniResponse = {
  description: 'Berhasil mengambil semua data testimoni',
  content: {
    'application/json': {
      schema: createResponseSchema(t.Array(TestimoniDataSchema)),
    },
  },
}

export const GetTestimoniByIdResponse = {
  description: 'Berhasil mengambil detail testimoni',
  content: {
    'application/json': {
      schema: createResponseSchema(TestimoniDataSchema),
    },
  },
}

export const CreatedTestimoniResponse = {
  description: 'Berhasil menambah testimoni baru',
  content: {
    'application/json': {
      schema: createResponseSchema(
        t.Object({ testimoni_id: t.String() }),
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
const TestimoniTags = ['Testimoni']

export const AddTestimoniDoc = {
  body: TestimoniModel,
  detail: {
    tags: TestimoniTags,
    summary: 'Create a New Testimoni',
    responses: {
      201: CreatedTestimoniResponse,
    },
  },
}

export const GetAllTestimoniDoc = {
  query: QueryTestimoniModel,
  detail: {
    tags: TestimoniTags,
    summary: 'Get All Testimoni with Query Parameter',
    responses: {
      200: GetAllTestimoniResponse,
    },
  },
}

export const GetTestimoniByIdDoc = {
  params: ParamsTestimoniModel,
  detail: {
    tags: TestimoniTags,
    summary: 'Get Testimoni by Id',
    responses: {
      200: GetTestimoniByIdResponse,
    },
  },
}

export const UpdateTestimoniDoc = {
  body: t.Partial(TestimoniModel),
  params: ParamsTestimoniModel,
  detail: {
    tags: TestimoniTags,
    summary: 'Update Testimoni by Id',
    responses: {
      200: SimpleSuccessResponse('Updated'),
    },
  },
}

export const DeleteTestimoniDoc = {
  params: ParamsTestimoniModel,
  detail: {
    tags: TestimoniTags,
    summary: 'Delete Testimoni by Id',
    responses: {
      200: SimpleSuccessResponse('Deleted'),
    },
  },
}
