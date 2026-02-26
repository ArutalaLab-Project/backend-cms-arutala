import { t } from 'elysia'
import { createResponseSchema } from '../../utils/schemaHelper'
import {
  MessageModel,
  MessageStatus,
  MessageUpdateModel,
  ParamsMessageModel,
} from './message.model'

// 1. Data Structure for Documentation
const MessageDataSchema = t.Object({
  message_id: t.String({
    format: 'uuid',
    description: 'Unique ID of the message',
  }),
  sender_name: t.String({ description: 'Name of the sender' }),
  sender_email: t.String({ description: 'Email address of the sender' }),
  sender_phone: t.String({ description: 'Phone number of the sender' }),
  organization_name: t.String({ description: 'Organization of the sender' }),
  message_status: t.Enum(MessageStatus, {
    description: 'Current status of the message',
  }),
  subject: t.Array(t.String(), { description: 'Interested subjects' }),
  message_body: t.String({ description: 'Content of the message' }),
  created_date: t.Optional(
    t.String({ description: 'Date when the message was created' })
  ),
})

// 2. Response Schemas
export const GetAllMessageResponse = {
  description: 'Berhasil mengambil semua data message',
  content: {
    'application/json': {
      schema: createResponseSchema(t.Array(MessageDataSchema)),
    },
  },
}

export const GetMessageByIdResponse = {
  description: 'Berhasil mengambil detail message',
  content: {
    'application/json': {
      schema: createResponseSchema(MessageDataSchema),
    },
  },
}

export const CreatedMessageResponse = {
  description: 'Berhasil menambah message baru',
  content: {
    'application/json': {
      schema: createResponseSchema(
        t.Object({ message_id: t.String() }),
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
const MessageTags = ['Message']

export const AddMessageDoc = {
  body: MessageModel,
  detail: {
    tags: MessageTags,
    summary: 'Create a New Message',
    responses: {
      201: CreatedMessageResponse,
    },
  },
}

export const GetAllMessageDoc = {
  detail: {
    tags: MessageTags,
    summary: 'Get All Message',
    responses: {
      200: GetAllMessageResponse,
    },
  },
}

export const GetMessageByIdDoc = {
  params: ParamsMessageModel,
  detail: {
    tags: MessageTags,
    summary: 'Get Message by Id',
    responses: {
      200: GetMessageByIdResponse,
    },
  },
}

export const UpdateMessageDoc = {
  body: MessageUpdateModel,
  params: ParamsMessageModel,
  detail: {
    tags: MessageTags,
    summary: 'Update Message by Id',
    responses: {
      200: SimpleSuccessResponse('Updated'),
    },
  },
}

export const DeleteMessageDoc = {
  params: ParamsMessageModel,
  detail: {
    tags: MessageTags,
    summary: 'Delete Message by Id',
    responses: {
      200: SimpleSuccessResponse('Deleted'),
    },
  },
}
