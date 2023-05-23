import type { Request, Response, Router } from 'express'
import express from 'express'

const router: Router = express.Router()

/**
 * GET /
 * @summary Home
 * @tags Home
 * @return {object} 200 - OK
 */
router.get('/', function (request: Request, response: Response) {
  response.json({ message: 'Welcome to EST, this is a demo API!' })
})

export default router
