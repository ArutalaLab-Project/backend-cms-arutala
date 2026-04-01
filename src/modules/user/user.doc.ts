import { t } from 'elysia'
import { docs, successDoc, simpleSuccessDoc } from '../../utils/doc-builder'
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
export const GetAllUserResponse = successDoc(
  t.Array(UserDataSchema),
  'Berhasil mengambil semua data user'
)

export const GetUserByIdResponse = successDoc(
  UserDataSchema,
  'Berhasil mengambil detail user'
)

export const CreatedUserResponse = successDoc(
  t.Object({ user_id: t.String() }),
  'Berhasil menambah user baru',
  'Created'
)

// 3. Complete Route Documentation Objects
const UserTags = ['User']

export const AddUserDoc = {
  body: UserModel,
  ...docs('Create a New User', UserTags, {
    201: CreatedUserResponse,
  }),
}

export const GetAllUserDoc = {
  ...docs('Get All Users', UserTags, {
    200: GetAllUserResponse,
  }),
}

export const GetUserByIdDoc = {
  params: ParamsUserModel,
  ...docs('Get User by Id', UserTags, {
    200: GetUserByIdResponse,
  }),
}

export const DeleteUserDoc = {
  params: ParamsUserModel,
  ...docs('Delete User by Id', UserTags, {
    200: simpleSuccessDoc('Deleted'),
  }),
}
