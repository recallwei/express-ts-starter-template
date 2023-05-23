import { randAvatar, randFullAddress, randPastDate, randPhoneNumber } from '@ngneat/falso'
import type { Prisma } from '@prisma/client'
import { Gender, PrismaClient, Role } from '@prisma/client'
// NOTE: chalk must use v4.x
import chalk from 'chalk'

import { generateUUID } from '@/shared'

const prisma = new PrismaClient()

const CURRENT_DATE = new Date().toISOString()
const SEED_USER = 'Admin'

const defaultUser: Prisma.UserCreateInput = {
  uuid: generateUUID(),
  username: 'BruceSong',
  email: 'recall4056@gmail.com',
  password: 'xxxxxx',
  name: 'Bruce Song',
  firstName: 'Bruce',
  lastName: 'Song',
  gender: Gender.UNDEFINED,
  phoneNumber: randPhoneNumber(),
  birthDate: randPastDate(),
  address: randFullAddress(),
  avatarUrl: randAvatar(),
  biography: 'I am a Web developer.',
  verified: true,
  enabled: true,
  roles: Array.of(Role.ADMIN),
  createdAt: CURRENT_DATE,
  createdBy: SEED_USER
}

const seed = async () => {
  await prisma.user.create({
    data: defaultUser
  })
}

seed()
  .then(async () => {
    console.log(chalk.green.bgWhiteBright('🍀 Seed your db successfully!'))
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
