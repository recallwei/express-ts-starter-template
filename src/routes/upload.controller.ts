import type { Request, Response, Router } from 'express'
import express from 'express'
import { readFileSync } from 'fs'

import { UploadService } from '@/services/upload'
import { upload } from '@/shared'
import type { BaseResponse } from '@/types'

const router: Router = express.Router()

router.get('/', (request: Request, response: Response) => {
  const file = readFileSync('storage/images/a278294ea9942307a598d89ba88f572a', { encoding: 'utf8' })
  console.log(file)
  response.set('content-type', 'image/png')
  response.status(200).send(file)
})

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
