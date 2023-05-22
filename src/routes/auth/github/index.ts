import axios from 'axios'
import dotenv from 'dotenv'
import type { NextFunction, Request, Response, Router } from 'express'
import express from 'express'

dotenv.config()

const router: Router = express.Router()

const POST_GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token'
const GET_GITHUB_USER_URL = 'https://api.github.com/user'

export interface UserInfo {
  id: number | null
  name: string | null
  avatarUrl: string | null
  biography: string | null
  email: string | null
  location: string | null
}

async function getUserInfoByToken(token: string): Promise<UserInfo | null> {
  const user = await axios({
    method: 'GET',
    url: GET_GITHUB_USER_URL,
    headers: {
      accept: 'application/json;charset=utf-8',
      Authorization: `token ${token}`
    }
  })
  return user.data
    ? {
        id: user.data.id,
        name: user.data.name ?? user.data.login,
        avatarUrl: user.data.avatar_url,
        biography: user.data.bio,
        email: user.data.email,
        location: user.data.location
      }
    : null
}

/**
 * GET /auth/github/user
 * @summary Auth
 * @tags Auth
 * @return {object} 200 - success response - application/json
 */
router.post('/', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const requestToken = request.query.code
    if (!requestToken) {
      response.status(401).json('Authenticate failed: No code.')
      return
    }
    const tokenResponse = await axios({
      method: 'POST',
      url:
        `${POST_GITHUB_TOKEN_URL}?client_id=${process.env.GITHUB_CLIENT_ID}&` +
        `client_secret=${process.env.GITHUB_CLIENT_SECRET}&` +
        `code=${requestToken}`,
      headers: {
        accept: 'application/json;charset=utf-8'
      }
    })
    if (!tokenResponse.data.access_token) {
      response.status(401).json('Authenticate failed: No token.')
      return
    }

    const userInfo = await getUserInfoByToken(tokenResponse.data.access_token)

    response.status(200).json({
      token: tokenResponse.data.access_token,
      user: userInfo
    })
  } catch (err) {
    next(err)
  }
})

/**
 * GET /auth/github
 * @summary Auth
 * @tags Auth
 * @return {object} 200 - success response - application/json
 */
router.get('/user', async (request: Request, response: Response, next: NextFunction) => {
  try {
    if (!request.headers.authorization || request.headers.authorization?.split(' ')[0] !== 'gt') {
      response.status(401).json('Authenticate failed: No token.')
      return
    }

    const githubToken = request.headers.authorization.split(' ')[1]
    if (!githubToken) {
      response.status(401).json('Authenticate failed: No token.')
      return
    }

    const userInfo = await getUserInfoByToken(githubToken)

    response.status(200).json({
      userInfo
    })
  } catch (err) {
    next(err)
  }
})

export default router
