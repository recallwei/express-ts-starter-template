import type { Router } from 'express'
import express from 'express'

import type { BaseRequest, BaseResponse } from '@/types'

const router: Router = express.Router()

router.get('/', (_: BaseRequest, response: BaseResponse<string>) => {
  response.status(200).json({
    data: 'Welcome to EST, this is a demo API!'
  })
})

export default router
