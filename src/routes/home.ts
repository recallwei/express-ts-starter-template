import type { Request, Router } from 'express'
import express from 'express'

import type { OKResponse } from '@/types'

const router: Router = express.Router()

router.get('/', (request: Request, response: OKResponse<string>) => {
  response.status(200).json({ data: 'Welcome to EST, this is a demo API!' })
})

export default router
