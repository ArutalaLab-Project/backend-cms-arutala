import { t } from 'elysia'
import { docs, successDoc, simpleSuccessDoc } from '../../utils/doc-builder'
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
export const GetAllMessageResponse = successDoc(
  t.Array(MessageDataSchema),
  'Berhasil mengambil semua data message'
)

export const GetMessageByIdResponse = successDoc(
  MessageDataSchema,
  'Berhasil mengambil detail message'
)

export const CreatedMessageResponse = successDoc(
  t.Object({ message_id: t.String() }),
  'Berhasil menambah message baru',
  'Created'
)

// 3. Complete Route Documentation Objects
const MessageTags = ['Message']

export const AddMessageDoc = {
  body: MessageModel,
  ...docs('Create a New Message', MessageTags, {
    201: CreatedMessageResponse,
  }),
}

export const GetAllMessageDoc = {
  ...docs('Get All Message', MessageTags, {
    200: GetAllMessageResponse,
  }),
}

export const GetMessageByIdDoc = {
  params: ParamsMessageModel,
  ...docs('Get Message by Id', MessageTags, {
    200: GetMessageByIdResponse,
  }),
}

export const UpdateMessageDoc = {
  body: MessageUpdateModel,
  params: ParamsMessageModel,
  ...docs('Update Message by Id', MessageTags, {
    200: simpleSuccessDoc('Updated'),
  }),
}

export const DeleteMessageDoc = {
  params: ParamsMessageModel,
  ...docs('Delete Message by Id', MessageTags, {
    200: simpleSuccessDoc('Deleted'),
  }),
}
