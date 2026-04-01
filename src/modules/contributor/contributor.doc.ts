import { t } from 'elysia'
import { docs, successDoc, simpleSuccessDoc } from '../../utils/doc-builder'
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
export const GetAllContributorResponse = successDoc(
  t.Array(ContributorDataSchema),
  'Berhasil mengambil semua data contributor'
)

export const GetContributorByIdResponse = successDoc(
  ContributorDataSchema,
  'Berhasil mengambil detail contributor'
)

export const CreatedContributorResponse = successDoc(
  t.Object({ contributor_id: t.String() }),
  'Berhasil menambah contributor baru',
  'Created'
)

// 3. Complete Route Documentation Objects
const ContributorTags = ['Contributor']

export const AddContributorDoc = {
  body: ContributorModel,
  ...docs('Create a New Contributor', ContributorTags, {
    201: CreatedContributorResponse,
  }),
}

export const GetAllContributorDoc = {
  query: QueryContributorTypeModel,
  ...docs('Get All Contributors', ContributorTags, {
    200: GetAllContributorResponse,
  }),
}

export const GetContributorByIdDoc = {
  params: ParamsContributorModel,
  ...docs('Get Contributor by Id', ContributorTags, {
    200: GetContributorByIdResponse,
  }),
}

export const UpdateContributorDoc = {
  body: t.Partial(ContributorModel),
  params: ParamsContributorModel,
  ...docs('Update Contributor by Id', ContributorTags, {
    200: simpleSuccessDoc('Updated'),
  }),
}

export const DeleteContributorDoc = {
  params: ParamsContributorModel,
  ...docs('Delete Contributor by Id', ContributorTags, {
    200: simpleSuccessDoc('Deleted'),
  }),
}
