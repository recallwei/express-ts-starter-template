import multer from 'multer'

import { GlobalFileStorageConfig } from './config'

const baseStorage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, GlobalFileStorageConfig.FILE_STORAGE_PATH)
  },
  filename(req, file, callback) {
    callback(null, `${file.filename}-${Date.now()}.png`)
  }
})

const baseUpload = multer({ storage: baseStorage })

export { baseUpload }
