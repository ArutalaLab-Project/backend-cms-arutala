import { t } from 'elysia'
import { docs, successDoc, simpleSuccessDoc } from '../../utils/doc-builder'
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
export const GetAllTestimoniResponse = successDoc(
  t.Array(TestimoniDataSchema),
  'Berhasil mengambil semua data testimoni'
)

export const GetTestimoniByIdResponse = successDoc(
  TestimoniDataSchema,
  'Berhasil mengambil detail testimoni'
)

export const CreatedTestimoniResponse = successDoc(
  t.Object({ testimoni_id: t.String() }),
  'Berhasil menambah testimoni baru',
  'Created'
)

// 3. Complete Route Documentation Objects
const TestimoniTags = ['Testimoni']

export const AddTestimoniDoc = {
  body: TestimoniModel,
  ...docs('Create a New Testimoni', TestimoniTags, {
    201: CreatedTestimoniResponse,
  }),
}

export const GetAllTestimoniDoc = {
  query: QueryTestimoniModel,
  ...docs('Get All Testimoni with Query Parameter', TestimoniTags, {
    200: GetAllTestimoniResponse,
  }),
}

export const GetTestimoniByIdDoc = {
  params: ParamsTestimoniModel,
  ...docs('Get Testimoni by Id', TestimoniTags, {
    200: GetTestimoniByIdResponse,
  }),
}

export const UpdateTestimoniDoc = {
  body: t.Partial(TestimoniModel),
  params: ParamsTestimoniModel,
  ...docs('Update Testimoni by Id', TestimoniTags, {
    200: simpleSuccessDoc('Updated'),
  }),
}

export const DeleteTestimoniDoc = {
  params: ParamsTestimoniModel,
  ...docs('Delete Testimoni by Id', TestimoniTags, {
    200: simpleSuccessDoc('Deleted'),
  }),
}
