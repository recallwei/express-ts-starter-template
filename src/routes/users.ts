import type { User } from '@prisma/client'
import type { Request, Response, Router } from 'express'
import express from 'express'

import { UserService } from '@/services'
import type { OKResponse } from '@/types'

const router: Router = express.Router()

router.get('/', async (_, response: OKResponse<User[]>) => {
  const users = await UserService.getUsers()
  response.status(200).json({
    data: users
  })
})

router.get('/:id', async (request: Request, response: OKResponse<User>) => {
  const id = Number(request.params.id)
  const user = await UserService.getUserById(id)
  if (user) {
    response.status(200).json({
      data: user
    })
  } else {
    response.status(400).json({
      error
    })
  }
})

router.post('/', async (request: Request, response: Response) => {
  const user = request.body
  try {
    await UserService.createUser(user)
    response.status(201).json({
      data: user
    })
  } catch (error) {
    response.status(400).json({
      error
    })
  }
})

router.put('/', (request: Request, response: Response) => {})

router.delete('/', (request: Request, response: Response) => {})

export default router
