import type { User } from '@prisma/client'

export type UserSignupInput = Pick<User, 'username' | 'password'> & { confirmPassword: string }
export type UserSignupModel = Pick<User, 'username' | 'password'>
