import { t } from 'elysia'
import { docs, successDoc, simpleSuccessDoc } from '../../utils/doc-builder'
import {
  ArticleCoverModel,
  ArticleModel,
  ArticleStatus,
  ArticleUpdateModel,
  ContentImageUploadModel,
  ParamsArticleModel,
  QueryArticleStatusModel,
} from './article.model'

// 1. Definition of Data Structures for Documentation
const ArticleDataSchema = t.Object({
  article_id: t.String({
    format: 'uuid',
    description: 'Unique ID of the article',
  }),
  article_title: t.String({ description: 'Title of the article' }),
  article_content_text: t.String({
    description: 'Plain text content of the article',
  }),
  article_content_blocks: t.Array(t.Any(), {
    description: 'Editor.js content blocks',
  }),
  article_cover_url: t.String({
    description: 'URL of the article cover image',
  }),
  article_cover_description: t.String({
    description: 'Description/Caption for the cover image',
  }),
  article_status: t.Enum(ArticleStatus, {
    description: 'Current status of the article',
  }),
  is_displayed: t.Boolean({
    description: 'Whether the article is displayed on the landing page',
  }),
  created_date: t.String({ format: 'date-time' }),
  author: t.String({ description: 'Full name of the article author' }),
})

// 2. Response Schemas Wrapped for OpenAPI
export const GetAllArticleResponse = successDoc(
  t.Array(ArticleDataSchema),
  'Berhasil mengambil semua data artikel'
)

export const GetArticleByIdResponse = successDoc(
  ArticleDataSchema,
  'Berhasil mengambil detail artikel'
)

export const CreatedArticleResponse = successDoc(
  t.Object({ article_id: t.String() }),
  'Berhasil membuat artikel baru',
  'Created'
)

// 3. Complete Route Documentation Objects
const ArticleTags = ['Article']

export const AddArticleDoc = {
  body: ArticleModel,
  ...docs('Create a New Article', ArticleTags, {
    201: CreatedArticleResponse,
  }),
}

export const GetAllArticleDoc = {
  query: QueryArticleStatusModel,
  ...docs('Get All Articles', ArticleTags, {
    200: GetAllArticleResponse,
  }),
}

export const GetArticleByIdDoc = {
  params: ParamsArticleModel,
  ...docs('Get Article by Id', ArticleTags, {
    200: GetArticleByIdResponse,
  }),
}

export const UpdateArticleDoc = {
  body: ArticleUpdateModel,
  params: ParamsArticleModel,
  ...docs('Update Article by Id', ArticleTags, {
    200: simpleSuccessDoc('Updated'),
  }),
}

export const DeleteArticleDoc = {
  params: ParamsArticleModel,
  ...docs('Delete Article by Id', ArticleTags, {
    200: simpleSuccessDoc('Deleted'),
  }),
}

export const UploadContentImageDoc = {
  body: ContentImageUploadModel,
  ...docs('Upload content image for Article', ArticleTags, {
    201: successDoc(t.Object({ file_url: t.String() }), 'Uploaded', 'Uploaded'), // Re-evaluating inline string based on type
  }),
}

export const AddCoverArticleDoc = {
  body: ArticleCoverModel,
  params: ParamsArticleModel,
  ...docs('Add cover for article', ArticleTags, {
    200: simpleSuccessDoc('Cover added'),
  }),
}

export const UpdateCoverArticleDoc = {
  body: t.Partial(ArticleCoverModel),
  params: ParamsArticleModel,
  ...docs('Update cover for article', ArticleTags, {
    200: simpleSuccessDoc('Cover updated'),
  }),
}
