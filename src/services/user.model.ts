import type { User } from '@prisma/client'

import type { BaseResponse } from '@/types'

export type UserSignupModel = Pick<User, 'username' | 'password'>
export type UserSignupInput = UserSignupModel & { confirmPassword: string }

export type UserSignupResponse = BaseResponse<{
  user: Partial<User>
  accessToken: string
}>
