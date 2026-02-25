import { t } from 'elysia'
import { createResponseSchema } from '../../utils/schemaHelper'
import { ParamsUserModel, UserModel, UserRole } from './user.model'

// 1. Data Structure for Documentation
const UserDataSchema = t.Object({
  user_id: t.String({ format: 'uuid', description: 'Unique ID of the user' }),
  username: t.String({ description: 'Username for login' }),
  full_name: t.String({ description: 'Display name of the user' }),
  user_profile_url: t.String({ description: 'URL of the user profile image' }),
  role_name: t.Enum(UserRole, { description: 'Role assigned to the user' }),
})

// 2. Response Schemas
export const GetAllUserResponse = {
  description: 'Berhasil mengambil semua data user',
  content: {
    'application/json': {
      schema: createResponseSchema(t.Array(UserDataSchema)),
    },
  },
}

export const GetUserByIdResponse = {
  description: 'Berhasil mengambil detail user',
  content: {
    'application/json': {
      schema: createResponseSchema(UserDataSchema),
    },
  },
}

export const CreatedUserResponse = {
  description: 'Berhasil menambah user baru',
  content: {
    'application/json': {
      schema: createResponseSchema(
        t.Object({ user_id: t.String() }),
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
const UserTags = ['User']

export const AddUserDoc = {
  body: UserModel,
  detail: {
    tags: UserTags,
    summary: 'Create a New User',
    responses: {
      201: CreatedUserResponse,
    },
  },
}

export const GetAllUserDoc = {
  detail: {
    tags: UserTags,
    summary: 'Get All Users',
    responses: {
      200: GetAllUserResponse,
    },
  },
}

export const GetUserByIdDoc = {
  params: ParamsUserModel,
  detail: {
    tags: UserTags,
    summary: 'Get User by Id',
    responses: {
      200: GetUserByIdResponse,
    },
  },
}

export const DeleteUserDoc = {
  params: ParamsUserModel,
  detail: {
    tags: UserTags,
    summary: 'Delete User by Id',
    responses: {
      200: SimpleSuccessResponse('Deleted'),
    },
  },
}
