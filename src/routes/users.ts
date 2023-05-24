import type { User } from '@prisma/client'
import type { Request, Response, Router } from 'express'
import express from 'express'

import type { JWTUserModel } from '@/core'
import { JWTManager } from '@/core'
import { UserService } from '@/services'
import type { UserSignupInput } from '@/services/user.model'
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
    response.status(404).json({
      message: 'User not found.'
    })
  }
})

router.post('/', async (request: Request, response: OKResponse<Partial<User>>) => {
  const { username, password, confirmPassword } = request.body as UserSignupInput

  // Required fields
  if (!username?.trim() || !password?.trim() || !confirmPassword?.trim()) {
    response.status(400).json({
      message: 'Username, password, and confirm password are required.'
    })
    return
  }

  // Validate password
  if (password !== confirmPassword) {
    response.status(400).json({
      message: 'Passwords do not match.'
    })
    return
  }

  // Check if username already exists
  if (await UserService.alreadyExists(username)) {
    response.status(409).json({
      message: 'Username already exists.'
    })
    return
  }

  try {
    const user = await UserService.createUser({
      username,
      password: await UserService.passwordHash(password)
    })

    // Generate JWT token
    const jwtUserModel: JWTUserModel = {
      id: user.id,
      username: user.username,
      roles: user.roles
    }
    const accessToken = JWTManager.generateAccessToken(jwtUserModel)
    if (!accessToken) {
      response.status(401).json({
        message: 'Error generating token.'
      })
      return
    }

    response.status(201).json({
      data: UserService.filterSafeUserInfo(user)
    })
  } catch (error) {
    response.status(400).json({
      message: 'Error creating user.'
    })
  }
})

router.put('/:id', (request: Request, response: Response) => {})

router.delete('/', (request: Request, response: Response) => {})

export default router
