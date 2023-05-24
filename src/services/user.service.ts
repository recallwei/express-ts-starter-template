import type { User } from '@prisma/client'

import { PrismaAction, PrismaQuery } from '@/shared'

export default {
  getUsers: async (): Promise<User[]> => {
    return PrismaQuery.user.findMany({
      where: {
        ...PrismaAction.notDeleted()
      }
    })
  },

  getUserById: async (id: number): Promise<User | null> => {
    return PrismaQuery.user.findFirst({
      where: { id }
    })
  },

  createUser: async (user: User): Promise<User> => {
    return PrismaQuery.user.create({
      data: {
        ...user
      }
    })
  },

  deleteUser: async (id: number): Promise<User | null> => {
    return PrismaQuery.user.delete({
      where: { id }
    })
  }
}
