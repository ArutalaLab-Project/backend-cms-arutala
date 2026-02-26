import { t } from 'elysia'
import { createResponseSchema } from '../../utils/schemaHelper'
import { RefreshTokenModel, SignInModel } from './auth.model'
import { UserRole } from '../user/user.model'

// 1. Response Schemas
export const SignInResponse = {
  description: 'Sign in berhasil',
  content: {
    'application/json': {
      schema: createResponseSchema(
        t.Object({
          access_token: t.String({ description: 'JWT access token' }),
          refresh_token: t.String({ description: 'JWT refresh token' }),
        })
      ),
    },
  },
}

export const RefreshTokenResponse = {
  description: 'Memperbarui access token berhasil',
  content: {
    'application/json': {
      schema: createResponseSchema(
        t.Object({
          access_token: t.String({ description: 'New JWT access token' }),
        })
      ),
    },
  },
}

export const MeResponse = {
  description: 'Berhasil mengambil informasi authenticated user',
  content: {
    'application/json': {
      schema: createResponseSchema(
        t.Object({
          user_id: t.String({ format: 'uuid' }),
          username: t.String(),
          full_name: t.String(),
          user_profile_url: t.String(),
          role_name: t.Enum(UserRole),
        })
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

// 2. Complete Route Documentation Objects
const AuthTags = ['Auth']

export const SignInDoc = {
  body: SignInModel,
  detail: {
    tags: AuthTags,
    summary: 'Sign In',
    responses: {
      200: SignInResponse,
    },
  },
}

export const RefreshDoc = {
  body: RefreshTokenModel,
  detail: {
    tags: AuthTags,
    summary: 'Refresh Access Token',
    responses: {
      200: RefreshTokenResponse,
    },
  },
}

export const SignOutDoc = {
  body: RefreshTokenModel,
  detail: {
    tags: AuthTags,
    summary: 'Sign Out',
    responses: {
      200: SimpleSuccessResponse('Sign out berhasil'),
    },
  },
}

export const GetMeDoc = {
  detail: {
    tags: AuthTags,
    summary: 'Get User Authenticated',
    responses: {
      200: MeResponse,
    },
  },
}
