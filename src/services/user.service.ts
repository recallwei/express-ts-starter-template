import type { User } from '@prisma/client'
import { Role } from '@prisma/client'
import bcrypt from 'bcrypt'

import { generateUUID, PrismaAction, PrismaQuery } from '@/shared'

import type { UserSignupModel } from './user.model'

export default {
  getUsers: async (): Promise<User[]> => {
    return PrismaQuery.user.findMany({
      where: {
        verified: true,
        enabled: true,
        ...PrismaAction.notDeleted()
      }
    })
  },

  getUserById: async (id: number): Promise<User | null> => {
    return PrismaQuery.user.findFirst({
      where: {
        id,
        verified: true,
        enabled: true,
        ...PrismaAction.notDeleted()
      }
    })
  },

  createUser: async (user: UserSignupModel): Promise<User> => {
    return PrismaQuery.user.create({
      data: {
        ...user,
        uuid: generateUUID(),
        verified: true,
        enabled: true,
        roles: [Role.USER]
      }
    })
  },

  deleteUser: async (id: number): Promise<User | null> => {
    return PrismaQuery.user.delete({
      where: { id }
    })
  },

  alreadyExists: async (username: string): Promise<boolean> => {
    const user = await PrismaQuery.user.findFirst({
      where: {
        username,
        verified: true,
        enabled: true,
        ...PrismaAction.notDeleted()
      }
    })
    return !!user
  },

  filterSafeUserInfo: (user: User): Partial<User> => {
    // eslint-disable-next-line unused-imports/no-unused-vars
    const { password, ...filteredUser } = user
    return filteredUser
  },

  passwordHash: async (password: string) => bcrypt.hash(password, 10),

  verifyUser: async (id: number): Promise<User | null> => {
    return PrismaQuery.user.update({
      where: { id },
      data: {
        verified: true
      }
    })
  },

  banUser: async (id: number): Promise<User | null> => {
    return PrismaQuery.user.update({
      where: { id },
      data: {
        enabled: false
      }
    })
  },

  enableUser: async (id: number): Promise<User | null> => {
    return PrismaQuery.user.update({
      where: { id },
      data: {
        enabled: true
      }
    })
  },

  authorizeUser: async (id: number): Promise<User | null> => {
    return PrismaQuery.user.update({
      where: { id },
      data: {
        roles: [Role.USER, Role.ADMIN]
      }
    })
  }
}
