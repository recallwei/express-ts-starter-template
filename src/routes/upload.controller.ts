import type { Request, Router } from 'express'
import express from 'express'

import { UploadService } from '@/services/upload'
import { upload } from '@/shared'
import type { BaseResponse } from '@/types'

const router: Router = express.Router()

router.post('/', upload.single('file'), async (request: Request, response: BaseResponse<any>) => {
  const { file } = request
  if (!file) {
    response.status(400).json({
      message: 'File is required.'
    })
    return
  }

  UploadService.logFileInfo(file)

  response.json({
    data: file
  })
})

router.post('/batch', upload.array('files'), async (request: Request, response: BaseResponse<string>) => {
  const { files } = request

  console.log(files)
  response.json({
    data: ''
  })
})

export default router
