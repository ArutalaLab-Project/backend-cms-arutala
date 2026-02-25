import { t } from 'elysia'
import { createResponseSchema } from '../../utils/schemaHelper'
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
export const GetAllArticleResponse = {
  description: 'Berhasil mengambil semua data artikel',
  content: {
    'application/json': {
      schema: createResponseSchema(t.Array(ArticleDataSchema)),
    },
  },
}

export const GetArticleByIdResponse = {
  description: 'Berhasil mengambil detail artikel',
  content: {
    'application/json': {
      schema: createResponseSchema(ArticleDataSchema),
    },
  },
}

export const CreatedArticleResponse = {
  description: 'Berhasil membuat artikel baru',
  content: {
    'application/json': {
      schema: createResponseSchema(
        t.Object({ article_id: t.String() }),
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
const ArticleTags = ['Article']

export const AddArticleDoc = {
  body: ArticleModel,
  detail: {
    tags: ArticleTags,
    summary: 'Create a New Article',
    responses: {
      201: CreatedArticleResponse,
    },
  },
}

export const GetAllArticleDoc = {
  query: QueryArticleStatusModel,
  detail: {
    tags: ArticleTags,
    summary: 'Get All Articles',
    responses: {
      200: GetAllArticleResponse,
    },
  },
}

export const GetArticleByIdDoc = {
  params: ParamsArticleModel,
  detail: {
    tags: ArticleTags,
    summary: 'Get Article by Id',
    responses: {
      200: GetArticleByIdResponse,
    },
  },
}

export const UpdateArticleDoc = {
  body: ArticleUpdateModel,
  params: ParamsArticleModel,
  detail: {
    tags: ArticleTags,
    summary: 'Update Article by Id',
    responses: {
      200: SimpleSuccessResponse('Updated'),
    },
  },
}

export const DeleteArticleDoc = {
  params: ParamsArticleModel,
  detail: {
    tags: ArticleTags,
    summary: 'Delete Article by Id',
    responses: {
      200: SimpleSuccessResponse('Deleted'),
    },
  },
}

export const UploadContentImageDoc = {
  body: ContentImageUploadModel,
  detail: {
    tags: ArticleTags,
    summary: 'Upload content image for Article',
    responses: {
      201: {
        description: 'Uploaded',
        content: {
          'application/json': {
            schema: createResponseSchema(t.String(), 'Uploaded'),
          },
        },
      },
    },
  },
}

export const AddCoverArticleDoc = {
  body: ArticleCoverModel,
  params: ParamsArticleModel,
  detail: {
    tags: ArticleTags,
    summary: 'Add cover for article',
    responses: {
      200: SimpleSuccessResponse('Cover added'),
    },
  },
}

export const UpdateCoverArticleDoc = {
  body: t.Partial(ArticleCoverModel),
  params: ParamsArticleModel,
  detail: {
    tags: ArticleTags,
    summary: 'Update cover for article',
    responses: {
      200: SimpleSuccessResponse('Cover updated'),
    },
  },
}
