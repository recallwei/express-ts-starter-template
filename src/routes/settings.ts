import type { Request, Response, Router } from 'express'
import express from 'express'

const router: Router = express.Router()

router.get('/', (request: Request, response: Response) => {})

export default router
