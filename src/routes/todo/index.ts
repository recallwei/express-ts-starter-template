import { prisma } from '@dbContext'
import { Prisma, type todo } from '@prisma/client'
import type { NextFunction, Request, Response, Router } from 'express'
import express from 'express'

const router: Router = express.Router()

/**
 * GET /todo
 * @summary Todo
 * @tags Todo
 * @return {object} 200 - success response - application/json
 */
router.get('/', async (request: Request, response: Response) => {
  const todoList: Array<todo> = await prisma.todo.findMany()
  console.log(todoList)
  response.status(200).json(todoList)
})

/**
 * POST /todo
 * @summary Todo
 * @tags Todo
 * @return {object} 200 - success response - application/json
 */
router.post('/', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const todo = await prisma.todo.create({
      data: {
        name: '测试测试测试测试测试测测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
        url: '',
        description: ''
      }
    })
    if (todo) {
      response.status(200)
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(e.message)
      response.status(400).send(e.message)
    }
  }
})

export default router
