import { t } from 'elysia'
import { createResponseSchema } from '../../utils/schemaHelper'
import {
  ContributorModel,
  ContributorType,
  ParamsContributorModel,
  QueryContributorTypeModel,
} from './contributor.model'

// 1. Data Structure for Documentation
const ContributorDataSchema = t.Object({
  contributor_id: t.String({
    format: 'uuid',
    description: 'Unique ID of the contributor',
  }),
  author_name: t.String({ description: 'Name of the contributor' }),
  author_job_title: t.String({ description: 'Job title of the contributor' }),
  author_company_name: t.String({
    description: 'Company name of the contributor',
  }),
  author_profile_url: t.String({
    description: 'URL of the contributor profile image',
  }),
  contributor_type: t.Enum(ContributorType, {
    description: 'Type of the contributor (INTERNAL/EXTERNAL)',
  }),
  expertise: t.Array(t.String(), {
    description: 'List of expertise of the contributor',
  }),
  is_displayed: t.Boolean({
    description: 'Whether the contributor is displayed on the landing page',
  }),
})

// 2. Response Schemas
export const GetAllContributorResponse = {
  description: 'Berhasil mengambil semua data contributor',
  content: {
    'application/json': {
      schema: createResponseSchema(t.Array(ContributorDataSchema)),
    },
  },
}

export const GetContributorByIdResponse = {
  description: 'Berhasil mengambil detail contributor',
  content: {
    'application/json': {
      schema: createResponseSchema(ContributorDataSchema),
    },
  },
}

export const CreatedContributorResponse = {
  description: 'Berhasil menambah contributor baru',
  content: {
    'application/json': {
      schema: createResponseSchema(
        t.Object({ contributor_id: t.String() }),
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
const ContributorTags = ['Contributor']

export const AddContributorDoc = {
  body: ContributorModel,
  detail: {
    tags: ContributorTags,
    summary: 'Create a New Contributor',
    responses: {
      201: CreatedContributorResponse,
    },
  },
}

export const GetAllContributorDoc = {
  query: QueryContributorTypeModel,
  detail: {
    tags: ContributorTags,
    summary: 'Get All Contributors',
    responses: {
      200: GetAllContributorResponse,
    },
  },
}

export const GetContributorByIdDoc = {
  params: ParamsContributorModel,
  detail: {
    tags: ContributorTags,
    summary: 'Get Contributor by Id',
    responses: {
      200: GetContributorByIdResponse,
    },
  },
}

export const UpdateContributorDoc = {
  body: t.Partial(ContributorModel),
  params: ParamsContributorModel,
  detail: {
    tags: ContributorTags,
    summary: 'Update Contributor by Id',
    responses: {
      200: SimpleSuccessResponse('Updated'),
    },
  },
}

export const DeleteContributorDoc = {
  params: ParamsContributorModel,
  detail: {
    tags: ContributorTags,
    summary: 'Delete Contributor by Id',
    responses: {
      200: SimpleSuccessResponse('Deleted'),
    },
  },
}
