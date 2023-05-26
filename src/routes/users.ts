import type { User } from '@prisma/client'
import type { Request, Response, Router } from 'express'
import express from 'express'

import type { JWTUserModel } from '@/core'
import { JWTManager } from '@/core'
import type { UserSignupResponse } from '@/services'
import { UserService } from '@/services'
import type { UserSignupInput, UserUpdateInput } from '@/services/user.model'
import type { BaseResponse } from '@/types'

const router: Router = express.Router()

router.get('/', async (_, response: BaseResponse<User[]>) => {
  const users = await UserService.getUsers()
  response.status(200).json({
    data: users
  })
})

router.get('/:id', async (request: Request, response: BaseResponse<User>) => {
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

router.post('/', async (request: Request, response: UserSignupResponse) => {
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
      data: {
        user: UserService.filterSafeUserInfo(user),
        accessToken
      }
    })
  } catch (error) {
    console.log(error)
    response.status(500).json({
      message: 'Error creating user.'
    })
  }
})

router.put('/:id', (request: Request, response: Response) => {
  const id = Number(request.params.id)

  if (!id) {
    response.status(400).json({
      message: 'User ID is required.'
    })
    return
  }

  const { email, name, firstName, lastName, gender, phoneNumber, birthDate, address, avatarUrl, biography } =
    request.body as UserUpdateInput

  try {
    UserService.updateUser(id, {
      email,
      name,
      firstName,
      lastName,
      gender,
      phoneNumber,
      birthDate,
      address,
      avatarUrl,
      biography
    })
    response.status(200).json({
      message: 'User updated.'
    })
  } catch (error) {
    console.log(error)
    response.status(500).json({
      message: 'Error updating user.'
    })
  }
})

router.delete('/:id', async (request: Request, response: BaseResponse) => {
  const id = Number(request.params.id)
  if (!id) {
    response.status(400).json({
      message: 'User ID is required.'
    })
    return
  }

  try {
    await UserService.deleteUser(id)
    response.status(200).json({
      message: 'User deleted.'
    })
  } catch (error) {
    console.log(error)
    response.status(500).json({
      message: 'Error deleting user.'
    })
  }
})

export default router
