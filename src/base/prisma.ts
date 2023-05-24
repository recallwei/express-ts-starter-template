import { PrismaClient } from '@prisma/client'

interface CustomNodeJSGlobal extends Global {
  prisma: PrismaClient
}

declare const global: CustomNodeJSGlobal

const prisma: PrismaClient =
  global.prisma ||
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
    errorFormat: 'pretty'
  })

// Logging Middleware
prisma.$use(async (params, next) => {
  const before = Date.now()
  const result = await next(params)
  const after = Date.now()
  console.log(`Query ${params.model}.${params.action} took ${after - before}ms`)
  return result
})

if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma
}

export { prisma as PrismaQuery }
