import type { User } from '@prisma/client'

import type { BaseResponse } from '@/types'

export type UserSignupModel = Pick<User, 'username' | 'password'>
export type UserSignupInput = UserSignupModel & { confirmPassword: string }

export type UserSignupResponse = BaseResponse<{
  user: Partial<User>
  accessToken: string
}>

export type UserUpdateInput = Pick<
  User,
  | 'email'
  | 'name'
  | 'firstName'
  | 'lastName'
  | 'gender'
  | 'phoneNumber'
  | 'birthDate'
  | 'address'
  | 'avatarUrl'
  | 'biography'
>

export type UserUpdateModel = UserUpdateInput & { updateAt?: Date; updateBy?: string }
