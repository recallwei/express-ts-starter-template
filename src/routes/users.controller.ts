import type { User } from '@prisma/client'
import type { Response, Router } from 'express'
import express from 'express'

import type { JWTUserModel } from '@/core'
import { JWTManager } from '@/core'
import type { UserSafeModel, UserSignupInputModel, UserSignupResponse, UserUpdateInputBaseModel } from '@/services'
import { UsersService } from '@/services'
import type { BasePageResponse, BaseRequest, BaseResponse, PageRequestModel } from '@/types'

const router: Router = express.Router()

router.get('/', async (request: BaseRequest, response: BasePageResponse<UserSafeModel[]>) => {
  const { pageNum, pageSize } = request.query

  if (!pageNum || !pageSize) {
    response.status(400).json({
      message: 'Page number and page size are required.'
    })
    return
  }

  if (typeof Number(pageNum) !== 'number' || typeof Number(pageSize) !== 'number') {
    response.status(400).json({
      message: 'Page number and page size must be numbers.'
    })
    return
  }

  const pageModel: PageRequestModel = {
    pageNum: Number(pageNum),
    pageSize: Number(pageSize)
  }

  const { users, ...pageResult } = await UsersService.getUsers(pageModel)

  response.status(200).json({
    data: users.map((user) => UsersService.filterSafeUserInfo(user)),
    ...pageResult
  })
})

router.get('/:id', async (request: BaseRequest, response: BaseResponse<User>) => {
  const id = Number(request.params.id)
  const user = await UsersService.getUserById(id)
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

router.post('/', async (request: BaseRequest, response: UserSignupResponse) => {
  const { username, password, confirmPassword } = request.body as UserSignupInputModel

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
  if ((await UsersService.alreadyExists(username)).isExist) {
    response.status(409).json({
      message: 'Username already exists.'
    })
    return
  }

  try {
    const user = await UsersService.createUser({
      username,
      password: await UsersService.passwordHash(password)
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
        user: UsersService.filterSafeUserInfo(user),
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

router.put('/:id', async (request: BaseRequest, response: Response) => {
  const id = Number(request.params.id)

  if (!id) {
    response.status(400).json({
      message: 'User ID is required.'
    })
    return
  }

  const { email, name, firstName, lastName, gender, phoneNumber, birthDate, address, avatarUrl, biography } =
    request.body as UserUpdateInputBaseModel

  try {
    await UsersService.updateUser(
      id,
      {
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
      },
      { request }
    )
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

router.delete('/:id', async (request: BaseRequest, response: BaseResponse) => {
  const id = Number(request.params.id)
  if (!id) {
    response.status(400).json({
      message: 'User ID is required.'
    })
    return
  }

  try {
    await UsersService.deleteUser(id, { request })
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
