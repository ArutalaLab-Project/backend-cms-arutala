import { t } from 'elysia'
import { docs, successDoc, simpleSuccessDoc } from '../../utils/doc-builder'
import { RefreshTokenModel, SignInModel } from './auth.model'
import { UserRole } from '../user/user.model'

// 1. Response Schemas
export const SignInResponse = successDoc(
  t.Object({
    access_token: t.String({ description: 'JWT access token' }),
    refresh_token: t.String({ description: 'JWT refresh token' }),
  }),
  'Sign in berhasil'
)

export const RefreshTokenResponse = successDoc(
  t.Object({
    access_token: t.String({ description: 'New JWT access token' }),
  }),
  'Memperbarui access token berhasil'
)

export const MeResponse = successDoc(
  t.Object({
    user_id: t.String({ format: 'uuid' }),
    username: t.String(),
    full_name: t.String(),
    user_profile_url: t.String(),
    role_name: t.Enum(UserRole),
  }),
  'Berhasil mengambil informasi authenticated user'
)

// 2. Complete Route Documentation Objects
const AuthTags = ['Auth']

export const SignInDoc = {
  body: SignInModel,
  ...docs('Sign In', AuthTags, {
    200: SignInResponse,
  }),
}

export const RefreshDoc = {
  body: RefreshTokenModel,
  ...docs('Refresh Access Token', AuthTags, {
    200: RefreshTokenResponse,
  }),
}

export const SignOutDoc = {
  body: RefreshTokenModel,
  ...docs('Sign Out', AuthTags, {
    200: simpleSuccessDoc('Sign out berhasil'),
  }),
}

export const GetMeDoc = {
  ...docs('Get User Authenticated', AuthTags, {
    200: MeResponse,
  }),
}
