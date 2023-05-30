import multer from 'multer'

import { GlobalFileStorageConfig } from './config'
import { generateUUID } from './uuid'

const baseStorage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, GlobalFileStorageConfig.FILE_STORAGE_PATH)
  },
  filename(req, file, callback) {
    callback(null, `${generateUUID()}.png`)
  }
})

const baseUpload = multer({ storage: baseStorage })

export { baseUpload }
